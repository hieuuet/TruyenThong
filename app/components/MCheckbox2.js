import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet, Image } from 'react-native';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

export default class MCheckbox2 extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            checked : this.props.checked
        };
    }

    onClickItem = () => {
        this.setState({checked : !this.state.checked}, () => {
            if (this.props.onPress) {
                this.props.onPress();
            }
        });
    }

    isChecked = () => {
        return this.state.checked;
    }

    render() {
        let $this = this;
        const { title, textStyle } = $this.props;

        return (
            <TouchableWithoutFeedback onPress={$this.onClickItem.bind(this)}>
                <View style={styles.wrap}>
                    <Image style={styles.icon} source={$this.state.checked ? require('../images/checked2.png') : require('../images/check2.png')} resizeMode="contain" />
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        position: 'relative',
        height: verticalScale(60),
        width: '100%',
        paddingHorizontal: moderateScale(24),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    icon: {
        width: moderateScale(26),
        height: verticalScale(26),
        marginRight: moderateScale(14)
    },
    text: {
        flex:1,
        color: '#677897',
        fontSize: moderateScale(16)
    }
});
