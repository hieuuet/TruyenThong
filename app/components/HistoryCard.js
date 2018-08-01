import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class HistoryCard extends PureComponent {
    render() {
        const { title, amount, pushlishDate, icon, style, onPress, isError, reason} = this.props;
        var stateStyle = isError ? styles.error:styles.success;
        var statusStyle = isError ? styles.reason : styles.reasonSuccess;

        return (
            <TouchableOpacity style={[styles.wrap, style, stateStyle]} onPress={() => onPress()}>
                <Image style={styles.icon} resizeMode="contain" source={icon} />
                <View style={styles.titleWrap}>
                    <Text style={[styles.title]}>{title}</Text>
                    <Text style={[styles.time]}>{pushlishDate}</Text>
                    <Text style={[statusStyle]}>{isError ? reason : 'Thành công'}</Text>
                </View>
                <Text style={[styles.amount]}>{amount}</Text>
            </TouchableOpacity>
        );
    }
}

HistoryCard.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    wrap: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: moderateScale(12),
        backgroundColor: 'white',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderLeftWidth: 5,
        alignItems: 'center'
    },
    success: {
        borderLeftColor: '#009b2c'
    },
    error: {
        borderLeftColor: '#D0021B'
    },
    amount: {
        fontSize: moderateScale(15),
        width: '25%'
    },
    title: {
        fontSize: moderateScale(15),
    },
    titleWrap: {
        width: '50%'
    },
    icon: {
        height: verticalScale(40),
        width: moderateScale(40),
        marginLeft: moderateScale(10)
    },
    time: {
        color:'#b2b2b2',
        fontSize: moderateScale(12),
    },
    reason: {
        marginTop: moderateScale(5),
        fontSize: moderateScale(12),
        color: '#D0021B'
    },
    reasonSuccess: {
        marginTop: moderateScale(5),
        fontSize: moderateScale(12),
        color: '#009b2c'
    }
});

export default HistoryCard;
