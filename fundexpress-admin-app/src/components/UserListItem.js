import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Button } from 'react-native-elements';

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
    };

  }


  getOnlyUsersWithAParticularLetter(letter, userList){

    var result = [];
    var max = userList.length
    for (i=0; i<max;i++){
      var firstLetter= userList[i].fullName.substring(0,1);
      if (firstLetter===letter){
        result.push(userList[i].fullName);
      }
    }
    return {dataSource: result};
  }
  componentDidMount(){

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.getOnlyUsersWithAParticularLetter(this.state.currentLetter, this.state.userList))
      });
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {

      return (
            <ListItem>
              <Text>{this.getOnlyUsersWithAParticularLetter(this.state.currentLetter, this.state.userList).dataSource[rowID]}</Text>
            </ListItem>
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
