import React from 'react';
import { AsyncStorage, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container,  Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import { Button } from 'react-native-elements';

import UserSettingsScreen from './UserSettings';
import TicketApprovalScreen from './TicketApproval';
import UserHistoryScreen from './UserHistory';

import SearchBar from './components/SearchBar';
import UserListDivider from './components/UserListDivider';

import List from './components/List';
const LogOutButton = ({ onPress }) => (
  <Button
      title='Log Out'
      color='white'
      backgroundColor='#FF0000'
      onPress={() => this.logOut()}
      style= {{height: 20, width:20,}}
      icon={
      <Icon
        name='arrow-right'
        size={15}
        color='white'
      />
    }
    />
);

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',

    headerLeft:<LogOutButton />,
      headerStyle: {
        backgroundColor: '#C00000',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicons name={'md-home'} size={25}
        color={'white'} />;
      },

  };
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
          this.props.navigation.navigate('loginFlow');
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
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
        <SearchBar/>
        <Button
            title='Log Out'
            color='white'
            backgroundColor='#C00000'
            onPress={() => this.logOut()}
          />
        </View>
        <List/>
      </View>
    );
  }
}

export default HomeScreen;
