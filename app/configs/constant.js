const Constant = {
    TESTING : true,
    // BASE_URL: 'http://itdev.mobifone.vn' + '/LoaPhuongService/rest/mobilews/v2',
    BASE_URL: 'http://truyenthongcoso.mobifone.vn:81' + '/LoaPhuongService/rest/mobilews/v2',
    KEY: '0MYOo0bDLU3QgA7Om2YaoWPhr2UtFW9h',
    API: {
        FETCH_NEWS : '/getNewsInCategory',
        GET_AUTH_TOKEN : '/getAuthToken',
        LOGIN : '/checkLogin',
        REGISTER : '/register',
        GET_SUB_AREA : '/getSubArea',
        GET_AREA_BY_NAME : '/getAreaByName',
        GET_HOMEPAGE : '/getHomePageData',
        GET_TAB_BADGES : '/getTabBadges',
        GET_RECORDS : '/getRecords',
        GET_NEWS : '/getNews',
        GET_SURVEYS : '/getSurveys',
        GET_NEWS_DETAIL : '/getNewsDetail',
        CHANGE_PASSWORD: '/changePassword',
        COMMENT_NEWS: '/commentNews',
        LIKE_NEWS: '/likeNews',
        GET_NEWS_INCLUDE_PARENT: '/getNewsIncludeParent',
        INIT_PAYMENT: '/initPayment',
        CHECK_BILL: '/checkBill',
        PAYMENT_HISTORY : '/paymentHistory',
        GET_RECORDS_EXCLUDE_PARENT: '/getRecordsExcludeParent',
        INSERT_TOKEN: '/insertToken',
        GET_SENSOR_LIST: '/getSensorList',
        GET_SENSOR_HISTORY: '/getSensorHistory',
        GET_ADS_LIST: '/getAdsList',
        GET_APP_CONFIGS: '/getAppConfigs',
        UPDATE_DOOR_WARNING_SCHEDULE: '/updateDoorWarningSchedule',
        VERIFY_REGISTER_OTP : '/verifyRegisterOtp',
        GET_PAY_TOKEN : '/getPayTokens',
        PAY_WITH_TOKEN : '/payWithToken',
        GET_CAMERA_LIST: '/getCameraList',
        GET_LIST_USER_IN_HOUSEHOLDL: '/getListUserInHousehold',
        ADD_USER_TO_HOUSEHOLD: '/addUserToHousehold',
        REMOVE_USER_FROM_HOUSEHOLD: '/removeUserFromHousehold'
    },
    MESSAGES: {
        EXCEPTIưnON: 'Kết nối mạng không ổn định. Vui lòng kiểm tra và thử lại sau.',
        NO_USERNAME_PASSWORD: 'Chưa nhập tên đăng nhập hoặc mật khẩu. Vui lòng kiểm tra lại!',
        TITLE_ALERT: 'Thông báo',
        TITLE_CONFIRM: 'Xác nhận',
        SUCCESS_REGISTER: 'Bạn đã đăng ký tài khoản thành công.',
        SUCCESS_CHANGE_PASS: 'Bạn đã thay đổi mật khẩu thành công.',
        BTN_OK: 'OK',
        BTN_READ_MORE: 'Đọc thêm',
        BTN_CANCEL: 'Hủy bỏ',
        INVALID_AREA : 'Tài khoản đăng ký chưa đủ thông tin địa bàn',
        CONFIRM_LOGOUT_TITLE : 'Quý khách có chắc chắn muốn thoát khỏi ứng dụng?',
        CONFIRM_EXIT_TITLE : 'Bạn có chắn muốn thoát khỏi ứng dụng?',
        DEV_FUNC_MSG: 'Tính năng đang phát triển. Vui lòng quay lại sau.'

    },
    RESPONSE_CODE: {
        MSG_SUCCESS: 'SUCCESS',
        EXIST_USERNAME: 'EXIST_USERNAME',
        BAD_CONTENT: 'BAD_CONTENT',
        WRONG_OLD_PASSWORD: 'WRONG_OLD_PASSWORD',
        EXIST_TOKEN: 'EXIST_TOKEN',
        MAX_TRY : 'MAX_TRY',
        WRONG_OTP : 'WRONG_OTP',
        ADD_USER_HOUSEHOLD_EXISTED: 'ADD_USER_HOUSEHOLD_EXISTED'
    },
    FORMAT_DATE: {
        TIME_FORMAT: 'DD-MM-YYYY HH:mm:ss.SSS',
        TIME_SERVER: 'DD-MM-YYYY HH:mm:ss',
        TIME_CLIENT: 'DD/MM/YYYY',
        TIME_CLIENT_ARTICLE: 'DD/MM/YYYY HH:mm:ss'
    },
    IOT: {
      DOOR: 12,
      MOVEMENT: 263,
      TEMP: 128,
      HUMIDITY: 129,
      SMOKE: 160
    }
};

export default Constant;
