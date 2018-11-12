import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PawnTicket from './components/PawnTicket';
import LogOutButton from './components/LogOutButton';

export default class RecentPawnTicketsScreen extends React.Component {
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
      navigation: props.navigation
    }
  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      console.log('2. auth retrieved: ' + value)
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  retrieveTickets(){
    console.log("start of retrieveTickets in /admin/getTicketsPendingApproval")
    //normal client retrieve tickets
    this.retrieveData().then((auth) => {
    fetch('http://206.189.145.2:3000/admin/getTicketsPendingApproval',{ //fetch from admin url
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-auth' : auth
      })
    })
    .then((response) => {
      console.log("response.ok: " + response.ok);
      return response.json()
    })
    .then((response) => {
      console.log("/tickets Success");
      this.setState({
        data: response.pawnTicketsPendingApproval.sort(function(a,b){
          return new Date(b.date) - new Date(a.date);
        }),
        loading:false
      })
      console.log("first item in TicketsPendingApproval array: " + response.pawnTicketsPendingApproval[0]);
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  })
  }

  componentWillMount(){
    this.retrieveTickets()
  }

  getFrontURI(ticketID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'+ticketID+ '_front.jpg';
    return uri;
  }
  getBackURI(ticketID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'+ticketID+ '_back.jpg';
    return uri;
  }

  renderTickets(){
    return this.state.data.map(ticket =>
    <PawnTicket
      key={ticket._id}
      data={ticket}
      navigation={this.props.navigation}
      currentUserID={ticket.userID}
      uri={this.getFrontURI(ticket._id)}
    />
    );
  }
  render() {

    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {this.renderTickets()}
      </ScrollView>
    );
  }
}
