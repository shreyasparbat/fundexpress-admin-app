import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import url from '../../constants/url';

export default class PawnTicketRejectionScreen extends React.Component{
  static navigationOptions = {
    title: 'Ticket Rejection',
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
      pawnTicketID: this.props.navigation.getParam('pawnTicketID'),
      loading: false,
      successMessage: ''
    }
    console.log("2. this state is initialised");
  }
  componentWillMount(){
    console.log("3. set the state method");
    console.log("pawnTicketID is :"+this.state.pawnTicketID)
    this.setState({loading: true});

    this.retrieveData().then((token) =>{
      fetch(url.url + 'admin/rejectPawnTicket', {
      method: 'POST',
      headers: new Headers({
        'x-auth' : token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({'pawnTicketID': this.state.pawnTicketID})
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
    if(this.state.stateOfTicket.approved){
      return (
        <Image
          source='https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png'
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
        <Text style={{fontSize:20}}>{this.state.successMessage.msg}</Text>
        <Text style={{fontSize:20}}>{this.state.successMessage.error}</Text>
        <View style={{marginTop:10}}>
          <Button
            backgroundColor='#bf1e2d'
            color='#FFFFFF'
            title='Back to User History'
            onPress={()=> this.props.navigation.navigate('UserHistory')}
          />
        </View>
      </View>
    );
  }
}
