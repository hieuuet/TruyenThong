import { createStore } from 'redux';
import reducer from './reducer/reducer';

const store = createStore(reducer);

export default store;


/*
Danh sách các trạng thái của app cần quản lý
- Các badge của từng tab
homeBadge : 0,1,2,3

- isLoading
isLoading: false,true

- Địa bàn hiện tại
currentArea : [
    {
        area_type_id: Mã loại địa bàn
        area_type_name: Tên loại địa bàn
        id: Id của địa bàn
        code: Mã địa bàn,
        name: Tên địa bàn,
        parent_id: Id địa bàn cha
    },
    {
        area_type_id: Mã loại địa bàn
        area_type_name: Tên loại địa bàn
        id: Id của địa bàn
        code: Mã địa bàn,
        name: Tên địa bàn,
        parent_id: Id địa bàn cha
    },
    {
        area_type_id: Mã loại địa bàn
        area_type_name: Tên loại địa bàn
        id: Id của địa bàn
        code: Mã địa bàn,
        name: Tên địa bàn,
        parent_id: Id địa bàn cha
    }
]

*/
