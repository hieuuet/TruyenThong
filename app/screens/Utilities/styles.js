import {StyleSheet, Platform, Dimensions} from "react-native";
import colors from '../../resources/colors';
import dimens from '../../resources/dimens';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';

const win = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		height: win.height
	},
	header: {
		backgroundColor: colors.primaryColor,
		height: verticalScale(122),
		position: 'relative'
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
	backButton: {
		padding: moderateScale(10),
		position: 'absolute',
		left: moderateScale(5),
		zIndex: 5,
		top: moderateScale(29),
	},
	backIcon: {
		width: moderateScale(18),
		height: verticalScale(14),
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
	paddingContent: {
		paddingHorizontal: moderateScale(24)
	},
	bigTitle: {fontSize: moderateScale(16), color: '#022548', fontWeight: 'bold'},
	billRow: {
		borderBottomColor: '#d5d5d5',
		borderBottomWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: verticalScale(40),
		flexWrap: 'wrap'
	},
	billRowTitle: {
		fontSize: moderateScale(12),
		color: '#677897',
		width: '40%'
	},
	billRowDesc: {
		fontSize: moderateScale(16),
		color: '#677897',
		fontWeight: 'bold',
		width: '60%',
		flexWrap: 'wrap'
	},
	payCardWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginTop: moderateScale(10)
	},
	doorDateCard: {minWidth:moderateScale(53), height: verticalScale(48)},
	doorHistoryTitle: {
		fontSize: moderateScale(16),
		color: '#2d3e4f',
	},
	doorHistoryDate: {
		fontSize: moderateScale(12),
		color: '#677897'
	},
	doorHistoryRow: {
		borderBottomWidth: 1,
		borderBottomColor: '#d5d5d5',
		paddingBottom: moderateScale(12),
		marginTop: moderateScale(12),
		borderLeftColor: 'red',
		borderLeftWidth: 4,
		paddingLeft: moderateScale(12)
	},
	doorHistoryRowOpen: {
		borderLeftColor: 'green',
	},
	doorHistoryRowOff: {
		borderLeftColor: 'gray',
	},
	timePickerInput: {
		borderBottomWidth: 1,
		borderBottomColor: '#d8d8d8',
		height: verticalScale(30),
		marginBottom: moderateScale(16),
		position: 'relative'
	},
	timePickerInputIcon: {
		width: moderateScale(16),
		position: 'absolute',
		right: 0,
		bottom: moderateScale(5)
	}
});
