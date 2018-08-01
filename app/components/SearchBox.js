import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, TextInput } from 'react-native';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class SearchBox extends PureComponent {
    render() {
        const { placeholder, style, onFilterPress} = this.props;
        return (
            <View style={[styles.wrapper, style]}
            >
                <Image resizeMode="contain" source={require('../images/searchwhite.png')} style={styles.searchIcon} />
                <TouchableOpacity 
                    style={styles.filterBtn}
                    onPress={() => onFilterPress()}>
                    <Image resizeMode="contain" source={require('../images/filter-dark.png')} style={styles.filterIcon} />
                </TouchableOpacity>
                <TextInput
                    placeholderTextColor={"white"}
                    style={styles.input}
                    placeholder={this.props.placeholder || 'Tìm kiếm'}/>
            </View>
        );
    }
}

SearchBox.defaultProps = {
    onFilterPress: function () {
    }
};

const styles = StyleSheet.create({
    wrapper: {
        height: verticalScale(42),
        margin: moderateScale(12),
        position: 'relative',
        borderRadius: moderateScale(4),
        paddingHorizontal: moderateScale(12),
        backgroundColor: 'rgba(0, 0, 0, 0.33)',
        zIndex: 3
    },
    input: {
        color: 'white',
        flex: 1,
        borderRadius: moderateScale(4),
        marginLeft: moderateScale(35),
        fontSize: moderateScale(14)
    },
    searchIcon: {
        height: verticalScale(20),
        top: moderateScale(12),
        position: 'absolute',
        left: moderateScale(12),
        zIndex: 1
    },
    filterBtn: {
        width: moderateScale(48),
        height: verticalScale(30),
        borderRadius: moderateScale(4),
        backgroundColor: '#fff',
        position: 'absolute',
        right: moderateScale(12),
        top: moderateScale(6),
        zIndex: 1,
        shadowColor: 'rgba(92, 92, 92, 0.38)',
        shadowRadius: moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterIcon: {
        height: verticalScale(18)
    }
});

export default SearchBox;