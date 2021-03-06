import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../../constants/url';

export default class SellTicketApprovalScreen extends React.Component{
  static navigationOptions = {
    title: 'Ticket Approval',
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
    this.state={
      editedTicketState:this.props.navigation.getParam('editedTicketState'),
      successMessage: 'Sell Ticket Approval Failed',
      loading: false,
      currentUserID: this.props.navigation.getParam('currentUserID'),
      nameOfPreviousPage: this.props.navigation.getParam('nameOfPreviousPage'),
    }
  }

  componentWillMount(){
    this.setState({loading: true});
    const pendingSellTicket = this.props.navigation.getParam('editedTicketState');

    this.setState({loading: true})
    this.retrieveData().then((token) =>{
      fetch(url.url + 'admin/approveSellTicket', {
      method: 'POST',
      headers: new Headers({
        'x-auth' : token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(
        {
          "sellTicketID":this.state.editedTicketState.sellTicketID,
          "item": this.state.editedTicketState.item,
          "dateCreated": this.state.editedTicketState.dateCreated,
          "value": this.state.editedTicketState.value,
          "approved": this.state.editedTicketState.approved
        }
      )
    })
    .then((response) => {
      return response.ok
    })
    .then((response) => {
      if (response.error!=null){
        this.setState({
          successMessage: response.error
        })
      } else if(response==true){
        this.setState({
          successMessage: 'Sell Ticket Successfully Approved',
        })
      }
      this.setState({
        loading: false,
      })
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
      return value;
    } catch (error){
      throw error
    }
  }

  renderImage(){
    if(this.state.successMessage=='Sell Ticket Successfully Approved'){
      return (
        <Icon
          style={{ padding: 5, alignSelf:'center', fontSize: 40, color: '#228B22'}}
          name='ios-checkmark-circle'
        />
      );
    } else {
      return (
        <Icon
          style={{ padding: 5, alignSelf:'center', fontSize: 40, color: '#bf1e2d'}}
          name='ios-close-circle'
        />
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
        <Text style={{fontSize:20}}>{this.state.successMessage}</Text>
        {this.renderBackButton()}
      </View>
    );
  }
}
