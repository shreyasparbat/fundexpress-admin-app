//this was historyCurrent
import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList } from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import SellTicket from './SellTicket';

export default class SellTicketScreen extends React.Component {
  static navigationOptions = {
    title: 'Sold Items',
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
        sellTickets: {dataSource: props.tickets},
        dataSource: ds.cloneWithRowsAndSections({}),
    };

  }



  componentDidMount(){

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.sellTickets)
      });
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {
      const sellTickets = this.state.sellTickets;
      return (
        <SellTicket
          navigation={this.state.navigation}
          userId={sellTickets.dataSource[rowID].userId}
          itemId={sellTickets.dataSource[rowID].itemId}
          itemName={sellTickets.dataSource[rowID].itemName}
          ticketNumber={sellTickets.dataSource[rowID].ticketNumber}
          dateCreated={sellTickets.dataSource[rowID].dateCreated}
          expiryDate={sellTickets.dataSource[rowID].expiryDate}
          interestPayable={sellTickets.dataSource[rowID].interestPayable}
          offeredValue={sellTickets.dataSource[rowID].offeredValue}
          specifiedValue={sellTickets.dataSource[rowID].specifiedValue}
          approvalStatus={sellTickets.dataSource[rowID].approvalStatus}
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
