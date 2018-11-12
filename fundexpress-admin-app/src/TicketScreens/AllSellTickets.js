import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PendingSellTickets from './SellTickets/PendingSellTickets';
import PastSellTickets from './SellTickets/PastSellTickets';
import { Container, Header, Tab, Tabs, TabHeading } from 'native-base';

class AllSellTicketsScreen extends React.Component {
  static navigationOptions = {
    title: 'Sell Tickets',
      headerStyle: {
        backgroundColor: '#C00000',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicons name={'md-time'} size={25}
        color={'white'} />;
      },
  };

  render() {
    const currentUser = this.props.navigation.getParam('currentUserID');
    console.log('AllPawnTickets currentUserID: ' +  currentUserID);
    return (
      <Container>
        <Tabs>
          <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='add-to-list'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}> Pending</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
            <PendingSellTickets navigation={this.props.navigation} currentUserID={currentUserID} />
          </Tab>
          <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='back-in-time'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}> Past</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
            <PastSellTickets navigation={this.props.navigation} currentUserID={currentUserID} />
          </Tab>
        </Tabs>
      </Container>

    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',

  },
  buttonStyle: {
      width: 105,
      height: 105,
      alignSelf: 'center',
      backgroundColor: '#ededed',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'transparent',
      marginLeft: 6,
      marginRight: 2,
      //marginTop: 20
  }
};


export default AllSellTicketsScreen;
