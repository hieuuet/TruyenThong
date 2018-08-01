//@flow
import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity, ScrollView} from "react-native";
import DoorListItem from '../../components/DoorListItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';
import Video from 'react-native-video';

import styles from './styles';
import globalStyles from '../../resources/styles';
// import { play } from 'react-native-vlc-player';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


export default class CameraView extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
        }
        this.player = null;
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (
            <View style={{width:'100%', height:300}}>
                <TouchableOpacity onPress={() => {
                    play('rtsp://admin:123_hikvision@14.160.75.86:2251/Streaming/Channels/301');
                }}>
                    <Text>PLAY ME</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
