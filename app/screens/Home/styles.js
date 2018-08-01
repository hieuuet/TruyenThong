import colors from '../../resources/colors';
import dimens from '../../resources/dimens';

import { scale, moderateScale, verticalScale} from '../../components/Scaling';

export default {
    container: {
        backgroundColor: '#FFFFFF',
        flex:1
    },
    tabContainer: {
        backgroundColor: '#FFF',
    },
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: verticalScale(65)
    },
    iconContainer: {
        position: 'relative',
        height: verticalScale(24),
        marginBottom: moderateScale(8)
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: -moderateScale(3),
        right: 0,
        bottom: moderateScale(8),
        height: verticalScale(24),
        alignSelf: 'center'
    },
    label: {
        fontSize: moderateScale(10),
        marginTop: moderateScale(3),
        marginBottom: moderateScale(1.5),
        backgroundColor: 'transparent',
    },
    page: {
        flex: 1,
        backgroundColor: '#EFEFF4',
    },
    serviceWrapper: {
        paddingHorizontal: moderateScale(12)
    },
    serviceSeeAllBtn: {
        width: moderateScale(163),
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d7d7d7',
        alignSelf: 'center',
        shadowColor: 'transparent',
        marginBottom: moderateScale(12)
    },
    serviceCard: {
        marginRight: moderateScale(9)
    },
    promotion: {
        marginRight: moderateScale(16)
    },
    promotionWrapper: {
        position: 'relative',
        height: verticalScale(220),
        paddingHorizontal: moderateScale(12),
    },
    areaNewsWrapper: {
        marginBottom: moderateScale(12),
        borderBottomWidth: 1,
        borderBottomColor: '#c8c8c8',
    },
    tagsWrapper: {
        paddingLeft: moderateScale(12),
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: moderateScale(10)
    },
    annHeader: {
        position: 'relative',
        height: verticalScale(185),
        paddingTop: moderateScale(18)
    },
    annHeaderBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: -1
    },
    tab: {
        backgroundColor:'#fff',
        zIndex: 1,
        position: 'absolute',
        top: moderateScale(55),
        left:0,
        right:0,
        shadowColor: '#c8c8c8',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 1
        },
        height: verticalScale(65)
    },
    tabLabel: {
        color: '#677897',
        fontSize: moderateScale(10),
        textAlign: 'center'
    },
};
