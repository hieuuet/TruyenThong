import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class MButton extends PureComponent {
    render() {
        const { label, onPress, color, style, leftIcon} = this.props;
        return (
            <TouchableOpacity style={[styles.buttonStyle, style]}
                              onPress={() => onPress()}
            >
                {(function(leftIcon) {
                    if (leftIcon) {
                        return (
                            <Image 
                            style={styles.leftIconStyle} source={leftIcon} 
                            resizeMode="contain"
                            />
                        );
                    }
                })(this.props.leftIcon)}
                
                <Text style={[styles.textStyle, {color: this.props.color || '#FFFFFF'}]}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

MButton.propTypes = {
    label: PropTypes.string.isRequired,
};

MButton.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: moderateScale(14),
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonStyle: {
        shadowColor: 'rgba(215, 31, 92, 0.55)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: moderateScale(4),
        shadowOpacity: 1,
        justifyContent: 'center',
        backgroundColor: colors.primaryColor,
        borderRadius: moderateScale(4),
        padding: moderateScale(10),
        paddingLeft: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    leftIconStyle: {
        height: verticalScale(12)
    }
});

export default MButton;