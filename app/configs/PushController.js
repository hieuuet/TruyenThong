import React, {Component} from 'react';
import { PushNotificationIOS, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

import Util from './util';
import Api from '../api/api';
import _ from 'lodash';
import Constant from './constant';

export default class PushController extends Component {

    constructor(props) {
		super(props);

        this.state = {
            navigation: {}
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log('this.props.areaId: ' + this.props.areaId);
        console.log(this.props.user);
        console.log(this.props.navigation);
        PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
           onRegister: function(token) {
               // alert( 'TOKEN:' + token);
               console.log('TOKEN onRegister()');
               console.log(token);
               // alert(JSON.stringify(token));
               if(!_.isEmpty(token)) {
                   // this._insertToken(token);
                   console.log('this.props');
                   console.log(this.props);
               }
           },

           // (required) Called when a remote or local notification is opened or received
           onNotification: function(notification) {
               console.log( 'NOTIFICATION:');
               console.log(notification);
               if (!notification.userInteraction) {
                   // this.props.navigation.navigate('Article');
                   console.log('this.props');
                   console.log(this.props);
               }

               // process the notification

               // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
               notification.finish(PushNotificationIOS.FetchResult.NoData);
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
       });
    }

    

    render() {
        const { navigation, user, areaId } = this.props;
        console.log('PushController render');
        return null;
    }
}
