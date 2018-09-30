//this was historyCurrent
import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList } from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import PawnTicket from './PawnTicket';


export default class PawnTicketScreen extends React.Component {
  static navigationOptions = {
    title: 'Currently Pawned Items',
    headerStyle: {
      backgroundColor: '#C00000',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  };

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

    this.state = {
        navigation: props.navigation,
        pawnTickets: {dataSource: props.tickets},
        dataSource: ds.cloneWithRowsAndSections({}),
    };

  }



  componentDidMount(){

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.pawnTickets)
      });
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {

      return (
        <PawnTicket
          navigation={this.state.navigation}
          _id={this.state.pawnTickets.dataSource[rowID]._id}
          userId={this.state.pawnTickets.dataSource[rowID].userId}
          itemId={this.state.pawnTickets.dataSource[rowID].itemId}
          itemName={this.state.pawnTickets.dataSource[rowID].itemName}
          ticketNumber={this.state.pawnTickets.dataSource[rowID].ticketNumber}
          dateCreated={this.state.pawnTickets.dataSource[rowID].dateCreated}
          expiryDate={this.state.pawnTickets.dataSource[rowID].expiryDate}
          interestPayable={this.state.pawnTickets.dataSource[rowID].interestPayable}
          offeredValue={this.state.pawnTickets.dataSource[rowID].offeredValue}
          specifiedValue={this.state.pawnTickets.dataSource[rowID].specifiedValue}
          approvalStatus={this.state.pawnTickets.dataSource[rowID].approvalStatus}
        />
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
