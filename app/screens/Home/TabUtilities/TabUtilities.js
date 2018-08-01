import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ChildTabUtility from './ChildTabUtility';
import ChildTabDashboard from './ChildTabDashboard';
import ChildTabHistory from './ChildTabHistory';
import styles from './styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;

export default class TabUtilities extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    locked={false}
                    tabBarBackgroundColor={'#222a2a'}
                    tabBarTextStyle={styles.tabLabel}
                    tabBarUnderlineStyle={styles.selectedTabStyle}
                    initialPage={1}>
                    <ChildTabDashboard tabLabel="Tổng quan" navigation={this.props.navigation}/>
                    <ChildTabUtility tabLabel="Tiện ích" navigation={this.props.navigation}/>
                    <ChildTabHistory tabLabel="Lịch sử" navigation={this.props.navigation}/>
                </ScrollableTabView>
            </View>
        );
    }
}
