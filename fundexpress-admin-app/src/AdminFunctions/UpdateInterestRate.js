import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, ImageBackground, Image, ActivityIndicator, RefreshControl} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import LogOutButton from '../components/LogOutButton';
import { Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import url from '../constants/url';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class UpdateInterestRateScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Update Interest Rate",
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

    this.state={
        title:'',
        firstMonthRate:0,
        normalRate:0,
        currentFirstMonthRate:0,
        currentNormalRate:0,
        dateUpdated:'',
        loading:false,
        error:'',
        showAlert: false,
        refreshing: false
    }
  }
  refresh(){
    this.setState({refreshing:true})
    this.retrieveData().then((auth) => {

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

     return response.json()
      // return response
    })
    .then((response) => {

      this.setState({
        firstMonthRate: response[0].firstMonthRate,
        normalRate: response[0].normalRate,
        dateUpdated: response[0].dateUpdated,
        currentFirstMonthRate:response[0].firstMonthRate,
        currentNormalRate:response[0].normalRate,
        refreshing:false
      })

    })
    .catch((error) => {
      console.log("error with adminViews/getInterestRate")
      console.log(error)
    })
  })
  }
  componentWillMount(){


    this.setState({loading:true});
    this.retrieveData().then((auth) => {

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

     return response.json()
      // return response
    })
    .then((response) => {

      this.setState({
        firstMonthRate: response[0].firstMonthRate,
        normalRate: response[0].normalRate,
        dateUpdated: response[0].dateUpdated,
        currentFirstMonthRate:response[0].firstMonthRate,
        currentNormalRate:response[0].normalRate,
        loading:false
      })

    })
    .catch((error) => {
      console.log("error with adminViews/getInterestRate")
      console.log(error)
    })
  });


  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');

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
            firstMonthRate: response.firstMonthRate,
            normalRate: response.normalRate,
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
      <ScrollView
        contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
        refreshControl={<RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this.refresh()} />}
      >
        <View style={{padding:5, alignItems:'center'}}>
          <Text style={{fontSize:14, paddingBottom: 5}}>Last Updated: {this.state.dateUpdated}</Text>
          <Text style={{ fontSize:14}}>Current First Month Rate: {this.state.currentFirstMonthRate}</Text>
          <Text style={{fontSize:14}}>Current Normal Rate: {this.state.currentNormalRate}</Text>

        </View>
        {/* initialLtvPercentage */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Current First Month Rate</FormLabel>
          <FormInput
            name='firstMonthRate'
            onChangeText={firstMonthRate => this.setState({ firstMonthRate })}
            value={this.state.firstMonthRate}
          />
        </View>

        {/* currentLtvPercentage */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Current Normal Rate</FormLabel>
          <FormInput
            name='normalRate'
            onChangeText={normalRate => this.setState({ normalRate })}
            value={this.state.normalRate}
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
            overlayStyle={{height:'300%'}}
            show= {this.state.showAlert}
            title="Interest Rate Update Status"
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

      </ScrollView>
    );
  }
}
