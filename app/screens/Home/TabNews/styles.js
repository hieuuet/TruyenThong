import {Dimensions} from "react-native";
import { scale, moderateScale, verticalScale} from '../../../components/Scaling';

const win = Dimensions.get('window');

export default {
    container: {
        flex: 1,
        paddingTop: moderateScale(55),
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
        borderBottomWidth: 4,
        borderBottomColor:'#E62565',
    },
    tabLabel: {
        color: 'white',
        fontSize: moderateScale(14),
        paddingTop: moderateScale(10)
    },
    seperator: {
		marginTop: moderateScale(10),
		backgroundColor: '#8E8E8E'
	},
    progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
    page: {
        flex: 1
    },
    imageDetail: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height,
    },
    promotionWrapper: {
        marginBottom: moderateScale(20),
        paddingHorizontal: moderateScale(12)
    },
    container2: {
        flex: 1,
        backgroundColor: '#EFEFF4'
    }
}
