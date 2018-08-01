//@flow
import React, {Component} from "react";
import {View, ScrollView, TouchableOpacity, Image, StatusBar, StyleSheet, Text, Platform, BackHandler, Keyboard} from "react-native";
import MInput from "../../components/MInput";
import MButton from "../../components/MButton";
import LoadingSpinner from '../../components/LoadingSpinner';
import styles from './styles';
import Util from '../../configs/util';
import Constant from '../../configs/constant';
import Api from '../../api/api';
import DeviceInfo from 'react-native-device-info';
import MD5 from 'crypto-js/md5';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';
import _ from 'lodash';

import IJKPlayer from '../../configs/IJKPlayer';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class Login extends Component {
    constructor(props) {
		super(props);

		this.state = {
			// username: '0902111111',
			// password: '1234567',
            username: '',
			password: ''
		};

        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};

	}

    focusNextField(id) {
        this.inputs[id].focus();
    }

    static navigationOptions = {
        header: null
    };

    _submitLogin = () => {
        var auth = {
            deviceType : (Platform.OS === 'ios') ? 0 : 1,
            deviceModel: DeviceInfo.getModel(),
            deviceVersion: DeviceInfo.getSystemVersion(),
            devicePlatform: Platform.OS,
            deviceId: DeviceInfo.getUniqueID(),
            username: this.state.username,
            password: MD5(this.state.password)
        };

        this.setState({loading : true});
        Api.checkLogin(auth).then(rs => {
            this.setState({loading : false});
            const { navigate } = this.props.navigation;

            if (rs.code === 'SUCCESS') {

                console.log('result after login success');
                console.log(rs);

                let userInfor = {};
                if(!_.isEmpty(rs.javaResponse.full_name)) {
                    userInfor.full_name = rs.javaResponse.full_name;
                }
                if(!_.isEmpty(rs.javaResponse.phone_number)) {
                    userInfor.phone_number = rs.javaResponse.phone_number;
                }
                if(!_.isEmpty(rs.javaResponse.areas)) {
                    userInfor.areas = rs.javaResponse.areas;
                }
                if(!_.isEmpty(rs.javaResponse.mcu_id)) {
                    userInfor.mcu_id = rs.javaResponse.mcu_id;
                }
                if(!_.isEmpty(rs.javaResponse.is_household_owner)) {
                    userInfor.is_household_owner = rs.javaResponse.is_household_owner;
                }
                console.log('this.props.changeUserInforAction(userInfor)');
                this.props.changeUserInforAction(userInfor);
                Util.setItem('SAVED_USERINFO', JSON.stringify(userInfor));

                if (rs.javaResponse.areas.length < 4) {
                    Util.showAlert(Constant.MESSAGES.INVALID_AREA);
                } else {
                    let city = rs.javaResponse.areas[1];
                    let province = rs.javaResponse.areas[2];
                    let ward = rs.javaResponse.areas[3];

                    this.props.changeCityAction(city);
                    this.props.changeProvinceAction(province);
                    this.props.changeWardAction(ward);

                    Util.setItem('SAVED_CITY', JSON.stringify(city));
                    Util.setItem('SAVED_PROVINCE', JSON.stringify(province));
                    Util.setItem('SAVED_WARD', JSON.stringify(ward));

                    navigate('Home');
                }
            } else {
                Util.handleDefaultResponse(rs, navigate);
                if (rs.code === 'INCORRECT_AUTHEN') {
                    Util.showAlert(rs.msg);
                }
            }
        }).catch (error => {
            this.setState({loading : false});
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    onClickLogin = () => {
        Keyboard.dismiss();
        if(_.isEmpty(this.state.username)) {
            Util.showAlert('Chưa nhập số điện thoại. Vui lòng kiểm tra lại!');
            this.inputs['phone'].focus();
            return;
        }
        if(_.isEmpty(this.state.password)) {
            Util.showAlert('Chưa nhập mật khẩu. Vui lòng kiểm tra lại!');
            this.inputs['password'].focus();
            return;
        }
        Util.getItem('TOKEN').then(token => {
            if (!token) {
                var deviceId = DeviceInfo.getUniqueID();
                Api.getAuthToken(deviceId).then(res => {
                    if (res.code !== 'SUCCESS') {
                        Util.exitApp();
                    } else {
                        this._submitLogin();
                    }
                }).catch(error => {
                    Util.exitApp();
                });
            } else {
                this._submitLogin();
            }
        });
    }

    onClickRegister = () => {
        Util.getItem('TOKEN').then(token => {
            const { navigate } = this.props.navigation;
            if (!token) {
                var deviceId = DeviceInfo.getUniqueID();
                Api.getAuthToken(deviceId).then(res => {
                    if (res.code !== 'SUCCESS') {
                        Util.exitApp();
                    } else {
                        navigate('Register');
                    }
                }).catch(error => {
                    Util.exitApp();
                });
            } else {
                navigate('Register');
            }
        });
    }

    onClickIgnoreLogin = () => {
        Util.getItem('TOKEN').then(token => {
            const { navigate } = this.props.navigation;
            if (!token) {
                var deviceId = DeviceInfo.getUniqueID();
                Api.getAuthToken(deviceId).then(res => {
                    if (res.code !== 'SUCCESS') {
                        Util.exitApp();
                    } else {
                        navigate('SelectLocation');
                    }
                }).catch(error => {
                    Util.exitApp();
                });
            } else {
                navigate('SelectLocation');
            }
        });
    }

    onClickPlay = () => {
        if(Platform.OS === 'ios') {

        } else {
            IJKPlayer.show('Awesome', IJKPlayer.SHORT);
        }
    }

    render() {
        console.log('Render Login');

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                { (this.state.loading) && <LoadingSpinner hasBackground={true}/> }
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    {/*
                    <Image style={{width: '100%', height: 220, marginTop: -20}} resizeMode="cover" source={require('../../images/login-banner.jpg')} />
                    */}
                    <Image style={{width: '100%', height: verticalScale(220), marginTop: -moderateScale(20)}} resizeMode="cover" source={require('../../images/login-banner.jpg')} />
                    <View style={styles.innerView}>
                        <MInput
                            label={strings.phoneLabel}
                            icon={require('../../images/dial-pad.png')}
                            onChange={username => this.setState({username})}
                            value={this.state.username}
                            type='phone-pad'
                            maxLength={14}
                            refName={ input => {
                                this.inputs['phone'] = input;
                            }}
                            submitEdit={() => {
                                this.focusNextField('password');
                            }}
                            returnKeyType='done'
                        />
                        <MInput
                            label={strings.passLabel}
                            secureTextEntry={true}
                            icon={require('../../images/lock.png')}
                            onChange={(password) => this.setState({password})}
                            value={this.state.password}
                            refName={ input => {
                                this.inputs['password'] = input;
                            }}
                            submitEdit={this.onClickLogin}

                        />
                        <MButton
                            style={styles.signInButton}
                            width={moderateScale(188)}
                            label={strings.signIn}
                            onPress={this.onClickLogin}/>

                        <TouchableOpacity style={styles.textIconWrap} onPress={this.onClickIgnoreLogin}>
                            <Text style={styles.skipSignin}>{strings.skipSignin}</Text>
                            <Image style={{width: moderateScale(24)}} resizeMode="contain" source={require('../../images/arrow-right.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onClickRegister} style={[styles.textIconWrap, {marginTop: moderateScale(80)}]}>
                            <Text style={styles.signUpButton}>{strings.signUpButtonText}</Text>
                            <Image style={{width: moderateScale(24)}} resizeMode="contain" source={require('../../images/add.png')}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return  {
        currentCity : state.currentCity,
        currentProvince : state.currentProvince,
        currentWard: state.currentWard,
        userInfor: state.userInfor
    }
}

export default connect(mapStateToProps, actionCreators)(Login);

const strings = {
    phoneLabel: "Số điện thoại",
    passLabel: "Mật khẩu",
    signIn: "ĐĂNG NHẬP",
    skipSignin: "Bỏ qua đăng nhập",
    signUpButtonText: "Đăng ký tài khoản"
};
