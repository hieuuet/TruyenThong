//@flow
import React, {Component} from "react";
import {View, Image, StatusBar, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, WebView, ScrollView, Keyboard, Linking} from "react-native";
import SmallPostItem from '../../components/SmallPostItem';
import Comment from '../../components/Comment';
import Tag from "../../components/Tag";
import styles from './styles';
import globalStyles from '../../resources/styles';
import Util from '../../configs/util';
import Api from '../../api/api';
import _ from 'lodash';
import Constant from '../../configs/constant';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';
import ProgressBar from '../../components/ProgressBar';
import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';
import Video from 'react-native-video';
import Slider from 'react-native-slider';
import moment from 'moment';
import dimens from '../../resources/dimens';
import colors from '../../resources/colors';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';



const win = Dimensions.get('window');
const DEFAULT_PROPS = {
    classesStyles: { 'content-body': { paddingHorizontal: dimens.primaryMargin } }
};

class Article extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            newsDetail : {},
            isLoading: true,
            contentComment: '',
            userInfo: {},
            offset: 0,
            playing : false,
            sliding : false,
            currentTime : 0
        }

        this._getInforUser();
    }

    componentWillMount() {
        this._getNewsDetail(this.props.navigation.state.params.news.id);
    }

    async _getInforUser() {
        let token = await Util.getItem("TOKEN");
        if(!_.isEmpty(token)) {
            var parts = token.split('.');
            if (parts.length == 3) {
                var encodedHeader = parts[0];
                var encodedPayload = parts[1];
                var signature = parts[2];
                try {
                    var payload = JSON.parse(Util.base64UrlDecode(encodedPayload));
                    this.setState({
                        userInfo: payload
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    _getNewsDetail(id) {
        Api.getNewsDetail(id).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                console.log('res getNewsDetail');
                console.log(res.javaResponse);
                let newsDetail = res.javaResponse;
                let comments = [], relatedNews = [];

                newsDetail.full_description = '<div class="content-body">' + newsDetail.full_description + '</div>';
                if(!_.isEmpty(newsDetail.publish_date)) {
                    newsDetail.publish_date = moment(newsDetail.publish_date, Constant.FORMAT_DATE.TIME_SERVER).format(Constant.FORMAT_DATE.TIME_CLIENT);
                }
                if(!_.isEmpty(newsDetail.comments)) {
                    _.forEach(newsDetail.comments, function(val) {
                        if(!_.isEmpty(val.time)) {
                            val.time = Util.diffDateTime(val.time);
                            comments.push(val);
                        }
                    });
                    newsDetail.comments = comments;
                }
                if(newsDetail.isLike == 0) {
                    newsDetail.icon_like = require('../../images/sc-heart.png');
                } else {
                    newsDetail.icon_like = require('../../images/sc-heart-liked.png');
                }

                if(!_.isEmpty(newsDetail.relatedNews)) {
                    _.forEach(newsDetail.relatedNews, function(val) {
                        if(!_.isEmpty(val.publish_date)) {
                            val.publish_date = Util.diffDate(val.publish_date);
                            relatedNews.push(val);
                        }
                    });
                    newsDetail.relatedNews = relatedNews;
                }

                this.setState({
                    newsDetail: newsDetail,
                    isLoading: false
                });
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    _renderNode(node, index, siblings, parent, defaultRenderer) {
        const widthScreen = Dimensions.get('window').width;
        const heightScreen = Math.round(widthScreen * 9 / 16);
        const a = node.attribs;

        if (node.name == 'img') {
            return ( <Image key={index} style={{ width: widthScreen * 0.9, height: 250 }} resizeMode="contain" source={{uri: a.src}}/> );
        }
    }

    _goDetail(item) {
        this.props.navigation.navigate('Article', {news : item});
    }

    _onClickComment() {
        Keyboard.dismiss();
        if(!this.props.userInfor) {
            const { navigate } = this.props.navigation;
            Util.showConfirmAlertRedirect('Thông báo', 'Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng tính năng!', navigate);
            return;

        }

        if(_.isEmpty(this.state.contentComment)) {
            Util.showAlert('Chưa nhập bình luận. Vui lòng kiểm tra lại!');
            return;
        }

        let params = {
            news_id: this.state.newsDetail.id,
            content: this.state.contentComment
        };

        let ncmt = Number.parseInt(this.state.newsDetail.ncmt, 10) + 1;
        let newsDetail = this.state.newsDetail;
        newsDetail.ncmt = ncmt;

        let comment = {};
        comment.name = this.props.userInfor.full_name;
        comment.content = this.state.contentComment;
        comment.time = moment(moment(), Constant.FORMAT_DATE.TIME_FORMAT).fromNow();
        let arrComment = this.state.newsDetail.comments;
        if(_.isEmpty(arrComment)) {
            arrComment = [];
            arrComment.unshift(comment);
        } else {
            arrComment.unshift(comment);
        }
        newsDetail.comments = arrComment;
        this.setState({
            newsDetail: newsDetail,
            contentComment: ''
        });

        Api.commentNews(params).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {

            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    _onClickLike() {

        if(!this.props.userInfor) {
            const { navigate } = this.props.navigation;
            Util.showConfirmAlertRedirect('Thông báo', 'Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng tính năng!', navigate);
            return;

        }
        let params = {
            news_id: this.state.newsDetail.id
        };
        let newsDetail = this.state.newsDetail;
        let nlike = 0;

        if(newsDetail.isLike == 0) {
            nlike = Number.parseInt(this.state.newsDetail.nlike, 10) + 1;
            newsDetail.isLike = 1;
            newsDetail.icon_like = require('../../images/sc-heart-liked.png');
        } else {
            nlike = Number.parseInt(this.state.newsDetail.nlike, 10) - 1;
            newsDetail.isLike = 0;
            newsDetail.icon_like = require('../../images/sc-heart.png');
        }
        newsDetail.nlike = nlike;

        this.setState({
            newsDetail: newsDetail
        });

        Api.likeNews(params).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {

            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    onLoad = (params) => {
        this.setState({ songDuration: params.duration });
    }

    onToggle = () => {
        this.setState({playing : !this.state.playing});
    }

    onSlidingStart = () => {
        this.setState({ sliding: true });
    }

    onSlidingChange = (value) => {
        let newPosition = value * this.state.songDuration;
        this.setState({ currentTime: newPosition });
    }

    onSlidingComplete = () => {
        this.refs.audio.seek( this.state.currentTime );
        this.setState({ sliding: false });
    }

    onEnd = () => {
        this.setState({ playing: false });
        this.setState({ currentTime: 0 });
        this.refs.audio.seek(0);
    }

    onProgress = (params) => {
        if(!this.state.sliding ){
            this.setState({ currentTime: params.currentTime });
        }
    }

    _onLinkPress = (href) => {
      // console.log('_onLinkPress: ' + href);
      Linking.canOpenURL(href).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + url);
          } else {
            return Linking.openURL(href);
          }
      }).catch(err => console.log('An error occurred', err));
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        let songPercentage;
        if( this.state.songDuration !== undefined){
            songPercentage = this.state.currentTime / this.state.songDuration;
        } else {
            songPercentage = 0;
        }

        let playButton;
        if( this.state.playing ){
            playButton = <TouchableOpacity onPress={ this.onToggle }><Image source={require('../../images/pause-circle.png')} resizeMode="contain" style={ videoStyle.play } /></TouchableOpacity>;
        } else {
            playButton = <TouchableOpacity onPress={ this.onToggle }><Image source={require('../../images/play-circle.png')} resizeMode="contain" style={ videoStyle.play } /></TouchableOpacity>;
        }

        return (
            <View style={styles.articleContainer}>
                <View style={styles.headerArticle}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => goBack()}>
                        <Image style={styles.backButtonIcon} resizeMode="contain" source={require('../../images/back-white.png')} />
                        <Text style={styles.backButtonText}>Quay lại</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={{flex: 1}}>
                        <Image style={styles.postCover} source={{uri: this.props.navigation.state.params.news.img}} resizeMode="cover" />

                        <Text style={styles.date}>{this.props.navigation.state.params.news.publish_date} - {this.props.navigation.state.params.news.area_name}</Text>
                        <Text style={styles.title}>{this.props.navigation.state.params.news.title}</Text>
                        <Text style={styles.shortDes}>{this.props.navigation.state.params.news.short_description}</Text>

                        {
                            (this.state.newsDetail.video_url != null) &&
                            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
                                <Video source={{uri: this.state.newsDetail.video_url }}
                                    ref="audio"
                                    volume={1.0}
                                    ignoreSilentSwitch={"ignore"}
                                    muted={false}
                                    paused={!this.state.playing}
                                    onProgress={ this.onProgress }
                                    onEnd={ this.onEnd }
                                    onLoad={this.onLoad}
                                    resizeMode="cover"
                                    repeat={false}
                                    style={{
                                        width: win.width,
                                        height: verticalScale(win.width * 9 / 16)
                                    }} />
                                <View style={{ flexDirection: 'row', paddingTop: moderateScale(10), justifyContent: 'space-around', backgroundColor: '#fff', width: '100%'}}>
                                    { playButton }
                                    <Slider
                                        onSlidingStart={ this.onSlidingStart }
                                        onSlidingComplete={ this.onSlidingComplete }
                                        onValueChange={ this.onSlidingChange }
                                        minimumTrackTintColor='#851c44'
                                        style={ videoStyle.slider }
                                        trackStyle={ videoStyle.sliderTrack }
                                        thumbStyle={ videoStyle.sliderThumb }
                                        value={ songPercentage }/>

                                    <View style={ videoStyle.timeInfo }>
                                        <Text style={ videoStyle.songTime }>{ Util.formattedTime(this.state.currentTime)  }</Text>
                                    </View>
                                </View>
                            </View>
                        }
                        {
                            (!this.state.isLoading)
                            &&
                            <View style={styles.postContent}>
                                <ScrollView
                                    style={{ paddingHorizontal: moderateScale(15) }}
                                    contentContainerStyle={styles.contentContainer}>
                                    <HTML
                                        html={this.state.newsDetail.full_description}
                                        baseFontStyle={{fontSize: moderateScale(15), color: '#303030'}}
                                        imagesMaxWidth={Dimensions.get('window').width * 0.92}
                                        tagsStyles={{ p: { marginTop: moderateScale(5), marginBottom: moderateScale(5) }, a: {fontSize: moderateScale(15)}}}
                                        ignoredStyles={['display','width','height','margin','padding']} 
                                        onLinkPress={(evt, href) => this._onLinkPress(href)}/>
                                </ScrollView>
                            </View>
                            ||
                            <View style={styles.progressBar}><ProgressBar /></View>
                        }
                        {
                            (!this.state.isLoading)
                            &&
                            <View style={styles.commentWrap}>
                                <View style={styles.socialButtonWrap}>
                                    <TouchableOpacity style={styles.socialButton} onPress={() => this._onClickLike()}>
                                        <Image resizeMode="contain" style={styles.socialButtonIcon} source={this.state.newsDetail.icon_like} />
                                        <Text style={styles.socialButtonText}>{this.state.newsDetail.nlike}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialButton}>
                                        <Image resizeMode="contain" style={styles.socialButtonIcon} source={require('../../images/sc-chat.png')} />
                                        <Text style={styles.socialButtonText}>{this.state.newsDetail.ncmt}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialButton}>
                                        <Image resizeMode="contain" style={styles.socialButtonIcon} source={require('../../images/sc-eye.png')} />
                                        <Text style={styles.socialButtonText}>{this.state.newsDetail.nview}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        {
                            (!this.state.isLoading)
                            &&
                            <Comment
                                comments={this.state.newsDetail.comments}
                                onPress={() => this._onClickComment()}
                                value={this.state.contentComment}
                                onChange={(contentComment) => this.setState({contentComment})}
                                userInfor={this.props.userInfor}/>
                        }
                        {
                            (!this.state.isLoading)
                            &&
                            <FlatList

                                data={this.state.newsDetail.relatedNews}
                                style={{marginTop: 20}}
                                renderItem={
                                    ({item}) =>
                                        <SmallPostItem
                                            title={item.title}
                                            subtitle={item.subtitle}
                                            background={{uri: item.thumbnail}}
                                            onPress={()=>this._goDetail(item)}
                                            areaTitle={item.area_name}
                                            areaType={item.area_type}
                                            pushlishDate={item.publish_date}
                                            showDate={true}
                                            isVideo={!_.isEmpty(item.video_url) ? true : false}
                                            />
                                }
                                keyExtractor={(item, index) => index} />
                        }
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const videoStyle = StyleSheet.create({
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
        width: moderateScale(200),
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
        shadowRadius: moderateScale(2),
        shadowOpacity: 1,
    },
    play: {
        width: moderateScale(32),
        height: verticalScale(32)
    }
});

const stylesHtml = StyleSheet.create({
    p: {paddingHorizontal: 20, textAlign: 'justify', alignSelf: 'stretch', alignItems: 'center', flex: 1},
    div: {paddingHorizontal: 20, textAlign: 'justify', alignSelf: 'stretch', alignItems: 'center', flex: 1},
    img: {
        width: '100%',
        height: 'auto',
    }
});

function mapStateToProps(state) {
    return  {
        userInfor: state.userInfor
    }
}

export default connect(mapStateToProps, actionCreators)(Article);
