import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View, TextInput, FlatList } from 'react-native';
import colors from '../resources/colors';
import MButton from './MButton';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class Comment extends Component {
    _renderSeparator() {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#cacaca",

            }}
          />
        );
      };
    render() {
        const { title, onPress, subtitle, style, background, comments, value, onChange, userInfor} = this.props;
        // const comments = [
        //     {key: 1, avatar: require('../images/temp/ftn1.jpg'), time: '2 tiếng trước', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'},
        //     {key: 2, avatar: require('../images/temp/ftn1.jpg'), time: 'vừa xong', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        // ];
        let footerComment = null;
        if(userInfor) {
            footerComment =
            <View style={styles.footer}>
                <MButton
                    style={styles.send}
                    label="GỬI BÌNH LUẬN"
                    onPress={onPress}/>
            </View>
        }
        let inputComment = null;
        if(userInfor) {
            inputComment =
            <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            placeholder={'Nội dung bình luận'}
            value={value}
            onChangeText={onChange}/>
        }
        return (
            <View style={[styles.wrapper, style]}>
                {inputComment}
                {footerComment}
                {
                    comments.length > 0 &&
                    <FlatList style={{backgroundColor: '#fff', padding: moderateScale(10),  borderRadius: moderateScale(4)}}
                        scrollEnabled={false}
                        data={comments}
                        renderItem={
                            ({item}) =>
                                (
                                    <View style={styles.cmtWrap}>
                                        <View style={styles.cmtRow}>
                                            <View style={styles.cmtAvatarWrap}>
                                                <Image style={styles.avatar} resizeMode="cover" source={require('../images/temp/ftn1.jpg')} />
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text style={styles.cmtName}>{item.name}</Text>
                                                <Text style={styles.cmtContent}>{item.content}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.cmtTime}>{item.time}</Text>
                                    </View>
                                )

                        }
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => this._renderSeparator()}
                    />
                }

            </View>
        );
    }
}

Comment.defaultProps = {
    onPress: function () {
    },

    onChange: function() {

    }
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(12),
        paddingLeft: moderateScale(12),
        borderRadius: moderateScale(4),
        backgroundColor: '#efeff4'
    },
    input: {
        height: verticalScale(148), borderRadius: moderateScale(4), backgroundColor: 'white', padding: moderateScale(12), marginBottom: moderateScale(11), color: '#677897',
        paddingTop: moderateScale(18),
        fontSize: moderateScale(16)
    },
    send: {
        height: verticalScale(46),
        width: moderateScale(147)
    },
    footer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(10)
    },
    userWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    username: {
        color: '#677897',
        fontSize: moderateScale(14),
        marginLeft: moderateScale(10)
    },
    avatarWrap: {
        overflow: 'hidden',
        borderRadius: 100,
        width: moderateScale(44),
        height: verticalScale(44),
    },
    avatar: {
        width: '100%',
        height: '100%',
        marginRight: moderateScale(10)
    },
    cmtAvatarWrap: {
        overflow: 'hidden',
        borderRadius: moderateScale(60),
        width: moderateScale(30),
        height: verticalScale(30),
    },
    cmtRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    cmtContent: {
        fontSize: moderateScale(14),
        marginLeft: moderateScale(10),
        paddingRight: moderateScale(20)
    },
    cmtTime: {
        fontSize: moderateScale(12),
        color: 'gray',
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    cmtWrap: {
        position: 'relative',
        paddingBottom: moderateScale(20),
        marginBottom: moderateScale(20),
        marginTop: moderateScale(10)
    },
    cmtName: {
        fontSize: moderateScale(14),
        marginLeft: moderateScale(10),
        paddingRight: moderateScale(20)
    }
});

export default Comment;
