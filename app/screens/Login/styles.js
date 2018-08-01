import dimens from '../../resources/dimens';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';

export default {
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    innerView: {
        marginHorizontal: dimens.primaryMargin,
    },
    signInButton: {
        marginTop: moderateScale(32),
        width: moderateScale(188),
        alignSelf: 'center'
    },
    signUpButton: {
        paddingRight: moderateScale(10),
        textDecorationLine: 'underline',
        fontSize: moderateScale(14)
    },
    skipSignin: {
        paddingRight: moderateScale(10),
        textDecorationLine: 'underline',
        fontSize: moderateScale(14)
    },
    textIconWrap: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(10)
    }
};
