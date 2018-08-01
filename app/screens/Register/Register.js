//@flow
import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, TouchableOpacity, Text, Modal, FlatList, View, ScrollView, Keyboard} from "react-native";
import MInput from "../../components/MInput";
import MButton from "../../components/MButton";
import styles from './styles';
import locationStyles from '../SelectLocation/styles';
import Util from '../../configs/util';
import _ from 'lodash';
import Api from '../../api/api';
import Constant from '../../configs/constant';
import ProgressBar from '../../components/ProgressBar';
import MD5 from 'crypto-js/md5';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


export class Register extends Component {

    constructor(props) {
		super(props);

		this.state = {
			phone: '',
			password: '',
            repeatpassword: '',
			fullname: '',
            email: '',
            city: {},
            province: {},
            ward: {},
            type: '',
            changeLocationModalVisible: false,
            modalTitle: '',
            itemsCity: [],
            itemsProvince: [],
            itemsWards: [],
            isLoading: true
		};

        this.onChangeLocationClick = this.onChangeLocationClick.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);

        this._onSignUpPress = this._onSignUpPress.bind(this);

        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
	}

    focusNextField(id) {
        this.inputs[id].focus();
    }

    componentWillMount(){
        // this._getSubArea('124', 'city');
    }

    state = {
        changeLocationModalVisible: false,
        modalTitle: ''
    }

    static navigationOptions = {
        header: null
    };

    setModalVisible(visible) {
        this.setState({changeLocationModalVisible: visible});
    }

    onChangeLocationClick(type) {
        this.setModalVisible(true);
        switch(type) {
            case 'city':
                this.setState({
                    modalTitle: 'Chọn thành phố',
                    type: 'city'
                });
                if(_.isEmpty(this.state.itemsCity)) {
                    this._getSubArea('124', 'city', true);
                } else {

                }

                break;
            case 'area':
                this.setState({
                    modalTitle: 'Chọn Quận - Huyện',
                    type: 'province'
                });
                if(_.isEmpty(this.state.itemsProvince)) {
                    if(!_.isEmpty(this.state.city)) {
                        this._getSubArea(this.state.city.id, 'province', true);
                    } else {
                        Util.showAlert('Chưa chọn Tỉnh/ Thành phố. Vui lòng kiểm tra lại!');
                        this.setModalVisible(false);
                    }
                } else {

                }
                break;
            case 'district':
                this.setState({
                    modalTitle: 'Chọn Phường - Xã',
                    type: 'ward'
                });
                if(_.isEmpty(this.state.itemsWards)) {
                    if(!_.isEmpty(this.state.province)) {
                        this._getSubArea(this.state.province.id, 'ward', true);
                    } else {
                        Util.showAlert('Chưa chọn Quận/ Huyện. Vui lòng kiểm tra lại!');
                        this.setModalVisible(false);
                    }
                } else {

                }

                break;
        }
    }

    _onSignUpPress() {
        Keyboard.dismiss();
        if(_.isEmpty(this.state.phone)) {
            Util.showAlert('Chưa nhập ' + strings.phoneLabel + '. Vui lòng kiểm tra lại!');
            this.inputs['phone'].focus();
            return;
        }

        if(!Util.isPhoneNumberValid(this.state.phone)) {
            Util.showAlert(strings.phoneLabel + ' không hợp lệ. Vui lòng kiểm tra lại!');
            this.inputs['phone'].focus();
            return;
        }

        if(_.isEmpty(this.state.password)) {
            Util.showAlert('Chưa nhập ' + strings.passLabel + '. Vui lòng kiểm tra lại!');
            this.inputs['password'].focus();
            return;
        }

        if(_.isEmpty(this.state.repeatpassword)) {
            Util.showAlert('Chưa nhập ' + strings.repeatPassLabel + '. Vui lòng kiểm tra lại!');
            this.inputs['repeatPass'].focus();
            return;
        }

        if(!_.isEqual(this.state.password, this.state.repeatpassword)) {
            Util.showAlert('Mật khẩu nhập không trùng khớp. Vui lòng kiểm tra lại!');
            this.inputs['repeatPass'].focus();
            return;
        }

        if(!_.isEmpty(this.state.email)) {
            console.log('email != null');
            if(!Util.isEmailValid(this.state.email)) {
                Util.showAlert(strings.emailLabel + ' không hợp lệ. Vui lòng kiểm tra lại!');
                this.inputs['email'].focus();
                return;
            }
        }

        if(_.isEmpty(this.state.fullname)) {
            Util.showAlert('Chưa nhập ' + strings.nameLabel + '. Vui lòng kiểm tra lại!');
            this.inputs['fullname'].focus();
            return;
        }

        if(_.isEmpty(this.state.city)) {
            Util.showAlert('Chưa chọn Tỉnh/ Thành phố. Vui lòng kiểm tra lại!');
            return;
        }



        if(_.isEmpty(this.state.province)) {
            Util.showAlert('Chưa chọn Quận/ Huyện. Vui lòng kiểm tra lại!');
            return;
        }

        if(_.isEmpty(this.state.ward)) {
            Util.showAlert('Chưa chọn Phường/ Xã. Vui lòng kiểm tra lại!');
            return;
        }

        let params = {
            username: this.state.phone,
            password: MD5(this.state.password),
            area_id: this.state.ward.id,
            name: this.state.fullname,
            email: !_.isEmpty(this.state.email) ? this.state.email : ''
        };


        Api.registerUser(params).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                this.props.navigation.navigate( 'RegisterOtp', {phone : this.state.phone} );
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
                if (res.code === Constant.RESPONSE_CODE.EXIST_USERNAME) {
                    Util.showAlert(res.msg);
                } else if(res.code == Constant.RESPONSE_CODE.BAD_CONTENT) {
                    Util.showAlert(res.msg);
                }
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    _onPress(item, visible) {
        this.setState({changeLocationModalVisible: visible});
        let arrItems = [];
        if(this.state.type == 'city') {
            _.forEach(this.state.itemsCity, function(val) {
                if(val.id == item.id) {
                    val.selected = true;
                } else {
                    val.selected = false;
                }
                arrItems.push(val);
            });
            this.setState({
                itemsCity : arrItems
            });
        } else if(this.state.type == 'province') {
            _.forEach(this.state.itemsProvince, function(val) {
                if(val.id == item.id) {
                    val.selected = true;
                } else {
                    val.selected = false;
                }
                arrItems.push(val);
            });
            this.setState({
                itemsProvince : arrItems
            });
        } else if(this.state.type == 'ward') {
            _.forEach(this.state.itemsWards, function(val) {
                if(val.id == item.id) {
                    val.selected = true;
                } else {
                    val.selected = false;
                }
                arrItems.push(val);
            });
            this.setState({
                itemsWards : arrItems
            });
        }

        // tinh/ thanh pho
        if(item.area_type_id == '1') {
            this.setState({
                city: item,
                province: {},
                ward: {},
                itemsProvince: [],
                itemsWards: []
            });
        }

        // quan/ huyen
        if(item.area_type_id == '2') {
            this.setState({
                province: item,
                ward: {},
                itemsWards: []
            });
        }

        // phuong/ xa
        if(item.area_type_id == '3') {
            this.setState({
                ward: item
            });
        }
    }

    _renderItem(item) {
        return (
            <TouchableOpacity onPress={this._onPress.bind(this, item, !this.state.changeLocationModalVisible)}>
                <View>
                    <Text style={[locationStyles.listItem, {color: item.selected ? 'white': '#677897', backgroundColor: item.selected ? '#e62565': 'white'}]}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _getSubArea(id, type, isLoading) {
        this.setState({
            isLoading: isLoading
        });
        Api.getSubArea(id).then(res => {

            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                if(!_.isEmpty(res.javaResponse.areas)) {
                    _.forEach(res.javaResponse.areas, function(val) {
                        val.selected = false;
                    });
                    if(type == 'city') {
                        this.setState({
                            itemsCity : res.javaResponse.areas,
                            isLoading: false
                        });
                        console.log(res.javaResponse.areas);
                    }
                    if(type == 'province') {
                        this.setState({
                            itemsProvince : res.javaResponse.areas,
                            isLoading: false
                        });
                        console.log(res.javaResponse.areas);
                    }

                    if(type == 'ward') {
                        this.setState({
                            itemsWards : res.javaResponse.areas,
                            isLoading: false
                        });
                        console.log(res.javaResponse.areas);
                    }
                } else {
                    this.setState({
                        isLoading: false
                    });
                }
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <ScrollView style={[styles.container], {zIndex: 5}, {backgroundColor: '#FFFFFF'}} keyboardShouldPersistTaps={'handled'}>
                <Image style={{width: '100%', height: verticalScale(200)}} resizeMode="cover" source={require('../../images/login-banner.jpg')} />
                <View style={styles.innerView}>
                    <MButton
                        onPress={() => goBack()}
                        style={styles.backButton}
                        label={strings.back}
                        color={'#000'}
                        leftIcon={require('../../images/back.png')}
                    />
                      <ScrollView style={{zIndex: 5}} keyboardShouldPersistTaps={'handled'}>
                        <MInput
                            label={strings.phoneLabel + ' *'}
                            icon={require('../../images/dial-pad.png')}
                            value={this.state.phone}
                            onChange={(phone) => this.setState({phone})}
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
                            label={strings.passLabel + ' *'}
                            secureTextEntry={true}
                            icon={require('../../images/lock.png')}
                            value={this.state.password}
                            onChange={(password) => this.setState({password})}
                            refName={ input => {
                                this.inputs['password'] = input;
                              }}
                              submitEdit={() => {
                                  this.focusNextField('repeatPass');
                              }}
                        />
                        <MInput
                            label={strings.repeatPassLabel + ' *'}
                            secureTextEntry={true}
                            icon={require('../../images/lock.png')}
                            value={this.state.repeatpassword}
                            onChange={(repeatpassword) => this.setState({repeatpassword})}
                            refName={ input => {
                                this.inputs['repeatPass'] = input;
                              }}
                              submitEdit={() => {
                                  this.focusNextField('email');
                              }}
                        />
                        <MInput
                            label={strings.emailLabel}
                            icon={require('../../images/mail.png')}
                            value={this.state.email}
                            onChange={(email) => this.setState({email})}
                            refName={ input => {
                                this.inputs['email'] = input;
                              }}
                              submitEdit={() => {
                                  this.focusNextField('fullname');
                              }}
                        />
                        <MInput
                            label={strings.nameLabel + ' *'}
                            icon={require('../../images/user.png')}
                            value={this.state.fullname}
                            onChange={(fullname) => this.setState({fullname})}
                            refName={ input => {
                                this.inputs['fullname'] = input;
                              }}
                        />

                        <View style={locationStyles.inputWrap}>
                            <TouchableOpacity
                                style={locationStyles.inputClickZone}
                                onPress={() => this.onChangeLocationClick('city')}
                            ></TouchableOpacity>
                            <MInput
                                label={"Tỉnh - Thành" + ' *'}
                                icon={require('../../images/bank.png')}
                                style={{zIndex: 0, position: 'absolute', bottom: 0,left: 0, right:0}}
                                value={this.state.city.name}
                                disabled="true"
                            />
                        </View>
                        <View style={locationStyles.inputWrap}>
                            <TouchableOpacity
                                style={locationStyles.inputClickZone}
                                onPress={() => this.onChangeLocationClick('area')}
                            ></TouchableOpacity>
                            <MInput
                                label={"Quận - Huyện" + ' *'}
                                icon={require('../../images/hotel.png')}
                                disabled="true"
                                value={this.state.province.name}
                            />
                        </View>

                        <View style={locationStyles.inputWrap}>
                            <TouchableOpacity
                                style={locationStyles.inputClickZone}
                                onPress={() => this.onChangeLocationClick('district')}
                            ></TouchableOpacity>
                            <MInput
                                label={"Phường - Xã" + ' *'}
                                icon={require('../../images/house.png')}
                                disabled="true"
                                value={this.state.ward.name}
                            />
                        </View>
                      </ScrollView>
                        <MButton
                            style={styles.signInButton}
                            label={strings.signUp}
                            onPress={this._onSignUpPress}/>

                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.changeLocationModalVisible}
                    onRequestClose={()=>{}}
                >

                    <View style={locationStyles.modalBackdrop}>

                        <TouchableOpacity
                            style={locationStyles.closeModalButton}
                            onPress={() => {
                            this.setModalVisible(!this.state.changeLocationModalVisible)
                            }}>
                            <Text style={locationStyles.closeButtonText}>ĐÓNG</Text>
                            <Image resizeMode="contain" style={locationStyles.closeButtonIcon} source={require('../../images/close.png')} />
                        </TouchableOpacity>

                        {
                            (!this.state.isLoading && (this.state.itemsCity || this.state.itemsProvince || this.state.itemsWards))
                            &&
                            <View style={locationStyles.modalInner}>

                                <Text style={locationStyles.modalHeader}>{this.state.modalTitle}</Text>

                                    <FlatList
                                        data={this.state.type == 'city' ? this.state.itemsCity : (this.state.type == 'province' ? this.state.itemsProvince : this.state.itemsWards)}
                                        renderItem={({item}) =>
                                            this._renderItem(item)
                                        }
                                        keyExtractor={item => item.id}
                                    />
                            </View>
                            ||
                            <View style={styles.progressBar}><ProgressBar /></View>
                        }
                     </View>
                </Modal>
            </ScrollView>);
    }
}

const strings = {
    back: "Quay lại",
    phoneLabel: "Số điện thoại",
    nameLabel: "Họ tên",
    passLabel: "Mật khẩu",
    repeatPassLabel: 'Xác nhận mật khẩu',
    emailLabel: 'Email',
    signUp: "ĐĂNG KÝ",
};
