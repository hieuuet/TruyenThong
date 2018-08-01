import React, { Component, PureComponent} from 'react';
import {Text, FlatList, Dimensions, Image, ScrollView, View, RefreshControl} from "react-native";
import styles from '../styles';
import globalStyles from '../../../resources/styles';
import ServiceCard from '../../../components/ServiceCard';
import PromotionCard from '../../../components/PromotionCard';
import Tag from "../../../components/Tag";
import EmptyMsg from "../../../components/EmptyMsg";
import MButton from '../../../components/MButton';
import FeaturedPost from '../../../components/FeaturedPost';
import SmallPostItem from '../../../components/SmallPostItem';
import SurveyCard from '../../../components/SurveyCard';
import AnnouncementCard from '../../../components/AnnouncementCard';
import AudioModal from '../../../components/AudioModal';
import Util from '../../../configs/util';
import Api from '../../../api/api';
import _ from 'lodash';
import Constant from '../../../configs/constant';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actionCreators';
import ProgressBar from '../../../components/ProgressBar';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AdsSlider from '../../../components/AdsSlider';
import SliderPagination from '../../../components/SliderPagination';
import Carousel from 'react-native-snap-carousel';

import { scale, moderateScale, verticalScale} from '../../../components/Scaling';

const win = Dimensions.get('window');

