import Util from '../../configs/util';

const defaultCity = null;
/* City information
{
    "area_type_id": "1",
    "area_type_name": "Thành Phố",
    "code": "DNVN",
    "id": "1060",
    "name": "Đà Nẵng",
    "parent_id": "124"
}
*/

const currentCityReducer = (state = defaultCity, action) => {
    switch (action.type) {
        case 'CHANGE_CITY':
            return action.city;
        default:
            return state;
    }
    return state;
};

export default currentCityReducer;
