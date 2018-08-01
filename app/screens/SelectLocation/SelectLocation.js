//@flow
import React, {Component} from "react";
import {Image, StatusBar, Modal, StyleSheet, Text, TouchableOpacity, FlatList, View, ScrollView} from "react-native";
import MInput from "../../components/MInput";
import MButton from "../../components/MButton";
import Tag from "../../components/Tag";
import styles from './styles';
import loginStyles from '../Login/styles';
import globalStyles from '../../resources/styles';
import _ from 'lodash';
import Api from '../../api/api';
import Util from '../../configs/util';
import Constant from '../../configs/constant';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';

class SelectLocation extends Component {
    constructor(props) {
		super(props);

		this.state = {
            city : this.props.currentCity,
            province : this.props.currentProvince,
            ward : this.props.currentWard,
            changeLocationModalVisible: false,
            modalTitle: '',
            items: [],
            itemsCity : [],
            itemsProvince : [],
            itemsWards : []
		};
	}

    componentWillMount(){
        this.getSubArea('124', 'city', true);
        if (this.props.currentCity != null) {
            this.getSubArea(this.props.currentCity.id, 'province', true);
        }
        if (this.props.currentProvince != null) {
            this.getSubArea(this.props.currentProvince.id, 'ward', true);
        }
    }

    static navigationOptions = {
        header: null
    };

