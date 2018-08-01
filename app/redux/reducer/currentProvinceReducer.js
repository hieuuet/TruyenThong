import Util from '../../configs/util';

const defaultProvince = null;
/* Province information
{
    "area_type_id": "1",
    "area_type_name": "Thành Phố",
    "code": "DNVN",
    "id": "1060",
    "name": "Đà Nẵng",
    "parent_id": "124"
}
*/

const currentProvinceReducer = (state = defaultProvince, action) => {
    switch (action.type) {
        case 'CHANGE_PROVINCE':
            return action.province;
        default:
            return state;
    }
    return state;
};

export default currentProvinceReducer;
