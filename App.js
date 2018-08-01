import React from 'react';
import { StyleSheet, Text, View, Easing, Animated, Image, BackHandler, Platform, AppState } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './app/screens/Login/Login';
import { Register } from './app/screens/Register/Register';
import { RegisterOtp } from './app/screens/RegisterOtp/RegisterOtp';
import { ChangePassword } from './app/screens/ChangePassword/ChangePassword';
import Home from './app/screens/Home/Home';
import Article from './app/screens/Article/Article';
import ArticleDetail from './app/screens/Article/ArticleDetail';
import PaymentForm from './app/screens/PaymentForm/PaymentForm';
import PaymentLocalTokenForm from './app/screens/PaymentForm/PaymentLocalTokenForm';
import Payment3DSecure from './app/screens/PaymentForm/Payment3DSecure';
import { SurveyDetail } from './app/screens/SurveyDetail/SurveyDetail';
import SelectLocation from './app/screens/SelectLocation/SelectLocation';
import SettingAbout from './app/screens/SettingsDetail/SettingAbout';
import SettingSupport from './app/screens/SettingsDetail/SettingSupport';
import PayInternet from './app/screens/Utilities/PayInternet';
import PayTelevision from './app/screens/Utilities/PayTelevision';
import PayPostpaidMobile from './app/screens/Utilities/PayPostpaidMobile';
import PayPrepaidMobile from './app/screens/Utilities/PayPrepaidMobile';
import PayFlight from './app/screens/Utilities/PayFlight';
import PayRailway from './app/screens/Utilities/PayRailway';
import PayAssurance from './app/screens/Utilities/PayAssurance';
import DoorsList from './app/screens/Utilities/DoorsList';
import DoorDetail from './app/screens/Utilities/DoorDetail';
import DoorToggle from './app/screens/Utilities/DoorToggle';
import CameraList from './app/screens/Utilities/CameraList';
import CameraView from './app/screens/Utilities/CameraView';
import PlumberFix from './app/screens/Utilities/PlumberFix';
import HomeScreen from './app/screens/HomeScreen';
import SettingListAccount from './app/screens/SettingsDetail/SettingListAccount';
import {AddHouseHold} from './app/screens/SettingsDetail/AddHouseHold';
import LoadingSpinner from './app/components/LoadingSpinner';
import Util from './app/configs/util';
import Api from './app/api/api';
import Constant from './app/configs/constant';
import _ from 'lodash';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import * as actionCreators from './app/redux/actionCreators';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn : false,
            ready : false
        };

        console.log('App initialize ');
    }

    componentWillMount() {
        this.init();
    }

    init = async () => {
        let $this = this;

        let savedCityStr = await Util.getItem('SAVED_CITY');
        if (savedCityStr !== null) {
            if(!_.isEmpty(savedCityStr)) {
                var savedCity = JSON.parse(savedCityStr);
                store.dispatch(actionCreators.changeCityAction(savedCity));
            }
        }

        let savedProvinceStr = await Util.getItem('SAVED_PROVINCE');
        if (savedProvinceStr !== null) {
            if(!_.isEmpty(savedProvinceStr)) {
                var savedProvince = JSON.parse(savedProvinceStr);
                store.dispatch(actionCreators.changeProvinceAction(savedProvince));
            }
        }

        let savedWardStr = await Util.getItem('SAVED_WARD');
        if (savedWardStr !== null) {
            if(!_.isEmpty(savedWardStr)) {
                var savedWard = JSON.parse(savedWardStr);
                store.dispatch(actionCreators.changeWardAction(savedWard));
            }
        }

        let savedUserInfoStr = await Util.getItem('SAVED_USERINFO');
        if (savedUserInfoStr !== null) {
            if(!_.isEmpty(savedUserInfoStr)) {
                var savedUserInfo = JSON.parse(savedUserInfoStr);
                store.dispatch(actionCreators.changeUserInforAction(savedUserInfo));
            }
        }

        let token = await Util.getItem('TOKEN');
        if (token !== null) {
            let configs = await Api.getAppConfigs();
            if (typeof configs == 'undefined' || configs.code !== 'SUCCESS') {
                Util.alertFailToInit();
            } else {
                if (configs.javaResponse.version != DeviceInfo.getVersion()) {
                    let appUrl = Platform.select({
                        ios: configs.javaResponse.ios_url,
                        android: configs.javaResponse.android_url
                    });

                    if (configs.javaResponse.force_update == '1') {
                        Util.alertToUpdate(true, appUrl);
                    } else {
                        Util.alertToUpdate(false, appUrl);
                        Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                        if (savedWardStr !== null) {
                            $this.setState({loggedIn : true, ready : true});
                        } else {
                            $this.setState({loggedIn : false, ready : true});
                        }
                    }
                } else {
                    Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                    if (savedWardStr !== null) {
                        $this.setState({loggedIn : true, ready : true});
                    } else {
                        $this.setState({loggedIn : false, ready : true});
                    }
                }
            }
        } else {
            var deviceId = DeviceInfo.getUniqueID();
            let res = await Api.getAuthToken(deviceId);
            if (typeof res == 'undefined' || res.code !== 'SUCCESS') {
                Util.alertFailToInit();
            } else {
                let configs = await Api.getAppConfigs();
                if (typeof configs == 'undefined' || configs.code !== 'SUCCESS') {
                    Util.alertFailToInit();
                } else {
                    if (configs.javaResponse.version != DeviceInfo.getVersion()) {
                        let appUrl = Platform.select({
                            ios: configs.javaResponse.ios_url,
                            android: configs.javaResponse.android_url
                        });

                        if (configs.javaResponse.force_update == '1') {
                            Util.alertToUpdate(true, appUrl);
                        } else {
                            Util.alertToUpdate(false, appUrl);
                            Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                            $this.setState({loggedIn : false, ready : true});
                        }
                    } else {
                        Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                        $this.setState({loggedIn : false, ready : true});
                    }
                }
            }
        }
    }

    render() {
        let Routes = null;
        let TruyenThongApp = null;

        if (!this.state.ready) {

            {/*
            if(Platform.OS === 'ios') {
              return (
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={require('./app/images/splash.png')} resizeMode="cover" />
                  </View>
              );
            } else {
              return null;
            }
            */}
            return <LoadingSpinner hasBackground={false}/>


        } else  if (this.state.loggedIn) {
            Routes = {
                Home: {screen: Home},
                Login: {screen: Login},
                SurveyDetail: {screen: SurveyDetail},
                Article: {screen: Article},
                ArticleDetail: {screen: ArticleDetail},
                SelectLocation: {screen: SelectLocation},
                Register: {screen: Register},
                RegisterOtp: {screen: RegisterOtp},
                ChangePassword: {screen: ChangePassword},
                HomeScreen: {screen: HomeScreen},
                PaymentForm: {screen: PaymentForm},
                PaymentLocalTokenForm: {screen: PaymentLocalTokenForm},
                Payment3DSecure: {screen: Payment3DSecure},
                SettingAbout: {screen: SettingAbout},
                SettingSupport: {screen: SettingSupport},
                PayInternet: {screen: PayInternet},
                PayPostpaidMobile: {screen: PayPostpaidMobile},
                PayPrepaidMobile: {screen: PayPrepaidMobile},
                PayFlight: {screen: PayFlight},
                PayRailway: {screen: PayRailway},
                PayAssurance: {screen: PayAssurance},
                PayTelevision: {screen: PayTelevision},
                DoorsList: {screen: DoorsList},
                DoorDetail: {screen: DoorDetail},
                DoorToggle: {screen: DoorToggle},
                CameraList: {screen: CameraList},
                CameraView: {screen: CameraView},
                PlumberFix: {screen: PlumberFix},
                SettingListAccount: {screen: SettingListAccount},
                AddHouseHold: {screen: AddHouseHold}
            };
            TruyenThongApp = StackNavigator(Routes);
            return (
                <Provider store={store}>
                    <TruyenThongApp ref={nav => {
                        BackHandler.addEventListener('hardwareBackPress', function() {
                            var routeIndex = nav.state.nav.index;
                            var routeName = nav.state.nav.routes[routeIndex].routeName;
                            if (routeName == 'Home' || routeName == 'Login') {
                                Util.showConfirm(Constant.MESSAGES.CONFIRM_EXIT_TITLE, function() {
                                    BackHandler.exitApp();
                                });
                                return true;
                            }
                            return false;
                        });
                    }}/>
                </Provider>
            );
        } else {
            Routes = {
                Login: {screen: Login},
                Home: {screen: Home},
                SurveyDetail: {screen: SurveyDetail},
                Article: {screen: Article},
                ArticleDetail: {screen: ArticleDetail},
                SelectLocation: {screen: SelectLocation},
                Register: {screen: Register},
                RegisterOtp: {screen: RegisterOtp},
                ChangePassword: {screen: ChangePassword},
                HomeScreen: {screen: HomeScreen},
                PaymentForm: {screen: PaymentForm},
                PaymentLocalTokenForm: {screen: PaymentLocalTokenForm},
                Payment3DSecure: {screen: Payment3DSecure},
                SettingAbout: {screen: SettingAbout},
                SettingSupport: {screen: SettingSupport},
                PayInternet: {screen: PayInternet},
                PayPostpaidMobile: {screen: PayPostpaidMobile},
                PayPrepaidMobile: {screen: PayPrepaidMobile},
                PayFlight: {screen: PayFlight},
                PayRailway: {screen: PayRailway},
                PayAssurance: {screen: PayAssurance},
                PayTelevision: {screen: PayTelevision},
                DoorsList: {screen: DoorsList},
                DoorDetail: {screen: DoorDetail},
                DoorToggle: {screen: DoorToggle},
                CameraList: {screen: CameraList},
                CameraView: {screen: CameraView},
                PlumberFix: {screen: PlumberFix},
                SettingListAccount: {screen: SettingListAccount},
                AddHouseHold: {screen: AddHouseHold}
            };
            TruyenThongApp = StackNavigator(Routes);
            return (
                <Provider store={store}>
                    <TruyenThongApp ref={nav => {
                        BackHandler.addEventListener('hardwareBackPress', function() {
                            var routeIndex = nav.state.nav.index;
                            var routeName = nav.state.nav.routes[routeIndex].routeName;
                            if (routeName == 'Home' || routeName == 'Login') {
                                Util.showConfirm(Constant.MESSAGES.CONFIRM_EXIT_TITLE, function() {
                                    BackHandler.exitApp();
                                });
                                return true;
                            }
                            return false;
                        });
                    }}/>
                </Provider>
            );
        }
    }
}
