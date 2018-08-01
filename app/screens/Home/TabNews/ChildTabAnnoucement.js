import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    RefreshControl
} from "react-native";
import styles from './styles';
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
import EmptyMsg from "../../../components/EmptyMsg";

import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { scale, moderateScale, verticalScale} from '../../../components/Scaling';

class ChildTabAnnoucement extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            records: [],
            record : null,
            changeAudioModalVisible: false,
            isError : false,
            loading: false,
            nextPage : 1,
            shouldLoadMore : true
        };

        this.setAudioModalVisible = this.setAudioModalVisible.bind(this);
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
            this.setState({loading : true, isError : false});
        }
        Api.getRecords(area_id, page).then(res => {
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                _.forEach(res.javaResponse.records, function(val) {
                    if(!_.isEmpty(val.publish_date)) {
                        val.publish_date = Util.diffDate(val.publish_date, true);
                        val.duration = Util.convertSecondToTime(val.duration);
                    }
                });

                if (res.javaResponse.records.length > 0) {
                    if (page == 1) {
                        this.setState({loading:false, records : res.javaResponse.records, nextPage : page + 1, shouldLoadMore : true, isError : res.javaResponse.records.length == 0});
                    } else {
                        var records = [...this.state.records, ...res.javaResponse.records];
                        this.setState({loading:false, records : records, nextPage : page + 1, shouldLoadMore : true, isError : false});
                    }
                } else {
                    if (page == 1) {
                        this.setState({loading:false, records : [], nextPage : 1, shouldLoadMore : false, isError : true});
                    } else {
                        this.setState({loading:false, shouldLoadMore : false, isError : false});
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
        Api.getRecordsExcludeParent(area_id, page).then(res => {
            this.setState({loading : false});
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                _.forEach(res.javaResponse.records, function(val) {
                    if(!_.isEmpty(val.publish_date)) {
                        val.publish_date = Util.diffDate(val.publish_date, true);
                        val.duration = Util.convertSecondToTime(val.duration);
                    }
                });

                if (res.javaResponse.records.length > 0) {
                    if (page == 1) {
                        this.setState({loading:false, records : res.javaResponse.records, nextPage : page + 1, shouldLoadMore : true, isError : res.javaResponse.records.length == 0});
                    } else {
                        var records = [...this.state.records, ...res.javaResponse.records];
                        this.setState({loading:false, records : records, nextPage : page + 1, shouldLoadMore : true, isError : false});
                    }
                } else {
                    if (page == 1) {
                        this.setState({loading:false, records : [], nextPage : 1, shouldLoadMore : false, isError : true});
                    } else {
                        this.setState({loading:false, shouldLoadMore : false, isError : false});
                    }
                }
            } else {
                this.setState({loading : false, isError : true});
            }
        }).catch (error => {
            this.setState({loading : false, isError : true});
        });
    }

    renderFooter = () => {
        if(this.state.shouldLoadMore) {
            return <View style={{ height: 50 }}><ProgressBar /></View>;
        }
        return null;
    }

    setAudioModalVisible = (visible, item) => {
        this.setState({
            changeAudioModalVisible: visible,
            record: item
        });
    }

	render() {
		return (
            <View style={{height:'100%'}}>
                <AudioModal
                    changeAudioModalVisible={this.state.changeAudioModalVisible}
                    onChangeModalVisible={this.setAudioModalVisible}
                    record={this.state.record}/>
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
                        data={this.state.records}
                        renderItem={
                            ({item}) =>
                                <AnnouncementCard
                                    title={item.title}
                                    icon={require('../../../images/temp/ftn2.jpg')}
                                    time={item.publish_date}
                                    duration={item.duration}
                                    style={{marginVertical: moderateScale(16), marginHorizontal: moderateScale(12)}}
                                    onPress={()=>this.setAudioModalVisible(true, item)} />
                        }
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={() => this.renderFooter()}
        				onEndReached={this.retrieveNextPage}
        				onEndReachedThreshold={0.01}
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

export default connect(mapStateToProps, actionCreators)(ChildTabAnnoucement);
