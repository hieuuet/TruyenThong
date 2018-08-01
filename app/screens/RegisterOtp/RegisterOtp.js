//@flow
import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, TouchableOpacity, Text, Modal, FlatList, View, ScrollView} from "react-native";
import MInput from "../../components/MInput";
import MButton from "../../components/MButton";
import styles from './styles';
import locationStyles from '../SelectLocation/styles';
import Util from '../../configs/util';
import _ from 'lodash';
import Api from '../../api/api';
import Constant from '../../configs/constant';
import ProgressBar from '../../components/ProgressBar';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';

export class RegisterOtp extends Component {

    constructor(props) {
		super(props);

		this.state = {
			username: this.props.navigation.state.params.phone,
			otp: ''
		};

        this.inputs = {};
	}

    static navigationOptions = {
        header: null
    };

    onVerifyOtp = () => {
        if(_.isEmpty(this.state.otp)) {
            Util.showAlert('Chưa nhập mã bảo mật. Vui lòng kiểm tra lại');
            this.inputs['otp'].focus();
            return;
        }

        var username = this.state.username;
        var otp = this.state.otp;

        Api.verifyRegisterOtp(username, otp).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                Util.showSuccess(Constant.MESSAGES.SUCCESS_REGISTER, () => {
                    this.props.navigation.navigate( 'Login' );
                });
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
                if (res.code === Constant.RESPONSE_CODE.MAX_TRY) {
                    Util.showAlert(res.msg);
                } else if(res.code == Constant.RESPONSE_CODE.WRONG_OTP) {
                    Util.showAlert(res.msg);
                }
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
                <Image style={{width: '100%', height: verticalScale(200)}} resizeMode="cover" source={require('../../images/login-banner.jpg')} />
                <View style={styles.innerView}>
                    <MButton
                        onPress={() => goBack()}
                        style={styles.backButton}
                        label={'Quay lại'}
                        color={'#000'}
                        leftIcon={require('../../images/back.png')}
                    />

                    <MInput
                        label={'Mã xác thực *'}
                        icon={require('../../images/dial-pad.png')}
                        value={this.state.otp}
                        onChange={otp => this.setState({otp})}
                        type='phone-pad'
                        maxLength={6}
                        refName={ input => {
                            this.inputs['otp'] = input;
                        }}
                        returnKeyType='done'
                    />

                    <MButton
                        style={styles.signInButton}
                        label={'Xác thực'}
                        onPress={this.onVerifyOtp} />
                </View>
            </ScrollView>
        );
    }
}
