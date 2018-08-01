import React, { PureComponent } from 'react';
import {Platform, Image, View, StyleSheet, TextInput} from "react-native";
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class MInput extends PureComponent {

    render() {
        const { color, label, style, icon, disabled, onPress, value, onChange, type, maxLength, refName, submitEdit, returnKeyType} = this.props;

        return (
            <View
                onPress={() => onPress()}
                shouldRasterizeIOS
                renderToHardwareTextureAndroid
                style={[this.props.style, {position: 'relative', marginTop: moderateScale(32)}]} scrollEnabled={false}>
                <Image
                    style={mInputStyles.iconStyle} source={this.props.icon}
                    resizeMode="contain"
                    />
                <TextInput
                    secureTextEntry={this.props.secureTextEntry}
                    style={[mInputStyles.inputStyle, {paddingLeft: this.props.icon ? moderateScale(35) : 0}]}
                    placeholder={this.props.label}
                    disabled={this.props.disabled}
                    value={this.props.value}
                    onChangeText={(value) => onChange(value)}
                    keyboardType={type}
                    maxLength={maxLength}
                    autoCapitalize={'none'}
                    ref={refName}
                    onSubmitEditing={submitEdit}
                    returnKeyType={returnKeyType}
                />
            </View>
        );
    }

}
MInput.defaultProps = {
    disabled: false,
    onPress: function () {
    },
    onChange: function(value) {

    }
};

const mInputStyles = StyleSheet.create({
    errorTextStyle: {
        color: 'red',
        fontSize: moderateScale(10),
        marginTop: moderateScale(5)
    },
    itemStyle: {
        flex: 0,
        marginTop: moderateScale(16)
    },
    inputStyle: {
        color: 'black',
        fontSize: moderateScale(16),
        borderBottomColor: '#d1dae6',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        height: verticalScale(42)
    },
    iconStyle: {
        height: verticalScale(19),
        position: 'absolute',
        bottom: moderateScale(12),
        left: 0
    }
});

export default MInput;
