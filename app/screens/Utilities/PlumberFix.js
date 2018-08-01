//@flow
import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity, ScrollView, FlatList, Linking, Platform} from "react-native";
import PlumberFixListItem from '../../components/PlumberFixListItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';

import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';


import Util from '../../configs/util';
import _ from 'lodash';
import Constant from '../../configs/constant';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


class PlumberFix extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            items: [{
                id: 1,
                title: 'Kho Hàng Cơ Điện Lạnh Hoàng Long JSC',
                star: 2,
                distance: '0m',
                address: '32 Võ Văn Dũng, Đống Đa, Ô Chợ Dừa, Đống Đa'
            },{
                id: 2,
                title: 'Công ty TNHH Cơ Điện Eriko',
                star: 3,
                distance: '1km',
                address: 'Ô Chợ Dừa, Đống Đa, Hn'
            }],
            openId: null
        };
    }
    componentWillMount() {
    }

    _onItemPress(id) {
        if (this.state.openId == id) {
            this.setState({openId: null});
        } else {
            this.setState({openId: id});
        }

    }

    _locationPress() {
        console.log('location Press');
        // iOS
        if(Platform.OS === 'ios') {
            Linking.canOpenURL('http://maps.apple.com/?ll=21.03260852640083,105.78184168632083').then(supported => {
              if (!supported) {
                console.log('Can\'t handle url: ' + url);
              } else {
                return Linking.openURL('http://maps.apple.com/?ll=21.03260852640083,105.78184168632083');
              }
          }).catch(err => console.log('An error occurred', err));
        }
        // Android
        else {
            Linking.canOpenURL('http://maps.google.com/maps?q=20.6901132,105.5239912(Nhà cung cấp dịch vụ)&z=15').then(supported => {
              if (!supported) {
                console.log('Can\'t handle url: ' + url);
              } else {
                return Linking.openURL('http://maps.google.com/maps?q=20.6901132,105.5239912(Nhà cung cấp dịch vụ)&z=15');
              }
            }).catch(err => console.log('An error occurred', err));
        }
    }

    _callPress() {
        console.log('call Press');
        Linking.canOpenURL('tel:0936068193').then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + url);
          } else {
            return Linking.openURL('tel:0936068193');
          }
      }).catch(err => console.log('An error occurred', err));
    }

    renderItem(item) {
        return (
            <PlumberFixListItem
                onPress={()=> this._onItemPress(item.id)}
                openId={this.state.openId}
                data={item}
                background={require("../../images/temp/French-Door-2-handles.jpg")}
                locationPress={() => this._locationPress()}
                callPress={() => this._callPress()}
            />
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;


        return (
            <View style={styles.container}>
                {
                    (this.state.loading) && <LoadingSpinner hasBackground={true}/>
                }

                {
                    (!this.state.loading) &&

                    <ScrollView style={{zIndex: 5}} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.header}>
                        <Image source={require('../../images/plumberfix.jpg')} resizeMode="cover" style={styles.cover} />
                        <Image source={require('../../images/utilities/small/suaongnuoc.png')} resizeMode="contain" style={styles.coverIcon} />
                        <Text style={styles.pageTitle}>SỬA ỐNG NƯỚC</Text>
                        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                            <Image style={styles.backIcon} source={require('../../images/back-white.png')} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                        <View style={[globalStyles.contentCard,{marginTop: -20, paddingHorizontal: 0}]}>
                            <View style={styles.paddingContent}>
                                <Text style={globalStyles.label}>24 ĐỊA ĐIỂM Ở NAM TỪ LIÊM</Text>
                            </View>

                            <FlatList
                                data={this.state.items}
                                extraData={this.state}
                                renderItem={({item}) => this.renderItem(item)}
                                keyExtractor={(item, index) => index}
                                />
                        </View>
                    </ScrollView>
                }
            </View>
        );
    }
}
export default PlumberFix;
