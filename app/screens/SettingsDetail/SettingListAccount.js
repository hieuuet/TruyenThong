//@flow
import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity, ScrollView, FlatList, RefreshControl} from "react-native";
import AccountListItem from '../../components/AccountListItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';

import * as actionCreators from '../../redux/actionCreators';
import styles from './styles';
import globalStyles from '../../resources/styles';


import Util from '../../configs/util';
import _ from 'lodash';
import Constant from '../../configs/constant';

import EmptyMsg from "../../components/EmptyMsg";

import {connect} from 'react-redux';

import renderIf from '../../configs/renderIf';

class SettingListAccount extends Component {

  static navigationOptions = {
      header: null
  };

  constructor(props){
      super(props);

      this.state = {
          users : [],
          loading: false,
          isError : false,
          image_local: require('../../images/st-user.png'),
      };
  }

  componentWillMount() {

      this._getListUserInHousehold(true);
  }

  _getListUserInHousehold = (showRefresh) => {
      if (showRefresh) {
          this.setState({loading : true, isError : false});
      }
      Api.getListUserInHousehold().then(res => {
          console.log('res getListUserInHousehold');
          console.log(res);
          this.setState({loading : false});
          if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
              if (res.javaResponse.users.length > 0) {

                    this.setState({users : res.javaResponse.users, isError: false});

              } else {
                this.setState({isError: true});
              }
          } else {
              const { navigate } = this.props.navigation;
              Util.handleDefaultResponse(res, navigate);
          }
      }).catch (error => {
          this.setState({loading : false, isError : true});
          Util.showAlert(Constant.MESSAGES.EXCEPTION);
      });
  }

  _onClickDelete(item) {
    console.log('onClickDelete');
    Util.showConfirm('Bạn có chắc chắn muốn xóa thành viên ' + item.name + ' ra khỏi hộ gia đình?', this.removeUser.bind(this, item));

  }

  removeUser = (item) => {
    Api.removeUserFromHousehold(item.username).then(res => {
        console.log('res removeUserFromHousehold');
        console.log(res);
        if(res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
            this._getListUserInHousehold(false);
        } else {
            const { navigate } = this.props.navigation;
            Util.handleDefaultResponse(res, navigate);
        }
    }).catch (error => {
        Util.showAlert(Constant.MESSAGES.EXCEPTION);
    });
  }

  addHousehold = () => {
    this.props.navigation.navigate('AddHouseHold');
  }

  renderItem(item) {
      return (
          <AccountListItem
              onClick={() => this._onClickDelete(item)}
              background={require("../../images/st-user.png")}
              item={item}
              user={this.props.userInfor} />
      );
  }


  _onRefresh = () => {
    this._getListUserInHousehold(true);      // Type = 12: cảm biến cửa
  }

  render() {
      const { navigate } = this.props.navigation;
      const { goBack } = this.props.navigation;

      return (
          <View style={[styles.container], { height:'100%'}}>
              {
                  (this.state.loading) && <LoadingSpinner hasBackground={false}/>
              }

              {
                  (this.state.isError) &&
                  <EmptyMsg onPress={() => this._onRefresh()}/>
              }

              <ScrollView
                  style={{zIndex: 10001}}
                  keyboardShouldPersistTaps={'handled'}
                  refreshControl={
                      <RefreshControl
                          refreshing={false}
                          onRefresh={this._onRefresh}
                          colors={['#EA0000']}
                          tintColor="#848484"
                          title="Đang tải..."
                          titleColor="#848484"
                          progressBackgroundColor="white"
                      />
                  }>

                  {
                      (!this.state.loading) &&

                      <ScrollView style={{zIndex: 5}} keyboardShouldPersistTaps={'handled'}>
                          <View style={styles.header}>
                              <Image source={require('../../images/iotbg.jpg')} resizeMode="cover" style={styles.cover} />
                              <Image source={this.state.image_local} resizeMode="contain" style={styles.coverIcon} />
                              <Text style={styles.pageTitle}>DANH SÁCH TÀI KHOẢN</Text>
                              <TouchableOpacity style={[styles.backButton2]} onPress={() => goBack()}>
                                  <Image style={styles.backIcon2} source={require('../../images/back-white.png')} resizeMode="contain" />
                              </TouchableOpacity>
                              {renderIf(this.props.userInfor.is_household_owner == '1',
                                <TouchableOpacity style={[styles.addButton]} onPress={() => this.addHousehold()}>
                                    <Image style={styles.addIcon} source={require('../../images/add_1.png')} resizeMode="contain" />
                                </TouchableOpacity>
                              )}
                          </View>
                          {
                            (!_.isEmpty(this.state.users))
                            &&
                              <View style={[globalStyles.contentCard,{marginTop: -20, paddingHorizontal: 0}]}>
                                  <View style={styles.paddingContent}>
                                      <Text style={globalStyles.label}>DANH SÁCH TÀI KHOẢN</Text>
                                  </View>
                                  <FlatList
                                      data={this.state.users}
                                      renderItem={({item}) => this.renderItem(item)}
                                      keyExtractor={(item, index) => index}
                              //         onEndReached={this.retrieveNextPage}
                              // onEndReachedThreshold={0.01}
                                      shouldItemUpdate={ (props,nextProps) => { return props.item.id !== nextProps.item.id } }
                                      initialNumToRender={3}
                                      removeClippedSubviews={true} />
                              </View>
                          }
                      </ScrollView>
                  }
              </ScrollView>
          </View>
      );
  }
}

function mapStateToProps(state) {
    return  {
        userInfor: state.userInfor
    }
}

export default connect(mapStateToProps, actionCreators)(SettingListAccount);
