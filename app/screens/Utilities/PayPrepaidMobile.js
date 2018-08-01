//@flow
import React, {Component} from "react";
import {View, Image, Text, TextInput, TouchableOpacity, ScrollView, Picker, Keyboard} from "react-native";
import {Select, Option} from "react-native-chooser";
import MSelect from '../../components/MSelect';
import MCheckbox from '../../components/MCheckbox';
import MCheckbox2 from '../../components/MCheckbox2';
import CreditCard from '../../components/CreditCard';
import MButton from '../../components/MButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';
import Util from '../../configs/util';
import DeviceInfo from 'react-native-device-info';
import Constant from '../../configs/constant';
import _ from 'lodash';

import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class PayPrepaidMobile extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            billingCode : '',
            amount : 10000,
            apiOperation: 'PAY',
            formattedAmount : '10,000 đ',
            additionalData : '',
            loading : false,
            showAgreement : true,
            cardOptions : [
                { value: 'AtmCard', label: 'Thẻ nội địa'},
                { value: 'CreditCard', label: 'Thẻ quốc tế'}
            ],
            merchant_id : ''
        };
    }

    componentWillMount() {
        Util.getItem('SAVED_CONFIGS', true).then(configs => {
            this.setState({
                merchant_id : configs.merchant_id
            });
        });

        var cardOptions = this.state.cardOptions;
        Api.getPayTokens().then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                console.log('res getPayTokens');
                console.log(res);
                for (var i=0; i<res.javaResponse.tokens.length; i++) {
                    var token = res.javaResponse.tokens[i];
                    cardOptions.push({
                        value: token.token,
                        label: token.scheme + ' (' + token.number + ')'
                    });
                }
                this.setState({cardOptions});
            }
        }).catch (error => {
        });
    }

    normalizeIsdn = (isdn) => {
        if (isdn != null) {
			isdn = isdn.replace(/ /g, '');
			if (_.startsWith(isdn, '+84')) {
				return isdn.replace("+84", "");
			} else if (_.startsWith(isdn, '84')) {
				return isdn.replace("84", "");
			} else if (_.startsWith(isdn, '0')) {
				return isdn.replace("0", "");
			} else {
				return isdn;
			}
		}
		return null;
    }

    startWithOneOf = (prefixes, str) => {
        for (var i=0; i<prefixes.length; i++) {
            if (_.startsWith(str, prefixes[i])) {
                return true;
            }
        }
        return false;
    }

    getServiceTypeFromBillingCode = (isdn) => {
        if (_.isNaN(isdn)) {
            return null;
        }

        if (isdn.length == 9) {
            if (this.startWithOneOf(['90', '93', '89'], isdn)) {
                //MOBIFONE
                return 'VMSTOPUP';
            } else if (this.startWithOneOf(['96', '97', '98', '86'], isdn)) {
                // VIETTEL
                return 'VTLTOPUP';
            } else if (this.startWithOneOf(['91', '94', '88'], isdn)) {
                // VINAPHONE
                return 'VNPTOPUP';
            } else if (this.startWithOneOf(['99'], isdn)) {
                //GMOBILE
                return 'BELTOPUP';
            }
        } else if (isdn.length == 10) {
            if (this.startWithOneOf(['120', '121', '122', '126', '128'], isdn)) {
                //MOBIFONE
                return 'VMSTOPUP';
            } else if (this.startWithOneOf(['162', '163', '164', '165', '166', '167', '168', '169'], isdn)) {
                // VIETTEL
                return 'VTLTOPUP';
            } else if (this.startWithOneOf(['123', '124', '125', '127', '129'], isdn)) {
                // VINAPHONE
                return 'VNPTOPUP';
            } else if (this.startWithOneOf(['199'], isdn)) {
                //GMOBILE
                return 'BELTOPUP';
            }
        }

        return null;
    }

    getDescription = (serviceCode, billingCode, amount) => {
        switch (serviceCode) {
            case 'VMSTOPUP':
                return 'Nạp tiền di động MobiFone trả trước';
            case 'VTLTOPUP':
                return 'Nạp tiền di động Viettel trả trước';
            case 'VNPTOPUP':
                return 'Nạp tiền di động Vinaphone trả trước';
            case 'BELTOPUP':
                return 'Nạp tiền di động GMobile trả trước';
        }
        return '';
    }

    onPay = () => {
        Keyboard.dismiss();
        var billingCode = this.state.billingCode.trim();
        billingCode = this.normalizeIsdn(billingCode);
        var serviceCode = this.getServiceTypeFromBillingCode(billingCode);
        var serviceType = 'TOPUP';

        if(_.isEmpty(billingCode)) {
          Util.showAlert('Chưa nhập số điện thoại. Vui lòng kiểm tra lại!');
          return;
        }

        if (serviceCode == null) {
            Util.showAlert('Số điện thoại không đúng định dạng hoặc nhà mạng không được hỗ trợ');
            return;
        }
        if (billingCode == '' || this.state.amount == 0) {
            Util.showAlert('Không có thông tin giao dịch. Vui lòng kiểm tra lại');
            return;
        }

        var cardType = this.refs.cardType.getValue();
        if (cardType == 'CreditCard' || cardType == 'AtmCard') {
            const deviceId = DeviceInfo.getUniqueID();
            const enable3DSecure = cardType == 'CreditCard' ? 'true' : 'false';

            let order = {
                cardType : cardType,
                amount : this.state.amount,
                apiOperation : this.state.apiOperation,
                enable3DSecure : enable3DSecure,
                deviceId: deviceId,
                serviceType: serviceType,
                serviceCode: serviceCode,
                customerCode: '0' + billingCode,
                des : this.getDescription(serviceCode, '0' + billingCode, this.state.amount)
            };

            this.setState({loading : true});
            Api.initPayment(order).then(res => {
                this.setState({loading : false});
                if (res.code === 'SUCCESS') {
                    var fullOrder = order;
                    fullOrder.dataKey = res.javaResponse.dataKey;
                    fullOrder.napasKey = res.javaResponse.napasKey;
                    fullOrder.clientIp = res.javaResponse.clientIp;
                    fullOrder.orderId = res.javaResponse.orderId;
                    fullOrder.orderReference = this.state.merchant_id + '|' + serviceCode + '|0' + billingCode + '|' + serviceType;
                    this.props.navigation.navigate('PaymentForm', {order : fullOrder});
                } else {
                    const { navigate } = this.props.navigation;
                    Util.handleDefaultResponse(res, navigate);
                }
            }).catch (error => {
                this.setState({loading : false});
                Util.showAlert(Constant.MESSAGES.EXCEPTION);
            });
        } else {
            const deviceId = DeviceInfo.getUniqueID();
            let order = {
                payToken : cardType,
                amount : this.state.amount,
                serviceType: serviceType,
                serviceCode: serviceCode,
                customerCode: '0' + billingCode,
                des : this.getDescription(serviceCode, '0' + billingCode, this.state.amount)
            };

            this.setState({loading : true});
            Api.payWithToken(order).then(res => {
                console.log(res);
                this.setState({loading : false});

                if (res.code === 'SUCCESS') {
                    if(!_.isEmpty(res.javaResponse.htmlBodyContent)) {
                        this.props.navigation.navigate('Payment3DSecure', {htmlBodyContent : res.javaResponse.htmlBodyContent});
                    } else if(!_.isEmpty(res.javaResponse.orderId)) {
                        order.dataKey = res.javaResponse.dataKey;
                        order.napasKey = res.javaResponse.napasKey;
                        order.orderId = res.javaResponse.orderId;
                        order.clientIp = '127.0.0.1';
                        order.cardType = 'AtmCard';
                        order.enable3DSecure = 'false';
                        order.apiOperation = 'PURCHASE_OTP';
                        order.deviceId = deviceId;
                        order.orderReference = this.state.merchant_id + '|' + serviceCode + '|0' + billingCode + '|' + serviceType;
                        this.props.navigation.navigate('PaymentLocalTokenForm', {order : order});
                    } else {
                        Util.showAlert('Thanh toán thành công!');
                    }
                } else {
                    const { navigate } = this.props.navigation;
                    Util.handleDefaultResponse(res, navigate);
                }
            }).catch (error => {
                this.setState({loading : false});
                Util.showAlert(Constant.MESSAGES.EXCEPTION);
            });
        }

    }

    onPayBill = () => {
        Util.showConfirm('Bạn có chắc chắn muốn nạp tiền điện thoại trả trước?\nSố tiền: ' + this.state.formattedAmount, this.onPay.bind(this));
    }

    onSelectAmount = (amount) => {
        var formattedAmount = Util.formatCurrency(amount) + 'đ';
        this.setState({amount, formattedAmount});
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (
            <View style={styles.container}>
                { (this.state.loading) && <LoadingSpinner hasBackground={true}/> }

                <ScrollView style={{zIndex: 5}} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.header}>
                        <Image source={require('../../images/temp/internet_bg.jpg')} resizeMode="cover" style={styles.cover} />
                        <Image source={require('../../images/utilities/small/dienthoaitratruoc.png')} resizeMode="contain" style={styles.coverIcon} />
                        <Text style={styles.pageTitle}>NẠP TIỀN ĐIỆN THOẠI TRẢ TRƯỚC</Text>
                        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                            <Image style={styles.backIcon} source={require('../../images/back-white.png')} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={[globalStyles.contentCard,{marginTop: -moderateScale(20), paddingHorizontal: 0}]}>
                        <View style={styles.paddingContent}>
                            <Text style={globalStyles.label}>CHỌN THẺ</Text>
                        </View>
                        <MCheckbox ref="cardType" options={this.state.cardOptions} currentValue={"AtmCard"} onPress={() => {
                            var cardType = this.refs.cardType.getValue();
                            console.log(cardType);
                            if (cardType == 'AtmCard' || cardType == 'CreditCard') {
                                this.setState({showAgreement : true});
                            } else {
                                this.setState({showAgreement : false});
                            }
                        }}/>
                        {
                            this.state.showAgreement &&
                            <MCheckbox2
                                ref="agreement"
                                title={'Đồng ý mã hóa thông tin thẻ cho lần sử dụng sau ?'}
                                checked={false}
                                textStyle={{fontSize: moderateScale(15), color: '#007fce', fontWeight: 'bold', fontStyle: 'italic'}}
                                onPress={() => {
                                    var agreed = this.refs.agreement.isChecked();
                                    if (agreed) {
                                        this.setState({apiOperation : 'PAY_WITH_RETURNED_TOKEN'});
                                    } else {
                                        this.setState({apiOperation : 'PAY'});
                                    }
                                }}/>
                        }
                    </View>
                    <View style={[globalStyles.contentCard]}>
                        <Text style={globalStyles.label}>SỐ ĐIỆN THOẠI</Text>
                        <View style={globalStyles.inputWrap}>
                            <TextInput returnKeyType='done' keyboardType={'phone-pad'} autoCapitalize={'none'} onChangeText={value => this.setState({billingCode: value})} style={globalStyles.lineInput} editable={true} />
                            <Image style={globalStyles.inputIcon} source={require('../../images/edit.png')} resizeMode="contain" />
                        </View>

                        <View style={{marginTop: 16}}>
                            <Text style={[globalStyles.label]}>MỆNH GIÁ</Text>
                            <View style={styles.payCardWrapper}>
                                <CreditCard onPress={this.onSelectAmount.bind(this, 10000)} isSelected={this.state.amount == 10000} title={'10,000 đ'}/>
                                <CreditCard onPress={this.onSelectAmount.bind(this, 20000)} isSelected={this.state.amount == 20000} title={'20,000 đ'}/>
                                <CreditCard onPress={this.onSelectAmount.bind(this, 30000)} isSelected={this.state.amount == 30000} title={'30,000 đ'}/>
                            </View>
                            <View style={styles.payCardWrapper}>
                                <CreditCard onPress={this.onSelectAmount.bind(this, 50000)} isSelected={this.state.amount == 50000} title={'50,000 đ'}/>
                                <CreditCard onPress={this.onSelectAmount.bind(this, 100000)} isSelected={this.state.amount == 100000} title={'100,000 đ'}/>
                                <CreditCard onPress={this.onSelectAmount.bind(this, 200000)} isSelected={this.state.amount == 200000} title={'200,000 đ'}/>
                            </View>
                            <View style={styles.payCardWrapper}>
                                <CreditCard onPress={this.onSelectAmount.bind(this, 300000)} isSelected={this.state.amount == 300000} title={'300,000 đ'}/>
                                <CreditCard onPress={this.onSelectAmount.bind(this, 500000)} isSelected={this.state.amount == 500000} title={'500,000 đ'}/>
                                <CreditCard style={{opacity: 0}}/>
                            </View>
                        </View>
                    </View>
                    <View style={[globalStyles.contentCard]}>
                        <Text style={styles.bigTitle}>Thông tin nạp tiền</Text>
                        <View style={styles.billRow}>
                            <Text style={styles.billRowTitle}>SỐ ĐIỆN THOẠI</Text>
                            <Text style={styles.billRowDesc}>{this.state.billingCode}</Text>
                        </View>

                        <View style={styles.billRow}>
                            <Text style={styles.billRowTitle}>SỐ TIỀN</Text>
                            <Text style={styles.billRowDesc}>{this.state.formattedAmount}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: moderateScale(15), marginBottom: moderateScale(40)}}>
                        <MButton onPress={this.onPayBill} style={{height: verticalScale(48)}} label={this.state.formattedAmount == '' ? 'Thanh toán' : ('Thanh toán (' + this.state.formattedAmount + ')')}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default PayPrepaidMobile;
