import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import _ from 'lodash';
import Util from './util'

export default class PushService {
  static init() {
    PushService.onNotification = (notification) => {

    }
    PushService.onRegistration = null;
    PushService.insertToken = null;
    PushService.redirectPage = null;
  }

  static setCallbacks(onRegistration, onNotification, insertToken, redirectPage) {
    PushService.onRegistration = onRegistration;
    PushService.onNotification = onNotification;
    PushService.insertToken = insertToken;
    PushService.redirectPage = redirectPage;
  }

  static configure(navigation, areaId, mcuId) {
    PushNotification.configure({
      onRegister: (device) => {
        if (PushService.onRegistration) {
          PushService.onRegistration(device);
        }

        if (PushService.insertToken) {
          PushService.insertToken(device, areaId, mcuId);
        }

        // PushNotification.popInitialNotification((notification) => {
        //     if (notification) { PushService.onNotification(notification); }
        // });
      },
      onNotification: (notification) => {
        if (PushService.onNotification) {
          PushService.onNotification(notification);
        }
        if(notification.userInteraction) {
            if(PushService.redirectPage) {
                PushService.redirectPage(notification, navigation, mcuId);
            }
        } else {
            if(Platform.OS === 'ios') {
              if(notification.data.CONTENT_TYPE == '2') {
                Util.showAlertAnnouncement(notification.data.title, notification.data.message);
              } else {
                Util.showNotification(notification.data.title, notification.data.message, () => {
                    if(PushService.redirectPage) {
                        PushService.redirectPage(notification, navigation, mcuId);
                    }
                });
              }
            } else {
              if(notification.CONTENT_TYPE == '2') {
                Util.showAlertAnnouncement(notification.title, notification.message);
              } else {
                Util.showNotification(notification.title, notification.message, () => {
                    if(PushService.redirectPage) {
                        PushService.redirectPage(notification, navigation, mcuId);
                    }
                });
              }
            }
        }
      },
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "306876685311",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    })
  }
}

PushService.init()
