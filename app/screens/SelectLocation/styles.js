import {StyleSheet, Platform} from "react-native";
import colors from '../../resources/colors';
import dimens from '../../resources/dimens';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';

export default {
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    innerView: {
        marginHorizontal: dimens.primaryMargin,
        flex: 1,
    },
    locationHeaderRow: {
        flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
    },
    locationHeader: {
        backgroundColor: colors.primaryColor,
        height: verticalScale(91),
        paddingHorizontal: moderateScale(15)
    },
    continueButton: {
        marginTop: moderateScale(32),
        width: moderateScale(188),
        alignSelf: 'center'
    },
    welcomeText: {
        color: '#FFF',
        fontSize: moderateScale(14),
        marginVertical: moderateScale(8)
    },
    signUpButton: {
        textAlign: 'center',
        paddingLeft: moderateScale(10),
        marginTop: moderateScale(32),
        marginBottom: moderateScale(26)
    },
    smallText: {
        fontSize: moderateScale(12),
        color: "#e62565",
        marginTop: moderateScale(24),
    },
    inputWrap: {
        position: 'relative'
    },
    inputClickZone: {height: verticalScale(40), position: 'absolute', bottom: 0,left: 0,right:0,zIndex: 1},
    modalBackdrop: {
        backgroundColor: 'rgba(26, 3, 11, 0.8)',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(20),
    },
    modalInner: {
        overflow: 'visible',
        backgroundColor: '#EFEFF4',
        borderRadius: moderateScale(8),
        width: '100%',
        height: verticalScale(454),
        position: 'relative'
    },
    closeModalButton: {
        width: moderateScale(100),
		height: verticalScale(40),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    closeButtonText: {color: '#FFF', marginRight: moderateScale(12), fontSize: moderateScale(14)},
    closeButtonIcon: {height: verticalScale(10)},
    modalHeader: {
        borderRadius: moderateScale(8),
        paddingLeft: moderateScale(20),
        marginTop: moderateScale(8),
        paddingVertical: moderateScale(16),
        paddingTop: moderateScale(10),
        fontSize: moderateScale(16),
        fontWeight: 'bold'
    },
    listItem: {
        backgroundColor: '#FFF',
        paddingLeft: moderateScale(20),
        color: '#677897',
        borderBottomWidth: moderateScale(1),
        borderBottomColor: '#d8d8d8',
        paddingVertical: moderateScale(8),
        height: verticalScale(50),
        paddingTop: moderateScale(14),
        fontSize: moderateScale(16)
    },
    textIconWrap: {
        marginTop: moderateScale(20),
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    signUpButtonWrap: {

    },
    signUpButton: {
        paddingLeft: moderateScale(10),
        textDecorationLine: 'underline',
        fontSize: moderateScale(14)
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        width: moderateScale(110),
        marginTop: (Platform.OS === 'ios') ? moderateScale(24) : 0,
        shadowColor: 'rgba(89, 89, 89, 0.38)',
    },
};
