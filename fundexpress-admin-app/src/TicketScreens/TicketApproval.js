import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class TicketApprovalScreen extends React.Component{
  constructor(props){
    super(props)
    console.log("1. construction");
    this.state={
      stateOfTicket: this.props.navigation.getParam('stateOfTicket'),
      loading: false,
      navigation: {},
      showAlert: false,
      successMessage: ''
    }
    console.log("2. this state is initialised");
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  componentWillMount(){
    console.log("3. set the state method");
    this.setState({loading: true});

    this.retrieveData().then((token) =>{
      fetch('http://206.189.145.2:3000/admin/approvePawnTicket', {
      method: 'POST',
      headers: new Headers({
        'x-auth' : token,
      }),
      body: JSON.stringify({'pawnTicketID': this.state.stateOfTicket._id})
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((responseJson) => {
        this.setState({successMessage : responseJson});
        this.setState({loading:false, navigation: this.stateOfTicket.navigation});
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
  render(){
    if (this.state.loading){
      return <ActivityIndicator/>;
    }
    return(
      <View style={{flex:1, backgroundColor:'white'}}>
        <Image
          source={require('../images/felogo.png')}
          style={{ resizeMode: 'contain', width: 300, height: 80, }}
        />
      <Button
        onPress={()=>  this.onButtonPress()}
      />
      </View>
    );
  }



  onButtonPress(){
    console.log("5. onButtonPress");

    return <AwesomeAlert
      show= {this.state.showAlert}
      message={this.state.successMessage}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Confirm" //it's intentionally opposite to place the yes on the left button
      confirmText="Cancel"
      confirmButtonColor="#DD6B55"
      onCancelPressed={() => {
        this.hideAlert();
        this.state.navigation.navigate('UserHistory');

      }}
      onConfirmPressed={() => {
        this.hideAlert();
        ;
      }}
    />
  }
}
