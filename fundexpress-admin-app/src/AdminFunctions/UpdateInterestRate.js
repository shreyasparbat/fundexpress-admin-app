import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, ImageBackground, Image, ActivityIndicator} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import LogOutButton from '../components/LogOutButton';
import { Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import url from '../constants/url';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class UpdateInterestRateScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "User Settings",
    headerRight: <LogOutButton navigation={navigation}/>,
    headerStyle: {
      backgroundColor: '#bf1e2d',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  });
  constructor(props){
    super(props)
    console.log("Update Interest Rate Screen");
    this.state={
        title:'',
        firstMonthRate:0,
        normalRate:0,
        dateUpdated:'',
        loading:false,
        error:'',
        showAlert: false,
    }
  }
  componentWillMount(){
    console.log("1. call retrieve data");

    this.setState({loading:true});
    this.retrieveData().then((auth) => {
      console.log("auth: " + auth)
    fetch(url.url + 'adminViews/getInterestRate/',{ //fetch from admin url
      method: 'GET',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth,
      },
    })
    .then((response) => {
      console.log("3. response.ok: " + response.ok);
      console.log("4. response: " + response)
     return response.json()
      // return response
    })
    .then((response) => {
      console.log("5. set state");
      this.setState({
        title: response.title,
        firstMonthRate: response.currentFirstMonthRate,
        normalRate: response.currentNormalRate,
        dateUpdated: response.dateUpdated,
        loading:false
      })
      console.log("6. finished setting state")
      console.log(this.state.currentInterestRate.title)
      console.log(this.state.currentInterestRate.firstMonthRate)
      console.log(this.state.currentInterestRate.normalRate)
      console.log(this.state.currentInterestRate.dateUpdated)
    })
    .catch((error) => {
      console.log("error with adminViews/updateInterestRates")
      console.log(error)
    })
  });


  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      console.log("2. value")
      return value;
    } catch (error) {
      console.log(error)
    }
  }
  submit() {

    this.retrieveData().then((token) => {
      fetch(url.url + 'adminViews/updateInterestRate',{
        method: 'POST',
        headers: new Headers({
          'Content-Type':'application/json',
          'x-auth': token,
        }),
        body: JSON.stringify({
          "firstMonthRate" :this.state.firstMonthRate,
          "normalRate": this.state.normalRate,
        }),
      })
      .then((response) => {
        console.log("4. response.ok: " + response.ok)
        if(response.ok){
          this.setState({
            error: 'Interest Rate successfully updated',
            showAlert:true
          })
        } else {
          this.setState({
            error: 'Could not update Interest Rate, please try again',
            showAlert:true
          })
        }
      })
      .catch((errorResponse) => {
        console.log("error with adminViews/updateInterestRate ")
        console.log(errorResponse)
      })
    });
  }
  //this shows/hides the alerts popup
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
  render() {
    if(this.state.loading){
      return <ActivityIndicator/>;
    }
    return(
      <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
        extraScrollHeight = {150}
        keyboardOpeningTime = {10}
      >
        <View style={{padding:5, alignItems:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:20}}>{this.state.title}</Text>
          <Text style={{fontSize:14, paddingBottom: 5}}>Last Updated: {this.state.dateUpdated}</Text>
          <Text style={{ fontSize:14}}>Current First Month Rate: {this.state.firstMonthRate}</Text>
          <Text style={{fontSize:14}}>Current Normal Rate: {this.state.normalRate}</Text>

        </View>
        {/* initialLtvPercentage */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Current First Month Rate</FormLabel>
          <FormInput
            name='firstMonthRate'
            onChangeText={firstMonthRate => this.setState({ firstMonthRate })}
            value={this.state.firstMonthRate.toString()}
          />
        </View>

        {/* currentLtvPercentage */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Current Normal Rate</FormLabel>
          <FormInput
            name='normalRate'
            onChangeText={currentNormalRate => this.setState({ currentNormalRate })}
            value={this.state.currentNormalRate.toString()}
          />
        </View>


        {/* submit button*/}
        <Button
          title='Submit Changes'
          color='white'
          backgroundColor='#bf1e2d'
          onPress={() => this.submit()}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />
        <AwesomeAlert
            style={{modalContainer:{flex:5}}}
            show= {this.state.showAlert}
            title="User Settings"
            message={this.state.error}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmButtonColor="#bf1e2d"
            confirmText="Close"
            onConfirmPressed={() => {

                this.hideAlert();
            }}
        />

      </KeyboardAwareScrollView>
    );
  }
}
