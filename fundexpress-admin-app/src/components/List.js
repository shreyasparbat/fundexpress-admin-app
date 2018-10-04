import React from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import UserListDivider from './UserListDivider';

export default class List extends React.Component {
  render(){
    return(<UserListDivider userList={userList}/>);
  }
  constructor(props){
    super(props)
    console.log("1. construction");
    this.state={
      arrayOfUsers: [],
      loading: false,
      navigation: props.navigation
    }
    console.log("2. this state is initialised");

  }
  componentWillMount(){
    console.log("3. set the state method");
    this.setState({loading: true});

    this.retrieveData().then((token) =>{
      fetch('http://206.189.145.2:3000/admin/allUsers', {
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
      console.log("4. token retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }

  renderThisArray(){
    console.log("5. rendering the array");
    console.log("first user in array of users is " + this.state.arrayOfUsers[0])
    return <UserListDivider navigation={this.state.navigation} userList={this.state.arrayOfUsers.sort()}/>
  }

  render(){
    if (this.state.loading){
      return <ActivityIndicator/>;
    }
    return(
      <View>
          {this.renderThisArray()}
      </View>
    );
  }
}
