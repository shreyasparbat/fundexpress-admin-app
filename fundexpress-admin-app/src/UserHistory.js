import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';

export default class UserHistoryScreen extends React.Component {

  static navigationOptions = {
    title: 'User History',
    headerLeft: null,
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
  constructor(props) {
    super(props)

    this.state = {
      user: props.user
    }
  }
  render() {
    return(
      <View>
        <Text>{props.user.fullName}</Text>
      </View>
    );
  }
}
