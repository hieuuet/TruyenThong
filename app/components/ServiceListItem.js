import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class ServiceListItem extends PureComponent {
    render() {
        const { title, onPress, subtitle, style, icon} = this.props;
        return (
            <TouchableOpacity style={[styles.buttonStyle, style]}
                              onPress={() => onPress()}
            >
                <Image style={styles.icon} resizeMode="contain" source={icon} />
                <Text style={[styles.titleStyle]}>{title}</Text>
                <Text style={[styles.subtitleStyle]}>{subtitle}</Text>
            </TouchableOpacity>
        );
    }
}

ServiceListItem.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: moderateScale(16),
        color: '#022548',
        fontWeight: 'bold',
        marginLeft: moderateScale(65),
    },
    subtitleStyle: {
        color: '#9b9b9b',
        marginLeft: moderateScale(65),
        marginTop: moderateScale(5),
        fontSize: moderateScale(14)
    },
    buttonStyle: {
        position: 'relative',
        paddingVertical: moderateScale(17),
        backgroundColor: 'white',
        borderColor: '#d7d7d7',
        borderWidth: 1,
        margin: moderateScale(12),
        borderRadius: moderateScale(6),
        marginBottom: 0
    },
    icon: {
        height: verticalScale(36),
        left: -moderateScale(6),
        top: moderateScale(14),
        position: 'absolute'
    }
});

export default ServiceListItem;