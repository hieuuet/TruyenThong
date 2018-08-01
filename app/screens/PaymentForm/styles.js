import { Platform, Dimensions } from "react-native";
import colors from '../../resources/colors';
import dimens from '../../resources/dimens';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


export default {
    wrapper: {
		backgroundColor: '#fff',
		flex: 1
	},
    headerArticle: {
		height: (Platform.OS === 'ios') ? verticalScale(60) : verticalScale(40),
		backgroundColor: colors.primaryColor,
        paddingTop:  (Platform.OS === 'ios') ? moderateScale(20) : 0,
    },
    backButton: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: moderateScale(130),
		height: '100%'
	},
	backButtonIcon: {
		height: verticalScale(14)
	},
	backButtonText: {
		color: 'white',
		fontSize: moderateScale(14)
	},
    webview : {
        flex : 1,
        marginTop: moderateScale(20)
    },
    ActivityIndicatorStyle:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'

  },
  webview3D : {
      flex : 1,
      marginTop: moderateScale(20),
      width: Dimensions.get('window').width,
      alignSelf: 'stretch'
  }
};
