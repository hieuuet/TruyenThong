import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    FlatList,
    Image
} from "react-native";
import styles from './styles';
import SurveyCard from '../../../components/SurveyCard';
import { scale, moderateScale, verticalScale} from '../../../components/Scaling';


export default class ChildTabSurvey extends Component {
	render() {
        const { navigate } = this.props.navigation;

		const surveys = [
            {key: 1, title: 'Hà Nội: Lấy ý kiến cộng đồng người dân về nạo vét Hồ Gươm', subtitle: 'Còn 12 ngày 32 phút', bg: require('../../../images/temp/ftn1.jpg')},
            {key: 2, title: 'Thành phố Hà Nội lấy ý kiến người dân về vấn đề loa phường', subtitle: 'Còn 12 ngày 32 phút', bg: require('../../../images/temp/ftn2.jpg')},
            {key: 3, title: 'Hà Nội đang lấy ý kiến người dân về di dời 1.300 cây xanh', subtitle: 'Còn 12 ngày 32 phút', bg: require('../../../images/temp/ftn1.jpg')},
        ];

		return (
            <ScrollView>
                <View style={{padding: moderateScale(12)}}>

                    <FlatList
                        scrollEnabled={false}
                        data={surveys}
                        style={{marginTop: moderateScale(20)}}
                        renderItem={
                            ({item}) =>
                                <SurveyCard
                                    onPress={()=>this.props.navigation.navigate('SurveyDetail')}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    background={item.bg}
                                    />
                        }
                    />

                </View>
            </ScrollView>
        );
	}
}
