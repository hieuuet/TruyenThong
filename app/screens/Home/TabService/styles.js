import { scale, moderateScale, verticalScale} from '../../../components/Scaling';

export default {
	headerWrap: {
		height: verticalScale(154),
		position: 'relative' 
	},
	headerBg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		zIndex: 0
	},
	serviceCatWrapper: {
		zIndex: 1,
		marginLeft: moderateScale(6),
		marginTop: moderateScale(10)
	},
	serviceCatIcon: {
		width: moderateScale(36),
		height: verticalScale(36),
	},
	serviceCatTitle: {
		fontSize: moderateScale(14),
		color: '#fff',
		marginTop: moderateScale(8),
		backgroundColor: 'transparent'
	},
	serviceCatItem: {
		marginHorizontal: moderateScale(7),
		alignItems: 'center'
	}
}