import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet, Image } from 'react-native';
import _ from 'lodash';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class MCheckbox extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentValue: this.props.currentValue
        };
    }

    onClickItem = (op) => {
        this.setState({currentValue : op.value}, () => {
            if (this.props.onPress) {
                this.props.onPress(op);
            }
        });
    }

    getValue = () => {
        return this.state.currentValue;
    }

    render() {
        let $this = this;
        const { options, onPress } = $this.props;

        let optionsView = [];
        _.forEach(options, function(op) {
            optionsView.push(
                <TouchableWithoutFeedback onPress={$this.onClickItem.bind(this, op)} key={op.value}>
                    <View style={[styles.wrap, {backgroundColor: $this.state.currentValue == op.value ? '#efeff4':'transparent'}]}>
                        <Image style={styles.icon} source={$this.state.currentValue == op.value ? require('../images/checked.png') : require('../images/check.png')} resizeMode="contain" />
                        <Text style={styles.text}>{op.label}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        });
        return optionsView;
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
        color: '#677897',
        fontSize: moderateScale(16)
    }
});

export default MCheckbox;
