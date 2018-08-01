import {StyleSheet, Platform, Dimensions} from "react-native";
import colors from '../../resources/colors';
import dimens from '../../resources/dimens';
const win = Dimensions.get('window');

import { scale, moderateScale, verticalScale} from '../../components/Scaling';


export default StyleSheet.create({
	container: {
		height: win.height
	},
	header: {
		backgroundColor: colors.primaryColor,
		height: verticalScale(122),
		position: 'relative'
	},
	backIcon: {
		width: moderateScale(18),
		marginRight: moderateScale(20)
	},
	addIcon: {
		width: moderateScale(25),
		marginRight: moderateScale(20)
	},
	backIcon2: {
		width: moderateScale(18),
		height: verticalScale(14),
	},
	backText: {
		color: '#ffffff',
		fontSize: moderateScale(16)
	},
	backButton: {
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: moderateScale(29),
		marginLeft: moderateScale(15)
	},
	backButton2: {
		padding: moderateScale(10),
		position: 'absolute',
		left: moderateScale(5),
		zIndex: moderateScale(5),
		top: moderateScale(29),
	},
	addButton: {
		padding: moderateScale(10),
		position: 'absolute',
		right: moderateScale(5),
		zIndex: 5,
		top: moderateScale(20),
	},
	content: {
		borderRadius: moderateScale(4),
		zIndex: 2,
		backgroundColor: 'white',
		marginHorizontal: moderateScale(15),
		padding: moderateScale(24),
		marginTop: -moderateScale(20),
		marginBottom: moderateScale(20)
	},
	label: {
		fontSize: moderateScale(12),
		fontWeight: 'bold',
		color: '#e62565'
	},
	// Setting Support
	button: {
		height: verticalScale(40),
		borderRadius: moderateScale(4),
		backgroundColor: 'white',
		borderWidth: Platform.OS === 'ios' ? 0:1,
		borderColor: '#ddd',
		shadowOpacity: 1,
		shadowColor: 'rgba(89, 89, 89, 0.38)',
		shadowOffset: {
			width: 1,
			height: 2
		},
		marginBottom: moderateScale(15),
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: moderateScale(10),
		position: 'relative'
	},
	buttonIcon: {
		width: moderateScale(16),
		height: verticalScale(16),
		marginRight: moderateScale(10),
		marginLeft: moderateScale(18)
	},

	paddingContent: {
		paddingHorizontal: moderateScale(24)
	},
	cover: {
		zIndex: 0,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	},
	coverIcon: {
		height: verticalScale(20),
		position: 'absolute',
		top: moderateScale(68),
		width: '100%',
		alignSelf: 'center'
	},
	pageTitle: {
		backgroundColor: 'transparent',
		position: 'absolute',
		width: '100%',
		zIndex: 1,
		color: 'white',
		textAlign: 'center',
		marginTop: moderateScale(40),
		fontSize: moderateScale(14)
	},

	// style addHousehold
	container2: {
			backgroundColor: '#FFFFFF',
			flex:1
	},
	innerView: {
			marginHorizontal: dimens.primaryMargin,
			flex: 1,
	},
	signInButton: {
			marginTop: moderateScale(32),
			alignSelf: 'center',
			width: moderateScale(188),
			marginBottom: moderateScale(32)
	},
	backButton3: {
		backgroundColor: '#FFFFFF',
		width: moderateScale(110),
		marginTop: moderateScale(24),
		shadowColor: 'rgba(89, 89, 89, 0.38)',
		elevation: 2
	},
	progressBar: {
		// backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: moderateScale(14)
	}
});
