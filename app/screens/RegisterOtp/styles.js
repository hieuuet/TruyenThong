import dimens from '../../resources/dimens';
import { scale, moderateScale, verticalScale} from '../../components/Scaling';

export default {
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1
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
    backButton: {
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
	}
};
