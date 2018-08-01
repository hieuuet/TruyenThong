import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actionCreators';
import Api from '../api/api';
import Util from '../configs/util';
import DeviceInfo from 'react-native-device-info';
import CryptoJS from 'crypto-js';
import Constant from '../configs/constant';
//import sha256 from 'crypto-js/sha256';

class HomeScreen extends Component {
    getNewsInCategory = () => {
        // var oldPayload = {
        //     username : 'tan.nn',
        //     deviceId : DeviceInfo.getUniqueID()
        // };
        // console.log("oldPayload");
        // console.log(oldPayload);
        // var oldToken = Util.buildTestToken(oldPayload);
        var oldToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMiLCJpc3MiOiJNT0JJRk9ORSIsImlhdCI6MTUxMjAxNjQ2OCwiZXhwIjoxNTE0NzM5NjAwfQ.jWtOPoel3sxJXCL8jFx1xLMOsjTCFBeG9ckzMobPTFk";
        console.log("Old token: " + oldToken);
        var newToken = Util.rebuildToken(oldToken);
        console.log("New token: " + newToken);
        // Util.setItem("btnText", "hehe");

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>MyComponent component</Text>
                <TouchableOpacity onPress={this.getNewsInCategory}>
                    <Text>Click me</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        stateName1 : state.stateName1
    };
}

export default connect(mapStateToProps, actionCreators)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
