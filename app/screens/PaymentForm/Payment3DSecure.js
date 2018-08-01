//@flow
import React, { Component } from "react";
import { View, WebView, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import Util from '../../configs/util';

export default class Payment3DSecure extends Component {

    constructor(props) {
		super(props);

    console.log('htmlBodyContent');
    console.log(this.props.navigation.state.params.htmlBodyContent);
		this.state = {
      // htmlBodyContent: "<!DOCTYPE html><html><head><title>Page Title</title></head><body><h1>This is a Heading</h1><p>This is a paragraph.</p></body></html>",
      backgroundColor : '#fff',
      htmlBodyContent: JSON.parse(this.props.navigation.state.params.htmlBodyContent).htmlBodyContent
     }
  }

    componentWillMount() {

    }

    static navigationOptions = {
        header: null
    };

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
                  <WebView style={styles.webview3D} source={{html:this.state.htmlBodyContent}}
                    renderLoading={this.ActivityIndicatorLoadingView}
                    startInLoadingState={true}  />
              </View>
          );
    }
}
