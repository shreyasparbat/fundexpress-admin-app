import React from 'react';
import {View,  Icon, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

export default class LogOutButton extends React.Component{

  constructor(props){
    super(props)
  }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      console.log("token retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }
  logOut() {
    this.retrieveData().then((token) =>{
      fetch('http://206.189.145.2:3000/admin/logout', {
      method: 'DELETE',
      headers: new Headers({
        'x-auth' : token,
      })
    })
      .then((response) => {
        if (response.ok) {
          //return response
          console.log('logged out')
          this.props.navigation.navigate('login');
        } else {
          return Promise.reject(response.json())
        }
      })
      .catch((errorResponse) => {
        console.log("error")
        console.log(errorResponse)
      })
    }).catch((error) => {
      console.log("error retrieving data")
      console.log(error)
    });
  }
  render(){
    return(
      <View>
      <View style={{width: 100}} >
        <Button
          title='Log Out'
          color='white'
          backgroundColor='#C00000'
          onPress={() => this.logOut()}
          //onPress={() => goBack()}
        />
      </View>
      </View>
    );
  }
}
