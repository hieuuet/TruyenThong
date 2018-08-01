import Util from '../../configs/util';

const defaultWard = null;
/* Ward information
{
    "area_type_id": "1",
    "area_type_name": "Thành Phố",
    "code": "DNVN",
    "id": "1060",
    "name": "Đà Nẵng",
    "parent_id": "124"
}
*/

const currentWardReducer = (state = defaultWard, action) => {
    switch (action.type) {
        case 'CHANGE_WARD':
            return action.ward;
        default:
            return state;
    }
    return state;
};

export default currentWardReducer;
