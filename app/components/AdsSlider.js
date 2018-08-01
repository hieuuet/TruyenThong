import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Dimensions,TouchableWithoutFeedback, Linking } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Api from '../api/api';
import Util from '../configs/util';
import Constant from '../configs/constant';
import {connect} from 'react-redux';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class AdsSlider extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            ads : []
        };
        this.mounted = false;
    }

    componentWillMount() {
        var area_id = this.props.currentArea != null ? this.props.currentArea.id : this.props.currentWard.id;
        Api.getAdsList(area_id).then(res => {
            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                if (this.mounted) {
                    this.setState({ads : res.javaResponse.ads});
                }
            }
        }).catch(error => {
        });
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    renderItem = ({item, index}) => {
        return (
            <TouchableWithoutFeedback onPress={() => {Linking.openURL(item.url)}}>
                <Image style={{width: this.props.width, height: this.props.width / 4}} source={{uri:item.img}} />
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const { width } = this.props;
        return (
            <View style={this.props.style}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.ads}
                    loop={false}
                    renderItem={this.renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    inactiveSlideScale={1}
                    autoplay={true}
                    autoplayDelay={3000}
                    loop={true}
                    enableMomentum={true} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return  {
        currentWard : state.currentWard,
        currentArea : state.currentArea
    }
}

export default connect(mapStateToProps)(AdsSlider);
