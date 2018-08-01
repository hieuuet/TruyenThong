import Constant from '../configs/constant';
import { AsyncStorage, Alert, Linking } from 'react-native';
import CryptoJS from 'crypto-js';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';
import moment from 'moment';
import 'moment/locale/vi';
import _ from 'lodash';

const Util = {
    getItem : (key, isObject) => {
        return AsyncStorage.getItem(key).then((val) => {
            if (val) {
                var bytes = CryptoJS.AES.decrypt(val, Constant.KEY);
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                if (typeof isObject != 'undefined' && isObject) {
                    return JSON.parse(plaintext)
                } else {
                    return plaintext;
                }

            }
            return null;
        });
    },

    setItem : (key, value) => {
        var ciphertext = CryptoJS.AES.encrypt(value, Constant.KEY);
        return AsyncStorage.setItem(key, ciphertext.toString());
    },

    removeItem : (key) => {
        return AsyncStorage.removeItem(key);
    },

    clear : () => {
        return AsyncStorage.clear();
    },

    clearAll: () => Promise.all(
      AsyncStorage.getAllKeys()
        .then(ks => {
          console.log('AsyncStorage getAllKeys');
          console.log(ks);
          ks.map(k => {
            // console.log(k);
            // AsyncStorage.getItem(k);
            //
            if(k != 'SAVED_CONFIGS') {
              AsyncStorage.removeItem(k);
            }
          })
        })
    ),

    base64UrlEncode : (str) => {
        var wordArray = CryptoJS.enc.Utf8.parse(str);
        var base64 = CryptoJS.enc.Base64.stringify(wordArray);
        var base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        return base64url;
    },

    base64UrlDecode : (base64url) => {
        base64url = (base64url + '===').slice(0, base64url.length + (base64url.length % 4));
        var base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
        var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
        var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
        return parsedStr;
    },

    rebuildToken : (oldToken) => {
        if (oldToken) {
            var parts = oldToken.split('.');
            if (parts.length == 3) {
                var encodedHeader = parts[0];
                var encodedPayload = parts[1];
                var signature = parts[2];
                try {
                    var shouldEncrypt = false;
                    var payload = JSON.parse(Util.base64UrlDecode(encodedPayload));

                    var deviceId = DeviceInfo.getUniqueID();
                    var newPayload = {...payload, deviceid : shouldEncrypt ? CryptoJS.AES.encrypt(deviceId, Constant.KEY).toString() : deviceId};
                    var newEncodedPayload = Util.base64UrlEncode(JSON.stringify(newPayload));
                    var newToken = encodedHeader + "." + newEncodedPayload + "." + signature;
                    return newToken;
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return oldToken;
    },

    handleDefaultResponse : (res, navigate) => {
        if (res.code === 'EXPIRE_SESSION') {
            navigate('Login');
        } else if (res.code === 'INVALID_TOKEN') {
            navigate('Login');
        } else if (res.code === 'EXCEPTION') {
            Util.showAlert(res.msg);
        }
    },

    showAlert : (msg, onPress) => {
        Alert.alert(
            Constant.MESSAGES.TITLE_ALERT,
            msg,
            [
                {text: Constant.MESSAGES.BTN_OK, onPress: onPress},
            ],
            { cancelable: false }
        );
    },

    showAlertAnnouncement : (title, msg, onPress) => {
        Alert.alert(
            title,
            msg,
            [
                {text: Constant.MESSAGES.BTN_OK, onPress: onPress},
            ],
            { cancelable: false }
        );
    },

    showConfirm : (msg, onConfirm, onCancel) => {
        Alert.alert(
            Constant.MESSAGES.TITLE_CONFIRM,
            msg,
            [
                {text: 'Hủy bỏ', onPress : onCancel, style: 'cancel'},
                {text: 'Đồng ý', onPress: onConfirm},
            ],
            { cancelable: false }
        )
    },

    showConfirmAlertRedirect : (title, msg, navigate, onConfirm, onCancel) => {
        Alert.alert(
            title,
            msg,
            [
                {text: 'Hủy bỏ', onPress : onCancel, style: 'cancel'},
                {text: 'Đồng ý', onPress: () => {

                    AsyncStorage.clear(() => navigate('Login'));

                }},
            ],
            { cancelable: false }
        )
    },

    exitApp : () => {
        RNExitApp.exitApp();
    },

    diffDate : (publish_date, mustBeDate) => {
        // moment.locale("vi");
        let pub_date = '';
        if (!_.isEmpty(publish_date)) {
            pub_date = moment(publish_date, Constant.FORMAT_DATE.TIME_SERVER);
            // console.log('pub_date: ' + pub_date);
        }

        var diffDay = moment().diff(pub_date, 'days');
        // console.log('diffDay: ' + diffDay);
        // console.log('publish_date: ' + publish_date);
        if(diffDay >= 1 || (typeof mustBeDate != 'undefined' && mustBeDate)) {
            return moment(publish_date, Constant.FORMAT_DATE.TIME_SERVER).format(Constant.FORMAT_DATE.TIME_CLIENT);
        }
        return moment(publish_date, Constant.FORMAT_DATE.TIME_FORMAT).fromNow();
    },

    diffDateTime : (publish_date, mustBeTime) => {
        // moment.locale("vi");
        let pub_date = '';
        if (!_.isEmpty(publish_date)) {
            pub_date = moment(publish_date, Constant.FORMAT_DATE.TIME_SERVER);
            // console.log('pub_date: ' + pub_date);
        }

        var diffDay = moment().diff(pub_date, 'days');
        // console.log('diffDay: ' + diffDay);
        // console.log('publish_date: ' + publish_date);
        if(diffDay >= 1 || (typeof mustBeTime != 'undefined' && mustBeTime)) {
            return moment(publish_date, Constant.FORMAT_DATE.TIME_SERVER).format(Constant.FORMAT_DATE.TIME_CLIENT_ARTICLE);
        }
        return moment(publish_date, Constant.FORMAT_DATE.TIME_FORMAT).fromNow();
    },

    diffDateTimeIOT : (publish_date) => {
        // moment.locale("vi");
        let pub_date = '';
        if (!_.isEmpty(publish_date)) {
            pub_date = moment(publish_date, Constant.FORMAT_DATE.TIME_SERVER);
            // console.log('pub_date: ' + pub_date);
        }

        var diffDay = moment().diff(pub_date, 'days');
        // console.log('diffDay: ' + diffDay);
        // console.log('publish_date: ' + publish_date);
        // if(diffDay >= 1) {
            return moment(publish_date, Constant.FORMAT_DATE.TIME_SERVER).format(Constant.FORMAT_DATE.TIME_CLIENT_ARTICLE);
        // }
        // return moment(publish_date, Constant.FORMAT_DATE.TIME_FORMAT).fromNow();
    },

    showSuccess : (msg, okCallback) => {
        Alert.alert(
          Constant.MESSAGES.TITLE_ALERT,
          msg,
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: Constant.MESSAGES.BTN_CANCEL, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: Constant.MESSAGES.BTN_OK, onPress: () => okCallback()},
          ],
          { cancelable: false }
        )
    },

    convertSecondToTime: (second) => {
        if(!_.isEmpty(second)) {
            let sec_num = parseInt(second, 10);
            let hours   = Math.floor(sec_num / 3600);
            let hh = Math.floor(sec_num / 3600);
            let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            let seconds = sec_num - (hours * 3600) - (minutes * 60);
            if(hh > 0) {
                minutes = hh * 60 + minutes;
            }

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            if(hh == 0) return minutes+':'+seconds;
            // else return hours+':'+minutes+':'+seconds;
            else return minutes+':'+seconds;
        } else {
            return '';
        }
    },

    getTimeFromDate : (date) => {
        return moment(date).format('HH:mm');
    },

    isPhoneNumberValid: (phoneNumber) => {
		if (_.isUndefined(phoneNumber)) return false;
        if(_.isEmpty(phoneNumber)) return false;
		if (phoneNumber.length > 14 || phoneNumber.length<9 ) return false;

		if (phoneNumber.indexOf('84') == 0) {
			phoneNumber = phoneNumber.substring(2);
		} else if (phoneNumber.indexOf('+84') === 0) {
			phoneNumber = phoneNumber.substring(3);
		} else if (!(phoneNumber.indexOf('0') === 0) && phoneNumber.length >10 ) {
			return false;
		}
		var phoneRegex = /^\d{10}$/;
		var phoneRegex3 = /^\d{9}$/;
		var phoneRegex2 = /^\d{11}$/;
		if (phoneNumber.match(phoneRegex) || phoneNumber.match(phoneRegex2) || phoneNumber.match(phoneRegex3)) {
			return true;
		} else {
			return false;
		}
	},

    isEmailValid: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    formatCurrency: (val) => {
    	if (val == null) {
			return '';
		}
	    while (/(\d+)(\d{3})/.test(val.toString())){
	      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	    }
	    return val;
    },

    showNotification : (title, msg, okCallback) => {
        Alert.alert(
          title,
          msg,
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: Constant.MESSAGES.BTN_CANCEL, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: Constant.MESSAGES.BTN_READ_MORE, onPress: () => okCallback()},
          ],
          { cancelable: true }
        )
    },

    alertFailToInit : () => {
        // Util.showConfirm('Không kiểm tra được cấu hình ứng dụng. Quý khách vui lòng thử lại sau', function() {
        Util.showConfirm(Constant.MESSAGES.EXCEPTION, function() {
            Util.exitApp();
        });
    },

    alertToUpdate : (forceUpdate, appUrl) => {
        if (forceUpdate) {
            Util.showAlert('Ứng dụng đã có phiên bản mới. Vui lòng cập nhật ứng dụng để tiếp tục sử dụng', function() {
                Linking.openURL(appUrl);
                Util.exitApp();
            });
        } else {
            Util.showConfirm('Ứng dụng đã có phiên bản mới. Vui lòng cập nhật ứng dụng', function() {
                Linking.openURL(appUrl);
            });
        }
    },

    withLeadingZero : (amount) => {
        if (amount < 10 ){
            return `0${ amount }`;
        } else {
            return `${ amount }`;
        }
    },

    formattedTime : (timeInSeconds) => {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds - minutes * 60;

        if( isNaN(minutes) || isNaN(seconds) ){
            return "";
        } else {
           return(`${ Util.withLeadingZero( minutes ) }:${ Util.withLeadingZero( seconds.toFixed(0) ) }`);
        }
    }
};

export default Util;
