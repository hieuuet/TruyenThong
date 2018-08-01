import {StyleSheet} from "react-native";
import colors from '../../resources/colors';
import dimens from '../../resources/dimens';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';


export default StyleSheet.create({
	articleContainer: {
	},
	header: {
		height: verticalScale(151),
		position: 'relative'
	},
	postCover: {
		width: '100%',
		height: '100%',
		marginBottom: moderateScale(14),
		position: 'absolute',
		zIndex: 0,
		left: 0,
		top: 0
	},
	timeWrap: {
		zIndex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: moderateScale(12),
	},
	timeIcon: {
		width: moderateScale(23),
	},
	time: {
		fontSize: moderateScale(14),
		color: '#fff',
		marginLeft: moderateScale(8),
		backgroundColor: 'transparent'
	},
	title: {
		fontSize: moderateScale(16),
		color: '#fff',
		fontWeight: '500',
		marginBottom: moderateScale(12),
		marginTop: moderateScale(50),
		zIndex: 1,
		marginHorizontal: moderateScale(12),
		backgroundColor: 'transparent'
	},
	backButton: {
		position: 'absolute',
		left: moderateScale(12),
		top: moderateScale(18),
		zIndex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	backButtonIcon: {
		height: verticalScale(14)
	},
	backButtonText: {
		color: 'white',
		fontSize: moderateScale(14),
		backgroundColor: 'transparent'
	},
	postContent: {
		marginHorizontal: moderateScale(12),
		fontSize: moderateScale(16),
		lineHeight: moderateScale(22),
		marginVertical: moderateScale(26)
	},
	voteWrap: {
		paddingHorizontal: moderateScale(12),
		paddingVertical: moderateScale(24),
		backgroundColor: 'white'
	},
	voteBar: {
		borderRadius: moderateScale(8),
		height: verticalScale(8),
		backgroundColor: '#ceced2',
		marginBottom: moderateScale(16)
	},
	voteOpTitle: {
		fontSize: moderateScale(16),
		fontWeight: '500',
		marginBottom: moderateScale(8),
		color: '#677897',
	},
	voteTitle: {
		fontSize: moderateScale(16),
		fontWeight: '500',
		marginBottom: moderateScale(24),
		color: '#677897',
	},
	voteResult: {
		color: '#abb4bd',
		fontSize: moderateScale(14),
	},
	voteOpTitleWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	sendWrap: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: '#cacaca',
		padding: moderateScale(12),
		backgroundColor: 'white'
	},
	optionWrap: {
		position: 'relative',
		borderRadius: moderateScale(4),
		shadowOpacity: 1,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowColor: 'rgba(92, 92, 92, 0.4)',
		padding: moderateScale(16),
		backgroundColor: 'white',
		flex: 1,
		margin: moderateScale(12),
		paddingLeft: moderateScale(48)
	},
	optionLabel: {
		color: '#677897',
		fontSize: moderateScale(16),
		fontWeight: '500',
		marginBottom: moderateScale(12)
	},
	optionRadio: {
		width: moderateScale(20),
		height: verticalScale(20),
		borderWidth: 2,
		borderColor: '#c1c0c0',
		borderRadius: moderateScale(10),
		position: 'absolute',
		left: moderateScale(16),
		top: moderateScale(16)
	},
	send: {
        height: verticalScale(46),
        width: moderateScale(147)
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        margin: moderateScale(12)
    },
    userWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    username: {
        color: '#677897',
        fontSize: moderateScale(14),
        marginLeft: moderateScale(10)
    },
    avatarWrap: {
        overflow: 'hidden',
        borderRadius: moderateScale(100),
        width: moderateScale(44),
        height: verticalScale(44),
    },
    avatar: {
        width: '100%',
        height: '100%',
        marginRight: moderateScale(10)
    }
});