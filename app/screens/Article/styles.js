import {StyleSheet, Platform} from "react-native";
import colors from '../../resources/colors';
import dimens from '../../resources/dimens';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


export default StyleSheet.create({
	articleContainer: {
		backgroundColor: 'white',
		flex: 1
	},
	headerArticle: {
		height: (Platform.OS === 'ios') ? verticalScale(60) : verticalScale(40),
		backgroundColor: colors.primaryColor,
        paddingTop:  (Platform.OS === 'ios') ? moderateScale(20) : 0,
    },
	postCover: {
		width: '100%',
		height: verticalScale(200),
		marginBottom: moderateScale(14)
	},
	date: {
		fontSize: moderateScale(14),
		color: '#959595',
		paddingHorizontal: moderateScale(15),
		marginBottom: moderateScale(8)
	},
	shortDes: {
		fontSize: moderateScale(16),
		color: '#303030',
		paddingHorizontal: moderateScale(15),
		marginBottom: moderateScale(8),
		fontWeight: 'bold'
	},
	title: {
		fontSize: moderateScale(20),
		color: colors.primaryColor,
		paddingHorizontal: moderateScale(15),
		fontWeight: '500',
		marginBottom: moderateScale(24)
	},
	postContent:{
		marginBottom: moderateScale(12),
		alignItems: 'stretch'
	},
	commentWrap: {
		backgroundColor: '#efeff4',
		padding: moderateScale(12)
	},
	socialButtonWrap: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flex: 1
	},
	socialButton: {
		height: verticalScale(38),
		backgroundColor: '#fff',
		shadowColor: 'rgba(92, 92, 92, 0.4)',
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 1
		},
		borderRadius: moderateScale(4),
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '31%',
	},
	socialButtonText: {
		marginRight: moderateScale(16),
		fontSize: moderateScale(13)
	},
	socialButtonIcon: {
		width: moderateScale(20),
		marginLeft: moderateScale(16)
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
	progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	contentContainer: {
		paddingHorizontal: 0
	}
});
