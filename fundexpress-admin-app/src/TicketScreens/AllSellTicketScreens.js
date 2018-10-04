import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PawnTicketScreen from './PawnTicketScreen';
import SellTicketScreen from './SellTicketScreen';
import { Container, Header, Tab, Tabs, TabHeading} from 'native-base';
import { createStackNavigator } from 'react-navigation';

export default class AllSellTicketScreens extends React.Component {
  static navigationOptions = {
    title: "Sell Tickets",
      headerStyle: {
        backgroundColor: "#C00000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }
  constructor(props){
    super(props)
    this.state={
      navigation: props.navigation,
    }
  }
  render() {
    const allTickets = this.state.navigation.getParam('allTickets', []);
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Container>
          <Tabs>
            <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='dollar'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}>Approved</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
              <SellTicketScreen tickets={allTickets.approvedSellTickets}/>
            </Tab>
            <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='dollar'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}>Pending</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
              <SellTicketScreen tickets={allTickets.sellTicketPendingApproval}/>
            </Tab>
          </Tabs>
        </Container>
      </View>
    );
  }
}
