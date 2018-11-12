import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PawnTicket from './components/PawnTicket';
import LogOutButton from './components/LogOutButton';
import RecentSellTicketsScreen from './RecentSellTickets';
import RecentPawnTicketsScreen from './RecentPawnTickets';

import { Container, Header, Tab, Tabs, TabHeading} from 'native-base';
export default class RecentTicketsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Recent Tickets",
    headerRight: <LogOutButton navigation={navigation}/>,
    headerStyle: {
      backgroundColor: '#C00000',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
    tabBarIcon: ({ focused, tintColor }) => {
      return <Ionicons name={'md-home'} size={25}
      color={'white'} />;
    },
  });
  constructor(props){
    super(props)
    console.log("Recent Tickets Screen");
    this.state={
      data:[],
    }
  }
  render() {

    return (
      <Container >
      <Tabs>
        <Tab heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}} ><Icon name={'ticket'} size={10} color={'#FFFFFF'} /><Text style={{color:'#ffffff'}}>Pawn Tickets</Text></TabHeading>}  >
          <RecentPawnTicketsScreen navigation={this.props.navigation}/>
        </Tab>
        <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name={'cog'} size={10} color={'#FFFFFF'} /><Text style={{color:'#ffffff'}}>Sell Tickets</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
          <RecentSellTicketsScreen navigation={this.props.navigation}/>
        </Tab>
      </Tabs>

      </Container>
    );
  }
}
