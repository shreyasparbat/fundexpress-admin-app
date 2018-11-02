import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CurrentPawnTickets from './PawnTickets/CurrentPawnTickets';
import PendingPawnTickets from './PawnTickets/PendingPawnTickets';
import PastPawnTickets from './PawnTickets/PastPawnTickets';


import { Container, Header, Tab, Tabs, TabHeading} from 'native-base';

class AllPawnTicketsScreen extends React.Component {
  static navigationOptions = {
    title: 'Pawn Tickets',
      headerStyle: {
        backgroundColor: '#C00000',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
  };

  render() {
    const currentUser = this.props.navigation.getParam('currentUser');
    console.log('AllPawnTickets currentUser: ' +  currentUser._id);
    return (
      <Container >
      <Tabs>
        <Tab heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}} ><Icon name='list' style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}> Current</Text></TabHeading>}  >
          <CurrentPawnTickets navigation={this.props.navigation} currentUser={currentUser} />
        </Tab>
        <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='add-to-list'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}> Pending</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
          <PendingPawnTickets  navigation={this.props.navigation} currentUser={currentUser} />
        </Tab>
        <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='back-in-time'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}> Past</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
          <PastPawnTickets  navigation={this.props.navigation} currentUser={currentUser} />
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


export default AllPawnTicketsScreen;
