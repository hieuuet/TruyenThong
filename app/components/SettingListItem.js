import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class SettingListItem extends PureComponent {
    render() {
        const { title, onPress, style, icon} = this.props;
        return (
            <TouchableOpacity style={[styles.itemStyle, style]} onPress={() => onPress()}
            >
                <Image style={styles.icon} resizeMode="contain" source={icon} />
                <Text style={[styles.titleStyle]}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

SettingListItem.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: moderateScale(16),
        color: '#677897',
        marginLeft: moderateScale(12),
    },
    itemStyle: {
        position: 'relative',
        backgroundColor: 'white',
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
        height: verticalScale(60),
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        height: verticalScale(48),
        marginLeft: moderateScale(20),
    }
});

export default SettingListItem;
