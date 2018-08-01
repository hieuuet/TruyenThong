import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    FlatList,
    Image,
    View,
    RefreshControl
} from "react-native";
import styles from './styles';
import HistoryCard from '../../../components/HistoryCard';
import EmptyMsg from '../../../components/EmptyMsg';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ProgressBar from '../../../components/ProgressBar';
import globalStyles from '../../../resources/styles';
import Util from '../../../configs/util';
import Api from '../../../api/api';

export default class ChildTabHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            orders : [],
            nextPage : 1,
            shouldLoadMore : true,
            isError: false
        };
    }

    loadData = (page, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }
        Api.getPaymentHistory(page).then(res => {
            if (res.code === 'SUCCESS') {
                if (res.javaResponse.orders.length > 0) {
                    console.log('res getPaymentHistory');
                    console.log(res);
                    if (page == 1) {
                        this.setState({loading : false, orders : res.javaResponse.orders, nextPage : page + 1, shouldLoadMore : true, isError : res.javaResponse.orders.length == 0});
                    } else {
                        var orders = [...this.state.orders, ...res.javaResponse.orders];
                        this.setState({loading : false, orders : orders, nextPage : page + 1, shouldLoadMore : true, isError : false});
                    }
                } else {
                    if (page == 1) {
                        this.setState({loading : false, orders : [], nextPage : 1, shouldLoadMore : false, isError : true});
                    } else {
                        this.setState({loading : false, shouldLoadMore : false, isError : false});
                    }
                }
            } else {
                this.setState({loading : false, isError : true});
            }
        }).catch (error => {
            this.setState({loading : false, isError : true});
        });
    }

    componentWillMount() {
        this.loadData(1, true);
    }

    onRefresh = () => {
        this.loadData(1, true);
    }

    retrieveNextPage = () => {
        if (this.state.shouldLoadMore) {
            this.loadData(this.state.nextPage, false);
        }
    }

    renderFooter() {
        if(this.state.shouldLoadMore) {
            return <View style={{ height: 50 }}><ProgressBar /></View>;
        }
        return null;
    }

	render() {
		return (
            <View style={{height:'100%'}}>
                {
                    (this.state.loading) && <LoadingSpinner hasBackground={false}/>
                }
                {
                    (this.state.isError) && <EmptyMsg onPress={this.onRefresh}/>
                }

                {
                    (!this.state.loading && !this.state.isError) &&
                    <FlatList
                        data={this.state.orders}
                        renderItem={({item}) =>
                            <View>
                                <HistoryCard title={item.des ? item.des : 'Thanh toán hóa đơn'} amount={Util.formatCurrency(item.amount) + ' đ'} pushlishDate={item. created_date} icon={require("../../../images/utilities/naptiendienthoai.png")} />
                            </View>
                        }
                        keyExtractor={(item, index) => index}
                        onEndReached={this.retrieveNextPage}
                        onEndReachedThreshold={0.01}
                        ListFooterComponent={() => this.renderFooter()}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.onRefresh}
                                colors={['#EA0000']}
                                tintColor="#848484"
                                title="Đang tải..."
                                titleColor="#848484"
                                progressBackgroundColor="white"
                            />
                        } />
                }
            </View>
        );
	}
}
