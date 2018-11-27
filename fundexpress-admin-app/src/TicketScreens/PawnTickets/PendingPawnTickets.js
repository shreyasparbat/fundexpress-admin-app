import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList, AsyncStorage, ScrollView, RefreshControl } from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import PawnTicket from '../../components/PawnTicket';
import url from '../../constants/url';

class PendingPawnTickets extends React.Component {
  //header
  static navigationOptions = {
    title: 'Currently Pawned Items',
    headerStyle: {
      backgroundColor: '#bf1e2d',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  };

  //state = { data: [] };
  constructor(props){
    super(props)
    this.state={
      data:[],
      navigation: props.navigation,
      currentUserID: props.currentUserID,
      refreshing: false,
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
  refresh(){
    this.setState({refreshing:true})
    //normal client retrieve tickets
    this.retrieveData().then((auth) => {
    fetch(url.url+'admin/tickets/',{ //fetch from admin url
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth,
      },
      body: JSON.stringify({
        "userID": this.state.currentUserID,
      }), //not in client side
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      this.setState({
        data: response.pawnTicketsPendingApproval,
        refreshing:false
      })
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  })
  }
  retrieveTickets(){
    //normal client retrieve tickets
    this.retrieveData().then((auth) => {
    fetch(url.url+'admin/tickets/',{ //fetch from admin url
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth,
      },
      body: JSON.stringify({
        "userID": this.state.currentUserID,
      }), //not in client side
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      this.setState({
        data: response.pawnTicketsPendingApproval,
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

  // getFrontURI(ticketID){
  //   var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'+ticketID+ '_front.jpg';
  //   return uri;
  // }
  // getBackURI(ticketID){
  //   var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'+ticketID+ '_back.jpg';
  //   return uri;
  // }

  renderTickets(){
    return this.state.data.map(ticket =>
    <PawnTicket
      key={ticket._id}
      data={ticket}
      currentUserID={this.state.currentUserID}
      navigation={this.state.navigation}
      // frontUri={this.getFrontURI(ticket._id)}
      // backUri={this.getBackURI(ticket._id)}
      nameOfPreviousPage='UserHistory'
    />
    );
  }

  render(){


    if(this.state.loading){
      return <ActivityIndicator />
    }
      return (
        <ScrollView style={{paddingTop:5, backgroundColor:'#e5e5e5'}}
        refreshControl={<RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this.refresh()} />}
        >
          {this.renderTickets()}
        </ScrollView>
      );
    }
}

export default PendingPawnTickets;
