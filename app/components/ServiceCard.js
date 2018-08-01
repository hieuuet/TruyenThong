import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class ServiceCard extends PureComponent {
    render() {
        const { label, onPress, color, style, icon, disable} = this.props;
        if (disable) {
            return (
                <View style={[styles.buttonStyle, style, {opacity : 0.5}]}>
                    <Image style={styles.icon} resizeMode="contain" source={icon} />
                    <Text style={[styles.textStyle, {color: this.props.color || '#677897'}]}>{label}</Text>
                </View>
            );
        } else {
            return (
                <TouchableOpacity style={[styles.buttonStyle, style]} onPress={() => onPress()}>
                    <Image style={styles.icon} resizeMode="contain" source={icon} />
                    <Text style={[styles.textStyle, {color: this.props.color || '#677897'}]}>{label}</Text>
                </TouchableOpacity>
            );
        }


    }
}

ServiceCard.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    style: PropTypes.object
};
ServiceCard.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: moderateScale(16),
        textAlign: 'center',
        color:'#677897'
    },
    buttonStyle: {
        width: moderateScale(106),
        height: verticalScale(136),
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(89, 89, 89, 0.38)',
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1
        },
        borderRadius: moderateScale(6),
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(4),
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    icon: {
        height: verticalScale(62),
        marginBottom: moderateScale(10)
    }
});

export default ServiceCard;
