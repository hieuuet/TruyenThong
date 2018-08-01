//@flow
import React, { Component } from "react";
import { View, WebView, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import Util from '../../configs/util';
import Constant from '../../configs/constant';
import TTWebview from '../../components/TTWebview';

export default class PaymentLocalTokenForm extends Component {

    constructor(props) {
		super(props);

        console.log('FULL_ORDER');
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
            payment_local_token_url : null,
            backgroundColor : '#fff'
		};
	}

    componentWillMount() {
        Util.getItem('SAVED_CONFIGS', true).then(configs => {
            this.setState({
                payment_rs_url : configs.payment_rs_url,
                payment_local_token_url : configs.payment_local_token_url
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
                <html><body>
                <form id="merchant-form" action="` + this.state.payment_local_token_url + `" method="POST">
                    <input type="text" value="`+this.state.deviceId+`" name="deviceId">
                    <input type="text" value="`+this.state.amount+`" name="orderAmount">
                    <input type="text" value="VND" name="orderCurrency">
                    <input type="text" value="`+this.state.orderReference+`" name="orderReference">
                    <input type="text" value="`+this.state.orderId+`" name="orderId">
                    <input type="text" value="`+this.state.dataKey+`" name="dataKey">
                    <input type="text" value="`+this.state.napasKey+`" name="napasKey">
                </form>
                <script>
                    document.addEventListener('DOMContentLoaded', function () {
                        document.getElementById('merchant-form').submit();
                    }, false);
                </script>
                </body></html>`;

            const { goBack } = this.props.navigation;
            return (
                <View style={[styles.wrapper, {backgroundColor: this.state.backgroundColor}]}>
                    <View style={styles.headerArticle}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => {goBack()}}>
                            <Image style={styles.backButtonIcon} resizeMode="contain" source={require('../../images/back-white.png')} />
                            <Text style={styles.backButtonText}>Quay lại</Text>
                        </TouchableOpacity>
                    </View>
                    <WebView style={{flex : 1}} source={{html:html}} onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                      renderLoading={this.ActivityIndicatorLoadingView}
                      startInLoadingState={true}  />
                </View>
            );
        }
        return null;
    }
}
