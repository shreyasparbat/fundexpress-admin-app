import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, AsyncStorage, RefreshControl} from 'react-native';
import SellTicket from './components/SellTicket';
import LogOutButton from './components/LogOutButton';
import url from './constants/url';

export default class RecentSellTicketsScreen extends React.Component {
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
      navigation: props.navigation,
      refreshing: false
    }
  }
  refresh(){
    this.setState({refreshing:true})
    this.retrieveData().then((auth) => {
    fetch(url.url + 'admin/getTicketsPendingApproval',{ //fetch from admin url
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-auth' : auth
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      this.setState({
        data: response.sellTicketsPendingApproval.sort(function(a,b){
          a = new Date(a.dateCreated);
          b = new Date(b.dateCreated);
          return a>b ? -1 : a<b ? 1 : 0;
        }),
        refreshing:false
      })
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  })
  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  retrieveTickets(){
    this.retrieveData().then((auth) => {
    fetch(url.url + 'admin/getTicketsPendingApproval',{ //fetch from admin url
    //fetch('http://206.189.145.2:3000/admin/getTicketsPendingApproval',{ //fetch from admin url
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-auth' : auth
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      this.setState({
        data: response.sellTicketsPendingApproval.sort(function(a,b){
          a = new Date(a.dateCreated);
          b = new Date(b.dateCreated);
          return a>b ? -1 : a<b ? 1 : 0;
        }),
        loading:false
      })
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
    <SellTicket
      key={ticket._id}
      data={ticket}
      navigation={this.props.navigation}
      currentUserID={ticket.userID}
      frontUri={this.getFrontURI(ticket._id)}
      backUri={this.getBackURI(ticket._id)}
      nameOfPreviousPage='TicketsMain'
    />
    );
  }
  render() {

    return (
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        refreshControl={<RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this.refresh()} />}
      >
        {this.renderTickets()}
      </ScrollView>
    );
  }
}
