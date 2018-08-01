import React, {PureComponent} from "react";
import { View, Platform, AppState } from 'react-native';
import Util from '../configs/util';
import Api from '../api/api';
import DeviceInfo from 'react-native-device-info';

export default class AppStateComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = async (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            let token = await Util.getItem('TOKEN');
            if (token !== null) {
                let configs = await Api.getAppConfigs();
                if (typeof configs == 'undefined' || configs.code !== 'SUCCESS') {
                    Util.alertFailToInit();
                } else {
                    if (configs.javaResponse.version != DeviceInfo.getVersion()) {
                        let appUrl = Platform.select({
                            ios: configs.javaResponse.ios_url,
                            android: configs.javaResponse.android_url
                        });

                        if (configs.javaResponse.force_update == '1') {
                            Util.alertToUpdate(true, appUrl);
                        } else {
                            Util.alertToUpdate(false, appUrl);
                            Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                        }
                    } else {
                        Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                    }
                }
            } else {
                var deviceId = DeviceInfo.getUniqueID();
                let res = await Api.getAuthToken(deviceId);
                if (typeof res == 'undefined' || res.code !== 'SUCCESS') {
                    Util.alertFailToInit();
                } else {
                    let configs = await Api.getAppConfigs();
                    if (typeof configs == 'undefined' || configs.code !== 'SUCCESS') {
                        Util.alertFailToInit();
                    } else {
                        if (configs.javaResponse.version != DeviceInfo.getVersion()) {
                            let appUrl = Platform.select({
                                ios: configs.javaResponse.ios_url,
                                android: configs.javaResponse.android_url
                            });

                            if (configs.javaResponse.force_update == '1') {
                                Util.alertToUpdate(true, appUrl);
                            } else {
                                Util.alertToUpdate(false, appUrl);
                                Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                            }
                        } else {
                            Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                        }
                    }
                }
            }
        }
        this.setState({appState: nextAppState});
    }

    render() {
        return (
            <View></View>
        );
    }
}
