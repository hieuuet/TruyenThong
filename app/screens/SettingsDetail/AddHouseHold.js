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


export class AddHouseHold extends Component {

    constructor(props) {
		super(props);

		this.state = {
			newUsername: '',
		};
	}

    componentWillMount(){
        // this._getSubArea('124', 'city');
    }

    static navigationOptions = {
        header: null
    };


    _addHousehold() {
        Keyboard.dismiss();
        if(_.isEmpty(this.state.newUsername)) {
            Util.showAlert('Chưa nhập ' + strings.newUsername + '. Vui lòng kiểm tra lại!');
            return;
        }
        Util.showConfirm('Bạn có chắc chắn muốn thêm thành viên vào hộ gia đình?', this.addHousehold.bind(this));
    }

    addHousehold = () => {


        Api.addUserToHousehold( this.state.newUsername).then(res => {
            console.log('res');
            console.log(res);
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                Util.showSuccess('Thêm thành viên vào hộ gia đình thành công.', () => {
                    this.props.navigation.navigate('SettingListAccount');
                });

            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);

                if (res.code === Constant.RESPONSE_CODE.ADD_USER_HOUSEHOLD_EXISTED) {
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
            <ScrollView style={styles.container2} keyboardShouldPersistTaps={'handled'}>
                <Image style={{width: '100%', height: verticalScale(200)}} resizeMode="cover" source={require('../../images/login-banner.jpg')} />
                <View style={styles.innerView}>
                    <MButton
                        onPress={() => goBack()}
                        style={styles.backButton3}
                        label={strings.back}
                        color={'#000'}
                        leftIcon={require('../../images/back.png')}
                    />

                        <MInput
                            label={strings.newUsername}

                            icon={require('../../images/user.png')}
                            value={this.state.newUsername}
                            onChange={(newUsername) => this.setState({newUsername})}
                            type='phone-pad'
                            maxLength={14}
                        />


                        <MButton
                            style={styles.signInButton}
                            label={strings.addHousehold}
                            onPress={() => this._addHousehold()}/>

                </View>

            </ScrollView>);
    }
}

const strings = {
    back: "Quay lại",
    newUsername: "Tài khoản mới",
    addHousehold: 'Thêm thành viên'
};
