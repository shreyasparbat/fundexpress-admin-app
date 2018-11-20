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
        backgroundColor: '#bf1e2d',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
  };

  render() {
    const currentUserID = this.props.navigation.getParam('currentUserID');
    console.log('AllPawnTickets currentUserID: ' +  currentUserID);
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
      <Tabs tabBarUnderlineStyle={{backgroundColor:'#bf1e2d'}}>
        <Tab heading={ <TabHeading style={{backgroundColor:'white',borderColor:'white'}} ><Icon name='list' style={{color:'#000000'}}/><Text style={{color:'#000000'}}> Current</Text></TabHeading>}  >
          <CurrentPawnTickets navigation={this.props.navigation} currentUserID={currentUserID} />
        </Tab>
        <Tab  heading={ <TabHeading style={{backgroundColor:'white',borderColor:'white'}}><Icon name='add-to-list'  style={{color:'#000000'}}/><Text style={{color:'#000000'}}> Pending</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
          <PendingPawnTickets  navigation={this.props.navigation} currentUserID={currentUserID} />
        </Tab>
        <Tab  heading={ <TabHeading style={{backgroundColor:'white',borderColor:'white'}}><Icon name='back-in-time'  style={{color:'#000000'}}/><Text style={{color:'#000000'}}> Past</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
          <PastPawnTickets  navigation={this.props.navigation} currentUserID={currentUserID} />
        </Tab>
      </Tabs>

      </View>

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
