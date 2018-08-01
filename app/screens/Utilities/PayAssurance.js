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

import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';

import _ from 'lodash';

import renderIf from '../../configs/renderIf';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class PayAssurance extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        const cardOptions = [
            { value: 'AtmCard', label: 'Thẻ nội địa' },
            { value: 'CreditCard', label: 'Thẻ quốc tế' }
        ];

        const providerOptions = [
            {value: 'PFVBILLING', label: 'Khoản vay Prudential Finance', des : 'Thanh toán khoản vay Khoản vay Prudential Finance',  type : 'BILLING'},
            {value: 'PTIBILLING', label: 'Tổng công ty CP bảo hiểm Bưu điện', des : 'Thanh toán bảo hiểm bưu Bưu điện',  type : 'BILLING'},
            {value: 'FECBILLING', label: 'FECredit', des : 'Thanh toán FECredit',  type : 'BILLING'}
        ];

        this.state = {
            billingCode : '',
            amount : 0,
            apiOperation: 'PAY',
            formattedAmount : '',
            additionalData : '',
            loading : false,
            cardOptions : cardOptions,
            providerOptions : providerOptions,
            currentProvider : providerOptions[0],
            showAgreement : true,
            merchant_id : ''
        }
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

    getDescription = (serviceCode, billingCode, amount) => {
        for (var i=0; i<this.state.providerOptions.length; i++) {
            if (this.state.providerOptions[i].value == serviceCode) {
                return this.state.providerOptions[i].des;
            }
        }
        return '';
    }

    onPay = () => {
        Keyboard.dismiss();
        var serviceCode = this.state.currentProvider.value;
        var serviceType = this.state.currentProvider.type;
        var billingCode = this.state.billingCode.trim();
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
              customerCode: billingCode,
              des : this.getDescription(serviceCode, billingCode, this.state.amount)
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
                  fullOrder.orderReference = this.state.merchant_id + '|' + serviceCode + '|' + billingCode + '|' + serviceType;
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
              customerCode: billingCode,
              des : this.getDescription(serviceCode, billingCode, this.state.amount)
            };

          this.setState({loading : true});
          Api.payWithToken(order).then(res => {
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
                    order.orderReference = this.state.merchant_id +  '|' + serviceCode + '|' + billingCode + '|' + serviceType;
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
      Util.showConfirm('Bạn có chắc chắn muốn thanh toán hóa đơn bảo hiểm?\nSố tiền: ' + this.state.formattedAmount, this.onPay.bind(this));
    }

    onCheckBill = () => {
        Keyboard.dismiss();
        var serviceCode = this.state.currentProvider.value;
        var billingCode = this.state.billingCode.trim();
        if (billingCode.trim() == '') {
            Util.showAlert('Vui lòng nhập mã khách hàng');
            return;
        }
        this.setState({loading : true});
        Api.checkBill(serviceCode, billingCode).then(res => {
            this.setState({loading : false});
            if (res.code === 'SUCCESS') {
                var amount = res.javaResponse.amount;
                var formattedAmount = Util.formatCurrency(amount) + 'đ';
                var additionalData = res.javaResponse.additionalData == 'null' ? '' : res.javaResponse.additionalData;
                this.setState({amount, formattedAmount, additionalData});
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            this.setState({loading : false});
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    onSelectProvider = (value, label) => {
        for (var i=0; i<this.state.providerOptions.length; i++) {
            if (this.state.providerOptions[i].value == value) {
                this.setState({
                    currentProvider : this.state.providerOptions[i],
                    amount : 0,
                    formattedAmount : '',
                    additionalData : ''
                });
            }
        }
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
                        <Image source={require('../../images/utilities/small/baohiem.png')} resizeMode="contain" style={styles.coverIcon} />
                        <Text style={styles.pageTitle}>THANH TOÁN BẢO HIỂM</Text>
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
                        <Text style={globalStyles.label}>NHÀ CUNG CẤP</Text>
                        <MSelect ref="serviceProvider" options={this.state.providerOptions} currentOption={this.state.currentProvider} onSelect={this.onSelectProvider.bind(this)}/>
                        <Text style={globalStyles.label}>SỐ HỢP ĐỒNG/ SỐ TK THẺ TÍN DỤNG</Text>
                        <View style={globalStyles.inputWrap}>
                            <TextInput autoCapitalize={'none'} onChangeText={value => this.setState({billingCode: value, amount: 0, formattedAmount: '', additionalData : ''})} style={globalStyles.lineInput} editable={true} />
                            <Image style={globalStyles.inputIcon} source={require('../../images/edit.png')} resizeMode="contain" />
                        </View>
                        <MButton onPress={this.onCheckBill} style={{height: verticalScale(48), marginTop: moderateScale(10)}} label="Lấy thông tin hóa đơn"/>
                    </View>
                    <View style={[globalStyles.contentCard]}>
                        <Text style={styles.bigTitle}>Thông tin giao dịch</Text>
                        <View style={styles.billRow}>
                            <Text style={styles.billRowTitle}>SỐ HỢP ĐỒNG/ SỐ TK THẺ TÍN DỤNG</Text>
                            <Text style={styles.billRowDesc}>{this.state.billingCode}</Text>
                        </View>
                        <View style={styles.billRow}>
                            <Text style={styles.billRowTitle}>SỐ TIỀN</Text>
                            <Text style={styles.billRowDesc}>{this.state.formattedAmount}</Text>
                        </View>
                        {renderIf(this.state.additionalData,
                          <View style={styles.billRow}>
                              <Text style={styles.billRowTitle}>THÔNG TIN</Text>
                              <Text style={styles.billRowDesc}>{this.state.additionalData}</Text>
                          </View>
                        )}
                    </View>
                    <View style={{marginHorizontal: moderateScale(15), marginBottom: moderateScale(40)}}>
                        <MButton onPress={this.onPayBill} style={{height: verticalScale(48)}} label={this.state.formattedAmount == '' ? 'Thanh toán' : ('Thanh toán (' + this.state.formattedAmount + ')')}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default PayAssurance;
