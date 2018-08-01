import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class PromotionCard extends PureComponent {
    render() {
        const { title, onPress, color, style, background} = this.props;
        return (
            <TouchableOpacity style={[styles.wrapper, style]}
                              onPress={() => onPress()}
            >
                <Image style={styles.background} resizeMode="cover" source={background} />
                <Text style={[styles.textStyle, {color: this.props.color || '#fff'}]}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

PromotionCard.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize:moderateScale(16),
        textAlign: 'center',
        position: 'absolute',
        bottom: moderateScale(16),
        left: 0,
        right: 0,
        paddingHorizontal: moderateScale(20),
        backgroundColor: 'transparent'
    },
    wrapper: {
        width: moderateScale(295),
        height: verticalScale(200),
        shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
        borderRadius: moderateScale(4),
        marginRight: moderateScale(16)
    },
    background: {
        height: '100%',
        width: '100%',
        borderRadius: moderateScale(4),
    }
});

export default PromotionCard;
