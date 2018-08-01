const React = require('react');
const { ViewPropTypes } = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    TouchableOpacity
} = ReactNative;

import Util from '../configs/util'
import { scale, moderateScale, verticalScale} from '../components/Scaling';

const HomeTabBar = createReactClass({
        propTypes: {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: ViewPropTypes.style,
        renderTab: PropTypes.func,
        underlineStyle: ViewPropTypes.style,
        badges: PropTypes.array
    },

    getDefaultProps() {
        return {
            activeTextColor: '#e62565',
            inactiveTextColor: '#677897',
            backgroundColor: null,
        };
    },

    renderTabOption(name, page) {
    },

    renderIcon(page, isTabActive) {
        switch(page) {
            case 0:
                return !isTabActive ? (<Image source={require('../images/htab-home.png')}
                        style={[styles.icon]} resizeMode="contain" />)
                : (<Image source={require('../images/htab-home-active.png')}
                        style={[styles.icon]} resizeMode="contain" />);
            case 1:
                return !isTabActive ? (<Image source={require('../images/htab-speaker.png')}
                        style={[styles.icon]} resizeMode="contain" />)
                : (<Image source={require('../images/htab-speaker-active.png')}
                        style={[styles.icon]} resizeMode="contain" />);
            case 2:
                return !isTabActive ? (<Image source={require('../images/htab-flag.png')}
                        style={[styles.icon]} resizeMode="contain" />)
                : (<Image source={require('../images/htab-flag-active.png')}
                        style={[styles.icon]} resizeMode="contain" />);
            case 3:
                return !isTabActive ? (<Image source={require('../images/htab-layers.png')}
                        style={[styles.icon]} resizeMode="contain" />)
                : (<Image source={require('../images/htab-layers-active.png')}
                        style={[styles.icon]} resizeMode="contain" />);
            case 4:
                return !isTabActive ? (<Image source={require('../images/htab-cog.png')}
                        style={[styles.icon]} resizeMode="contain" />)
                : (<Image source={require('../images/htab-cog-active.png')}
                        style={[styles.icon]} resizeMode="contain" />);

        }
    },

    renderTab(name, page, isTabActive, onPressHandler) {
        const { activeTextColor, inactiveTextColor, textStyle, badges, loggedIn, goToLogin, navigation } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;

        return <TouchableOpacity
            style={{flex: 1}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => {
                if ((page == 2) && !loggedIn) {
                    Util.showConfirmAlertRedirect('Thông báo', 'Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng tính năng!', navigation);
                    // goToLogin();
                } else {
                    onPressHandler(page)
                }
            }}
        >
            <View style={[styles.tab, this.props.tabStyle, ]}>
                {this.renderIcon(page, isTabActive)}
                <Text style={[{color: textColor, fontSize: moderateScale(10)}, textStyle, ]}>{name}</Text>
                {
                    (this.props.badges[page] > 0) &&
                    <View style={styles.badgeWrap}>
                        <Text style={styles.badge}>{this.props.badges[page]}</Text>
                    </View>
                }
            </View>
        </TouchableOpacity>;
    },

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  containerWidth / numberOfTabs],
        });
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
            </View>
        );
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: moderateScale(9),
    },
    tabs: {
        height: verticalScale(65),
        paddingTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    iconContainer: {
        position: 'relative',
        height: verticalScale(24),
        marginBottom: moderateScale(8)
    },
    icon: {
        marginTop: moderateScale(8),
        marginBottom: moderateScale(8),
        height: verticalScale(24),
        alignSelf: 'center',
        width: moderateScale(24)
    },
    badge: {
        color: 'white',
        fontSize: moderateScale(10),
        paddingVertical: moderateScale(2),
        paddingHorizontal: moderateScale(4)
    },
    badgeWrap: {
        backgroundColor: '#e62565',
        borderRadius: moderateScale(3),
        overflow: 'hidden',
        marginLeft: moderateScale(4),
        position: 'absolute',
        right: moderateScale(10),
        top: moderateScale(5)
    },
});

module.exports = HomeTabBar;
