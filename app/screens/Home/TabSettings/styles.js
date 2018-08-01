
import { scale, moderateScale, verticalScale} from '../../../components/Scaling';

export default {
	header: {
		height: verticalScale(265),
		position: 'relative'
	},
	avatarWrap: {
		overflow: 'hidden',
		borderWidth: 4,
		borderColor: '#fff',
		width: moderateScale(109),
		height: verticalScale(109),
		position: 'absolute',
		borderRadius: moderateScale(100),
		zIndex: 1,
		bottom: moderateScale(24),
		left: moderateScale(20)
	},
	avatar: {
		height: '100%',
		width: '100%'
	},
	cover: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	coverOverlay: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	infoWrap: {
		position: 'absolute',
		left: moderateScale(153),
		right: 0,
		paddingRight: moderateScale(10),
		bottom: moderateScale(22)
	},
	userInfoTextWrap: {
		borderBottomColor: 'rgba(255,255,255,0.43)',
		borderBottomWidth: 1,
		paddingVertical: moderateScale(5),
		backgroundColor: 'transparent'
	},
	userInfoText: {
		color: '#fff',
		fontSize: moderateScale(16),
	},
	introWrap: {
		paddingVertical: moderateScale(16),
		paddingLeft: moderateScale(20),
		borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
	},
	introTitle: {
		color: '#2d384c',
		fontSize: moderateScale(18),
		fontWeight: 'bold',
		marginBottom: moderateScale(8),
		marginTop: moderateScale(19)
	},
	introSubtitle: {
		color: '#677897',
		fontSize: moderateScale(14),
	}
};