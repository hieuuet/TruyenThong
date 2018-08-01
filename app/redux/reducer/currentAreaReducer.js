import Util from '../../configs/util';

const defaultArea = null;
/* Area information
{
    "area_type_id": "1",
    "area_type_name": "Thành Phố",
    "code": "DNVN",
    "id": "1060",
    "name": "Đà Nẵng",
    "parent_id": "124"
}
*/

const currentAreaReducer = (state = defaultArea, action) => {
    switch (action.type) {
        case 'CHANGE_AREA':
            return action.area;
        default:
            return state;
    }
    return state;
};

export default currentAreaReducer;
