//@flow
import React, { PureComponent } from "react";
import {View, Image, Text, TouchableOpacity, ScrollView} from "react-native";
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';
import MCheckbox from '../../components/MCheckbox';
import MButton from '../../components/MButton';
import CreditCard from '../../components/CreditCard';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';

import Util from '../../configs/util';
import _ from 'lodash';
import moment from 'moment';
import Constant from '../../configs/constant';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class DoorToggle extends PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isStartDateTimePickerVisible: false,
            isEndDateTimePickerVisible: false,
            selectedDays : [false, false, false, false, false, false, false],
            startTime: '00:00',
            endTime: '23:59',
            schedule: this.props.navigation.state.params.schedule,
            mode: this.props.navigation.state.params.schedule.mode,
            image_local: this.props.navigation.state.params.schedule.type == Constant.IOT.DOOR ? require('../../images/utilities/small/door.png') : (this.props.navigation.state.params.schedule.type == Constant.IOT.SMOKE ? require('../../images/utilities/small/firesmoke_1.png') : require('../../images/utilities/small/movement_1.png')),

        }
    }

    componentWillMount() {
        let schedule = this.state.schedule;
        if(_.isEmpty(this.state.schedule.from_time)) {
            schedule.from_time = '00:00';
        }

        if(_.isEmpty(this.state.schedule.to_time)) {
            schedule.to_time = '23:59';
        }
        if(this.state.mode == '1') {
            if(!_.isEmpty(this.state.schedule.weekday)) {
                let arrWeek = this.state.selectedDays;
                for(let i = 0; i < this.state.schedule.weekday.length; ++i) {
                    arrWeek[this.state.schedule.weekday[i]-1] = true;
                }

                this.setState({
                    selectedDays: arrWeek,
                    startTime: this.state.schedule.from_time,
                    endTime: this.state.schedule.to_time,
                    schedule: schedule
                })
            }
        }
    }

    _showStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: true });
    _hideStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: false });

    _showEndDateTimePicker = () => this.setState({ isEndDateTimePickerVisible: true });
    _hideEndDateTimePicker = () => this.setState({ isEndDateTimePickerVisible: false });

    _handleStartDatePicked = (date, ) => {
        console.log('startDate:');
        console.log(date);
        console.log('_handleStartDatePicked');
        let startTime = Util.getTimeFromDate(date);
        let schedule = {};
        schedule = this.state.schedule;
        schedule.from_time = startTime;
        this.setState({startTime, schedule: schedule});
        this._hideStartDateTimePicker();
    }

    _handleEndDatePicked = (date, ) => {
        console.log('endDate:');
        console.log(date);
        console.log('_handleEndDatePicked');
        let endTime = Util.getTimeFromDate(date);
        let schedule = {};
        schedule = this.state.schedule;
        schedule.from_time = this.state.schedule.from_time;
        schedule.to_time = endTime;
        this.setState({endTime, schedule: schedule});
        this._hideEndDateTimePicker();
    }

    toggleDay = (dayIndex) => {
        console.log('toggleDay');
        var selectedDays = [...this.state.selectedDays];
        selectedDays[dayIndex] = !this.state.selectedDays[dayIndex];
        this.setState({
            selectedDays : selectedDays
        })
    }

    _onSave = () => {
        console.log('onSave');
        console.log(this.state.schedule);
        console.log(this.state.selectedDays);

        let arrDays = [];

        for (let i=0; i<this.state.selectedDays.length;i++) {
            if (this.state.selectedDays[i]) {
                arrDays.push(i+1);
            }
        }

        if(this.state.schedule.mode == '1') {
            if(_.isEmpty(arrDays)) {
                Util.showAlert('Chưa nhập ngày cảnh báo. Vui lòng kiểm tra lại!');
                return;
            }
        }

        let params = {
            id: this.state.schedule.sensor_id,
            weekday: !_.isEmpty(arrDays) ? arrDays : null, // empty la tat canh bao
            from_time: !_.isEmpty(this.state.schedule.from_time) ? this.state.schedule.from_time : null,
            to_time: !_.isEmpty(this.state.schedule.to_time) ? this.state.schedule.to_time : null,
            noti_id: this.state.schedule.noti_id,// null = ko cảnh báo,
            mode: this.state.schedule.mode
        };

        Api.updateDoorWarningSchedule(params).then(res => {
            console.log('updateDoorWarningSchedule');
            console.log(res);
            if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                Util.showSuccess('Cập nhật cảnh báo cửa thành công!', () => {
                    this.props.navigation.goBack(this.props.navigation.state.params.sensorListKey);
                });
            } else {
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(res, navigate);
            }
        }).catch (error => {
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    _onPressWarning = (option) => {
        let schedule = {};
        schedule = this.state.schedule;
        schedule.mode = option.mode;

        // tat
        if(option.mode == '0') {

        }
        // theo lich
        if(option.mode == '1') {
            // schedule.from_time = this.state.schedule.from_time;
            // schedule.to_time = endTime;
        }
        // luon canh bao
        if(option.mode == '2') {

        }
        this.setState({
            mode: option.mode,
            // schedule: schedule
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (
            <View style={styles.container}>
                { (this.state.loading) && <LoadingSpinner hasBackground={true}/> }

                <ScrollView style={{zIndex: 5}} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.header}>
                        <Image source={require('../../images/iotbg.jpg')} resizeMode="cover" style={styles.cover} />
                        <Image source={this.state.image_local} resizeMode="contain" style={styles.coverIcon} />
                        <Text style={styles.pageTitle}>CẤU HÌNH: {this.state.schedule.sensor_name}</Text>
                        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                            <Image style={styles.backIcon} source={require('../../images/back-white.png')} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={[globalStyles.contentCard,{ marginTop: -moderateScale(20), paddingHorizontal: 0}]}>
                        <View style={styles.paddingContent}>
                            <Text style={globalStyles.label}>CẢNH BÁO</Text>
                        </View>
                        <MCheckbox onPress={this._onPressWarning} ref="cardType" currentValue={this.state.schedule.mode == '1' ? 'schedule' : (this.state.schedule.mode == '2' ? 'on' : 'off')} options={[{value: 'schedule', label: 'THEO LỊCH', mode: '1'},{value: 'on', label: 'LUÔN CẢNH BÁO', mode: '2'}, {value: 'off', label: 'TẮT', mode: '0'}]} />
                        <View style={{marginBottom: moderateScale(5)}}></View>

                        {
                            (this.state.mode == '1')
                            &&
                            <View style={styles.paddingContent}>
                                <Text style={globalStyles.label}>THỜI GIAN BẬT CẢNH BÁO</Text>
                                <TouchableOpacity style={styles.timePickerInput} onPress={this._showStartDateTimePicker}>
                                    <Image resizeMode="contain" style={styles.timePickerInputIcon} source={require('../../images/calendar.png')} />
                                    <Text style={{fontSize: moderateScale(14)}}>{this.state.startTime}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    date={moment(this.state.schedule.from_time, 'HH:mm').toDate()}
                                    mode={'time'}
                                    titleIOS={'Chọn thời gian'}
                                    isVisible={this.state.isStartDateTimePickerVisible}
                                    onConfirm={this._handleStartDatePicked}
                                    onCancel={this._hideStartDateTimePicker}
                                />
                                <Text style={globalStyles.label}>THỜI GIAN TẮT CẢNH BÁO</Text>
                                <TouchableOpacity style={styles.timePickerInput} onPress={this._showEndDateTimePicker}>
                                    <Image resizeMode="contain" style={styles.timePickerInputIcon} source={require('../../images/calendar.png')} />
                                    <Text style={{fontSize: moderateScale(14)}}>{this.state.endTime}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    date={moment(this.state.schedule.to_time, 'HH:mm').toDate()}
                                    mode={'time'}
                                    titleIOS={'Chọn thời gian'}
                                    isVisible={this.state.isEndDateTimePickerVisible}
                                    onConfirm={this._handleEndDatePicked}
                                    onCancel={this._hideEndDateTimePicker}
                                />
                                <Text style={globalStyles.label}>NGÀY CẢNH BÁO</Text>
                                <View style={styles.payCardWrapper}>
                                    <CreditCard style={styles.doorDateCard} isSelected={this.state.selectedDays[0]} onPress={() => this.toggleDay(0)} title={'T2'}/>
                                    <CreditCard style={styles.doorDateCard} isSelected={this.state.selectedDays[1]} onPress={() => this.toggleDay(1)} title={'T3'}/>
                                    <CreditCard style={styles.doorDateCard} isSelected={this.state.selectedDays[2]} onPress={() => this.toggleDay(2)} title={'T4'}/>
                                    <CreditCard style={styles.doorDateCard} isSelected={this.state.selectedDays[3]} onPress={() => this.toggleDay(3)} title={'T5'}/>
                                    <CreditCard style={styles.doorDateCard} isSelected={this.state.selectedDays[4]} onPress={() => this.toggleDay(4)} title={'T6'}/>
                                </View>
                                <View style={styles.payCardWrapper}>
                                    <CreditCard style={styles.doorDateCard} isSelected={this.state.selectedDays[5]} onPress={() => this.toggleDay(5)} title={'T7'}/>
                                    <CreditCard style={styles.doorDateCard} isSelected={this.state.selectedDays[6]} onPress={() => this.toggleDay(6)} title={'CN'}/>
                                    <CreditCard style={[styles.doorDateCard,{opacity: 0}]} />
                                    <CreditCard style={[styles.doorDateCard,{opacity: 0}]} />
                                    <CreditCard style={[styles.doorDateCard,{opacity: 0}]} />
                                </View>
                            </View>

                        }
                    </View>
                    <View style={{marginHorizontal: moderateScale(15), marginBottom: moderateScale(40)}}>
                        <MButton onPress={this._onSave} style={{height: verticalScale(48)}} label={'LƯU THAY ĐỔI'}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default DoorToggle;
