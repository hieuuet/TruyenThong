//@flow
import React, {Component} from "react";
import {
    View,
    ScrollView,
    Image,
    StatusBar,
    Modal,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    Dimensions,
    Platform,
    BackHandler
} from "react-native";
import styles from './styles';
import locationStyles from '../SelectLocation/styles';
import globalStyles from '../../resources/styles';
import { TabViewAnimated } from 'react-native-tab-view';
import Tag from "../../components/Tag";
import MButton from '../../components/MButton';
import TabHot from './TabHot/TabHot';
import TabService from './TabService/TabService';
import TabSettings from './TabSettings/TabSettings';
import TabNews from './TabNews/TabNews';
import TabUtilities from './TabUtilities/TabUtilities';
import ProgressBar from '../../components/ProgressBar';
import HomeTabBar from '../../components/HomeTabBar';
import AppStateComponent from '../../components/AppStateComponent';
import Api from '../../api/api';
import _ from 'lodash';
import Util from '../../configs/util';
import Constant from '../../configs/constant';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';
import ScrollableTabView from 'react-native-scrollable-tab-view';

// import PushController from '../../configs/PushController';
import PushService from '../../configs/PushService';
import DeviceInfo from 'react-native-device-info';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class Home extends Component {

    constructor(props) {
		super(props);

        this.state = {
            city : this.props.currentCity,
            province : this.props.currentProvince,
            ward : this.props.currentWard,
            userInfo: this.props.currentUserReducer,
            changeLocationModalVisible: false,
            modalTitle: '',
            items: [],
            itemsCity: [],
            itemsProvince: [],
            itemsWards: []
        }
    }

    tmpCity = null;
    tmpProvince = null;
    tmpWard = null;

    static navigationOptions = {
        header: null
    };

    componentWillMount() {

      if(this.props.userInfor != null) {
        console.log('this.props.userInfor != null');
        PushService.configure(this.props.navigation, this.props.currentWard.id, this.props.userInfor.mcu_id);
      } else {
        console.log('this.props.userInfor == null');
        PushService.configure(this.props.navigation, this.props.currentWard.id, null);
      }
        PushService.setCallbacks(this._handleOnPushRegister, this._handleOnPushNotification, this._insertToken, this._redirectPage);
    }

    _handleOnPushRegister(device) {
        console.log('_handleOnPushRegister');
        console.log('deviceToken: ');
        console.log(device);

    }

    _handleOnPushNotification(notification) {
        console.log('_handleOnPushNotification');
        console.log(notification);
        // console.log('this.props');
        // console.log(this.props);
    }

    _insertToken(device, areaId, mcuId) {

        let params = {
            token: device.token,
            device_type: Platform.OS == "ios" ? 0 : 1,
            area_id: areaId,
            mcu_id: mcuId,
            device_id: DeviceInfo.getUniqueID()
        };

        console.log('params: ');
        console.log(params);

        Api.insertToken(params).then(res => {
            console.log('res');
            console.log(res);
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {


            } else {
                // const { navigate } = this.props.navigation;
                // Util.handleDefaultResponse(res, navigate);
                if (res.code === Constant.RESPONSE_CODE.EXIST_TOKEN) {
                    // Util.showAlert(res.msg);
                } else if(res.code == Constant.RESPONSE_CODE.BAD_CONTENT) {
                    Util.showAlert(res.msg);
                }
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    _redirectPage(notification, navigation, mcuId) {
        console.log('notification _redirectPage: ');
        console.log(notification);
        if(Platform.OS === 'ios') {
          if(notification.data.CONTENT_TYPE == '1') {
            navigation.navigate('ArticleDetail', {id : notification.data.CONTENT_ID});
          } else if(notification.data.CONTENT_TYPE == '2') {
            // navigation.navigate('ChildTabAnnoucement');
          } else if(notification.data.CONTENT_TYPE == '3') {

            let sensor = {};

            if(!_.isEmpty(notification.data.MCU_EVENT_TYPE)) {
              sensor.type = notification.data.MCU_EVENT_TYPE;
            }

            if(!_.isEmpty(notification.data.MCU_EVENT_SENSOR_ID)) {
              sensor.id = notification.data.MCU_EVENT_SENSOR_ID;
            }
            if(!_.isEmpty(notification.data.NAME)) {
              sensor.name = notification.data.NAME;
            }

            navigation.navigate('DoorDetail', {sensor: sensor});

          }
        } else {

          if(notification.CONTENT_TYPE == '1') {
            navigation.navigate('ArticleDetail', {id : notification.CONTENT_ID});
          } else if(notification.CONTENT_TYPE == '2') {
            // navigation.navigate('ChildTabAnnoucement');
          } else if(notification.CONTENT_TYPE == '3') {

            let sensor = {};

            if(!_.isEmpty(notification.MCU_EVENT_TYPE)) {
              sensor.type = notification.MCU_EVENT_TYPE;
            }

            if(!_.isEmpty(notification.MCU_EVENT_SENSOR_ID)) {
              sensor.id = notification.MCU_EVENT_SENSOR_ID;
            }
            if(!_.isEmpty(notification.NAME)) {
              sensor.name = notification.NAME;
            }

            navigation.navigate('DoorDetail', {sensor: sensor});

          }
        }
    }

    setModalVisible(visible) {
        this.setState({changeLocationModalVisible: visible});
    }

    getSubArea(id, type, init) {
        var $this = this;
        Api.getSubArea(id).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                if(!_.isEmpty(res.javaResponse.areas)) {
                    if(type == 'city') {
                        _.forEach(res.javaResponse.areas, function(val) {
                            val.selected = false;
                            if($this.props.currentCity !== null && val.id == $this.props.currentCity.id) {
                                val.selected = true;
                            }
                        });
                        this.setState({
                            itemsCity : res.javaResponse.areas,
                            items : res.javaResponse.areas,
                            changeLocationModalVisible : !init && !_.isEmpty(res.javaResponse.areas),
                            modalTitle : 'Chọn Tỉnh/Thành phố'
                        });
                    }

                    if(type == 'province') {
                        _.forEach(res.javaResponse.areas, function(val) {
                            val.selected = false;
                            if($this.props.currentProvince !== null && val.id == $this.props.currentProvince.id) {
                                val.selected = true;
                            }
                        });
                        this.setState({
                            itemsProvince : res.javaResponse.areas,
                            items : res.javaResponse.areas,
                            changeLocationModalVisible : !init && !_.isEmpty(res.javaResponse.areas),
                            modalTitle : 'Chọn Quận/Huyện'
                        });
                    }

                    if(type == 'ward') {
                        _.forEach(res.javaResponse.areas, function(val) {
                            val.selected = false;
                            if($this.props.currentWard !== null && val.id == $this.props.currentWard.id) {
                                val.selected = true;
                            }
                        });
                        this.setState({
                            itemsWards : res.javaResponse.areas,
                            items : res.javaResponse.areas,
                            changeLocationModalVisible : !init && !_.isEmpty(res.javaResponse.areas),
                            modalTitle : 'Chọn Phường/Xã'
                        });
                    }
                }
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch(error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    async onPressItem(item) {
        console.log('item');
        console.log(item);
        let arrItems = [];
        _.forEach(this.state.items, function(val) {
            if(val.id == item.id) {
                val.selected = true;
            } else {
                val.selected = false;
            }
            arrItems.push(val);
        });

        // tinh/ thanh pho
        if(item.area_type_id == '1') {
            tmpCity = item;
            this.setState({
                itemsProvince: [],
                itemsWards: [],
                items : arrItems
            });
            this.getSubArea(item.id, 'province', false);
        }

        // quan/ huyen
        if(item.area_type_id == '2') {
            tmpProvince = item;
            this.setState({
                itemsWards: [],
                items : arrItems
            });

            this.getSubArea(item.id, 'ward', false);
        }

        // phuong/xa
        if(item.area_type_id == '3') {
            tmpWard = item;
            console.log('tmpCity');
            console.log(tmpCity);
            console.log('tmpProvince');
            console.log(tmpProvince);
            console.log('tmpWard');
            console.log(tmpWard);
            await this.props.changeCityAction(tmpCity);
            await this.props.changeProvinceAction(tmpProvince);
            await this.props.changeWardAction(tmpWard);
            await this.props.changeAreaAction(null);
            this.setState({
                changeLocationModalVisible: false
            });


        }
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={this.onPressItem.bind(this, item)}>
                <View>
                    <Text style={[locationStyles.listItem, {color: item.selected ? 'white': '#677897', backgroundColor: item.selected ? '#e62565': 'white'}]}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    onChangeLocationClick = (type) => {
        this.setModalVisible(true);
        switch(type) {
            case 'city':
                this.getSubArea(this.state.city.parent_id, 'city', false);
                break;
            case 'province':
                this.getSubArea(this.state.province.parent_id, 'province', false);
                break;
            case 'ward':
                this.getSubArea(this.state.ward.parent_id, 'ward', false);
                break;
        }
    }

    reloadData = (area) => {
        this.props.changeAreaAction(area);
    }

    _onClose() {
        this.props.changeAreaAction(null);
    }

    getBadgesOfTabs = () => {
        return [this.props.badges[0],this.props.badges[1],this.props.badges[2],this.props.badges[3],this.props.badges[4], 0, 0];
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={[globalStyles.locationHeader]}>
                    <View style={globalStyles.locationHeaderRow}>
                        <TouchableOpacity style={{width: moderateScale(45), flexDirection: 'row', justifyContent: 'center'}} onPress={() => this.onChangeLocationClick('city')}>
                            <Image resizeMode="contain" style={{width: moderateScale(11)}} source={require('../../images/map-pin.png')} />
                        </TouchableOpacity>
                        <Tag onClose={() => this._onClose()} style={globalStyles.locationHeaderFirstItem} isActive={this.props.currentArea !== null && this.props.currentCity.id === this.props.currentArea.id} onPress={() => {this.reloadData(this.props.currentCity)}} label={_.isEmpty(this.props.currentCity) ? 'Tỉnh/Thành phố' : this.props.currentCity.name} />
                        <Tag onClose={() => this._onClose()} style={globalStyles.locationHeaderItem} isActive={this.props.currentArea !== null && this.props.currentProvince.id === this.props.currentArea.id} onPress={() => {this.reloadData(this.props.currentProvince)}} label={_.isEmpty(this.props.currentProvince) ? 'Quận/Huyện' : this.props.currentProvince.name} />
                        <Tag onClose={() => this._onClose()} style={globalStyles.locationHeaderItem} isActive={this.props.currentArea !== null && this.props.currentWard.id === this.props.currentArea.id} onPress={() => {this.reloadData(this.props.currentWard)}} label={_.isEmpty(this.props.currentWard) ? 'Phường/Xã' : this.props.currentWard.name} />
                    </View>
                </View>

                <ScrollableTabView
                    locked={true}
                    renderTabBar={() => <HomeTabBar
                        badges={this.getBadgesOfTabs()}
                        loggedIn={this.props.userInfor !== null}
                        goToLogin={this.goToLogin}
                        navigation={navigate}/>
                    }
                    ref={(tabView) => { this.tabView = tabView}}
                >

                    <TabHot tabLabel="Mới nhất" navigation={this.props.navigation} />
                    <TabNews tabLabel="Tin tức" navigation={this.props.navigation} />
                    <TabService tabLabel="Dịch vụ" navigation={this.props.navigation} />
                    <TabUtilities tabLabel="Tiện ích" navigation={this.props.navigation} />
                    <TabSettings tabLabel="Cài đặt" navigation={this.props.navigation} />
                </ScrollableTabView>

                <Modal animationType="slide" transparent={true} visible={this.state.changeLocationModalVisible} onRequestClose={()=>{}} >
                    <View style={locationStyles.modalBackdrop}>
                        <TouchableOpacity
                            style={locationStyles.closeModalButton}
                            onPress={() => {
                                this.setModalVisible(!this.state.changeLocationModalVisible)
                            }}>
                            <Text style={locationStyles.closeButtonText}>ĐÓNG</Text>
                            <Image resizeMode="contain" style={locationStyles.closeButtonIcon} source={require('../../images/close.png')} />
                        </TouchableOpacity>
                        <View style={locationStyles.modalInner}>
                            <Text style={locationStyles.modalHeader}>{this.state.modalTitle}</Text>
                            <FlatList
                                data={this.state.items}
                                renderItem={({item}) => this.renderItem(item)}
                                keyExtractor={item => item.id} />
                        </View>
                     </View>
                </Modal>

                {/*
                <PushController
                    areaId={this.props.currentWard.id}
                    user={this.props.userInfor}
                    navigation={this.props.navigation}/>
                    */}

                <AppStateComponent />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return  {
        currentCity : state.currentCity,
        currentProvince : state.currentProvince,
        currentWard: state.currentWard,
        currentArea : state.currentArea,
        badges : state.badges,
        userInfor: state.userInfor
    }
}

export default connect(mapStateToProps, actionCreators)(Home);
