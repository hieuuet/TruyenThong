//@flow
import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity, ScrollView, FlatList, Platform, NativeModules} from "react-native";
import DoorListItem from '../../components/DoorListItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';
import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';
import Util from '../../configs/util';
import _ from 'lodash';
import Constant from '../../configs/constant';
// import { play } from 'react-native-vlc-player';

import IJKPlayer from '../../configs/IJKPlayer';

import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class CameraList extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            sensors : [],
            loading: false,
            nextPage : 1,
            shouldLoadMore : true
        };
    }

    componentWillMount() {
        this._getSensorList(1, 12, true);      // Type = 12: cảm biến cửa
    }

    _getSensorList = (page, type, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true});
        }
        Api.getSensorList(page, type).then(res => {
            this.setState({loading : false});
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                if (res.javaResponse.sensors.length > 0) {
                    var sensors = [...this.state.sensors, ...res.javaResponse.sensors];
                    this.setState({sensors : sensors, nextPage : page + 1, shouldLoadMore : true});
                } else {
                    if (page == 1) {
                        this.setState({sensors : [], nextPage : 1, shouldLoadMore : false});
                    } else {
                        this.setState({shouldLoadMore : false});
                    }
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

    playCamera(item) {
        // play('rtsp://admin:123_hikvision@14.160.75.86:2251/Streaming/Channels/301');
        if(Platform.OS === 'ios') {
            var rtspplayer= NativeModules.rtspplayer;
            rtspplayer.addEvent('Play camera', 'RTSP link');
        } else {
            IJKPlayer.show('Play camera', IJKPlayer.SHORT);
        }
    }

    renderItem(item) {
        return (
            <DoorListItem
                onPress={() => this.playCamera(item)}
                background={require("../../images/temp/French-Door-2-handles.jpg")}
                item={item} />
        );
    }

    retrieveNextPage = () => {
        if (this.state.shouldLoadMore) {
            this._getSensorList(this.state.nextPage, 12, false);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (
            <View style={styles.container}>
                {
                    (this.state.loading) && <LoadingSpinner hasBackground={false}/>
                }

                {
                    (!this.state.loading) &&

                    <ScrollView style={{zIndex: 5}} keyboardShouldPersistTaps={'handled'}>
                        <View style={styles.header}>
                            <Image source={require('../../images/iotbg.jpg')} resizeMode="cover" style={styles.cover} />
                            <Image source={require('../../images/utilities/small/camera.png')} resizeMode="contain" style={styles.coverIcon} />
                            <Text style={styles.pageTitle}>CAMERA GIÁM SÁT</Text>
                            <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                                <Image style={styles.backIcon} source={require('../../images/back-white.png')} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        <View style={[globalStyles.contentCard,{marginTop: -moderateScale(20), paddingHorizontal: 0}]}>
                            <View style={styles.paddingContent}>
                                <Text style={globalStyles.label}>DANH SÁCH CAMERA</Text>
                            </View>
                            <FlatList
                                data={this.state.sensors}
                                renderItem={({item}) => this.renderItem(item)}
                                keyExtractor={(item, index) => index}
                                onEndReached={this.retrieveNextPage}
                				onEndReachedThreshold={0.01}
                                shouldItemUpdate={ (props,nextProps) => { return props.item.id !== nextProps.item.id } }
                                initialNumToRender={3}
                                removeClippedSubviews={true} />
                        </View>
                    </ScrollView>
                }
            </View>
        );
    }
}
export default CameraList;
