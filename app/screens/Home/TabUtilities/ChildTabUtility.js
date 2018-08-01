import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    Dimensions,
    Platform,
    NativeModules
} from "react-native";
import styles from './styles';
import globalStyles from '../../../resources/styles';
import AnnouncementCard from '../../../components/AnnouncementCard';
import ServiceCard from '../../../components/ServiceCard';
import AdsSlider from '../../../components/AdsSlider';
import Util from '../../../configs/util';
import Api from '../../../api/api';

import IJKPlayer from '../../../configs/IJKPlayer';

import Constant from '../../../configs/constant';
import _ from 'lodash';
import { scale, moderateScale, verticalScale} from '../../../components/Scaling';


export default class ChildTabUtility extends Component {

    constructor(props) {
        super(props);

        this.state = {
            changeEnvModalVisible: false,
            enableAdsUtil : 0,
            cameraList: [],
            is_tab_utility: '0',
            is_sub_tab_utility: '0'
        };
    }

    componentWillMount() {
        Util.getItem('SAVED_CONFIGS', true).then(configs => {
            this.setState({enableAdsUtil : configs.enable_ads_util, is_tab_utility: configs.is_tab_utility, is_sub_tab_utility: configs.is_sub_tab_utility});
        });
    }

    setEnvModalVisible = (visible) => {
        this.setState({changeEnvModalVisible: visible});
    }

    playCamera() {
        let camList = [];
        let camObj = {};

        Api.getCameraList(1).then(res => {
            console.log(res);
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                console.log('cameraList');
                console.log(res);
                if(!_.isEmpty(res.javaResponse.cameras)) {


                    if(Platform.OS === 'ios') {
                        var rtspplayer= NativeModules.rtspplayer;
                        rtspplayer.addEvent(res.javaResponse.cameras);
                    } else {
                        // IJKPlayer.show('Play camera', IJKPlayer.SHORT);
                        IJKPlayer.show(res.javaResponse.cameras);
                    }
                } else {
                  Util.showAlert('Không có camera nào. Vui lòng kiểm tra lại!');
                }




            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });



    }

    _navigatePage = (page) => {

      if(this.state.is_sub_tab_utility == '1') {
        this.props.navigation.navigate(page);
      } else {
        Util.showAlert(Constant.MESSAGES.DEV_FUNC_MSG);
      }

    }

    render() {
        let ww = Dimensions.get('window').width;
        let serviceCardWidth = ww/3 - 12;

		return (
            <ScrollView>
                <Text style={styles.serviceSectionLabel}>Nhà thông minh</Text>
                <View style={styles.serviceCardWrapper}>
                    <ServiceCard onPress={() => this.props.navigation.navigate('DoorsList', {type: Constant.IOT.DOOR})} style={{width:serviceCardWidth}} label="Cảnh báo mở cửa" icon={require('../../../images/utilities/cua.png')}/>
                    <ServiceCard onPress={() => this.playCamera()} style={{width:serviceCardWidth}} label="Camera giám sát" icon={require('../../../images/utilities/cameragiamsat.png')}/>
                    <ServiceCard onPress={() => this.props.navigation.navigate('DoorsList', {type: Constant.IOT.SMOKE})} style={{width:serviceCardWidth}} label="Cảnh báo cháy" icon={require('../../../images/utilities/icon-fire.png')}/>
                </View>
                <View style={styles.serviceCardWrapper}>

                    <ServiceCard onPress={() => this.props.navigation.navigate('DoorsList', {type: Constant.IOT.MOVEMENT})} style={{width:serviceCardWidth}} label="Cảnh báo chuyển động" icon={require('../../../images/utilities/icon-movement.png')}/>
                </View>

                {
                    this.state.enableAdsUtil == 1 &&
                    <AdsSlider width={ww} style={{marginTop: 10}}/>
                }

                {this.state.is_tab_utility == '1' &&
                  <View>
                    <Text style={styles.serviceSectionLabel}>Tiện ích thanh toán</Text>
                    <View style={styles.serviceCardWrapper}>
                        <ServiceCard disable={true} style={{width: serviceCardWidth}} label="Hóa đơn điện" icon={require('../../../images/utilities/hoadondien.png')}/>
                        <ServiceCard disable={true} style={{width: serviceCardWidth}} label="Hóa đơn nước" icon={require('../../../images/utilities/hoadonnuoc.png')}/>
                        <ServiceCard onPress={() =>  this._navigatePage('PayInternet')} style={{width:serviceCardWidth}} label="Hoá đơn Internet" icon={require('../../../images/utilities/hoadoninternet.png')}/>
                    </View>

                    <View style={styles.serviceCardWrapper}>
                        <ServiceCard onPress={() =>  this._navigatePage('PayPostpaidMobile')} style={{width:serviceCardWidth}} label="Điện thoại trả sau" icon={require('../../../images/utilities/dienthoaitrasau.png')}/>
                        <ServiceCard onPress={() =>  this._navigatePage('PayPrepaidMobile')} style={{width:serviceCardWidth}} label="Điện thoại trả trước" icon={require('../../../images/utilities/dienthoaitratruoc.png')}/>
                        <ServiceCard onPress={() =>  this._navigatePage('PayTelevision')} style={{width: serviceCardWidth}} label="Hóa đơn truyền hình" icon={require('../../../images/utilities/hoadontruyenhinh.png')}/>
                    </View>
                    <View style={styles.serviceCardWrapper}>
                        <ServiceCard onPress={() =>  this._navigatePage('PayFlight')} style={{width: serviceCardWidth}} label="Vé máy bay" icon={require('../../../images/utilities/vemaybay.png')}/>
                        <ServiceCard onPress={() =>  this._navigatePage('PayRailway')} style={{width: serviceCardWidth}} label="Vé tàu" icon={require('../../../images/utilities/vetau.png')}/>
                        <ServiceCard onPress={() =>  this._navigatePage('PayAssurance')} style={{width: serviceCardWidth}} label="Bảo hiểm" icon={require('../../../images/utilities/baohiem.png')}/>
                    </View>
                  {/*
                  <Text style={styles.serviceSectionLabel}>Tiện ích gia dụng</Text>
                  <View style={styles.serviceCardWrapper}>
                      <ServiceCard onPress={() => this.props.navigation.navigate('PlumberFix')} style={{width:serviceCardWidth}} label="Sửa điện" icon={require('../../../images/utilities/suadien.png')}/>
                      <ServiceCard onPress={() => this.props.navigation.navigate('PlumberFix')} style={{width:serviceCardWidth}} label="Sửa ống nước" icon={require('../../../images/utilities/suaongnuoc.png')}/>
                      <ServiceCard onPress={() => this.props.navigation.navigate('PlumberFix')} style={{width:serviceCardWidth}} label="Điều hoà" icon={require('../../../images/utilities/dieuhoa.png')}/>
                  </View>
                  <View style={[styles.serviceCardWrapper, {marginBottom: 20}]}>
                      <ServiceCard onPress={() => this.props.navigation.navigate('PlumberFix')} style={{width: serviceCardWidth}} label="Thay ga" icon={require('../../../images/utilities/thayga.png')}/>
                      <ServiceCard onPress={() => this.props.navigation.navigate('PlumberFix')} style={{width: serviceCardWidth}} label="Gọi nước" icon={require('../../../images/utilities/goinuoc.png')}/>
                      <ServiceCard onPress={() => this.props.navigation.navigate('PlumberFix')} style={{width: serviceCardWidth}} label="Sửa xe" icon={require('../../../images/utilities/suaxe.png')}/>
                  </View>

                  */}
                  </View>
                }
            </ScrollView>
        );
	}
}
