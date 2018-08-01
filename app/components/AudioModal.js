import React, { Component } from 'react';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, StyleSheet, Image, Modal, Dimensions } from 'react-native';
import globalStyles from '../resources/styles';
import _ from 'lodash';
import KeepAwake from 'react-native-keep-awake';
import Util from '../configs/util';

import AdsSlider from './AdsSlider';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class AudioModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: true,
            muted: false,
            shuffle: false,
            sliding: false,
            currentTime: 0,
        };
    }

    onRequestClose() {}

    onSlidingStart(){
        this.setState({ sliding: true });
    }

    onSlidingChange(value){
        let newPosition = value * this.state.songDuration;
        this.setState({ currentTime: newPosition });
    }

    onSlidingComplete(){
        this.refs.audio.seek( this.state.currentTime );
        this.setState({ sliding: false });
    }

    togglePlay(){
        this.setState({ playing: !this.state.playing });
        if (this.state.currentTime == 0) {
            this.refs.audio.seek(0);
        }
    }

    onLoad(params){


        this.setState({ songDuration: params.duration });
    }

    loadStart() {

      // set onLoad
      this.setState({ currentTime: 0, playing: true });
    }

    onEnd(){
        this.setState({ playing: false });
        this.setState({ currentTime: 0 });
        this.refs.audio.seek(0);
    }

    setTime(params){
        if( !this.state.sliding ){
            this.setState({ currentTime: params.currentTime });
        }
    }

    render() {
        const { style, changeAudioModalVisible, onChangeModalVisible, record } = this.props;
        var {height, width} = Dimensions.get('window');

        const songs = [{
            url: record ? record.url : '',
        }];

        let songPercentage;
        if( this.state.songDuration !== undefined){
            songPercentage = this.state.currentTime / this.state.songDuration;
        } else {
            songPercentage = 0;
        }

        let playButton;
        if( this.state.playing ){
            playButton = <TouchableOpacity onPress={ this.togglePlay.bind(this) }><Image source={require('../images/pause-circle.png')} resizeMode="contain" style={ styles.play } /></TouchableOpacity>;
        } else {
            playButton = <TouchableOpacity onPress={ this.togglePlay.bind(this) }><Image source={require('../images/play-circle.png')} resizeMode="contain" style={ styles.play } /></TouchableOpacity>;
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={this.onRequestClose}
                visible={this.props.changeAudioModalVisible} >
                <View style={globalStyles.modalBackdrop}>
                    <TouchableOpacity
                        style={globalStyles.closeModalButton}
                        onPress={() => {
                            this.props.onChangeModalVisible(false)
                        }}>
                        <Text style={globalStyles.closeButtonText}>ĐÓNG</Text>
                        <Image resizeMode="contain" style={globalStyles.closeButtonIcon} source={require('../images/close.png')} />
                    </TouchableOpacity>
                    <View style={globalStyles.modalInner}>

                        <View style={styles.modalHeader}>
                            <Text style={styles.time}>{_.isEmpty(record)? '' : record.publish_date}</Text>
                            <Text style={styles.title}>{_.isEmpty(record)? '' : record.title}</Text>
                        </View>
                        <Video source={{uri: songs[0].url }}
                            ref="audio"
                            volume={ this.state.muted ? 0 : 1.0}
                            ignoreSilentSwitch={"ignore"}
                            playInBackground={true}
                            playWhenInactive={true}
                            muted={false}
                            paused={!this.state.playing}
                            onLoad={ this.onLoad.bind(this) }
                            onLoadStart={this.loadStart.bind(this)}
                            onProgress={ this.setTime.bind(this) }
                            onEnd={ this.onEnd.bind(this) }
                            resizeMode="cover"
                            repeat={false}/>
                        <View style={ styles.sliderContainer }>
                            { playButton }
                            <Slider
                                onSlidingStart={ this.onSlidingStart.bind(this) }
                                onSlidingComplete={ this.onSlidingComplete.bind(this) }
                                onValueChange={ this.onSlidingChange.bind(this) }
                                minimumTrackTintColor='#851c44'
                                style={ styles.slider }
                                trackStyle={ styles.sliderTrack }
                                thumbStyle={ styles.sliderThumb }
                                value={ songPercentage }/>

                            <View style={ styles.timeInfo }>
                                <Text style={ styles.songTime }>{ Util.formattedTime(this.state.currentTime)  }</Text>
                            </View>
                        </View>
                        <AdsSlider width={width - 20}/>
                    </View>
                </View>
                <KeepAwake />
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    time: {
        color: '#677897',
        fontSize: moderateScale(14),
        marginBottom: moderateScale(15)
    },
    songTime: {
        color: '#848484',
        fontSize: moderateScale(12),
        marginTop: moderateScale(7)
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: '#022548'
    },
    modalHeader: {
        padding: moderateScale(20)
    },
    sliderContainer: {
        paddingVertical: moderateScale(20),
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    timeInfo: {
        flexDirection: 'row',
    },
    time: {
        color: '#FFF',
        flex: 1,
        fontSize: moderateScale(10),
    },
    timeRight: {
        color: '#FFF',
        textAlign: 'right',
        flex: 1,
        fontSize: moderateScale(10),
    },
    slider: {
        height: verticalScale(20),
        marginTop: moderateScale(5)
    },
    sliderTrack: {
        width: moderateScale(183),
        height: verticalScale(4),
        backgroundColor: '#dddddd',
        borderRadius: moderateScale(4)
    },
    sliderThumb: {
        width: moderateScale(14),
        height: verticalScale(14),
        backgroundColor: '#e62565',
        borderRadius: moderateScale(14 / 2),
        shadowColor: '#e62565',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
    },
    play: {
        width: moderateScale(32),
        height: verticalScale(32)
    }
});

export default AudioModal;