class TabHot extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            utils: [],
            hashtags: [],
            news: [],
            survey: null,
            newsHighlight: null,
            loading: true,
            changeAudioModalVisible: false,
            activeSlide: 0,
            record: null,
            isError: false,
            currentPage : 1,
            loadMore: false,
            enableAdsHomepage: 0
        };

        this.setAudioModalVisible = this.setAudioModalVisible.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentWillMount() {

        try {
            this.loadData(this.props.currentWard.id, 1);
        } catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(nextProps) {
        
        if (this.props.currentArea !== null && nextProps.currentArea === null) {
            console.log('case 1');
            this.loadData(this.props.currentWard.id, 1);
        } else if (this.props.currentArea === null && nextProps.currentArea !== null) {
            console.log('case 2');
            this.loadData(nextProps.currentArea.id, 0);
        } else if (this.props.currentArea !== null && nextProps.currentArea !== null && this.props.currentArea.id != nextProps.currentArea.id) {
            console.log('case 3');
            this.loadData(nextProps.currentArea.id, 0);
        } else if (this.props.currentWard.id != nextProps.currentWard.id) {
            console.log('case 4');
            this.loadData(nextProps.currentWard.id, 1);
        }
    }

    loadData(area_id, is_parent) {
        console.log('loadData TabHot.js: ' + area_id);
        this.getHomePageData(area_id, is_parent);
        this.getBadges(area_id);
        Util.getItem('SAVED_CONFIGS', true).then(configs => {
            console.log('configs from tab hot');
            if(configs != null) {
              console.log(configs);
              this.setState({enableAdsHomepage : configs.enable_ads_homepage});
            }
        });
    }

    getHomePageData = (area_id, is_parent) => {
        this.setState({ loading : true, isError : false });
        Api.getHomePageData(area_id, is_parent).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                console.log('res.javaResponse.news getHomePageData');
                console.log(res);
                let arrNews = [];
                let newsHighlight = null;
                if(!_.isEmpty(res.javaResponse.news)) {
                    
                    newsHighlight = res.javaResponse.news[0];
                    if(!_.isEmpty(newsHighlight.publish_date)) {
                        newsHighlight.publish_date = Util.diffDate(newsHighlight.publish_date);
                    }

                    _.forEach(res.javaResponse.news, function(val) {
                        if(newsHighlight.id != val.id) {
                            if(!_.isEmpty(val.publish_date)) {
                                val.publish_date = Util.diffDate(val.publish_date);
                                arrNews.push(val);
                            }
                        }
                    });
                }

                let survey = null;
                if (!_.isEmpty(res.javaResponse.surveys)) {
                    survey = res.javaResponse.surveys[0];
                }

                // Hardcode for test
                // survey = {
                //     id : 1,
                //     title : 'Hà Nội: Lấy ý kiến cộng đồng người dân về việc nạo vét Hồ Gươm',
                //     publish_date: 'Còn 12 ngày 10 tiếng',
                //     img : 'http://itdev.mobifone.vn/hnrespository/resource/images/20170831144840_11.jpg'
                // };

                let records = [];
                if (!_.isEmpty(res.javaResponse.records)) {
                    _.forEach(res.javaResponse.records, function(record) {
                        record.publish_date = Util.diffDate(record.publish_date, true);
                        record.duration = Util.convertSecondToTime(record.duration);
                    });
                    records = res.javaResponse.records;
                    records = records.length > 10 ? records.slice(0, 10): records; // get only 6 records for better display
                }

                let hashtags = [];
                if (!_.isEmpty(res.javaResponse.hashtags)) {
                    hashtags = res.javaResponse.hashtags;
                }

                var shouldLoadMore = false;
                if(!_.isEmpty(res.javaResponse.news)) {
                    shouldLoadMore = true;
                }
                this.setState({
                    news: arrNews,
                    newsHighlight: newsHighlight,
                    records: records,
                    utils: res.javaResponse.utils,
                    hashtags: hashtags,
                    survey: survey,
                    loading : false,
                    isError : records.length == 0 &&  arrNews.length == 0,
                    loadMore: shouldLoadMore
                });
            } else {
                this.setState({
                    loading : false,
                    isError : true,
                    loadMore: false
                });
            }
        }).catch (error => {
            this.setState({
                loading: false,
                isError : true,
                loadMore: false
            });
        });
    }

    _onRefresh() {
        this.setState({
                currentPage : 1,
                loadMore: false
            },
            () => {
                if(!_.isEmpty(this.props.currentArea)) {
                    if(this.props.currentArea === null) {
                        this.loadData(this.props.currentWard.id, 1);
                    } else {
                        this.loadData(this.props.currentArea.id, 0);
                    }
                } else {
                    this.loadData(this.props.currentWard.id, 1);
                }
            }
        );
	}

    getBadges = (area_id) => {
        Api.getTabBadges(area_id).then(res => {
            if (res.code === 'SUCCESS') {
                this.props.changeBadgesAction([
                    res.javaResponse.homeBadge,
                    res.javaResponse.newsBadge,
                    0,
                    0,
                    0,
                    res.javaResponse.provinceBadge,
                    res.javaResponse.districtBadge
                ]);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    setAudioModalVisible = (visible, item) => {
        console.log('setAudioModalVisible TabHot');
        this.setState({changeAudioModalVisible: visible, record: item});
    }

    renderListHashtags() {
      return this.state.hashtags.map(function(tag, i) {
          return (
              <Tag style={globalStyles.roundedTag} textStyle={{fontSize: 16}} label={'#' + tag.title} key={tag.id} />
          );
      });
    }

    _renderAnnoucementItem = ({item, index}) => {
        return (
            <View style={{paddingHorizontal: moderateScale(20), width: win.width}} >
            <AnnouncementCard
                style={{width: '100%', height: verticalScale(110), alignSelf: 'center'}}
                title={item.title}
                time={item.publish_date}
                duration={item.duration}
                icon={item.icon}
                key={index}
                onPress={()=>this.setAudioModalVisible(true, item)} />
            </View>
        );
    }

    get pagination () {
        return (
            <SliderPagination ref="sliderPagination" length={this.state.records.length} />
        );
    }

    _goDetail(item) {
        this.props.navigation.navigate('Article', {news : item});
    }

    async _goTabNews(item) {
        await this.props.goToPage(1);
        // tinh/ thanh pho
        if(item.area.area_type_id == '1') {
            // this.props.goToPage();
            this.props.changeAreaAction(item.area);
        }
        // quan/ huyen
        if(item.area.area_type_id == '2') {
            this.props.changeAreaAction(item.area);
        }
    }

    _goTabService() {
        this.props.goToPage(3);
    }

    _retrieveNextPage() {
        this.setState({ loading: true });
        if(!this.state.loading && this.state.loadMore) {
            let page = this.state.currentPage + 1;
            if(page > 1) {
                if(!_.isEmpty(this.props.currentArea)) {
                    this._getNewsIncludeParent(this.props.currentArea.id, page);
                } else {
                    this._getNewsIncludeParent(this.props.currentWard.id, page);
                }
            }
        } else {
            this.setState({ loading: false });
        }

	}

    _getNewsIncludeParent(area_id, page) {
        Api.getNewsIncludeParent(area_id, page).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                let news = [];
                if(!_.isEmpty(res.javaResponse.news)) {
                    _.forEach(res.javaResponse.news, function(val) {
                        if(!_.isEmpty(val.publish_date)) {
                            val.publish_date = Util.diffDate(val.publish_date);
                            news.push(val);
                        }
                    });

                }
                let arr = [...this.state.news, ...news];

                var shouldLoadMore = false;
                if(!_.isEmpty(res.javaResponse.news)) {
                    shouldLoadMore = true;
                }
                this.setState({
                    news : [...this.state.news, ...news],
                    loading: false,
                    currentPage: page,
                    loadMore: shouldLoadMore
                });
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            this.setState({ loading: false });
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    _renderFooter() {
        return (
            <View>
                {
                    (this.state.loading) &&
                    <ProgressBar style={{ height: 50 }}/>
                }
            </View>
        );
    }

	render() {
        const { navigate } = this.props.navigation;

        console.log("Render tab hot");

		const services = [
            {key: 'Nạp tiền điện thoại', icon: require('../../../images/utilities/naptiendienthoai.png')},
            {key: 'Mua thẻ Vina', icon: require('../../../images/utilities/muathedienthoai.png')},
            {key: 'Mua thẻ Mobi', icon: require('../../../images/utilities/muathedienthoai.png')},
            {key: 'Nạp tiền Viettel', icon: require('../../../images/utilities/naptiendienthoai.png')},
            {key: 'Hoá đơn Internet', icon: require('../../../images/utilities/hoadoninternet.png')}
        ];

        var {height, width} = Dimensions.get('window');

		return (
            <View style={{height:'100%'}}>
                {
                    (this.state.loading) && <LoadingSpinner hasBackground={false}/>
                }
                {
                    (this.state.isError) &&
                    <EmptyMsg onPress={() => this._onRefresh()}/>
                }
                <AudioModal
                    changeAudioModalVisible={this.state.changeAudioModalVisible}
                    onChangeModalVisible={this.setAudioModalVisible}
                    record={this.state.record}/>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this._onRefresh()}
                            colors={['#EA0000']}
                            tintColor="#848484"
                            title="Đang tải..."
                            titleColor="#848484"
                            progressBackgroundColor="white"
                        />
                    }
                    onMomentumScrollEnd={(e)=>{
                        var windowHeight = Dimensions.get('window').height,
                            height = e.nativeEvent.contentSize.height,
                            offset = e.nativeEvent.contentOffset.y;
                        var paddingToBottom = 40;
                        if( windowHeight + offset >= height - paddingToBottom){
                            // this._retrieveNextPage();
                        }
                    }}>

                    <View style={[styles.page]}>
                        {
                            (!this.state.loading && !this.state.isError && this.state.records.length > 0)
                            &&
                            <View style={[styles.annHeader]}>
                                <Carousel
                                  ref={(c) => { this._carousel = c; }}
                                  data={this.state.records}
                                  loop={false}
                                  renderItem={this._renderAnnoucementItem}
                                  sliderWidth={win.width}
                                  itemWidth={win.width}
                                  enableMomentum={true}
                                  onSnapToItem={index => {this.refs.sliderPagination.setActiveSlide(index )}}
                                />
                                { this.pagination }
                                <Image resizeMode="cover" style={styles.annHeaderBg} source={require('../../../images/servicebg.jpg')} />
                            </View>
                        }

                        {
                            (!this.state.loading && !this.state.isError && this.state.utils.length > 0)
                            &&
                            <View style={styles.serviceWrapper}>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.utils}
                                    style={{paddingBottom: moderateScale(15)}}
                                    renderItem={({item}) =>
                                        <ServiceCard
                                            key={item.key}
                                            style={styles.serviceCard}
                                            label={item.key}
                                            icon={item.icon} />
                                    }
                                />
                            </View>
                        }

                        {
                            (!this.state.loading && !this.state.isError && this.state.enableAdsHomepage == 1) &&
                            <AdsSlider width={width} />
                        }

                        {
                            (!this.state.loading && !this.state.isError)
                            &&
                            <View style={styles.tagsWrapper}>
                                {
                                    (this.state.hashtags.length > 0)
                                    &&
                                    this.renderListHashtags()
                                }
                            </View>
                        }

                        {/*
                        {
                            (!this.state.loading && !this.state.isError && this.state.survey)
                            &&
                            <SurveyCard
                                style={{marginHorizontal: moderateScale(12), backgroundColor: 'white'}}
                                title={this.state.survey.title}
                                subtitle={this.state.survey.publish_date}
                                background={{uri: this.state.survey.img}}
                                onPress={()=>this.props.navigation.navigate('SurveyDetail')} />
                        }
                        */}

                        {
                            (!this.state.loading && !this.state.isError && this.state.news && this.state.newsHighlight)
                            &&
                            <View style={{flex: 1}}>
                                <FeaturedPost
                                    showDate={true}
                                    style={{marginTop: moderateScale(12)}}
                                    title={this.state.newsHighlight.title}
                                    subtitle={this.state.newsHighlight.short_description}
                                    pushlishDate={this.state.newsHighlight.publish_date}
                                    background={{uri: this.state.newsHighlight.thumbnail}}
                                    areaTitle={this.state.newsHighlight.area_name}
                                    areaType={this.state.newsHighlight.area_type}
                                    isVideo={!_.isEmpty(this.state.newsHighlight.video_url) ? true : false}
                                    onPress={this._goDetail.bind(this, this.state.newsHighlight)} />
                                <FlatList
                                    scrollEnabled={false}
                                    data={this.state.news}
                                    style={{marginTop: 0}}
                                    renderItem={
                                        ({item}) => <SmallPostItem isVideo={!_.isEmpty(item.video_url) ? true : false} showDate={true} areaType={item.area_type} areaTitle={item.area_name} title={item.title} background={{uri: item.thumbnail}} onPress={()=>this._goDetail(item)} pushlishDate={item.publish_date} />
                                    }
                                    keyExtractor={(item, index) => index}
                                    ListFooterComponent={() => this._renderFooter()}
                                    shouldItemUpdate={(props,nextProps) => {
                                        return props.item!==nextProps.item
                                    }} />
                            </View>
                        }

                    </View>
                </ScrollView>
            </View>
        );
	}
}

function mapStateToProps(state) {
    return  {
        currentCity : state.currentCity,
        currentProvince : state.currentProvince,
        currentWard : state.currentWard,
        currentArea : state.currentArea,
        badges : state.badges
    }
}

export default connect(mapStateToProps, actionCreators)(TabHot);
