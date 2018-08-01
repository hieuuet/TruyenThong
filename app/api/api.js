import Constant from '../configs/constant';
import Util from '../configs/util';

const Api = {
    get : async function(url, queryParams) {
        var queryString = '';
        if (typeof queryParams != 'undefined') {
            for (var item in queryParams) {
                queryString += item + "=" + encodeURI(queryParams[item]) + "&";
            }
            queryString = queryString.substring(0, queryString.length - 1);
        }
        if (queryString != '') {
            url += "?" + queryString;
        }

        var token = await Util.getItem("TOKEN");
        var newToken = Util.rebuildToken(token);

        console.log('token get api: ' + token);

        if (token !== newToken) {
            console.log('------------ TOKEN KHONG HOP LE ------------');
            Util.clear();
            Util.exitApp();
        } else {
            console.log("URL: GET " + Constant.BASE_URL + url);
            return fetch(Constant.BASE_URL + url, {
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (token == null ? '' : token)
                },
                timeout : 30000
            }).then(async res => {
                var authHeader = await res.headers.get('Authorization');
                if (authHeader) {
                    var token = authHeader.replace('Bearer ', '');
                    Util.setItem('TOKEN', token);
                }
                return res.json();
            }).catch(error => {
                console.log('--- CATCH ERROR ' + url + ' ---');
                console.log(error);
            });
        }
    },

    post : async function(url, postData) {
        var token = await Util.getItem("TOKEN");
        var newToken = Util.rebuildToken(token);

        if (token !== newToken) {
            console.log('------------ TOKEN KHONG HOP LE ------------');
            Util.clear();
            Util.exitApp();
        } else {
            var queryString = '';
            if (typeof postData != 'undefined') {
                for (var item in postData) {
                    queryString += item + "=" + encodeURI(postData[item]) + "&";
                }
                queryString = queryString.substring(0, queryString.length - 1);
            }

            console.log("URL: POST " + Constant.BASE_URL + url);
            console.log("POST DATA: " + queryString);
            return fetch(Constant.BASE_URL + url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + (token == null ? '' : token)
                },
                body: queryString,
                timeout : 30000
            }).then(async res => {
                var authHeader = await res.headers.get('Authorization');
                if (authHeader) {
                    Util.setItem('TOKEN', authHeader.replace('Bearer ', ''));
                }
                return res.json();
            }).catch(error => {
                console.log('--- CATCH ERROR ' + url + ' ---');
                console.log(error);
            });
        }
    },

    /*
        Hàm ví dụ
    */
    getNewsInCategory : function(categoryId) {
        var url = Constant.API.FETCH_NEWS + '/' + categoryId;
        return Api.get(url);
    },

    /*
        Lấy public token trước khi đăng nhập app
    */
    getAuthToken : function(device_id) {
        var url = Constant.API.GET_AUTH_TOKEN;
        var params = {device_id};
        return Api.get(url, params);
    },

    /*
        Hàm login user vào ứng dụng:
        {
            deviceType,
            deviceModel,
            deviceVersion,
            devicePlatform,
            username,
            password
        }
    */
    checkLogin : function(user) {
        var url = Constant.API.LOGIN;
        return Api.post(url, user);
    },

    /*
        Hàm đăng ký user:
        {
            username,
            password,
            area_id,
            name,
            email
        }
    */
    registerUser : function(user) {
        var url = Constant.API.REGISTER;
        return Api.post(url, user);
    },

    /*
        Hàm lấy các địa bàn trực thuộc
        area_id : mã địa bàn
    */
    getSubArea : function(area_id) {
        var url = Constant.API.GET_SUB_AREA;
        var params = {area_id};
        return Api.get(url, params);
    },

    /*
        Lấy thông tin gợi ý địa bàn
    */
    getAreaByName : function(area_name) {
        var url = Constant.API.GET_AREA_BY_NAME;
        var params = {
            name : area_name
        };
        return Api.get(url, params);
    },

    /*
        Lấy các thông tin trang Homepage
    */
    getHomePageData : function(area_id, is_parent) {
        var url = Constant.API.GET_HOMEPAGE;
        var params = {area_id, is_parent};
        return Api.get(url, params);
    },

    /*
        Lấy thông tin các số badge của các tab
    */
    getTabBadges : function(area_id) {
        var url = Constant.API.GET_TAB_BADGES;
        var params = {area_id};
        return Api.get(url, params);
    },

    /*
        Lấy danh sách các tin tức dạng thông báo theo địa bàn
    */
    getRecords : function(area_id, page) {
        var url = Constant.API.GET_RECORDS;
        var params = {area_id, page};
        return Api.get(url, params);
    },

    /*
        Lấy danh sách các tin tức thường theo địa bàn
    */
    getNews : function(area_id, page) {
        var url = Constant.API.GET_NEWS;
        var params = {area_id, page};
        return Api.get(url, params);
    },

    /*
        Lấy danh sách các khảo sát theo địa bàn
    */
    getSurveys : function(area_id, page) {
        var url = Constant.API.GET_SURVEYS;
        var params = {area_id, page};
        return Api.get(url, params);
    },

    /*
        Lấy thông tin chi tiết của bản tin thường
    */
    getNewsDetail : function(id) {
        var url = Constant.API.GET_NEWS_DETAIL;
        var params = {id};
        return Api.get(url, params);
    },

    /*
        Thay đổi mật khẩu
    */
    changePassword: function(params) {
        var url = Constant.API.CHANGE_PASSWORD;
        return Api.get(url, params);
    },

    /*
        Tính năng like bài viết
    */
    likeNews: function(params) {
        var url = Constant.API.LIKE_NEWS;
        return Api.post(url, params);
    },
    /*
        Tính năng bình luận bài viết
    */
    commentNews: function(params) {
        var url = Constant.API.COMMENT_NEWS;
        return Api.post(url, params);
    },

    /*
        Tính năng lấy thêm tin gồm địa bàn cha trang chủ
    */
    getNewsIncludeParent: function(area_id, page) {
        var url = Constant.API.GET_NEWS_INCLUDE_PARENT;
        var params = {area_id, page};
        return Api.get(url, params);
    },

    initPayment: function(order) {
        var url = Constant.API.INIT_PAYMENT;
        return Api.post(url, order);
    },

    checkBill: function(serviceCode, billingCode) {
        var url = Constant.API.CHECK_BILL;
        var params = {
            serviceCode,
            billingCode
        };
        return Api.post(url, params);
    },

    getPaymentHistory : function(page) {
        var url = Constant.API.PAYMENT_HISTORY;
        var params = {page};
        return Api.get(url, params);
    },

    /*
        Tính năng lấy thông tin records không bao gồm địa bàn cha
    */
    getRecordsExcludeParent: function(area_id, page) {
        var url = Constant.API.GET_RECORDS_EXCLUDE_PARENT;
        var params = {area_id, page};
        return Api.get(url, params);
    },

    /*
        Tính năng insertToken
    */
    insertToken : function(params) {
        var url = Constant.API.INSERT_TOKEN;
        return Api.post(url, params);
    },

    /*
        Lấy danh sách cảm biến cửa
    */
    getSensorList: function(page, type) {
        var url = Constant.API.GET_SENSOR_LIST;
        var params = {page, type};
        return Api.get(url, params);
    },

    /*
        Lấy lịch sử giá trị cảm biến
    */
    getSensorHistory: function(id, page) {
        var url = Constant.API.GET_SENSOR_HISTORY;
        var params = {id, page};
        return Api.get(url, params);
    },

    /*
        Lấy danh sách quảng cáo theo địa bàn
    */
    getAdsList : function (area_id) {
        var url = Constant.API.GET_ADS_LIST;
        var params = {area_id};
        return Api.get(url, params);
    },

    /*
        Lấy thông tin cấu hình application
    */
    getAppConfigs : function() {
        var url = Constant.API.GET_APP_CONFIGS;
        var params = {};
        return Api.get(url, params);
    },

    /*
        Lập lịch cảnh báo cửa
    */
    updateDoorWarningSchedule: function(params) {
        var url = Constant.API.UPDATE_DOOR_WARNING_SCHEDULE;
        return Api.post(url, params);
    },

    verifyRegisterOtp : function(username, otp) {
        var url = Constant.API.VERIFY_REGISTER_OTP;
        var params = {username, otp};
        return Api.post(url, params);
    },

    getPayTokens : function() {
        var url = Constant.API.GET_PAY_TOKEN;
        var params = {};
        return Api.get(url, params);
    },

    payWithToken : function(order) {
        var url = Constant.API.PAY_WITH_TOKEN;
        return Api.post(url, order);
    },

    /*
        Lấy danh sách camera
    */
    getCameraList: function(pageIndex) {
        var url = Constant.API.GET_CAMERA_LIST;
        var params = {pageIndex};
        return Api.get(url, params);
    },

    /*
        lấy danh sách thành viên trong gia đình
    */
    getListUserInHousehold: function() {
      var url = Constant.API.GET_LIST_USER_IN_HOUSEHOLDL;
      var params = {};
      return Api.get(url, params);
    },

    /*
        lấy danh sách thành viên trong gia đình
    */
    addUserToHousehold: function(new_username) {
      var url = Constant.API.ADD_USER_TO_HOUSEHOLD;
      var params = {new_username};
      return Api.get(url, params);
    },
    removeUserFromHousehold: function(user_remove) {
      var url = Constant.API.REMOVE_USER_FROM_HOUSEHOLD;
      var params = {user_remove};
      return Api.get(url, params);
    }
};

export default Api;
