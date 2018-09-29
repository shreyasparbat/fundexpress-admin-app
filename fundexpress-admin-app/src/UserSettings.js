import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';

export default class UserSettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
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

  render() {
    return(
      <View>
        <Text>Hi</Text>
      </View>
    );
  }
}
