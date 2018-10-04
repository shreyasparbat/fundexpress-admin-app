import React, { Component } from 'react';
import { View,  Text} from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import {Icon, Item } from 'native-base';
import UserListDivider from './UserListDivider';

export default class SearchBarItem extends Component {
  constructor(props){
    super(props)

    this.state={
      query : "",
      users: props.users,
      navigation: props.navigation,
    }
  }

  onSearch(){

  }



  render() {
    return (
      <View>
        <SearchBar
          lightTheme
          onChangeText={query => this.setState({ query })}
          placeholder='Type Here...' />
        <Button
          onPress={() => this.onSearch()}
          icon={
            <Icon name={'search'} />
          }
        />
      </View>
    );
  }
}
