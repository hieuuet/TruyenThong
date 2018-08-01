import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ChildTabAnnoucement from './ChildTabAnnoucement';
import ChildTabNews from './ChildTabNews';
import ChildTabSurvey from './ChildTabSurvey';
import styles from './styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;

export default class TabNews extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container2}>
                <ScrollableTabView
                    locked={false}
                    tabBarBackgroundColor={'#222a2a'}
                    tabBarTextStyle={styles.tabLabel}
                    tabBarUnderlineStyle={styles.selectedTabStyle}
                    initialPage={1}>
                    <ChildTabAnnoucement tabLabel="Tin thông báo" navigation={this.props.navigation}/>
                    <ChildTabNews tabLabel="Tin tức" navigation={this.props.navigation}/>
                </ScrollableTabView>
            </View>
        );
    }
}
