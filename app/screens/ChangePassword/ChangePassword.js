//@flow
import React, {Component} from "react";
import {View, ScrollView, Image, StatusBar, StyleSheet, TouchableOpacity, Text, Modal, FlatList, Keyboard} from "react-native";
import MInput from "../../components/MInput";
import MButton from "../../components/MButton";
import styles from './styles';
import Util from '../../configs/util';
import _ from 'lodash';
import Api from '../../api/api';
import Constant from '../../configs/constant';
import ProgressBar from '../../components/ProgressBar';
import MD5 from 'crypto-js/md5';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


export class ChangePassword extends Component {

    constructor(props) {
		super(props);

		this.state = {
			old_password: '',
			password: '',
            repeatpassword: ''
		};
	}

    componentWillMount(){
        // this._getSubArea('124', 'city');
    }

    static navigationOptions = {
        header: null
    };


    _onChangePassPress() {
        Keyboard.dismiss();
        console.log('old_password: ' + this.state.old_password);
        console.log('password: ' + this.state.password);
        console.log('repeatpassword: ' + this.state.repeatpassword);
        if(_.isEmpty(this.state.old_password)) {
            Util.showAlert('Chưa nhập ' + strings.oldpassLabel + '. Vui lòng kiểm tra lại!');
            return;
        }

        if(_.isEmpty(this.state.password)) {
            Util.showAlert('Chưa nhập ' + strings.passLabel + '. Vui lòng kiểm tra lại!');
            return;
        }

        if(_.isEmpty(this.state.repeatpassword)) {
            Util.showAlert('Chưa nhập ' + strings.repeatPassLabel + '. Vui lòng kiểm tra lại!');
            return;
        }

        if(!_.isEqual(this.state.password, this.state.repeatpassword)) {
            Util.showAlert('Mật khẩu nhập không trùng khớp. Vui lòng kiểm tra lại!');
            return;
        }

        console.log('_onChangePassPress');

        let params = {
            old_password: MD5(this.state.old_password),
            new_password: MD5(this.state.password)
        };
        console.log('params');
        console.log(params);

        Api.changePassword(params).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                Util.showSuccess(Constant.MESSAGES.SUCCESS_CHANGE_PASS, () => {
                    this.props.navigation.navigate('Login');
                });

            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
                if (res.code === Constant.RESPONSE_CODE.WRONG_OLD_PASSWORD) {
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
                        label={strings.back}
                        color={'#000'}
                        leftIcon={require('../../images/back.png')}
                    />

                        <MInput
                            label={strings.oldpassLabel}
                            secureTextEntry={true}
                            icon={require('../../images/lock.png')}
                            value={this.state.old_password}
                            onChange={(old_password) => this.setState({old_password})}
                        />
                        <MInput
                            label={strings.passLabel}
                            secureTextEntry={true}
                            icon={require('../../images/lock.png')}
                            value={this.state.password}
                            onChange={(password) => this.setState({password})}
                        />
                        <MInput
                            label={strings.repeatPassLabel}
                            secureTextEntry={true}
                            icon={require('../../images/lock.png')}
                            value={this.state.repeatpassword}
                            onChange={(repeatpassword) => this.setState({repeatpassword})}
                        />

                        <MButton
                            style={styles.signInButton}
                            label={strings.changePass}
                            width={moderateScale(200)}
                            onPress={() => this._onChangePassPress()}/>

                </View>

            </ScrollView>);
    }
}

const strings = {
    back: "Quay lại",
    oldpassLabel: "Mật khẩu cũ",
    passLabel: "Mật khẩu mới",
    repeatPassLabel: 'Xác nhận mật khẩu',
    changePass: 'Thay đổi mật khẩu'
};
