//@flow
import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity, ScrollView} from "react-native";

import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';

class SettingAbout extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentWillMount() {
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                        <Image style={styles.backIcon} source={require('../../images/back-white.png')} resizeMode="contain" />
                        <Text style={styles.backText}>Về Truyền thông thông minh</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.content]}>
                        <Text style={{fontSize: moderateScale(14)}}>Truyền thông thông minh, kênh thông tin truyền thông cung cấp đầy đủ và chi tiết đến từng địa bàn.
Với phiên bản App trên iOS và Android bạn sẽ có những trải nghiệm thú vị và hữu ích với các chức năng:</Text>
<Text style={{fontSize: moderateScale(14)}}>- Hiển thị, phát tin tức của chính quyền theo từng địa bàn, khu vực.</Text>
<Text style={{fontSize: moderateScale(14)}}>- Tính năng nghe lại các tin tức bất kỳ lúc nào.</Text>
<Text style={{fontSize: moderateScale(14)}}>- Kết hợp với tiện ích nhà thông minh (cần có thiết bị IOT kèm theo).</Text>
<Text style={{fontSize: moderateScale(14)}}>- Tốc độ nhanh, được tối ưu cho kết nối 2G/3G/Wifi.</Text>
<Text style={{fontSize: moderateScale(14)}}>Chúng tôi sẽ liên tục cập nhật tính năng mới để người dùng trải nghiệm.</Text>
                </View>
            </ScrollView>
        );
    }
}
export default SettingAbout;
