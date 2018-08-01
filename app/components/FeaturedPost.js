import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../resources/colors';

import renderIf from '../configs/renderIf';

import { scale, moderateScale, verticalScale} from '../components/Scaling';

class FeaturedPost extends PureComponent {
    render() {
        console.log('height: ' + verticalScale(153));
        const { title, areaTitle, areaType, onPress, subtitle, pushlishDate, style, background, showDate, isVideo} = this.props;
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
            <TouchableOpacity style={[styles.wrapper, style]}
                              onPress={() => onPress()}
            >
                <View style={styles.bgWrap}>
                    <Image style={styles.background} resizeMode="cover" source={background} />
                    {areaTitleView}
                    {renderIf(this.props.isVideo,
                      <View>
                      <View style={{width:25, height:20, position: 'absolute', bottom: 20, right: 0, zIndex: 50, opacity: 0.8, backgroundColor: '#fff', borderTopLeftRadius: 10}}>
                      </View>
                      <Image style={{width:13, height:13, position: 'absolute', bottom: 23, right: 5, zIndex: 100}} source={require('../images/camera.png')} />
                      </View>
                    )}
                </View>
                <Text style={[styles.textStyle]}>{title}</Text>
                <Text ellipsizeMode='tail' numberOfLines={3} style={[styles.descStyle]}>{subtitle}</Text>
                <Text style={[styles.time, {opacity: this.props.showDate?1:0}]}>{pushlishDate}</Text>
            </TouchableOpacity>
        );
    }
}

FeaturedPost.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    bgWrap: {
        position: 'relative'
    },
    wrapper: {
        paddingHorizontal: moderateScale(12),
        borderRadius: moderateScale(4),
        paddingBottom: moderateScale(15),
        borderBottomWidth: 1,
        borderBottomColor: '#cacaca',
    },
    textStyle: {
        fontSize: moderateScale(16),
        color: '#022548',
        fontWeight: 'bold',
    },
    descStyle: {
        color: '#848484',
        marginBottom: moderateScale(16),
        fontSize: moderateScale(15),
    },
    background: {
        height: verticalScale(153),
        width: '100%',
        borderRadius: moderateScale(8),
        marginBottom: moderateScale(16)
    },
    areaTitle: {
        left: 0,
        bottom: moderateScale(20),
        color: 'white',
        position: 'absolute',
        paddingVertical: 2,
        paddingLeft: moderateScale(5),
        paddingRight: moderateScale(7),
        borderTopRightRadius: moderateScale(10),
        borderBottomRightRadius: moderateScale(10),
        fontSize: moderateScale(10)
    },
    time: {
        position: 'absolute',
        bottom: moderateScale(5),
        right: moderateScale(12),
        color:'#b2b2b2',
        fontSize: moderateScale(14),

    }
});

export default FeaturedPost;
