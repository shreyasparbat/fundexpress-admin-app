import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, ImageBackground, Image, ActivityIndicator} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { GiftedForm } from 'react-native-gifted-form';
import LogOutButton from './components/LogOutButton';
import { Picker, Icon, DatePicker } from 'native-base';

export default class UserSettingsScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "User Settings",
    headerRight: <LogOutButton navigation={navigation}/>,
    headerStyle: {
      backgroundColor: '#C00000',
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
        data:{},
        email: '',
        password: '',
        fullName: '',
        gender: '',
        dateOfBirth: '',
        ic: '',
        mobileNumber: 0,
        landlineNumber: 0,
        address: '',
        addressType:'',
        citizenship: '',
        race:'',
        noOfC:0,
        noOfL:0,
        noOfD:0,
        ethHash:'',
        loading:false,
        currentUserID: this.props.navigation.getParam('currentUser'),
    }
    console.log("1. User Settings Screen initialised: " + this.state)
  }
  componentWillMount(){
    console.log("2. call retrieve data");
    this.setState({loading:true});
    this.retrieveData().then((auth) => {
    fetch('http://206.189.145.2:3000/admin/getUser/',{ //fetch from admin url
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
      console.log("response.ok: " + response.ok);
      //return response.json()
      return response
    })
    .then((response) => {
      console.log("/tickets Success");
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
        ethHash:response.ethHash,
        loading:false
      })

    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  });

  //org
    // this.retrieveData().then((token) => {
    //   this.setState({loading:true});
    //   fetch('http://206.189.145.2:3000/admin/getUser', {
    //   method: 'POST',
    //   headers: new Headers({
    //     // Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'x-auth' : token,
    //   }),
    //   body: JSON.stringify({
    //     userID: this.state.currentUserID
    //   })
    // })
    //   .then((response) => {
    //     console.log("4. response.ok: " + response.ok);
    //     return response.json()
    //   })
    //   .then((response) => {
    //     console.log("5. profile retrieved")
    //     this.setState({
    //       data: response,
    //       // email: response.email,
    //       // fullName: response.fullName,
    //       // gender: response.gender,
    //       // dateOfBirth: response.dateOfBirth,
    //       // ic: response.ic,
    //       // landlineNumber: response.landlineNumber,
    //       // mobileNumber: response.mobileNumber,
    //       // address: response.address,
    //       // addressType: response.addressType,
    //       // citizenship: response.citizenship,
    //       // race:response.race,
    //       // noOfC:response.noOfC,
    //       // noOfL:response.noOfL,
    //       // noOfD:response.noOfD,
    //       // ethHash:response.ethHash,
    //       loading:false,
    //     });
    //     console.log("6. current state is " + this.state)
    //     //console.log("state fullName: " + this.state.fullName)
    //   })
    //   .catch((error) => {
    //     console.log("error")
    //     console.log(error)
    //   })
    // })
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
      fetch('http://206.189.145.2:3000/admin/updateUser',{
        method: 'POST',
        headers: new Headers({
          'x-auth': token,
        }),
        body: JSON.stringify({
          userID:this.state.currentUserID,
          email: this.state.email,
          password: this.state.password,
          fullName: this.state.fullName,
          gender: this.state.gender,
          dateOfBirth: this.state.dateOfBirth,
          ic: this.state.ic,
          mobileNumber: parseInt(this.state.mobileNumber),
          landlineNumber: parseInt(this.state.landlineNumber),
          address: this.state.address,
          citizenship: this.state.citizenship,
          nationality: this.state.nationality,
        }),
      })
    })
      .then((response) => {
        console.log("response.ok:")
        return response.json()
      })
      .then((response) => {
        console.log("profile changed")
        this.props.navigation.navigate('Profile');
      })
      .catch((errorResponse) => {
        console.log("error")
        console.log(errorResponse)
      })
      .catch((errorResponse) => {
        console.log("error with profile/edit ")
        console.log(errorResponse)
      })
      .catch((error) => {
        console.log("error retrieving profile data")
        console.log(error)
      });
    }

  render() {
    if(this.state.loading){
      return <ActivityIndicator/>;
    }
    return(
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
       showsVerticalScrollIndicator bounces={false} >
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

       {/* Password */}
       <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
         <FormLabel>Password</FormLabel>
         <FormInput
           name='password'
           onChangeText={password => this.setState({ password })}
           value={this.state.password}
           //placeholder={this.state.password}
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
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />

            </Picker>
        </View>

      {/* dateOfBirth */}
      <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
      <FormLabel>Date Of Birth</FormLabel>
      <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
      <DatePicker
            name='dateOfBirth'
            defaultDate={this.state.dateOfBirth}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
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
            value={this.state.mobileNumber}
            //value={this.state.mobileNumber}
            //placeholder='Mobile Number'
          />
        </View>

        {/* landlineNumber */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Home Phone Number</FormLabel>
          <FormInput
            onChangeText={landlineNumber => this.setState({ landlineNumber })}
            value={this.state.landlineNumber}
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
                onValueChange={gender => this.setState({gender})}
              >
                <Picker.Item label="Chinese" value="C" />
                <Picker.Item label="Malay" value="M" />
                <Picker.Item label="Indian" value="I" />
                <Picker.Item label="Others" value="O" />

              </Picker>
        </View>

        {/* noOfC */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>No Of C</FormLabel>
          <FormInput
            onChangeText={noOfC => this.setState({ noOfC })}
            value={this.state.noOfC}
          />
        </View>

        {/* noOfL */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>No Of L</FormLabel>
          <FormInput
            onChangeText={noOfL => this.setState({ noOfL })}
            value={this.state.noOfL}
          />
        </View>

        {/* noOfD */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>No Of D</FormLabel>
          <FormInput
            onChangeText={noOfD => this.setState({ noOfD })}
            value={this.state.noOfD}
          />
        </View>

        {/* ethHash */}
        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Ethereum Hash</FormLabel>
          <FormInput
            onChangeText={ ethHash => this.setState({ ethHash })}
            value={this.state.ethHash}
          />
        </View>
        <Button
          title='Submit Changes'
          color='white'
          backgroundColor='#C00000'
          onPress={() => this.submit()}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />

      </ScrollView>
    );
  }
}
