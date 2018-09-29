import React, { Component } from 'react';
import { View, Button, Text} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Icon, Item } from 'native-base';
import UserListDivider from './UserListDivider';

export default class SearchBarItem extends Component {
  state = {query : ""};


  render() {
    return (
      <View>
        <SearchBar
          lightTheme
          onChangeText={query => this.setState({ query })}
          placeholder='Type Here...' />
      </View>
    );
  }
}
