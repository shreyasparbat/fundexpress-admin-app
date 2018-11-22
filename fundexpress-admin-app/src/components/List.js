import React from 'react';
import { View, Text, AsyncStorage, ActivityIndicator, RefreshControl, ScrollView} from 'react-native';
import UserListDivider from './UserListDivider';
import url from '../constants/url';

export default class List extends React.Component {
  render(){
    return(<UserListDivider userList={userList}/>);
  }
  constructor(props){
    super(props)

    this.state={
      arrayOfUsers: [],
      loading: false,
      navigation: props.navigation,
      refreshing: false,

    }


  }
  refresh(){
    
    this.setState({refreshing: true});

    this.retrieveData().then((token) =>{
      fetch(url.url + 'admin/allUsers', {
      method: 'GET',
      headers: new Headers({
        'x-auth' : token,
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((responseJson) => {
        this.setState({arrayOfUsers : responseJson.allUsers});
        this.setState({refreshing:false});
      })
      .catch((errorResponse) => {
        console.log('failed to get items');
      })
    }).catch((error) => {
      console.log("error retrieving data");
    });
  }
  componentWillMount(){

    this.setState({loading: true});

    this.retrieveData().then((token) =>{
      fetch(url.url + 'admin/allUsers', {
      method: 'GET',
      headers: new Headers({
        'x-auth' : token,
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((responseJson) => {
        this.setState({arrayOfUsers : responseJson.allUsers});
        this.setState({loading:false});
      })
      .catch((errorResponse) => {
        console.log('failed to get items');
      })
    }).catch((error) => {
      console.log("error retrieving data");
    });
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');

      return value;
    } catch (error){
      throw error
    }
  }

  renderThisArray(){

    return <UserListDivider navigation={this.state.navigation} userList={this.state.arrayOfUsers.sort()}/>
  }

  render(){
    if (this.state.loading){
      return <ActivityIndicator/>;
    }
    return(
      <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      refreshControl={<RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={()=>this.refresh()} />}
      >
          {this.renderThisArray()}
      </ScrollView>
    );
  }
}
