import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl
} from "react-native";
import styles from './styles';
import FeaturedPost from '../../../components/FeaturedPost';
import SmallPostItem from '../../../components/SmallPostItem';
import PromotionCard from '../../../components/PromotionCard';
import EmptyMsg from '../../../components/EmptyMsg';
import Constant from '../../../configs/constant';
import Util from '../../../configs/util';
import Api from '../../../api/api';

export default class ChildTabDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            temperatureSensors : [],
            humiditySensors : [],
            doorSensors : [],
            fireSensors : [],
            movementSensors: []
        };
    }

    loadDoorSensor = async () => {
        var shouldLoadMore = true;
        var page = 1;
        var doorSensors = [];
        while (shouldLoadMore) {
            var res = await Api.getSensorList(page, Constant.IOT.DOOR);
            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
              console.log('loadDoorSensor');
              console.log(res.javaResponse.sensors);
                if (res.javaResponse.sensors.length > 0) {
                    doorSensors = [...doorSensors, ...res.javaResponse.sensors];
                    page++;
                } else {
                    shouldLoadMore = false;
                }
            } else {
                shouldLoadMore = false;
            }
        }
        this.setState({doorSensors});
    }

    loadTemperatureSensors = async () => {
        var shouldLoadMore = true;
        var page = 1;
        var temperatureSensors = [];
        while (shouldLoadMore) {
            var res = await Api.getSensorList(page, Constant.IOT.TEMP);
            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
              console.log('temperatureSensors');
              console.log(res.javaResponse.sensors);
                if (res.javaResponse.sensors.length > 0) {
                    temperatureSensors = [...temperatureSensors, ...res.javaResponse.sensors];
                    page++;
                } else {
                    shouldLoadMore = false;
                }
            } else {
                shouldLoadMore = false;
            }
        }
        this.setState({temperatureSensors});
    }

    loadHumiditySensors = async () => {
        var shouldLoadMore = true;
        var page = 1;
        var humiditySensors = [];
        while (shouldLoadMore) {
            var res = await Api.getSensorList(page, Constant.IOT.HUMIDITY);
            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
              console.log('loadHumiditySensors');
              console.log(res.javaResponse.sensors);
                if (res.javaResponse.sensors.length > 0) {
                    humiditySensors = [...humiditySensors, ...res.javaResponse.sensors];
                    page++;
                } else {
                    shouldLoadMore = false;
                }
            } else {
                shouldLoadMore = false;
            }
        }
        this.setState({humiditySensors});
    }

    loadFireSensors = async () => {
        var shouldLoadMore = true;
        var page = 1;
        var fireSensors = [];
        while (shouldLoadMore) {
            var res = await Api.getSensorList(page, Constant.IOT.SMOKE);
            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
              console.log('loadFireSensors');
              console.log(res.javaResponse.sensors);
                if (res.javaResponse.sensors.length > 0) {
                    fireSensors = [...fireSensors, ...res.javaResponse.sensors];
                    page++;
                } else {
                    shouldLoadMore = false;
                }
            } else {
                shouldLoadMore = false;
            }
        }
        this.setState({fireSensors});
    }

    loadMovementSensors = async () => {
        var shouldLoadMore = true;
        var page = 1;
        var movementSensors = [];
        while (shouldLoadMore) {
            var res = await Api.getSensorList(page, Constant.IOT.MOVEMENT);
            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
              console.log('loadMovementSensors');
              console.log(res.javaResponse.sensors);
                if (res.javaResponse.sensors.length > 0) {
                    movementSensors = [...movementSensors, ...res.javaResponse.sensors];
                    page++;
                } else {
                    shouldLoadMore = false;
                }
            } else {
                shouldLoadMore = false;
            }
        }
        this.setState({movementSensors});
    }

    componentWillMount() {
        this.loadTemperatureSensors();
        this.loadHumiditySensors();
        this.loadDoorSensor();
        this.loadFireSensors();
        this.loadMovementSensors();
    }

    onRefresh = () => {
        this.loadTemperatureSensors();
        this.loadHumiditySensors();
        this.loadDoorSensor();
        this.loadFireSensors();
        this.loadMovementSensors();
    }

	render() {
        const renderedTemperatureSensors =  this.state.temperatureSensors.map((sensor, index) => {
            return <View key={sensor.id + index} style={styles.envBoxCol}>
                <Image resizeMode="contain" style={styles.envBoxIcon} source={require('../../../images/temperature.png')} />
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.envBoxTitle}>{sensor.name}</Text>
                    {
                      (sensor.state == '15')
                      &&
                      <Text style={[styles.envBoxSmallNum.disconnect, {marginLeft: 10}]}>Không có kết nối</Text>
                      ||
                      <Text style={styles.envBoxNum}>{sensor.data / 10}°C</Text>
                    }
                </View>
            </View>
        });

        const renderedHumiditySensors =  this.state.humiditySensors.map((sensor, index) => {
            return <View key={sensor.id + index} style={styles.envBoxCol}>
                <Image resizeMode="contain" style={styles.envBoxIcon} source={require('../../../images/recycle-water.png')} />
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.envBoxTitle}>{sensor.name}</Text>
                    {
                      (sensor.state == '15')
                      &&
                      <Text style={[styles.envBoxSmallNum.disconnect, {marginLeft: 10}]}>Không có kết nối</Text>
                      ||
                      <Text style={styles.envBoxNum}>{sensor.data / 10}%</Text>
                  }
                </View>
            </View>
        });

        const renderedDoorSensors =  this.state.doorSensors.map((sensor, index) => {
            return <View key={sensor.id + index} style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                <Image resizeMode="contain" style={styles.envBoxIcon} source={require('../../../images/hotel.png')} />
                <Text style={styles.envBoxTitle}>{sensor.name} : </Text>
                <Text style={sensor.state == 0 ? styles.envBoxSmallNum.closed : (sensor.state == 1 ? styles.envBoxSmallNum.open : styles.envBoxSmallNum.disconnect)}>{sensor.state == 0 ? 'Cửa đóng' : (sensor.state == 1 ? 'Cửa mở' : 'Mất kết nối')}</Text>
            </View>
        });

        const renderedFireSensors =  this.state.fireSensors.map((sensor, index) => {
            return <View key={sensor.id + index} style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginVertical: 10}}>
                <Image style={{width: 20, height: 20, marginLeft: 15}} source={require('../../../images/fire.png')}/>
                <Text style={styles.envBoxTitle}>{sensor.name} : </Text>
                <Text style={sensor.state == 0 ? styles.envBoxSmallNum.closed : (sensor.state == 1 ? styles.envBoxSmallNum.open : styles.envBoxSmallNum.disconnect)}>{sensor.state == 0 ? 'Bình thường' : (sensor.state == 1 ? 'Có cháy' : 'Mất kết nối')}</Text>
            </View>
        });

        const renderedMovementSensors =  this.state.movementSensors.map((sensor, index) => {
            return <View key={sensor.id + index} style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginVertical: 10}}>
                <Image style={{width: 20, height: 20, marginLeft: 15}} source={require('../../../images/movement.png')}/>
                <Text style={styles.envBoxTitle}>{sensor.name} : </Text>
                <Text style={sensor.state == 0 ? styles.envBoxSmallNum.closed : (sensor.state == 1 ? styles.envBoxSmallNum.open : styles.envBoxSmallNum.disconnect)}>{sensor.state == 0 ? 'Bình thường' : (sensor.state == 1 ? 'Có chuyển động' : 'Mất kết nối')}</Text>
            </View>
        });

		return (
            <View style={{height:'100%'}}>
                {
                    renderedTemperatureSensors.length == 0 && renderedHumiditySensors.length == 0 && renderedDoorSensors.length == 0 && renderedDoorSensors.length == 0 && renderedMovementSensors.length == 0 &&
                    <EmptyMsg onPress={this.onRefresh}/>
                }
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={this.onRefresh}
                        colors={['#EA0000']}
                        tintColor="#848484"
                        title="Đang tải..."
                        titleColor="#848484"
                        progressBackgroundColor="white"
                    />
                }>
                    {
                        renderedTemperatureSensors.length > 0 &&
                        <View style={[styles.envBox, {backgroundColor: '#fff'}]}>
                            <Text style={styles.envBoxHeader}>Nhiệt độ:</Text>
                            <View style={styles.envBoxRow}>
                                {renderedTemperatureSensors}
                            </View>
                        </View>
                    }
                    {
                        renderedHumiditySensors.length > 0 &&
                        <View style={[styles.envBox, {backgroundColor: '#fff'}]}>
                            <Text style={styles.envBoxHeader}>Độ ẩm:</Text>
                            <View style={styles.envBoxRow}>
                                {renderedHumiditySensors}
                            </View>
                        </View>
                    }
                    {
                        renderedFireSensors.length > 0 &&
                        <View style={[styles.envBox, {backgroundColor: '#fff'}]}>
                            <Text style={styles.envBoxHeader}>Cảm biến cháy:</Text>
                            <View style={styles.envBoxRow}>
                                {renderedFireSensors}
                            </View>
                        </View>
                    }
                    {
                        renderedDoorSensors.length > 0 &&
                        <View style={[styles.envBox, {backgroundColor: '#fff'}]}>
                            <Text style={styles.envBoxHeader}>Trạng thái cửa:</Text>
                            <View style={styles.envBoxRow}>
                                {renderedDoorSensors}
                            </View>
                        </View>
                    }

                    {
                        renderedMovementSensors.length > 0 &&
                        <View style={[styles.envBox, {backgroundColor: '#fff'}]}>
                            <Text style={styles.envBoxHeader}>Cảm biến chuyển động:</Text>
                            <View style={styles.envBoxRow}>
                                {renderedMovementSensors}
                            </View>
                        </View>
                    }

                </ScrollView>
            </View>
        );
	}
}
