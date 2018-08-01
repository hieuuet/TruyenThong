//@flow
import React, { Component } from "react";
import { View, WebView, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import Util from '../../configs/util';

export default class PaymentForm extends Component {

    constructor(props) {
		super(props);

    console.log('this.props.navigation.state.params.order');
    console.log(this.props.navigation.state.params.order);

		this.state = {
            cardType : this.props.navigation.state.params.order.cardType,
            amount : this.props.navigation.state.params.order.amount,
            dataKey : this.props.navigation.state.params.order.dataKey,
            napasKey : this.props.navigation.state.params.order.napasKey,
            apiOperation : this.props.navigation.state.params.order.apiOperation,
            clientIp : this.props.navigation.state.params.order.clientIp,
            deviceId : this.props.navigation.state.params.order.deviceId,
            orderReference : this.props.navigation.state.params.order.orderReference,
            orderId : this.props.navigation.state.params.order.orderId,
            enable3DSecure : this.props.navigation.state.params.order.enable3DSecure,
            payment_rs_url : null,
            backgroundColor : '#fff',
            merchant_id : ''
		};
	}

    componentWillMount() {
        Util.getItem('SAVED_CONFIGS', true).then(configs => {
            this.setState({
                payment_rs_url : configs.payment_rs_url,
                merchant_id : configs.merchant_id,
                payment_page_url : configs.payment_page_url
            });
        });
    }

    static navigationOptions = {
        header: null
    };

    _onNavigationStateChange(webViewState) {
        if (!webViewState.loading) {
            if (this.state.payment_rs_url == webViewState.url) {
                this.setState({ backgroundColor : '#EFEFF4' });
            }
        }
    }

    ActivityIndicatorLoadingView() {

      return (

        <ActivityIndicator
          color='#009688'
          size='large'
          style={styles.ActivityIndicatorStyle}
        />
      );
    }

    render() {
        if (this.state.payment_rs_url) {
            const html = `
                <form id="merchant-form" action="` + this.state.payment_rs_url + `" method="POST">
                    <div id="napas-widget-container"></div>
                	<script
                		type="text/javascript"
                		id="napas-widget-script"
                        src="`+this.state.payment_page_url+`"
                		merchantId="`+this.state.merchant_id+`"
                		clientIP="`+this.state.clientIp+`"
                		deviceId="` + this.state.deviceId + `"
                		environment="MobileApp"
                		cardScheme="` + this.state.cardType + `"
                		enable3DSecure="` + this.state.enable3DSecure + `"
                		apiOperation="`+ this.state.apiOperation +`"
                		orderAmount="` + this.state.amount + `"
                		orderCurrency="VND"
                		orderReference="` + this.state.orderReference + `"
                		orderId="` + this.state.orderId + `"
                		channel="7399"
                		sourceOfFundsType="CARD"
                		dataKey="` + this.state.dataKey + `"
                		napasKey="` + this.state.napasKey + `"
                	></script>
                </form>`;

            const { goBack } = this.props.navigation;
            return (
                <View style={[styles.wrapper, {backgroundColor: this.state.backgroundColor}]}>
                    <View style={styles.headerArticle}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => goBack()}>
                            <Image style={styles.backButtonIcon} resizeMode="contain" source={require('../../images/back-white.png')} />
                            <Text style={styles.backButtonText}>Quay lại</Text>
                        </TouchableOpacity>
                    </View>
                    <WebView style={styles.webview} source={{html:html}} onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                      renderLoading={this.ActivityIndicatorLoadingView}
                      startInLoadingState={true}  />
                </View>
            );
        }
        return null;
    }
}
