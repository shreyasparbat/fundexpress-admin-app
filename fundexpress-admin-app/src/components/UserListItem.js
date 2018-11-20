import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Button } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import RootStack from '../Login';

export default class UserListItem extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

    this.state = {
        userList: props.userList,
        dataSource: ds.cloneWithRowsAndSections({}),
        currentLetter: props.currentLetter,
        navigation: props.navigation
    };

  }


  getOnlyUsersWithAParticularLetter(letter, userList){

    var result = [];
    var max = userList.length
    for (i=0; i<max;i++){
      var firstLetter= userList[i].fullName.substring(0,1);
      if (firstLetter===letter){
        result.push(userList[i]);
      }
    }
    result.sort((a,b) => b.fullName < a.fullName ? 1 : -1);
    return {dataSource: result};
  }
  componentDidMount(){

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.getOnlyUsersWithAParticularLetter(this.state.currentLetter, this.state.userList)),
      });
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {
      var currentUser = this.getOnlyUsersWithAParticularLetter(this.state.currentLetter, this.state.userList).dataSource[rowID];
      // console.log(currentUser);
      return (
          <TouchableOpacity>
            <ListItem  onPress={() => this.state.navigation.navigate('UserHistory', {currentUserID: currentUser._id})}> 
              <Text>{currentUser.fullName}</Text>
            </ListItem>
          </TouchableOpacity>
      );
  }


  renderSectionHeader(sectionData, category) {
    return (
      <View >
      </View>

    );
  }

  render(){
      return (
        <View style={{paddingTop:5}}>

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
