import React, { Component , PureComponent} from 'react';
import {
    View,
    ScrollView,
    Text,
    FlatList,
    Image
} from "react-native";
import styles from './styles';
import SettingListItem from '../../../components/SettingListItem';
import Util from '../../../configs/util';
import Constant from '../../../configs/constant';
import Share, {ShareSheet, Button} from 'react-native-share';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actionCreators';

import renderIf from '../../../configs/renderIf';
import DeviceInfo from 'react-native-device-info';


class TabSettings extends PureComponent {

    constructor(props) {
      super(props);
      
      this.state = {
        version: ''
      }
      
      
    }
    
    componentWillMount() {
      this.setState({
        version: DeviceInfo.getVersion()
      });
    }

    onClickLogOut() {
        var $this = this;

        Util.showConfirm(Constant.MESSAGES.CONFIRM_LOGOUT_TITLE, function() {
            // Util.clear();
            Util.clearAll();
            $this.props.navigation.navigate('Login');
        });
    }

    _onClickShare() {
        // Share.share({
        //     message: 'Chia sẻ ứng dụng truyền thông cơ sở',
        //     url: 'http://mobifone.vn/wps/portal/public',
        //     title: 'Ứng dụng truyền thông cơ sở'
        //   }, {
        //     // Android only:
        //     dialogTitle: 'Chia sẻ ứng dụng',
        //     // iOS only:
        //     subject: 'Chia sẻ ứng dụng',
        // });
        let shareOptions = {
          title: "Ứng dụng truyền thông cơ sở",
          message: "Chia sẻ ứng dụng truyền thông cơ sở",
          url: "http://mobifone.vn/wps/portal/public",
          subject: "Chia sẻ ứng dụng" //  for email
        };
        Share.open(shareOptions).catch((err) => { err && console.log(err); })
    }

	render() {
		return (
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.avatarWrap}>
                        <Image style={styles.avatar} source={require('../../../images/icon-user.png')} resizeMode="cover" />
                    </View>
                    <Image style={styles.cover} source={require('../../../images/temp/setting-bg.jpg')} resizeMode="cover" />
                    <View style={styles.coverOverlay}></View>
                    {
                        (this.props.userInfor)
                        &&
                        <View style={styles.infoWrap}>
                            <View style={styles.userInfoTextWrap}><Text style={styles.userInfoText}>{this.props.userInfor.full_name}</Text></View>
                            <View style={styles.userInfoTextWrap}><Text style={styles.userInfoText}>{this.props.userInfor.phone_number}</Text></View>
                            <View style={styles.userInfoTextWrap}><Text style={styles.userInfoText}>{this.props.userInfor.areas[1].name} - {this.props.userInfor.areas[2].name} - {this.props.userInfor.areas[3].name}</Text></View>
                        </View>
                    }
                </View>

                {
                    (this.props.userInfor)
                    &&
                    <SettingListItem onPress={()=>this.props.navigation.navigate('SettingListAccount')} icon={require('../../../images/st-user.png')} title={'Danh sách tài khoản'} />
                }

                {
                    (this.props.userInfor)
                    &&
                    <SettingListItem onPress={() => this.props.navigation.navigate('ChangePassword')} icon={require('../../../images/st-lock.png')} title={'Thay đổi mật khẩu'} />
                }
                <View style={styles.introWrap}>
                    <Image source={require('../../../images/st-bubble.png')} resizeMode="contain" />
                    <Text style={styles.introTitle}>Ứng dụng Truyền thông thông minh</Text>
                    <Text style={styles.introSubtitle}>Phiên bản {this.state.version}</Text>
                </View>
                <SettingListItem onPress={()=>this.props.navigation.navigate('SettingAbout')} icon={require('../../../images/st-intro.png')} title={'Giới thiệu ứng dụng'} />
                {/*
                <SettingListItem icon={require('../../../images/st-lang.png')} title={'Cài đặt ngôn ngữ'} />
                */}
                <SettingListItem  onPress={() => this._onClickShare()} icon={require('../../../images/st-share.png')} title={'Chia sẻ ứng dụng'} />
                {/*
                <SettingListItem icon={require('../../../images/st-bell.png')} title={'Cài đặt thông báo'} />
                <SettingListItem icon={require('../../../images/st-wallet.png')} title={'Cài đặt thanh toán'} />
                */}
                <SettingListItem onPress={()=>this.props.navigation.navigate('SettingSupport')} icon={require('../../../images/st-support.png')} title={'Hỗ trợ'} />
                <SettingListItem onPress={this.onClickLogOut.bind(this)} icon={require('../../../images/st-logout.png')} title={this.props.userInfor ? 'Đăng xuất' : 'Thoát'} />
            </ScrollView>
        );
	}
}

function mapStateToProps(state) {
    return  {
        userInfor: state.userInfor
    }
}

export default connect(mapStateToProps, actionCreators)(TabSettings);
