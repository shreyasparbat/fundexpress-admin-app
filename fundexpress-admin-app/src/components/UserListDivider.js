import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { createStackNavigator, createBottomTabNavigator, navigationOptions } from 'react-navigation';
import { AsyncStorage, TouchableOpacity, ListView, View } from 'react-native';
import { Button } from 'react-native-elements';
import UserHistory from '../UserHistory';
import UserListItem from './UserListItem';
import SearchBar from './SearchBar';


export default class UserListDivider extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
    console.log('set datasource');
    this.state = {
        userList: props.userList,
        dataSource: ds.cloneWithRowsAndSections({}),
        loading: true,
        navigation: props.navigation
    };
  }

  getArrayOfDividers(dataSource){
    var alphabets = [
      {'A': false},
      {'B': false},
      {'C': false},
      {'D': false},
      {'E': false},
      {'F': false},
      {'G': false},
      {'H': false},
      {'I': false},
      {'J': false},
      {'K': false},
      {'L': false},
      {'M': false},
      {'N': false},
      {'O': false},
      {'P': false},
      {'Q': false},
      {'R': false},
      {'S': false},
      {'T': false},
      {'U': false},
      {'V': false},
      {'W': false},
      {'X': false},
      {'Y': false},
      {'Z': false}
    ];
    var max = dataSource.length
    for (i=0; i<max;i++){
      var firstLetter= dataSource[i].fullName.substring(0,1).toUpperCase();
      console.log('this firstLetter is ' + firstLetter);
      var index = firstLetter.charCodeAt(0)-65;
      console.log('this index is '+index);
      alphabets[index].value = true;
    }
    var result = [];
    for (i=0; i<alphabets.length; i++){
      if (alphabets[i].value==true){
        var letter = Object.keys(alphabets[i])[0];
        result.push(letter);
      }
    }
    return {dataSource: result};
  }

  componentWillMount(){

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.getArrayOfDividers(this.state.userList))
      });
      this.setState({
         loading: false,
      });
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {

      return (
        <List>
            <ListItem itemDivider>
              <Text>{this.getArrayOfDividers(this.state.userList).dataSource[rowID]}</Text>

            </ListItem>
            <UserListItem navigation={this.state.navigation} currentLetter={this.getArrayOfDividers(this.state.userList).dataSource[rowID]} userList={this.state.userList}/>
        </List>
      );
  }


  renderSectionHeader(sectionData, category) {
    return (
      <View >

      </View>

    );
  }

  render(){
    if (this.state.loading){
      return <ActivityIndicator/>;
    }
      return (

        <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    renderSectionHeader={this.renderSectionHeader}
                />

        </View>
      );
  }
}
