import React, { Component, PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class EmptyMsg extends PureComponent {
    render() {
        const { title, onPress } = this.props;
        return (
            <View style={styles.emptyDataWrap}>
                <Image style={styles.emptyDataIcon} resizeMode="contain" source={require('../images/empty.png')}/>
                <Text style={styles.emptyDataMsg}>{title || 'Không có dữ liệu'}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Image style={{width:moderateScale(30)}} resizeMode="contain" source={require('../images/reload.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    emptyDataWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        position: 'absolute',
		top:0,
		left:0,
		zIndex: 10000,
    },
    emptyDataMsg: {
        fontSize: moderateScale(16),
        textAlign: 'center',
        alignItems: 'center'
    },
    emptyDataIcon:{
        height: verticalScale(30),
        marginBottom: moderateScale(10)
    }
});

export default EmptyMsg;
