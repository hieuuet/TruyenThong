import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    RefreshControl
} from "react-native";
import styles from './styles';
import FeaturedPost from '../../../components/FeaturedPost';
import SmallPostItem from '../../../components/SmallPostItem';
import PromotionCard from '../../../components/PromotionCard';
import LoadingSpinner from '../../../components/LoadingSpinner';

import Util from '../../../configs/util';
import Api from '../../../api/api';
import _ from 'lodash';
import Constant from '../../../configs/constant';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actionCreators';
import ProgressBar from '../../../components/ProgressBar';
import EmptyMsg from "../../../components/EmptyMsg";

import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { scale, moderateScale, verticalScale} from '../../../components/Scaling';

class ChildTabNews extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            news : [],
            newsHighlight: null,
            isError : false,
            loading: false,
            nextPage : 1,
            shouldLoadMore : true
        };
    }

    componentWillMount() {
        if (this.props.currentArea === null) {
            this.loadDataIncludeParent(this.props.currentWard.id, 1, true);
        } else {
            this.loadDataNotIncludeParent(this.props.currentArea.id, 1, true);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentArea !== null && nextProps.currentArea === null) {
            this.loadDataIncludeParent(this.props.currentWard.id, 1, true);
        } else if (this.props.currentArea === null && nextProps.currentArea !== null) {
            this.loadDataNotIncludeParent(nextProps.currentArea.id, 1, true);
        } else if (this.props.currentArea !== null && nextProps.currentArea !== null && this.props.currentArea.id != nextProps.currentArea.id) {
            this.loadDataNotIncludeParent(nextProps.currentArea.id, 1, true);
        } else if (this.props.currentWard.id != nextProps.currentWard.id) {
            this.loadDataIncludeParent(nextProps.currentWard.id, 1, true);
        }
    }

    onRefresh = () => {
        if (this.props.currentArea === null) {
            this.loadDataIncludeParent(this.props.currentWard.id, 1, true);
        } else {
            this.loadDataNotIncludeParent(this.props.currentArea.id, 1, true);
        }
    }

    retrieveNextPage = () => {
        if (this.state.shouldLoadMore) {
            if (this.props.currentArea === null) {
                this.loadDataIncludeParent(this.props.currentWard.id, this.state.nextPage, false);
            } else {
                this.loadDataNotIncludeParent(this.props.currentArea.id, this.state.nextPage, false);
            }
        }
    }

    loadDataIncludeParent = (area_id, page, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError: false});
        }
        Api.getNewsIncludeParent(area_id, page).then(res => {
            this.setState({loading : false});
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                _.forEach(res.javaResponse.news, function(val) {
                    if(!_.isEmpty(val.publish_date)) {
                        val.publish_date = Util.diffDate(val.publish_date);
                    }
                });

                if (res.javaResponse.news.length > 0) {
                    if (page == 1) {
                        let arrNews = [];
                        _.forEach(res.javaResponse.news, function(val) {
                            if(val.id != res.javaResponse.news[0].id) {
                                arrNews.push(val);
                            }
                        });
                        this.setState({news : arrNews, newsHighlight: res.javaResponse.news[0], nextPage : page + 1, shouldLoadMore : true, isError : res.javaResponse.news.length == 0});
                    } else {
                        var news = [...this.state.news, ...res.javaResponse.news];
                        this.setState({news : news, nextPage : page + 1, shouldLoadMore : true, isError : false});
                    }
                } else {
                    if (page == 1) {
                        this.setState({news : [], newsHighlight: null, nextPage : 1, shouldLoadMore : false, isError : true});
                    } else {
                        this.setState({shouldLoadMore : false, isError : false});
                    }
                }
            } else {
                this.setState({loading : false, isError : true});
            }
        }).catch (error => {
            this.setState({loading : false, isError : true});
        });
    }

    loadDataNotIncludeParent = (area_id, page, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }
        Api.getNews(area_id, page).then(res => {
            this.setState({loading : false});
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                _.forEach(res.javaResponse.news, function(val) {
                    if(!_.isEmpty(val.publish_date)) {
                        val.publish_date = Util.diffDate(val.publish_date);
                    }
                });

                if (res.javaResponse.news.length > 0) {
                    if (page == 1) {
                        let arrNews = [];
                        _.forEach(res.javaResponse.news, function(val) {
                            if(val.id != res.javaResponse.news[0].id) {
                                arrNews.push(val);
                            }
                        });
                        this.setState({news : arrNews, newsHighlight: res.javaResponse.news[0], nextPage : page + 1, shouldLoadMore : true, isError : res.javaResponse.news.length == 0});
                    } else {
                        var news = [...this.state.news, ...res.javaResponse.news];
                        this.setState({news : news, nextPage : page + 1, shouldLoadMore : true, isError : false});
                    }
                } else {
                    if (page == 1) {
                        this.setState({news : [], newsHighlight: null, nextPage : 1, shouldLoadMore : false, isError : true});
                    } else {
                        this.setState({shouldLoadMore : false, isError : false});
                    }
                }
            } else {
                this.setState({loading : false, isError : true});
            }
        }).catch (error => {
            this.setState({loading : false, isError : true});
        });
    }

    renderHeader() {
        if (this.state.newsHighlight) {
            return (
                <FeaturedPost
                    showDate={true}
                    style={{marginTop: moderateScale(10)}}
                    title={this.state.newsHighlight.title}
                    subtitle={this.state.newsHighlight.short_description}
                    pushlishDate={this.state.newsHighlight.publish_date}
                    background={{uri: this.state.newsHighlight.thumbnail}}
                    onPress={this.goDetail.bind(this, this.state.newsHighlight)}
                    areaTitle={this.state.newsHighlight.area_name}
                    areaType={this.state.newsHighlight.area_type}
                    isVideo={!_.isEmpty(this.state.newsHighlight.video_url) ? true : false}/>
            );
        }
        return null;
    }

    renderFooter = () => {
        if(this.state.shouldLoadMore) {
            return <View style={{ height: 50 }}><ProgressBar /></View>;
        }
        return null;
    }

    goDetail(item) {
        this.props.navigation.navigate('Article', {news : item});
    }

    renderItem(item) {
        return (
            <SmallPostItem
                showDate={true}
                title={item.title}
                subtitle={item.subtitle}
                areaTitle={item.area_name}
                areaType={item.area_type}
                background={{uri:item.thumbnail}}
                onPress={() => this.goDetail(item)}
                pushlishDate={item.publish_date}
                isVideo={!_.isEmpty(item.video_url) ? true : false}/>
        );
    }

	render() {
        const { navigate } = this.props.navigation;

		return (
            <View style={{height:'100%'}}>
                {
                    (this.state.loading) && <LoadingSpinner hasBackground={false}/>
                }
                {
                    (this.state.isError) &&
                    <EmptyMsg onPress={() => this.onRefresh()}/>
                }
                {
                    (!this.state.loading && !this.state.isError) &&
                    <OptimizedFlatList
                        data={this.state.news}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={(item, index) => index}
                        onEndReached={this.retrieveNextPage}
        				onEndReachedThreshold={0.01}
                        ListHeaderComponent={() => this.renderHeader()}
                        ListFooterComponent={() => this.renderFooter()}
                        shouldItemUpdate={ (props,nextProps) => { return props.item.id !== nextProps.item.id } }
                        initialNumToRender={3}
                        removeClippedSubviews={true}
                        refreshControl={
        					<RefreshControl
        						refreshing={false}
        						onRefresh={this.onRefresh}
        						colors={['#EA0000']}
        						tintColor="#848484"
        						title="Đang tải..."
        						titleColor="#848484"
        						progressBackgroundColor="white"
        					/>
        				} />
                }
            </View>
        );
	}
}

function mapStateToProps(state) {
    return  {
        currentCity : state.currentCity,
        currentProvince : state.currentProvince,
        currentWard: state.currentWard,
        currentArea : state.currentArea
    }
}

export default connect(mapStateToProps, actionCreators)(ChildTabNews);
