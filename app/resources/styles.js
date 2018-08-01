/*
	Common style for app
 */
import {StyleSheet, Platform} from "react-native";
import colors from './colors';
import dimens from './dimens';

import { scale, moderateScale, verticalScale} from '../components/Scaling';


export default StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	roundedTag: {
		borderColor: '#d7d7d7',
		borderWidth: 1,
		borderRadius: moderateScale(100),
		shadowColor: 'transparent',
		marginRight: moderateScale(8),
		marginBottom: moderateScale(8),
		paddingVertical: moderateScale(8),
		paddingHorizontal: moderateScale(16)
	},
	locationHeader: {
        backgroundColor: colors.primaryColor,
        paddingHorizontal: 0,
				// status bar
        paddingTop:  (Platform.OS === 'ios') ? moderateScale(20) : 0,
        height: (Platform.OS === 'ios') ? verticalScale(59) : verticalScale(39)
				// no status bar
				// paddingTop:  (Platform.OS === 'ios') ? 5 : 0,
        // height: (Platform.OS === 'ios') ? 49 : 39
    },
    locationHeaderRow: {
		// justifyContent: 'flex-start',
		flexDirection: 'row',
        alignItems: 'center',
    },
    locationHeaderItem: {
    	marginLeft: moderateScale(8),
    	height: verticalScale(23),
        paddingVertical: 0
    },
	locationHeaderFirstItem: {
    	marginLeft: 0,
    	height: verticalScale(23),
        paddingVertical: 0
    },
    modalBackdrop: {
        backgroundColor: 'rgba(26, 3, 11, 0.8)',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
		paddingHorizontal: moderateScale(10)
    },
    modalInner: {
        overflow: 'hidden',
        backgroundColor: '#EFEFF4',
        borderRadius: moderateScale(8),
        width: '100%',
        maxHeight: '80%',
        position: 'relative'
    },
    listItem: {
        backgroundColor: '#FFF',
        paddingLeft: moderateScale(20),
        color: '#677897',
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8',
        paddingVertical: moderateScale(8)
    },
    modalHeader: {
        borderRadius: moderateScale(8),
        paddingLeft: moderateScale(20),
        marginTop: moderateScale(8),
        paddingVertical: moderateScale(16),
        paddingTop: moderateScale(10)
    },
    closeModalButton: {
        width: moderateScale(100),
		height: verticalScale(40),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    closeButtonText: {color: '#FFF', marginRight: moderateScale(12), fontSize: moderateScale(13)},
    closeButtonIcon: {height: verticalScale(10)},
    backButton: {
        backgroundColor: '#FFFFFF',
        width: moderateScale(110),
        marginTop: moderateScale(24),
        shadowColor: 'rgba(89, 89, 89, 0.38)',
    },
    contentCard: {
        borderRadius: moderateScale(4),
        marginHorizontal: moderateScale(15),
        padding: moderateScale(24),
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowRadius: moderateScale(24),
        shadowOffset: {
            width: 0,
            height: 12
        },
        marginBottom: moderateScale(24),
        backgroundColor: 'white'
    },
    label: {
        fontSize: moderateScale(12),
        fontWeight: 'bold',
        color: '#e62565',
        marginBottom: moderateScale(16)
    },
    lineInput: {
        borderBottomWidth: (Platform.OS === 'ios') ? 1:0,
        borderBottomColor: '#d8d8d8',
        height: verticalScale(40),
        fontSize: moderateScale(14)
    },
    inputWrap: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        right: 0,
        height: verticalScale(14),
        width: moderateScale(14),
        top: moderateScale(12)
    },
});
