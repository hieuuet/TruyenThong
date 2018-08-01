import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../resources/colors';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class AnnouncementCard extends PureComponent {
    render() {
        const { title, onPress, time, style, icon, duration} = this.props;
        return (
            <TouchableOpacity style={[styles.cardStyle, style]} onPress={() => onPress()} >
                <View style={styles.playWrap}>
                    <Image style={styles.playCover} resizeMode="cover" source={require('../images/temp/audiobg.png')} />
                    <Image style={styles.playIcon} resizeMode="contain" source={require('../images/play.png')} />
                </View>
                <Text style={styles.time}>{duration || '00:00'}</Text>
                <View style={styles.bar}></View>
                <Text ellipsizeMode='tail' numberOfLines={2} style={[styles.subtitleStyle]}>{time} - <Text style={[styles.titleStyle]}>{title}</Text></Text>

            </TouchableOpacity>
        );
    }
}

AnnouncementCard.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    playWrap: {
        borderRadius: moderateScale(52),
        height: verticalScale(52),
        width: moderateScale(52),
        overflow: 'hidden',
        position: 'absolute',
        left: moderateScale(10),
        top: moderateScale(10),
        zIndex: 1,
        borderWidth: moderateScale(6),
        borderColor: '#ddd'
    },
    titleStyle: {
        fontSize: moderateScale(16),
        color: '#022548',
        fontWeight: 'bold',
        marginLeft: moderateScale(65),
        paddingRight: moderateScale(10),
    },
    subtitleStyle: {
        color: '#9b9b9b',
        marginLeft: moderateScale(65),
        fontWeight: '100',
        marginTop: moderateScale(50),
        fontSize: moderateScale(14),
        flex: 1,
        paddingRight: moderateScale(5)
    },
    cardStyle: {
        position: 'relative',
        backgroundColor: 'white',
        shadowColor: 'rgba(92, 92, 92, 0.38)',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 4
        },
        borderRadius: moderateScale(8),
        marginBottom: 0,
        paddingBottom: moderateScale(5)
    },
    iconWrap: {
        width: moderateScale(49),
        height: verticalScale(49),
        borderWidth: moderateScale(4),
        borderColor: '#dddddd',
        left: moderateScale(10),
        top: moderateScale(7),
        position: 'absolute',
        borderRadius: moderateScale(100),
        overflow: 'hidden',
        position: 'relative',
        zIndex: 3
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    playCover: {
        width: '100%',
        height: '100%',
    },
    playIcon: {
        height: verticalScale(14),
        position: 'absolute',
        left: moderateScale(12),
        top: '50%',
        marginTop: -moderateScale(7)
    },
    bar: {
        height: verticalScale(6),
        right: moderateScale(58),
        backgroundColor: '#ddd',
        position: 'absolute',
        top: moderateScale(34),
        left: moderateScale(56),
        zIndex: 0,
        borderRadius: moderateScale(4)
    },
    time: {
        position: 'absolute',
        top: moderateScale(30),
        right: moderateScale(16),
        color: '#848484',
        fontSize: moderateScale(12)
    }
});

export default AnnouncementCard;
