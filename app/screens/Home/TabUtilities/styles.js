import { Platform } from "react-native";

import { scale, moderateScale, verticalScale} from '../../../components/Scaling';


export default {
    container: {
        flex: 1,
        backgroundColor: '#EFEFF4'
    },
    tab: {
        backgroundColor:'#222a2a', zIndex: 1,position: 'absolute',top: 0,left:0,right:0,
        shadowColor: 'rgba(207, 207, 207, 0.5)',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 1
        }
    },
    selectedTabStyle: {
        borderBottomWidth:4,
        borderBottomColor:'#E62565',
    },
    tabLabel: {
        color: 'white',
        fontSize: moderateScale(14),
        paddingTop: moderateScale(10)
    },
    serviceCardWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(3)
    },
    serviceCard: {
        marginRight: moderateScale(9),
        marginBottom: moderateScale(12)
    },
    serviceSectionLabel: {
        fontSize: moderateScale(16),
        color: '#022548',
        fontWeight: '500',
        marginLeft: moderateScale(12),
        marginTop: moderateScale(20),
        marginBottom: moderateScale(5)
    },
    historyDate: {
        paddingLeft: moderateScale(15),
        paddingVertical: moderateScale(20),
        paddingBottom: moderateScale(10),
        fontSize: moderateScale(16),
        color: '#969696'
    },
    envBox: {
        backgroundColor: '#fff',
        shadowOpacity: 1,
        shadowColor: 'rgba(92, 92, 92, 0.38)',
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 1
        },
        borderWidth: Platform.OS === 'ios' ? 0:1,
        borderColor: '#ddd',
        borderRadius: moderateScale(6),
        marginHorizontal: moderateScale(12),
        marginTop: moderateScale(16)
    },
    envBoxHeader : {
        marginTop: moderateScale(10),
        marginLeft: moderateScale(15),
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: '#e62565'
    },
    envBoxRow: {
        flexDirection: 'row',
        flexWrap : 'wrap'
    },
    envBoxCol: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        marginBottom: moderateScale(10)
    },
    envBoxTitle: {
        marginLeft: moderateScale(10),
        fontSize: moderateScale(14),
        color: '#abb4bd',
        fontWeight: 'bold'
    },
    envBoxNum: {
        marginLeft: moderateScale(10),
        fontWeight: 'bold',
        fontSize: moderateScale(20),
        color: '#ffd65e'
    },
    envBoxSmallNum : {
        disconnect : {
            fontWeight: 'bold',
            fontSize: moderateScale(15),
            color: '#ffd65e'
        },
        closed : {
            fontWeight: 'bold',
            fontSize: moderateScale(15),
            color: 'green'
        },
        open : {
            fontWeight: 'bold',
            fontSize: moderateScale(15),
            color: 'red'
        }
    },
    envBoxSelectTitle: {
        color: '#2d3e4f',
        fontSize: moderateScale(10),
    },
    envBoxSelectIcon: {
        height: verticalScale(5),
        width: moderateScale(10),
        marginTop: moderateScale(3),
        marginLeft: moderateScale(5)
    },
    envBoxSelect: {
        marginLeft: moderateScale(12),
        marginTop: moderateScale(8),
        flexDirection: 'row'
    },
    container2: {
        flex: 1,
        backgroundColor: '#EFEFF4'
    },
    envBoxIcon: {
        width: moderateScale(17),
        marginLeft: moderateScale(15)
    }
}
