//@flow
import React, {Component} from "react";
import {View, Image, StatusBar, Text, TouchableOpacity, FlatList, TextInput, ScrollView} from "react-native";
import SmallPostItem from '../../components/SmallPostItem';
import MButton from '../../components/MButton';
import Comment from '../../components/Comment';
import Tag from "../../components/Tag";
import styles from './styles';
import globalStyles from '../../resources/styles';

export class SurveyDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            option: 'other' // yes, no, other
        };
    }

    static navigationOptions = {
        header: null
    };

    _chooseOption(op) {
        this.setState({option: op});
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const news = [
            {key: 1, title: 'A retired Navy SEAL commander does two things every night before bed so he can attack the next da...', bg: require('../../images/temp/ftn1.jpg')},
            {key: 2, title: 'A massive earthquake just hit Mexico City - These terrifying videos show the chaos that followed', bg: require('../../images/temp/ftn2.jpg')},
            {key: 3, title: 'Đảng bộ cơ quan Văn phòng Quốc hội thông báo kết quả Hội nghị Trung ương 6, Khóa XII', bg: require('../../images/temp/ftn1.jpg')},
        ];
        return (
            <ScrollView style={styles.articleContainer}>

                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => goBack()}>
                            <Image style={styles.backButtonIcon} resizeMode="contain" source={require('../../images/back-white.png')} />
                            <Text style={styles.backButtonText}>Quay lại</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Hà Nội: Lấy ý kiến cộng đồng người dân về nạo vét Hồ Gươm</Text>
                        <View style={styles.timeWrap}>
                            <Image style={styles.timeIcon} resizeMode="contain" source={require('../../images/clock.png')} />
                            <Text style={styles.time}>Còn lại 12 ngày 24 phút</Text>
                        </View>
                        <View style={styles.voteWrap}>
                            <Text style={styles.voteTitle}>Kết quả tạm thời</Text>
                            <View style={styles.voteOpTitleWrap}>
                                <Text style={styles.voteOpTitle}>Đồng ý</Text>
                                <Text style={styles.voteResult}>102k phiếu / 70%</Text>
                            </View>
                            <View style={[styles.voteBar, {width: '100%', backgroundColor: '#e62565'}]}></View>

                            <View style={styles.voteOpTitleWrap}>
                                <Text style={styles.voteOpTitle}>Không đồng ý</Text>
                                <Text style={styles.voteResult}>22k phiếu / 20%</Text>
                            </View>
                            <View style={[styles.voteBar, {width: '12%'}]}></View>

                            <Text style={styles.voteOpTitle}>Ý kiến khác</Text>
                            <View style={[styles.voteBar, {width: '50%'}]}></View>
                        </View>
                        <Image style={styles.postCover} source={require('../../images/surveybg.jpg')} resizeMode="cover" />
                        <View style={styles.sendWrap}>
                            <MButton label="GỬI Ý KIẾN" style={{width: 178}}/>
                        </View>
                    </View>
                    <View style={{flex: 1, marginTop: 297}}>
                        <Text style={styles.postContent}>
                            Đây là dự án có từ trước dịp kỷ niệm 1.000 năm Thăng Long-Hà Nội. Ông Chung cũng khẳng định trong dự án này, không có nội dung thay thế, trồng lại cây xanh ven hồ Hoàn Kiếm.

    Người đứng đầu chính quyền thành phố Hà Nội. cho biết dự án có ba hạng mục chính: thứ nhất là nạo vét đáy hồ, thứ hai làm sạch nước hồ trên tinh thần vừa sạch môi trường nhưng cũng giữ lại nét riêng của nước hồ và thứ ba là chỉnh trang ánh sáng ven hồ Hoàn Kiếm.

    Song song với đó, vỉa hè xung quanh hồ sẽ được ốp lát lại bằng đá tự nhiên để đảm bảo độ bền, ít nhất phải được từ 50-70 năm, thậm chí 100 năm.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.optionWrap} onPress={()=>this._chooseOption('yes')}>
                        <View style={[styles.optionRadio, {backgroundColor: this.state.option == 'yes'?'#e62565':'white'}]}></View>
                        <Text style={styles.optionLabel}>Đồng ý</Text>
                        <TextInput style={{paddingBottom: 10}} placeholder="Nội dung ý kiến" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionWrap} onPress={()=>this._chooseOption('no')}>
                        <View style={[styles.optionRadio, {backgroundColor: this.state.option == 'no'?'#e62565':'white'}]}></View>
                        <Text style={styles.optionLabel}>Không đồng ý</Text>
                        <TextInput style={{paddingBottom: 10}} placeholder="Nội dung ý kiến" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionWrap} onPress={()=>this._chooseOption('other')}>
                        <View style={[styles.optionRadio, {backgroundColor: this.state.option == 'other'?'#e62565':'white'}]}></View>
                        <Text style={styles.optionLabel}>Ý kiến khác</Text>
                        <TextInput style={{paddingBottom: 10}} placeholder="Nội dung ý kiến" />
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <View style={styles.userWrap}>
                            <View style={styles.avatarWrap}>
                                <Image style={styles.avatar} resizeMode="cover" source={require('../../images/temp/ftn1.jpg')} />
                            </View>
                            <Text style={styles.username}>Ngọc Tân</Text>
                        </View>
                        <MButton
                            style={styles.send}
                            label="GỬI BÌNH LUẬN" />
                    </View>

            </ScrollView>
        );
    }
}
