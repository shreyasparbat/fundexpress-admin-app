import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import url from '../../constants/url';
import { Icon } from 'native-base';

export default class SellTicketRejectionScreen extends React.Component{
  static navigationOptions = {
    title: 'Sell Ticket Rejection',
    headerLeft:null,
    headerStyle: {
      backgroundColor: '#bf1e2d',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  };
  constructor(props){
    super(props)
    console.log("1. construction");
    this.state={
      sellTicketID: this.props.navigation.getParam('sellTicketID'),
      nameOfPreviousPage: this.props.navigation.getParam('nameOfPreviousPage'),
      loading: false,
      successMessage: ''
    }
    console.log("2. this state is initialised");
  }
  componentWillMount(){
    console.log("3. set the state method");
    console.log("sellTicketID is :"+this.state.sellTicketID)
    this.setState({loading: true});

    this.retrieveData().then((token) =>{
      fetch(url.url + 'admin/rejectSellTicket', {
      method: 'POST',
      headers: new Headers({
        'x-auth' : token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({'sellTicketID': this.state.sellTicketID})
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        console.log(response)
        this.setState({
          loading: false,
          successMessage: response,
        })
        console.log(this.state)
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

  renderImage(){
    if(this.state.successMessage.msg!=null){
      return (
        <View>
          <Icon
            style={{ padding: 5, alignSelf:'center', fontSize: 40, color: '#228B22'}}
            name='ios-checkmark-circle'
          />
          <Text style={{fontSize:20}}>{this.state.successMessage.msg}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Icon
            style={{ padding: 5, alignSelf:'center', fontSize: 40, color: '#bf1e2d'}}
            name='ios-close-circle'
          />
          <Text style={{fontSize:20}}>{this.state.successMessage.error}</Text>
        </View>
      );
    }
  }
  renderBackButton(){
    if(this.state.nameOfPreviousPage=='UserHistory'){
      return(
        <View style={{marginTop:10}}>
          <Button
            backgroundColor='#bf1e2d'
            color='#FFFFFF'
            title='Back to User History'
            onPress={()=> this.props.navigation.navigate(this.state.nameOfPreviousPage, {currentUserID: this.state.currentUserID})}
          />
        </View>
      );
    } else {
      return(
        <View style={{marginTop:10}}>
          <Button
            backgroundColor='#bf1e2d'
            color='#FFFFFF'
            title='Back to Recent Tickets'
            onPress={()=> this.props.navigation.navigate(this.state.nameOfPreviousPage, {currentUserID: this.state.currentUserID})}
          />
        </View>
      );
    }
  }
  render(){
    if (this.state.loading){
      return <ActivityIndicator/>;
    }
    return(
      <View style={{backgroundColor:'white', flex:1, alignItems:'center', justifyContent:'center'}}>
        {this.renderImage()}
        {this.renderBackButton()}
      </View>
    );
  }
}
