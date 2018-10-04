import React from 'react';
import { AsyncStorage, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container,  Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import { Button } from 'react-native-elements';

//screens
import UserSettingsScreen from './UserSettings';
import TicketApprovalScreen from './TicketScreens/TicketApproval';
import UserHistoryScreen from './UserHistory';

//components
import SearchBar from './components/SearchBar';
import UserListDivider from './components/UserListDivider';
import LogOutButton from './components/LogOutButton';
import List from './components/List';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',

    headerLeft:null,
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
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
        <LogOutButton navigation={this.props.navigation}/>
        <SearchBar/>
        </View>
        <List navigation={this.props.navigation}/>
      </View>
    );
  }
}

export default HomeScreen;
