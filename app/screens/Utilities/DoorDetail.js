//@flow
import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity, ScrollView, FlatList, RefreshControl} from "react-native";
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';
import MCheckbox from '../../components/MCheckbox';
import MButton from '../../components/MButton';
import CreditCard from '../../components/CreditCard';
import EmptyMsg from '../../components/EmptyMsg';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';

import Util from '../../configs/util';
import _ from 'lodash';
import Constant from '../../configs/constant';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class DoorDetail extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            loading : false,
            sensor: this.props.navigation.state.params.sensor,
            history: [],
            schedule: {},
            stateName: '',
            type: this.props.navigation.state.params.sensor.type,
            image_local: this.props.navigation.state.params.sensor.type == Constant.IOT.DOOR ? require('../../images/utilities/small/door.png') : (this.props.navigation.state.params.sensor.type == Constant.IOT.SMOKE ? require('../../images/utilities/small/firesmoke_1.png') : require('../../images/utilities/small/movement_1.png')),
        }
    }

    componentWillMount() {
        this._getSensorHistory(this.state.sensor.id, 1, false);
    }

    _getSensorHistory = (id, page, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true});
        }
        Api.getSensorHistory(id, page).then(res => {
            this.setState({loading : false});
            console.log(res);
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                console.log('getSensorHistory');
                console.log(res);
                let historyList = [];
                if(!_.isEmpty(res.javaResponse.history)) {
                    _.forEach(res.javaResponse.history, function(val) {
                        if(!_.isEmpty(val.time)) {
                            val.time = Util.diffDateTimeIOT(val.time);
                            historyList.push(val);
                        }
                    });
                }
                var history = [];
                if (page == 1) {
                    history = historyList;
                } else {
                    history = [...this.state.history, ...historyList];
                }


                let schedule = {};
                if(!_.isEmpty(res.javaResponse.schedule)) {
                    schedule = res.javaResponse.schedule;
                    if(schedule.mode == '0') {
                        schedule.mode_name = 'Tắt';
                    } else if(schedule.mode == '1') {
                        schedule.mode_name = 'Theo lịch';
                    } else if(schedule.mode == '2') {
                        schedule.mode_name = 'Luôn cảnh báo';
                    } else {
                        schedule.mode_name = 'Không xác định';
                    }
                    schedule.sensor_name = this.state.sensor.name;
                    schedule.sensor_id = this.state.sensor.id;
                    schedule.type = this.state.type;
                }

                let stateName = '';
                if(!_.isEmpty(res.javaResponse.state)) {
                  if(this.state.type == Constant.IOT.DOOR) {
                    if(res.javaResponse.state == '0') {
                      stateName = 'Cửa đóng';
                    } else if(res.javaResponse.state == '1') {
                      stateName = 'Cửa mở';
                    } else {
                      stateName = 'Mất kết nối';
                    }
                  } else if(this.state.type == Constant.IOT.MOVEMENT) {
                    if(res.javaResponse.state == '0') {
                      stateName = 'Bình thường';
                    } else if(res.javaResponse.state == '1') {
                      stateName = 'Có chuyển động';
                    } else {
                      stateName = 'Mất kết nối';
                    }
                  } else if(this.state.type == Constant.IOT.SMOKE) {
                    if(res.javaResponse.state == '0') {
                      stateName = 'Bình thường';
                    } else if(res.javaResponse.state == '1') {
                      stateName = 'Có khói';
                    } else {
                      stateName = 'Mất kết nối';
                    }
                  }
                }

                if (res.javaResponse.history.length > 0) {
                    if (page == 1) {
                        this.setState({history : history, schedule: schedule, nextPage : page + 1, shouldLoadMore : true, stateName: stateName});
                    } else {
                        this.setState({history : history, nextPage : page + 1, shouldLoadMore : true, stateName: stateName});
                        // schedule.sensor = this.state.sensor;
                    }
                } else {
                    if (page == 1) {
                        this.setState({history : [], schedule: schedule, nextPage : 1, shouldLoadMore : false, stateName: stateName});
                    } else {
                        this.setState({history : history, nextPage : 1, shouldLoadMore : false, stateName: stateName});
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

    retrieveNextPage = () => {
        if (this.state.shouldLoadMore) {
            this._getSensorHistory(this.state.sensor.id, this.state.nextPage, false);
        }
    }

    onRefresh = () => {
        this._getSensorHistory(this.state.sensor.id, 1, true);
    }

    renderItem(item) {

        // cửa đóng
        if(item.state == '0') {
            return (
                <View style={styles.doorHistoryRow}>
                    <Text style={styles.doorHistoryDate}>{item.time}</Text>
                    <Text style={styles.doorHistoryTitle}>Trạng thái: {this.state.type == Constant.IOT.DOOR ? 'Cửa đóng' : 'Bình thường'}</Text>
                </View>
            )
        }
        // cửa mở
        else if(item.state == '1') {
            return (
                <View style={[styles.doorHistoryRow, styles.doorHistoryRowOpen]}>
                    <Text style={styles.doorHistoryDate}>{item.time}</Text>
                    <Text style={styles.doorHistoryTitle}>Trạng thái: {this.state.type == Constant.IOT.DOOR ? 'Cửa mở' : (this.state.type == Constant.IOT.MOVEMENT ? 'Có chuyển động' : 'Có khói')}</Text>
                </View>
            )
        }
        // mất kết nối
        else {
            return (
                <View style={[styles.doorHistoryRow, styles.doorHistoryRowOff]}>
                    <Text style={styles.doorHistoryDate}>{item.time}</Text>
                    <Text style={styles.doorHistoryTitle}>Trạng thái: Mất kết nối</Text>
                </View>
            )
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (
            <View style={styles.container}>
                { (this.state.loading) && <LoadingSpinner hasBackground={true}/> }

                <ScrollView
                    style={{zIndex: 5}}
                    keyboardShouldPersistTaps={'handled'}
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
                    }
                >
                    <View style={styles.header}>
                        <Image source={require('../../images/iotbg.jpg')} resizeMode="cover" style={styles.cover} />
                        <Image source={this.state.image_local} resizeMode="contain" style={styles.coverIcon} />
                        <Text style={styles.pageTitle}>{ this.state.sensor.name }</Text>
                        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                            <Image style={styles.backIcon} source={require('../../images/back-white.png')} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={[globalStyles.contentCard,{marginTop: -moderateScale(20), paddingHorizontal: 0}]}>
                        <View style={styles.paddingContent}>
                            <View style={styles.billRow}>
                                <Text style={styles.billRowTitle}>TRẠNG THÁI</Text>
                                <Text style={styles.billRowDesc}>{this.state.stateName}</Text>
                            </View>
                            <View style={styles.billRow}>
                                <Text style={styles.billRowTitle}>LOẠI CẢNH BÁO</Text>
                                <Text style={styles.billRowDesc}>{this.state.schedule.mode_name}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{marginHorizontal: moderateScale(15), marginBottom: moderateScale(20)}}>
                        <MButton onPress={()=>navigate('DoorToggle', {schedule : this.state.schedule, sensorListKey : this.props.navigation.state.key})} style={{height: verticalScale(48)}} label={'Cấu hình cảnh báo'}/>
                    </View>

                    <View style={[globalStyles.contentCard,{paddingHorizontal: 0, minHeight: verticalScale(200)}]}>
                        {
                            this.state.history.length > 0 &&
                            <View style={styles.paddingContent}>
                                <Text style={styles.bigTitle}>Cảnh báo gần đây:</Text>
                            </View>
                        }
                        {
                            this.state.history.length == 0 &&
                            <View style={{minHeight: verticalScale(200)}}>
                                <EmptyMsg title={'Chưa có lịch sử cảnh báo'} onPress={this.onRefresh}/>
                            </View>
                        }

                        <View style={styles.paddingContent}>
                            <FlatList
                                data={this.state.history}
                                renderItem={({item}) => this.renderItem(item)}
                                keyExtractor={(item, index) => index}
                                //onEndReached={this.retrieveNextPage}
                                //onEndReachedThreshold={0.01}
                                shouldItemUpdate={ (props,nextProps) => { return props.item.id !== nextProps.item.id } }
                                initialNumToRender={3}
                                removeClippedSubviews={true} />
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}
export default DoorDetail;
