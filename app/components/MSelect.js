import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import colors from '../resources/colors';
import _ from 'lodash';
import {Select, Option} from "react-native-chooser";
import globalStyles from '../resources/styles';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class MSelect extends PureComponent {

    getCurrent() {
        return this.props.currentOption;
    }

    renderOptions(options) {
        var optionsView = [];
        _.forEach(options, function(op) {
            optionsView.push(<Option key={op.value} style={styles.optionStyle} styleText={styles.optionTextStyle} value = {op.value}>{op.label}</Option>);
        });

        return optionsView;
    }

    render() {
        const { options, onSelect, defaultText, currentOption } = this.props;

        return (
            <View style={globalStyles.inputWrap}>
                <Select
                    onSelect={onSelect}
                    transparent={true}
                    selectedStyle={styles.selectedStyle}
                    backdropStyle={{backgroundColor : "rgba(0,0,0,0.6)"}}
                    style={styles.select}
                    optionListStyle = {styles.optionListStyle}
                    defaultText={currentOption != null ? currentOption.label : 'Lựa chọn'}
                    textStyle = {styles.selectText}>
                    {this.renderOptions(options)}
                </Select>
                <Image style={globalStyles.inputIcon} source={require('../images/edit.png')} resizeMode="contain" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    select: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8',
        width: '100%',
        marginBottom: moderateScale(16),
        paddingLeft: 0
    },
    selectText: {
        fontSize: moderateScale(16),
        color: '#022548',
    },
    selectedStyle: {
        backgroundColor: colors.primaryColor
    },
    optionListStyle: {
        borderWidth: 0,
        backgroundColor: 'white',
        borderRadius: moderateScale(6),
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowRadius: moderateScale(24),
        shadowOffset: {
            width: 0,
            height: 12
        },
        height: '80%'
    },
    optionTextStyle: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
    optionStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8',
        height: moderateScale(50),
        alignItems: 'center',
        paddingVertical: 0,
        paddingTop: moderateScale(14)
    }
});

export default MSelect;
