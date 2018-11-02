import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList, AsyncStorage, ScrollView } from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import SellTicket from '../../components/SellTicket';

class PendingSellTickets extends React.Component {
  //header
  static navigationOptions = {
    title: 'Currently Pawned Items',
    headerStyle: {
      backgroundColor: '#C00000',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  };

  constructor(props){
    super(props)
    this.state={
      data:[],
      navigation: props.navigation,
      currentUserID: props.currentUser._id,
    }
    console.log('pendingSellTickets currentUser: ' + this.state.currentUserID)
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
    console.log("start of retrieveTickets in pendingSellTickets")
    //normal client retrieve tickets
    this.retrieveData().then((auth) => {
    fetch('http://206.189.145.2:3000/admin/tickets/',{ //fetch from admin url
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
      console.log("response.ok: " + response.ok);
      return response.json()
    })
    .then((response) => {
      console.log("/tickets Success");
      this.setState({
        data: response.sellTicketPendingApproval,
        loading:false
      })
      console.log("sellTicketPendingApproval array: " + response.sellTicketPendingApproval);
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

  renderTickets(){
    return this.state.data.map(ticket =>
    <SellTicket
      key={ticket._id}
      data={ticket}
      currentUserID={this.state.currentUserID}
      navigation={this.state.navigation}
      uri='https://apmex.exceda.com/images/Catalog%20Images/Products/11951_Slab.jpg'
    />
    );
  }

  render(){
    console.log(this.state);


    if(this.state.loading){
      return <ActivityIndicator />
    }
      return (
        <ScrollView style={{paddingTop:5, backgroundColor:'#e5e5e5'}}>
          {this.renderTickets()}
        </ScrollView>
      );
    }
}

export default PendingSellTickets;
