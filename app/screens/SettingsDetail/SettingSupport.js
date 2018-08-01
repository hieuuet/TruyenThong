//@flow
import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity, Linking} from "react-native";

import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';
import Util from '../../configs/util';
import _ from 'lodash';

class SettingSupport extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
          hotline: '',
          email_support: '',
          fanpage: ''
          
        }
    }

    componentWillMount() {
      Util.getItem('SAVED_CONFIGS', true).then(configs => {
          console.log('configs from tab hot');
          if(configs != null) {
            console.log(configs);
            this.setState({
              hotline : configs.hotline,
              email_support : configs.email_support,
              fanpage : configs.fanpage,
            });
          }
      });
    }

    openURL(url) {
        Linking.openURL(url);
    }
    
    _openURL(url) {
        console.log('call Press');
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + url);
          } else {
            return Linking.openURL(url);
          }
      }).catch(err => console.log('An error occurred', err));
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const shadowOpt = {
            width:100,
            height:100,
            color:"#000",
            border:2,
            radius:3,
            opacity:0.2,
            x:0,
            y:3,
            style:{marginVertical:5}
        };

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                        <Image style={styles.backIcon} source={require('../../images/back-white.png')} resizeMode="contain" />
                        <Text style={styles.backText}>Hỗ trợ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.label}>HOTLINE</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>this._openURL('tel:' + this.state.hotline)}>
                        <Image style={styles.buttonIcon} source={require('../../images/phone.png')} resizeMode="contain" />
                        <Text style={styles.buttonText}>{this.state.hotline}</Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>EMAIL</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>this._openURL('mailto:' + this.state.email_support)}>
                        <Image style={styles.buttonIcon} source={require('../../images/phone.png')} resizeMode="contain" />
                        <Text style={styles.buttonText}>{this.state.email_support}</Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>FANPAGE</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>this._openURL(this.state.fanpage)}>
                        <Image style={styles.buttonIcon} source={require('../../images/phone.png')} resizeMode="contain" />
                        <Text style={styles.buttonText}>{this.state.fanpage}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default SettingSupport;
