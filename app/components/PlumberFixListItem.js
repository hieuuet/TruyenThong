import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, TouchableOpacity, Text, StyleSheet, Image, View, Platform } from 'react-native';
import colors from '../resources/colors';

import { scale, moderateScale, verticalScale} from '../components/Scaling';

class PlumberFixListItem extends PureComponent {

    _renderStar(num, isActive) {
        var stars = [];
        for(i = 1; i<=num;i++) {
            stars.push(<Image key={i} style={styles.star} source={isActive?require('../images/star-active.png'):require('../images/star.png')} resizeMode="contain" />);
        }

        return stars;
    }

    render() {
        const { title, onPress, background, data, openId, locationPress, callPress} = this.props;
        let areaTitleView = null;
        let isOff = null;
        let moreView = null;
        if(openId == data.id && moreView == null) {
            moreView =
            (<View style={styles.moreWrap}>
                <TouchableOpacity onPress={() => locationPress()}>
                    <View style={styles.addressWrap}>
                        <Text style={[styles.address]}>{data.address}</Text>
                        <Image style={styles.location} resizeMode="contain" source={require('../images/location.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => callPress()}>
                    <View style={styles.phoneWrap}>
                        <Image style={styles.phone} resizeMode="contain" source={require('../images/call.png')} />
                    </View>
                </TouchableOpacity>
            </View>);
        }else{
            moreView = null;
        }

        return (
            <TouchableWithoutFeedback onPress={() => onPress()}>
                <View style={[styles.wrapper]}>
                    <View style={[styles.bgWrap, {borderColor: isOff?'#abb4bd':'#e62565'}]}>
                        <Image style={styles.background} resizeMode="cover" source={background} />
                    </View>
                    <View style={styles.contentWrap}>
                        <Text numberOfLines ={1} style={[styles.title]}>{data.title}</Text>
                        <View style={styles.desWrap}>
                            <Text style={[styles.subtitle,{opacity: isOff?0.35:1}]}>Cách {data.distance}</Text>
                            <View style={styles.starWrap}>
                                {this._renderStar(data.star, true)}
                                {this._renderStar(5-data.star)}
                            </View>
                        </View>
                        {moreView}

                    </View>
                    <Image style={styles.arrow} resizeMode="contain" source={require('../images/angle-down.png')} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

PlumberFixListItem.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#cacaca',
        padding: moderateScale(12),
        borderRadius: moderateScale(8),
        overflow: 'hidden',
    },
    bgWrap: {
        position: 'relative',
        borderRadius: moderateScale(8),
        overflow: 'hidden',
        width: moderateScale(47),
        height: verticalScale(47),
        marginRight: moderateScale(12),
        position: 'absolute',
        left: moderateScale(15),
        top: moderateScale(15)
    },
    title: {
        fontSize: moderateScale(16),
        color: '#2f3a4f',
        fontWeight: 'bold',
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
        width: moderateScale(23),
        top: moderateScale(30)
    },
    location: {
        width: moderateScale(17),
        height: verticalScale(22)
    },
    addressWrap: {
        borderRadius: moderateScale(4),
        borderWidth: Platform.OS === 'ios' ? 0:1,
        borderColor: '#ddd',
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        padding: moderateScale(12),
        paddingRight: moderateScale(24),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    address: {
        fontSize: moderateScale(12),
        color: '#677897'
    },
    phoneWrap: {
        width: moderateScale(52),
        height: verticalScale(52),
        backgroundColor: '#e62565',
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        marginLeft: moderateScale(12),
        borderRadius: moderateScale(4),
        alignItems: 'center',
        justifyContent: 'center'
    },
    moreWrap: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: moderateScale(14),
        marginRight: moderateScale(50),
        marginBottom: moderateScale(16)
    },
    phone: {
        width: moderateScale(20)
    },
    contentWrap: {
        paddingLeft: moderateScale(60),
        marginRight: moderateScale(30)
    },
    star: {
        width: moderateScale(16),
        height: verticalScale(16)
    },
    starWrap: {
        flexDirection: 'row',
        paddingLeft: moderateScale(15)
    },
    desWrap: {
        flexDirection: 'row',
        marginTop: moderateScale(5),
    }
});

export default PlumberFixListItem;
