import React, { Component , PureComponent} from 'react';
import {
    View,
    ScrollView,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import styles from './styles';
import ServiceListItem from '../../../components/ServiceListItem';
import SearchBox from '../../../components/SearchBox';
import Util from '../../../configs/util';
import Constant from '../../../configs/constant';
import { scale, moderateScale, verticalScale} from '../../../components/Scaling';


export default class TabService extends PureComponent {
  _onClickService = (item) => {
    Util.showAlert(Constant.MESSAGES.DEV_FUNC_MSG);
  }
	render() {
		const services = [
            {key: 1, title: 'Cấp bản sao giấy khai sinh', subtitle: 'UBND Quận 1', icon: require('../../../images/temp/sv2.png')},
            {key: 2, title: 'Thủ tục tặng Giấy khen của Chủ tịch UBND huyện về thành tích thực hiện nhiệm vụ chính trị', subtitle: 'UBND huyện 1', icon: require('../../../images/temp/sv3.png')},
            {key: 3, title: 'Cấp lại Giấy Tiếp nhận bản công bố hợp quy và Giấy Xác nhận công bố phù hợp quy định an toàn thực phẩm thuộc thẩm quyền của Bộ Y tế', subtitle: 'UBND Quận 3', icon: require('../../../images/temp/sv2.png')},
            {key: 4, title: 'Cấp giấy xác nhận nội dung quảng cáo đối với các loại thực phẩm chức năng; thực phẩm tăng cường vi chất dinh dưỡng thuộc phạm vi quản lý của Bộ Y tế.', subtitle: 'UBND Quận 4', icon: require('../../../images/temp/sv3.png')},
            {key: 5, title: 'Công chứng hợp đồng mua bán tài sản gắn liền với đất.', subtitle: 'UBND Quận 5', icon: require('../../../images/temp/sv2.png')},
        ];
        const servicesCat = [
            {key: 1, icon: require('../../../images/servicecat/tuphap.png'), title: 'Tư pháp'},
            {key: 2, icon: require('../../../images/servicecat/dautu.png'), title: 'Đầu tư'},
            {key: 3, icon: require('../../../images/servicecat/giadinh.png'), title: 'Gia đình'},
            {key: 4, icon: require('../../../images/servicecat/giaoduc.png'), title: 'Giáo dục'},
            {key: 5, icon: require('../../../images/servicecat/xaydung.png'), title: 'Xây dựng'},
            {key: 6, icon: require('../../../images/servicecat/yte.png'), title: 'Y tế'},
        ];



		return (
            <View style={{backgroundColor: '#EFEFF4', flex: 1}}>
                <ScrollView>
                    <View style={styles.headerWrap}>
                        <SearchBox />
                        <FlatList
                            horizontal={true}
                            data={servicesCat}
                            style={styles.serviceCatWrapper}
                            renderItem={
                                ({item}) => (
                                    <TouchableOpacity style={styles.serviceCatItem}>
                                        <Image resizeMode="contain" source={item.icon} style={styles.serviceCatIcon} />
                                        <Text style={styles.serviceCatTitle}>{item.title}</Text>
                                    </TouchableOpacity>
                                )

                            }
                        />
                        <Image resizeMode="cover" source={require('../../../images/servicebg.jpg')} style={styles.headerBg} />
                    </View>
                    <Text style={{color: '#022548', fontSize: moderateScale(16), marginTop: moderateScale(15), marginLeft: moderateScale(12), fontWeight: 'bold'}}>Dịch vụ phổ biến</Text>
                    <FlatList
                        data={services}
                        style={{}}
                        renderItem={
                            ({item}) =>
                                <ServiceListItem
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    icon={item.icon}
                                    onPress={() => this._onClickService(item)}
                                    />
                        }
                    />
                </ScrollView>
            </View>
        );
	}
}
