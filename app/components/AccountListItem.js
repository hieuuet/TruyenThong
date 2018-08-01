import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../resources/colors';

import Constant from '../configs/constant';
import renderIf from '../configs/renderIf';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class AccountListItem extends PureComponent {
    render() {
        const { title, onPress, background, item, onClick, user} = this.props;
        let isConnected = false;
        var statusColor = '#677897';

        // if(item.type == Constant.IOT.DOOR) {
        //
        //   if (item.state == '0') {
        //       isConnected = true;
        //       item.status_name = 'Cửa đóng';
        //       statusColor = 'green';
        //   } else if(item.state == '1') {
        //       isConnected = true;
        //       item.status_name = 'Cửa mở';
        //       statusColor = '#e62565';
        //   } else {
        //       isConnected = false;
        //       item.status_name = 'Mất kết nối';
        //       statusColor = '#677897';
        //   }
        // } else if(item.type == Constant.IOT.MOVEMENT) {
        //
        //   if (item.state == '0') {
        //       isConnected = true;
        //       item.status_name = 'Bình thường';
        //       statusColor = 'green';
        //   } else if(item.state == '1') {
        //       isConnected = true;
        //       item.status_name = 'Có chuyển động';
        //       statusColor = '#e62565';
        //   } else {
        //       isConnected = false;
        //       item.status_name = 'Mất kết nối';
        //       statusColor = '#677897';
        //   }
        // } else if(item.type == Constant.IOT.SMOKE) {
        //
        //   if (item.state == '0') {
        //       isConnected = true;
        //       item.status_name = 'Bình thường';
        //       statusColor = 'green';
        //   } else if(item.state == '1') {
        //       isConnected = true;
        //       item.status_name = 'Có khói';
        //       statusColor = '#e62565';
        //   } else {
        //       isConnected = false;
        //       item.status_name = 'Mất kết nối';
        //       statusColor = '#677897';
        //   }
        // }

        return (
            <TouchableOpacity style={[styles.wrapper]}>
                <View style={[styles.bgWrap]}>
                    <Image style={styles.background} resizeMode="cover" source={background} />
                    {renderIf(item.is_household_owner == '1',
                      <View style={[styles.bellwrap,{backgroundColor: '#e62565'}]}>
                          <Image style={styles.bell} resizeMode="contain" source={require('../images/st-user.png') } />
                      </View>
                    )}
                </View>
                <View>
                    <Text style={[styles.title]}>{item.name}</Text>
                    <Text style={[styles.subtitle,{opacity: 0.35, color: statusColor}]}>{item.phone}</Text>
                </View>
                {renderIf(user.is_household_owner == '1' && item.is_household_owner == '0',
                  <TouchableOpacity style={styles.arrow} onPress={() => onClick()}>
                    <Image style={{width: moderateScale(30)}} resizeMode="contain" source={require('../images/close_pink.png')} />
                  </TouchableOpacity>
                )}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#cacaca',
        padding: moderateScale(12),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flex: 1,
        // borderRadius: 8,
        alignItems: 'center',
        overflow: 'hidden',
    },
    bgWrap: {
        position: 'relative',
        // borderRadius: 8,
        overflow: 'hidden',
        width: moderateScale(47),
        height: verticalScale(47),
        // borderColor: '#e62565',
        // borderWidth: 2,
        marginRight: moderateScale(12)
    },
    title: {
        fontSize: moderateScale(16),
        color: '#2f3a4f',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: moderateScale(16),
        color: "#677897"
    },
    background: {
        width: '100%',
        height: '100%',
    },
    arrow: {
        position: 'absolute',
        right: moderateScale(20),
        width: moderateScale(30)

    },
    bell: {
        height: verticalScale(12)
    },
    bellwrap: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: moderateScale(19),
        height: verticalScale(17),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: moderateScale(8)
    }
});

export default AccountListItem;
