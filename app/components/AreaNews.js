import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Text, StyleSheet, Image } from 'react-native';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class AreaNews extends PureComponent {
    render() {
        const { title, onPress, style, count} = this.props;
        return (
            <TouchableHighlight style={[style]}
                              onPress={() => onPress()}
            >
                <View style={styles.wrapper}>
                    <Text style={[styles.titleStyle]}>{title}</Text>
                    <Text style={[styles.count]}>{count}</Text>
                    <Image style={styles.icon} resizeMode="contain" source={require('../images/angle-right.png')} />
                </View>
            </TouchableHighlight>
        );
    }
}

AreaNews.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(12),
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        borderTopColor: '#c8c8c8',
        borderTopWidth: 1,
    },
    titleStyle: {
        color: '#677897',
        fontSize: moderateScale(16),
    },
    count: {
        color: '#677897',
        fontSize: moderateScale(16),
        marginRight: moderateScale(16)
    },
    icon: {
        position: 'absolute',
        right: moderateScale(16),
        width: moderateScale(8),
        top: moderateScale(7)
    }
});

export default AreaNews;
