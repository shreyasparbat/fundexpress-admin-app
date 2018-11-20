import React from 'react';
import { AsyncStorage, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container,  Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import { Button } from 'react-native-elements';
import SearchBar from 'react-native-searchbar';

//screens
import UserSettingsScreen from './UserSettings';
import UserHistoryScreen from './TicketScreens/UserHistory';

//components
//import SearchBar from './components/SearchBar';
import UserListDivider from './components/UserListDivider';
import LogOutButton from './components/LogOutButton';
import List from './components/List';

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Users",
    headerRight: <LogOutButton navigation={navigation}/>,
    headerStyle: {
      backgroundColor: '#bf1e2d',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
  });


  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>

        <List navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}

export default HomeScreen;
