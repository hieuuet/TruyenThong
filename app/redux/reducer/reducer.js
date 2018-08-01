import { combineReducers } from 'redux';
import currentCityReducer from './currentCityReducer';
import currentProvinceReducer from './currentProvinceReducer';
import currentWardReducer from './currentWardReducer';
import badgesReducer from './badgesReducer';
import currentAreaReducer from './currentAreaReducer';
import currentUserReducer from './userInforReducer';

const reducer = combineReducers({
    currentCity : currentCityReducer,
    currentProvince : currentProvinceReducer,
    currentWard : currentWardReducer,
    currentArea : currentAreaReducer,
    badges : badgesReducer,
    userInfor: currentUserReducer
});

export default reducer;
