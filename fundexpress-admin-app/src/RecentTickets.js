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
      backgroundColor: '#bf1e2d',
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
    this.state={
      data:[],
    }
  }
  render() {

    return (
      <View style={{flex:1,backgroundColor:'white'}}>
      <Tabs tabBarUnderlineStyle={{backgroundColor:'#bf1e2d'}}>
        <Tab heading={ <TabHeading style={{backgroundColor:'#ffffff',borderColor:'#ffffff'}} ><Icon name={'ticket'} size={10} color={'#000000'} /><Text style={{color:'#000000'}}> Pawn Tickets</Text></TabHeading>}  >
          <RecentPawnTicketsScreen navigation={this.props.navigation}/>
        </Tab>
        <Tab  heading={ <TabHeading style={{backgroundColor:'#ffffff',borderColor:'#ffffff'}}><Icon name={'dollar'} size={10} color={'#000000'} /><Text style={{color:'#000000'}}> Sell Tickets</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
          <RecentSellTicketsScreen navigation={this.props.navigation}/>
        </Tab>
      </Tabs>

      </View>
    );
  }
}
