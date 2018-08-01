import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../resources/colors';

import renderIf from '../configs/renderIf';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class SmallPostItem extends PureComponent {
    render() {
        const { title, areaTitle, areaType, onPress, style, background, pushlishDate, showDate, isVideo} = this.props;
        let areaTitleView = null;
        if(areaTitle && areaType) {
            var areaTitleBackgroundColor = '#bcbcbc';
            if (areaType == 1) {
                areaTitleBackgroundColor = colors.primaryColor;
            } else if (areaType == 2) {
                areaTitleBackgroundColor = '#f7c640';
            } else if (areaType == 3) {
                areaTitleBackgroundColor = '#23aaff';
            }
            var backgroundColorStyle = {
                backgroundColor: areaTitleBackgroundColor
            };
            areaTitleView = <Text style={[styles.areaTitle, backgroundColorStyle]}>{areaTitle}</Text>
        }
        return (
            <TouchableOpacity style={[styles.wrapper, style]} onPress={() => onPress()}>
                <View style={styles.bgWrap}>
                    <Image style={styles.background} resizeMode="cover" source={background} />
                    {areaTitleView}
                    {renderIf(this.props.isVideo,
                      <View>
                    <View style={{width:moderateScale(25), height:verticalScale(20), position: 'absolute', bottom: 0, right: 0, zIndex: 50, opacity: 0.8, backgroundColor: '#fff', borderTopLeftRadius: moderateScale(10)}}>
                    </View>
                    <Image style={{width:moderateScale(13), height:verticalScale(13), position: 'absolute', bottom: moderateScale(3), right: moderateScale(5), zIndex: 100}} source={require('../images/camera.png')} />
                    </View>
                  )}
                </View>
                <Text ellipsizeMode='tail' numberOfLines={3} style={[styles.textStyle]}>{title}</Text>
                <Text style={[styles.time, {opacity: this.props.showDate?1:0}]}>{pushlishDate}</Text>
            </TouchableOpacity>
        );
    }
}

SmallPostItem.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    bgWrap: {
        position: 'relative',
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowRadius: moderateScale(5),
        borderRadius: moderateScale(8),
        overflow: 'hidden'
    },
    areaTitle: {
        left: 0,
        bottom: 0,
        color: 'white',
        position: 'absolute',
        paddingVertical: moderateScale(2),
        paddingLeft: moderateScale(5),
        paddingRight: moderateScale(7),
        borderTopRightRadius: moderateScale(10),
        fontSize: moderateScale(10)
    },
    textStyle: {
        fontSize:moderateScale(15),
        color: '#404040',
        paddingHorizontal: moderateScale(12),
        flex: 1
    },
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#cacaca',
        padding: moderateScale(12),
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
        borderRadius: moderateScale(8),
        overflow: 'hidden',
    },
    background: {
        height: verticalScale(84),
        width: moderateScale(124),
        borderRadius: moderateScale(8),
    },
    time: {
        position: 'absolute',
        bottom: moderateScale(5),
        right: moderateScale(12),
        color:'#b2b2b2',
        fontSize:moderateScale(14),
    }
});

export default SmallPostItem;
