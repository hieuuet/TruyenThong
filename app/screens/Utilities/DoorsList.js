//@flow
import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity, ScrollView, FlatList, RefreshControl} from "react-native";
import DoorListItem from '../../components/DoorListItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';

import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';


import Util from '../../configs/util';
import _ from 'lodash';
import Constant from '../../configs/constant';

import EmptyMsg from "../../components/EmptyMsg";
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class DoorsList extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            sensors : [],
            loading: false,
            nextPage : 1,
            shouldLoadMore : true,
            isError : false,
            type: this.props.navigation.state.params.type,
            title: this.props.navigation.state.params.type == Constant.IOT.DOOR ? 'Cảnh báo mở cửa' : (this.props.navigation.state.params.type == Constant.IOT.SMOKE ? 'Cảnh báo cháy' : 'Cảnh báo chuyển động'),
            image_local: this.props.navigation.state.params.type == Constant.IOT.DOOR ? require('../../images/utilities/small/door.png') : (this.props.navigation.state.params.type == Constant.IOT.SMOKE ? require('../../images/utilities/small/firesmoke_1.png') : require('../../images/utilities/small/movement_1.png')),
            image_local_item: this.props.navigation.state.params.type == Constant.IOT.DOOR ? require('../../images/temp/French-Door-2-handles.jpg') : (this.props.navigation.state.params.type == Constant.IOT.SMOKE ? require('../../images/utilities/icon-fire.png') : require('../../images/utilities/icon-movement.png')),
        };
    }

    componentWillMount() {

        this._getSensorList(1, this.state.type, true);      // Type = 12: cảm biến cửa
    }

    _getSensorList = (page, type, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }
        Api.getSensorList(page, type).then(res => {
            console.log('res getSensorList');
            console.log(res);
            this.setState({loading : false});
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                if (res.javaResponse.sensors.length > 0) {
                    if(page == 1) {
                      this.setState({sensors : res.javaResponse.sensors, nextPage : page + 1, shouldLoadMore : true, isError: false});
                    } else {
                      var sensors = [...this.state.sensors, ...res.javaResponse.sensors];
                      this.setState({sensors : sensors, nextPage : page + 1, shouldLoadMore : true, isError: false});
                    }
                } else {
                    if (page == 1) {
                        this.setState({sensors : [], nextPage : 1, shouldLoadMore : false, isError: true});
                    } else {
                        this.setState({shouldLoadMore : false, isError: false});
                    }
                }
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            this.setState({loading : false, isError : true});
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    _goToDoorDetail(item) {
        item.type = this.state.type;
        this.props.navigation.navigate('DoorDetail', {sensor : item});
    }

    renderItem(item) {

        return (
            <DoorListItem
                onPress={()=> this._goToDoorDetail(item)}
                background={this.state.image_local_item}
                item={item} />
        );
    }

    retrieveNextPage = () => {
        if (this.state.shouldLoadMore) {
            this._getSensorList(this.state.nextPage, this.state.type, false);
        }
    }

    _onRefresh = () => {
      this._getSensorList(1, this.state.type, true);      // Type = 12: cảm biến cửa
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (
            <View style={[styles.container], { height:'100%'}}>
                {
                    (this.state.loading) && <LoadingSpinner hasBackground={false}/>
                }

                {
                    (this.state.isError) &&
                    <EmptyMsg onPress={() => this._onRefresh()}/>
                }

                <ScrollView
                    style={{zIndex: 10001}}
                    keyboardShouldPersistTaps={'handled'}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this._onRefresh}
                            colors={['#EA0000']}
                            tintColor="#848484"
                            title="Đang tải..."
                            titleColor="#848484"
                            progressBackgroundColor="white"
                        />
                    }>

                    {
                        (!this.state.loading) &&

                        <ScrollView style={{zIndex: 5}} keyboardShouldPersistTaps={'handled'}>
                            <View style={styles.header}>
                                <Image source={require('../../images/iotbg.jpg')} resizeMode="cover" style={styles.cover} />
                                <Image source={this.state.image_local} resizeMode="contain" style={styles.coverIcon} />
                                <Text style={styles.pageTitle}>{this.state.title.toUpperCase()}</Text>
                                <TouchableOpacity style={[styles.backButton]} onPress={() => goBack()}>
                                    <Image style={styles.backIcon} source={require('../../images/back-white.png')} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                            {
                              (!_.isEmpty(this.state.sensors))
                              &&
                                <View style={[globalStyles.contentCard,{marginTop: -moderateScale(20), paddingHorizontal: 0}]}>
                                    <View style={styles.paddingContent}>
                                        <Text style={globalStyles.label}>DANH SÁCH CẢM BIẾN</Text>
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
                            }
                        </ScrollView>
                    }
                </ScrollView>
            </View>
        );
    }
}
export default DoorsList;
