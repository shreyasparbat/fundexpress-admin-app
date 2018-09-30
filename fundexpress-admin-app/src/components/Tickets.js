import React from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import PawnTicket from './PawnTicket';
import UserHistoryScreen from '../UserHistory';

export default class Tickets extends React.Component {
  constructor(props){
    super(props)
    console.log("1. construction");
    this.state={
      allTickets: {},
      loading: false,
      navigation: props.navigation
    }
    console.log("2. this state is initialised");

  }
  componentWillMount(){
    const currentUserID = this.state.navigation.getParam('currentUser', {})._id;
    console.log('userID: '+ currentUserID);

    console.log("3. set the state method");
    this.setState({loading: true});

    this.retrieveData().then((token) =>{
      fetch('http://206.189.145.2:3000/admin/tickets', {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "x-auth" : token,
      }),
      body: JSON.stringify({"userID": currentUserID}),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json()
        } else {
          console.log("promise rejected");
          //return Promise.reject(response.json())
        }
      })
      .then((responseJson) => {
        this.setState({allTickets : responseJson});
        this.setState({loading:false});
      })
      .catch((errorResponse) => {
        console.log('failed to get items');
      })
    }).catch((error) => {
      console.log("error retrieving data");
    });
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      console.log("4. token retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }

  renderThisArray(){
    console.log("5. rendering the array");
    console.log(this.state.allTickets);
    return <UserHistoryScreen navigation={this.state.navigation} ticket={this.state.allTickets}/>
  }

  render(){
    if (this.state.loading){
      return <ActivityIndicator/>;
    }
    return(
      <View>
          {this.renderThisArray()}
      </View>
    );
  }
}
