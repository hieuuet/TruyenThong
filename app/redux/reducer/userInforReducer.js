import Util from '../../configs/util';

const defaultUser = null;
/* user infor information
{
    "full_name": Họ tên người dùng,
    "phone_number": Số điện thoại người dùng,
    "areas":  array địa bàn của user
}
*/

const currentUserReducer = (state = defaultUser, action) => {
    switch (action.type) {
        case 'CHANGE_USER_INFOR':
            return action.user;
        default:
            return state;
    }
    return state;
};

export default currentUserReducer;
