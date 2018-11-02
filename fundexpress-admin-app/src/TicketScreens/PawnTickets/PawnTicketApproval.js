import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class TicketApprovalScreen extends React.Component{
  static navigationOptions = {
    title: 'Ticket Approval',
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
      editedTicketState:this.props.navigation.getParam('editedTicketState'),
      successMessage: 'Pawn Ticket Approval Failed',
      loading: false,
    }
    console.log(this.state.editedTicketState);
    console.log("1. this state is initialised");
  }

  componentWillMount(){
    this.setState({loading: true});
    console.log('2. componentWillMount and set loading');
    console.log("3. the body is {" +
      "pawnTicketID" + this.state.editedTicketState.pawnTicketID+
      "item"+ this.state.editedTicketState.item+
      "dateCreated"+ this.state.editedTicketState.dateCreated+
      "expiryDate"+ this.state.editedTicketState.expiryDate+
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
      fetch('http://206.189.145.2:3000/admin/approvePawnTicket', {
      method: 'POST',
      headers: new Headers({
        'x-auth' : token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(
        {
          // "__v": this.state.editedTicketState.__v,
          // "_id": this.state.editedTicketState._id,
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
        if(response){
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
    if(this.state.approved){
      return (
        <Image
          source={{uri:'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png'}}
          style={{height:100, width:100}}
        />
      );
    }
    return (
      <Image
        source='https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png'
        style={{height:100, width:100}}
      />
    );
  }

  render(){
    if (this.state.loading){
      return <ActivityIndicator/>;
    }
    return(
      <View style={{backgroundColor:'white', flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:20}}>{this.state.successMessage}</Text>

        <View style={{marginTop:10}}>
          <Button
            backgroundColor='#C00000'
            color='#FFFFFF'
            title='Back to User History'
            onPress={()=> this.props.navigation.navigate('UserHistory')}
          />
        </View>
      </View>
    );
  }
}
