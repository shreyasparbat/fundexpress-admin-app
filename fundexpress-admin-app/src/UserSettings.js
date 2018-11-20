import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, ImageBackground, Image, ActivityIndicator} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { GiftedForm } from 'react-native-gifted-form';
import LogOutButton from './components/LogOutButton';
import { Picker, Icon, DatePicker } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import url from './constants/url';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class UserSettingsScreen extends React.Component {

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
    tabBarIcon: ({ focused, tintColor }) => {
      return <Ionicons name={'md-home'} size={25}
      color={'white'} />;
    },
  });
  constructor(props){
    super(props)
    console.log("User Settings Screen");
    this.state={
        email: '',
        password: '',
        fullName: '',
        gender: '',
        dateOfBirth: new Date().toString(),
        ic: '',
        mobileNumber: '00000000',
        landlineNumber: '00000000',
        address: '',
        addressType:'',
        citizenship: '',
        race:'',
        noOfC:0,
        noOfL:0,
        noOfD:0,
        initialCreditRating:0,
        initialLtvPercentage: 0,
        currentCreditRating: 0,
        currentLtvPercentage: 0,
        registrationCompleted: false,
        loading:false,
        currentUserID: this.props.navigation.getParam('currentUserID'),
        error:'',
        showAlert: false,
    }
    console.log("1. User Settings Screen initialised: " + this.state)
  }
  componentWillMount(){
    console.log("2. call retrieve data");

    this.setState({loading:true});
    this.retrieveData().then((auth) => {
      console.log("auth: " + auth)
      console.log("currentUserID: " +this.state.currentUserID)
    fetch(url.url + 'admin/getUser/',{ //fetch from admin url
    //fetch('http://206.189.145.2:3000/admin/getUser/',{ //fetch from admin url
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth,
      },
      body: JSON.stringify({
        'userID': this.state.currentUserID,
      }),
    })
    .then((response) => {
      console.log("4. response.ok: " + response.ok);
      console.log("5. response: " + response)
     return response.json()
      // return response
    })
    .then((response) => {
      console.log("6. set state");
      if (response.registrationCompleted==true){
        this.setState({
          email: response.email,
          fullName: response.fullName,
          gender: response.gender,
          dateOfBirth: response.dateOfBirth,
          ic: response.ic,
          landlineNumber: response.landlineNumber,
          mobileNumber: response.mobileNumber,
          address: response.address,
          addressType: response.addressType,
          citizenship: response.citizenship,
          race:response.race,
          noOfC:response.noOfC,
          noOfL:response.noOfL,
          noOfD:response.noOfD,
          initialCreditRating:response.initialCreditRating,
          initialLtvPercentage:response.initialLtvPercentage,
          currentCreditRating:response.currentCreditRating,
          currentLtvPercentage:response.currentLtvPercentage,
          registrationCompleted:response.registrationCompleted,
          loading:false
        })
      } else {
        this.setState({
          email: response.email,
          fullName: response.fullName,
          noOfC:response.noOfC,
          noOfL:response.noOfL,
          noOfD:response.noOfD,
          initialCreditRating:response.initialCreditRating,
          initialLtvPercentage:response.initialLtvPercentage,
          currentCreditRating:response.currentCreditRating,
          currentLtvPercentage:response.currentLtvPercentage,
          registrationCompleted:response.registrationCompleted,
          loading:false
        })
      }

      console.log("7. finished setting state")
      console.log(this.state.email)
      console.log(this.state.fullName)
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  });


  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      console.log("3. value")
      return value;
    } catch (error) {
      console.log(error)
    }
  }
  submit() {
    // console.log("userID: " + this.state.currentUserID)
    // console.log("EMAIL: " + this.state.email)
    // console.log("FULLNAME: " + this.state.fullName)
    // console.log("GENDER: " + this.state.gender)
    // console.log("DOB: " + this.state.dateOfBirth)
    // console.log("IC: " + this.state.ic)
    // console.log("MOBILE NUMBER: " + this.state.mobileNumber)
    // console.log("landlineNumber: " + this.state.landlineNumber)
    // console.log("address: " + this.state.address)
    // console.log("addressType: " + this.state.addressType)
    // console.log("citizenship: " + this.state.citizenship)
    // console.log("race: " + this.state.race)
    // console.log("noOfC: " + this.state.noOfC)
    // console.log("noOfL: " + this.state.noOfL)
    // console.log("noOfD: " + this.state.noOfD)
    // console.log("initialCreditRating: " + this.state.initialCreditRating)
    // console.log("initialLtvPercentage: " + this.state.initialLtvPercentage)
    // console.log("currentCreditRating: " + this.state.currentCreditRating)
    // console.log("currentLtvPercentage: " + this.state.currentLtvPercentage)
    // console.log("registrationCompleted: " + this.state.registrationCompleted)


    this.retrieveData().then((token) => {
      fetch(url.url + 'admin/updateUser',{
        method: 'POST',
        headers: new Headers({
          'Content-Type':'application/json',
          'x-auth': token,
        }),
        body: JSON.stringify({
          "userID" :this.state.currentUserID,
          "email": this.state.email,
          "fullName": this.state.fullName,
          "gender": this.state.gender,
          "dateOfBirth": this.state.dateOfBirth,
          "ic": this.state.ic,
          "mobileNumber": parseInt(this.state.mobileNumber),
          "landlineNumber": parseInt(this.state.landlineNumber),
          "address": this.state.address,
          "addressType": this.state.addressType,
          "citizenship": this.state.citizenship,
          "race": this.state.race,
          "noOfC": this.state.noOfC,
          "noOfL": this.state.noOfL,
          "noOfD": this.state.noOfD,
          "initialCreditRating":this.state.initialCreditRating,
          "initialLtvPercentage":this.state.initialLtvPercentage,
          "currentCreditRating":this.state.currentCreditRating,
          "currentLtvPercentage":this.state.currentLtvPercentage,
          "registrationCompleted":this.state.registrationCompleted
        }),
      })
      .then((response) => {
        console.log("4. response.ok: " + response.ok)
        if(response.ok){
          this.setState({
            error: 'User successfully updated',
            showAlert:true
          })
        } else {
          this.setState({
            error: 'Could not update user, please try again',
            showAlert:true
          })
        }
      })
      .catch((errorResponse) => {
        console.log("error with admin/updateUser ")
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

       {/* email */}
       <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
         <FormLabel>Email</FormLabel>
         <FormInput
           name='email'
           value={this.state.email}
           onChangeText={email => this.setState({ email })}
           //placeholder="amandaohry@gmail.com"
           //placeholder={this.state.email}
         />
       </View>


       {/* Full Name */}
       <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
         <FormLabel>Full Name</FormLabel>
          <FormInput
            name='fullName'
            value={this.state.fullName}
            onChangeText={fullName => this.setState({ fullName })}
            //placeholder="Full Name"
            // placeholder={this.state.fullName}
          />
        </View>

        {/* gender */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Gender</FormLabel>
        <Picker
              note
              name='gender'
              mode="dropdown"
              iosHeader="Gender"
              placeholder={this.state.gender}
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: '100%' }}
              textStyle = {{color : 'black' }}
              //selectedValue={this.state.gender}
              selectedValue={this.state.gender}
              onValueChange={gender => this.setState({gender})}
            >
              <Picker.Item label="Gender" value="" />
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />

            </Picker>
        </View>

        {/* dateOfBirth */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Date Of Birth</FormLabel>
          <DatePicker
                name='dateOfBirth'
                defaultDate={new Date(this.state.dateOfBirth)}
                minimumDate={new Date(1900, 1, 1)}
                maximumDate={new Date()}
                locale={"SGP"}
                //timeZoneOffsetInMinutes={0}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText= {this.state.dateOfBirth}
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={dateOfBirth => this.setState({ dateOfBirth })}
                />
        </View>

        {/* NRIC */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>NRIC</FormLabel>
          <FormInput
            name='ic'
            value={this.state.ic}
            onChangeText={ic => this.setState({ ic })}
            // placeholder="NRIC"
            placeholder={this.state.ic}
          />
        </View>

        {/* mobileNumber */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Mobile Number</FormLabel>
          <FormInput
            name='mobileNumber'
            onChangeText={mobileNumber => this.setState({ mobileNumber })}
            value={this.state.mobileNumber.toString()}
            //value={this.state.mobileNumber}
            //placeholder='Mobile Number'
          />
        </View>

        {/* landlineNumber */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Home Phone Number</FormLabel>
          <FormInput
            onChangeText={landlineNumber => this.setState({ landlineNumber })}
            value={this.state.landlineNumber.toString()}
            //value={this.state.landlineNumber}
            //placeholder='Home Phone Number'
          />
        </View>

        {/* address */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Address</FormLabel>
          <FormInput
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            //placeholder='Address'
          />
        </View>

        {/* addressType */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Housing Type</FormLabel>
          <Picker
                note
                mode="dropdown"
                iosHeader="Housing Type"
                placeholder={this.state.addressType}
                placeholderStyle={{ color: "#c7c7cd" }}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: '100%' }}
                textStyle = {{color : 'black' }}
                selectedValue={this.state.addressType}
                onValueChange={addressType => this.setState({ addressType})}
              >
                <Picker.Item label="Housing Tyoe" value="" />
                <Picker.Item label="Condominium/Landed" value="C" />
                <Picker.Item label="HDB" value="H" />
                <Picker.Item label="Others" value="O" />

              </Picker>
        </View>

        {/* Citizenship */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Citizenship</FormLabel>
          <FormInput
            onChangeText={citizenship => this.setState({ citizenship })}
            value={this.state.citizenship}
            //placeholder='Citizenship'
          />
        </View>

        {/* Race */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Race</FormLabel>
          <Picker
                note
                mode="dropdown"
                iosHeader="Race"
                placeholder={this.state.race}
                placeholderStyle={{ color: "#c7c7cd" }}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: '100%' }}
                textStyle = {{color : 'black' }}
                //selectedValue={this.state.gender}
                selectedValue={this.state.race}
                onValueChange={race => this.setState({race})}
              >
                <Picker.Item label="Race" value="" />
                <Picker.Item label="Chinese" value="C" />
                <Picker.Item label="Malay" value="M" />
                <Picker.Item label="Indian" value="I" />
                <Picker.Item label="Eurasian" value="E" />
                <Picker.Item label="Others" value="O" />

              </Picker>
        </View>

        {/* noOfC */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>No Of C</FormLabel>
          <FormInput
            onChangeText={noOfC => this.setState({ noOfC })}
            value={this.state.noOfC.toString()}
          />
        </View>

        {/* noOfL */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>No Of L</FormLabel>
          <FormInput
            onChangeText={noOfL => this.setState({ noOfL })}
            value={this.state.noOfL.toString()}
          />
        </View>

        {/* noOfD */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>No Of D</FormLabel>
          <FormInput
            onChangeText={noOfD => this.setState({ noOfD })}
            value={this.state.noOfD.toString()}
          />
        </View>

        {/* initialLtvPercentage */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Initial LTV Percentage</FormLabel>
          <FormInput
            onChangeText={initialLtvPercentage => this.setState({ initialLtvPercentage })}
            value={this.state.initialLtvPercentage.toString()}
          />
        </View>

        {/* currentLtvPercentage */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Current LTV Percentage</FormLabel>
          <FormInput
            onChangeText={currentLtvPercentage => this.setState({ currentLtvPercentage })}
            value={this.state.currentLtvPercentage.toString()}
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
