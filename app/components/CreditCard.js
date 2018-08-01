import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class CreditCard extends PureComponent {
    render() {
        const { title, style, isSelected, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.card, style, isSelected ? styles.cardSelected:{}]}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

CreditCard.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    card: {
        minWidth: moderateScale(80),
        height: verticalScale(60),
        borderRadius: moderateScale(8),
        backgroundColor: '#efeff4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardSelected: {
        borderWidth: 2,
        borderColor: '#e62565',
        backgroundColor: 'white'
    },
    title: {
        color: '#677897',
        fontSize: moderateScale(16)
    }, 
    text: {
        color: '#677897',
        fontSize: moderateScale(16)
    }
});

export default CreditCard;