    getSubArea(id, type, init) {
        var $this = this;
        Api.getSubArea(id).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                if(!_.isEmpty(res.javaResponse.areas)) {
                    if(type == 'city') {
                        _.forEach(res.javaResponse.areas, function(val) {
                            val.selected = false;
                            if($this.state.city !== null && val.id == $this.state.city.id) {
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
                            if($this.state.province !== null && val.id == $this.state.province.id) {
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
                            if($this.state.ward !== null && val.id == $this.state.ward.id) {
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

    onPressItem(item) {
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
            this.setState({
                city: item,
                province: null,
                ward: null,
                itemsProvince: [],
                itemsWards: [],
                items : arrItems
            });

            this.getSubArea(item.id, 'province', false);
        }

        // quan/ huyen
        if(item.area_type_id == '2') {
            this.setState({
                province: item,
                ward: null,
                itemsWards: [],
                items : arrItems
            });

            this.getSubArea(item.id, 'ward', false);
        }

        // phuong/xa
        if(item.area_type_id == '3') {
            this.setState({
                ward: item,
                items : arrItems,
                changeLocationModalVisible: false
            });
        }
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={this.onPressItem.bind(this, item)}>
                <Text style={[styles.listItem, {color: item.selected ? 'white': '#677897', backgroundColor: item.selected ? '#e62565': 'white'}]}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    setModalVisible = (visible) => {
        this.setState({changeLocationModalVisible: visible});
    }

    onChangeLocationClick = (type) => {
        switch(type) {
            case 'city':
                this.setModalVisible(true);
                this.setState({modalTitle: 'Chọn Tỉnh/Thành phố', items: this.state.itemsCity});
                break;
            case 'province':
                if (this.state.city == null) {
                    Util.showAlert('Chưa chọn tỉnh/thành phố');
                } else {
                    this.setModalVisible(true);
                    this.setState({modalTitle: 'Chọn Quận/Huyện', items: this.state.itemsProvince});
                }
                break;
            case 'ward':
                if (this.state.province == null) {
                    Util.showAlert('Chưa chọn quận/huyện');
                } else {
                    this.setModalVisible(true);
                    this.setState({modalTitle: 'Chọn Phường/Xã', items: this.state.itemsWards});
                }
                break;
        }
    }

    onClickContinue = () => {
        let userInfor = null;
        this.props.changeCityAction(this.state.city);
        this.props.changeProvinceAction(this.state.province);
        this.props.changeWardAction(this.state.ward);
        this.props.changeAreaAction(null);
        this.props.changeUserInforAction(userInfor);
        if (this.state.city === null) {
            Util.showAlert('Vui lòng chọn tỉnh/thành phố');
        } else if (this.state.province === null) {
            Util.showAlert('Vui lòng chọn quận/huyện');
        } else if (this.state.ward === null) {
            Util.showAlert('Vui lòng chọn phường/xã');
        } else {
            const { navigate } = this.props.navigation;

            Util.setItem('SAVED_CITY', JSON.stringify(this.state.city));
            Util.setItem('SAVED_PROVINCE', JSON.stringify(this.state.province));
            Util.setItem('SAVED_WARD', JSON.stringify(this.state.ward));
            Util.setItem('SAVED_USERINFO', userInfor);

            navigate('Home');
        }
    }

    render() {
        console.log('Render select location');
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <MButton
                        onPress={() => goBack()}
                        style={[styles.backButton,{position: 'absolute', left: moderateScale(10), top: moderateScale(10), zIndex: 2}]}
                        label={'Quay lại'}
                        color={'#000'}
                        leftIcon={require('../../images/back.png')}
                    />
                    <Image style={{width: '100%', height: verticalScale(200)}} resizeMode="cover" source={require('../../images/login-banner.jpg')} />
                    <View style={styles.locationHeader}>
                        <Text style={styles.welcomeText}>Xin chào quý khách, quý khách đang ở địa bàn:</Text>
                        <View style={styles.locationHeaderRow}>
                            <Image resizeMode="contain" style={{width: moderateScale(11)}} source={require('../../images/map-pin.png')} />
                            <Tag style={{marginLeft:moderateScale(10)}} label={this.state.city === null ? 'Tỉnh/Thành phố' : this.state.city.name} onPress={() => this.onChangeLocationClick('city')}/>
                            <Tag style={{marginLeft:moderateScale(10)}} label={this.state.province === null ? 'Quận/Huyện' : this.state.province.name} onPress={() => this.onChangeLocationClick('province')}/>
                            <Tag style={{marginLeft:moderateScale(10)}} label={this.state.ward === null ? 'Phường/Xã' : this.state.ward.name} onPress={() => this.onChangeLocationClick('ward')}/>
                        </View>
                    </View>
                    <View style={styles.innerView}>
                        <Text style={styles.smallText}>Không phải địa bàn trên ?</Text>
                        <Text style={{fontSize: moderateScale(14)}}>
                            Nhập địa bàn bằng tay
                            <Image style={{marginLeft: moderateScale(5),width: moderateScale(16), height: verticalScale(16)}} source={require('../../images/chevron-circle-down.png')}/>
                        </Text>
                        <View style={styles.inputWrap}>
                            <TouchableOpacity style={styles.inputClickZone} onPress={() => this.onChangeLocationClick('city')}>
                            </TouchableOpacity>
                            <MInput
                                label={this.state.city === null ? 'Tỉnh/Thành phố' : this.state.city.name}
                                icon={require('../../images/bank.png')}
                                style={{zIndex: 0, position: 'absolute', bottom: 0,left: 0, right:0}}
                                disabled="true"
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <TouchableOpacity style={styles.inputClickZone} onPress={() => this.onChangeLocationClick('province')}>
                            </TouchableOpacity>
                            <MInput
                                label={this.state.province === null ? 'Quận/Huyện' : this.state.province.name}
                                icon={require('../../images/hotel.png')}
                                disabled="true"
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <TouchableOpacity style={styles.inputClickZone} onPress={() => this.onChangeLocationClick('ward')}>
                            </TouchableOpacity>
                            <MInput
                                label={this.state.ward === null ? 'Phường/Xã' : this.state.ward.name}
                                icon={require('../../images/house.png')}
                                disabled="true"
                            />
                        </View>
                        <MButton
                            style={styles.continueButton}
                            width={moderateScale(188)}
                            label={"TIẾP TỤC"}
                            onPress={this.onClickContinue} />
                        <TouchableOpacity onPress={this.onClickRegister} style={[styles.textIconWrap, styles.signUpButtonWrap]}>
                            <Image style={{width: moderateScale(24)}} resizeMode="contain" source={require('../../images/add.png')}/>
                            <Text style={styles.signUpButton}>Đăng ký tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Modal animationType="slide" transparent={true} visible={this.state.changeLocationModalVisible} onRequestClose={()=>{}} >
                    <View style={styles.modalBackdrop}>
                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => {
                                this.setModalVisible(!this.state.changeLocationModalVisible)
                            }}>
                            <Text style={styles.closeButtonText}>ĐÓNG</Text>
                            <Image resizeMode="contain" style={styles.closeButtonIcon} source={require('../../images/close.png')} />
                        </TouchableOpacity>
                        <View style={styles.modalInner}>
                            <Text style={styles.modalHeader}>{this.state.modalTitle}</Text>
                            <FlatList
                                data={this.state.items}
                                renderItem={({item}) => this.renderItem(item)}
                                keyExtractor={item => item.id} />
                        </View>
                     </View>
                </Modal>
            </View>);
    }
}

function mapStateToProps(state) {
    return  {
        currentCity : state.currentCity,
        currentProvince : state.currentProvince,
        currentWard: state.currentWard
    }
}

export default connect(mapStateToProps, actionCreators)(SelectLocation);
