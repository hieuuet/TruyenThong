import React, { PureComponent } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { scale, moderateScale, verticalScale} from '../components/Scaling';


export default class SliderPagination extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            length: 0,
            activeSlide: 0
        };
    }

    setActiveSlide = (activeSlide) => {
        this.setState({ activeSlide });
    }

    render() {
        return (
            <Pagination
                dotsLength={this.props.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ position: 'absolute', bottom: moderateScale(5), left: 0, right: 0, alignSelf: 'center' }}
                dotStyle={{
                    height: verticalScale(7),
                    borderRadius: moderateScale(4),
                    width: moderateScale(20),
                    backgroundColor: '#e62565'
                }}
                inactiveDotStyle={{
                    marginVertical: 0,
                    width: moderateScale(7),
                    backgroundColor: '#FFFFFF',
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }
}
