import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../../constants/url';
import { Icon } from 'native-base';

export default class PawnTicketApprovalScreen extends React.Component{
  static navigationOptions = {
    title: 'Ticket Approval',
    headerLeft: null,
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
      successMessage: 'Pawn Ticket Approval Failed',
      loading: false,
      currentUserID: this.props.navigation.getParam('currentUserID'),
      nameOfPreviousPage: this.props.navigation.getParam('nameOfPreviousPage'),
    }
    console.log(this.state.editedTicketState);
    console.log("1. this state is initialised");
  }

  componentWillMount(){
    this.setState({loading: true});
    console.log('2. componentWillMount and set loading');
    console.log("3. the body is {" +
      "pawnTicketID :" + this.state.editedTicketState.pawnTicketID+"\r\n" +
      "item"+ this.state.editedTicketState.item+"\r\n" +
      "dateCreated"+ this.state.editedTicketState.dateCreated+"\r\n" +
      "expiryDate"+ this.state.editedTicketState.expiryDate+"\r\n" +
      "gracePeriodEndDate"+ this.state.editedTicketState.gracePeriodEndDate+"\r\n" +
      "indicativeTotalInterestPayable"+ this.state.editedTicketState.indicativeTotalInterestPayable+"\r\n" +
      "value"+ this.state.editedTicketState.value+"\r\n" +
      "approved"+ this.state.editedTicketState.approved+"\r\n" +
      "closed"+ this.state.editedTicketState.closed+"\r\n" +
      "expired"+ this.state.editedTicketState.expired+"\r\n" +
      "outstandingPrincipal"+ this.state.editedTicketState.outstandingPrincipal+"\r\n" +
      "outstandingInterest"+ this.state.editedTicketState.outstandingInterest+ "\r\n" + "}"
    );
    //continue

    const pendingPawnTicket = this.props.navigation.getParam('editedTicketState');

    this.setState({loading: true})
    this.retrieveData().then((token) =>{
      fetch(url.url + 'admin/approvePawnTicket', {
      method: 'POST',
      headers: new Headers({
        'x-auth' : token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(
        {
          "pawnTicketID":this.state.editedTicketState.pawnTicketID,
          "item": this.state.editedTicketState.item,
          "dateCreated": this.state.editedTicketState.dateCreated,
          "expiryDate": this.state.editedTicketState.expiryDate,
          "gracePeriodEndDate": this.state.editedTicketState.gracePeriodEndDate,
          "indicativeTotalInterestPayable": this.state.editedTicketState.indicativeTotalInterestPayable,
          "value": this.state.editedTicketState.value,
          "approved": this.state.editedTicketState.approved,
          "closed": this.state.editedTicketState.closed,
          "expired": this.state.editedTicketState.expired,
          "outstandingPrincipal": this.state.editedTicketState.outstandingPrincipal,
          "outstandingInterest": this.state.editedTicketState.outstandingInterest
        }
      )
    })
      .then((response) => {
        console.log("response.ok: " + response.ok)
        return response.ok
      })
      .then((response) => {
        console.log(response)
        if(response==true){
          this.setState({
            successMessage: 'Pawn Ticket Successfully Approved',
          })
        }
        this.setState({
          loading: false,
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
    if(this.state.successMessgae=='Pawn Ticket Successfully Approved'){
      return (
        <Icon
          style={{ padding: 5, alignSelf: 'center', fontSize: 40, color: '#228B22'}}
          name='ios-checkmark-circle'
        />
      );
    }else{
      return (
        <Icon
          style={{ padding: 5, alignSelf: 'center', fontSize: 40, color: '#bf1e2d'}}
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
    if (this.state.loading==true){
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
