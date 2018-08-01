import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class SurveyCard extends PureComponent {
    render() {
        const { title, onPress, subtitle, style, background} = this.props;
        return (
            <View style={[styles.wrapper, style]}>
                <Image style={styles.background} resizeMode="cover" source={background} />
                <Text style={[styles.descStyle]}>{subtitle}</Text>
                <Text style={[styles.textStyle]}>{title}</Text>

                <TouchableOpacity style={styles.readmoreWrap} onPress={() => onPress()}>
                    <Text style={styles.readmoreText}>{'XEM KẾT QUẢ TẠM THỜI'}</Text>
                    <Image resizeMode="contain" style={styles.arrow} source={require('../images/angle-right.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

SurveyCard.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    wrapper: {
        borderWidth: 1,
        borderColor: '#d7d7d7',
        borderRadius: moderateScale(6),
        paddingBottom: moderateScale(8),
        marginBottom: moderateScale(8),
        overflow: 'hidden'
    },
    readmoreWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderTopWidth: 1,
        paddingTop: moderateScale(8)
    },
    arrow: {
        height: verticalScale(14)
    },
    readmoreText: {
        color: '#f31e64',
        marginLeft: moderateScale(12),
        marginRight: moderateScale(8),
    },
    textStyle: {
        fontSize: moderateScale(16),
        color: '#022548',
        fontWeight: 'bold',
        marginBottom: moderateScale(8),
        paddingHorizontal: moderateScale(12)
    },
    descStyle: {
        color: '#9b9b9b',
        marginBottom: moderateScale(8),
        fontSize: moderateScale(14),
        paddingHorizontal: moderateScale(12)
    },
    background: {
        height: verticalScale(149),
        width: '100%',
        borderTopRightRadius: moderateScale(6),
        borderTopLeftRadius: moderateScale(6),
        marginBottom: moderateScale(12)
    }
});

export default SurveyCard;
