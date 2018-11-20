import React from 'react';
import { AsyncStorage, View, ScrollView, Text, Keyboard } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { Picker, Icon, DatePicker } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Permissions, Notifications } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import url from '../constants/url';

export default class OnboardNewAdminScreen extends React.Component {
  state = {
    email: '',
    password: '',
    fullName: '',
    ptoken: '',
    error:'',
    showAlert:false,
    showAlert2:false,
  };
  static navigationOptions = {
    title: 'Register',
      headerStyle: {
        backgroundColor: '#bf1e2d',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
  };

  componentWillMount(){
    this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // console.log(token);
    this.setState({ ptoken : token });
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      // console.log(key + " stored successfully");
    } catch (error) {
      // console.log(error)
    }
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

  validate(){
    var errorArray = []
    if(this.state.fullName==''){
      errorArray.push("Full Name required")
    }
    if(this.state.email==''){
      errorArray.push("Email required")
    }
    if(this.state.password==''){
      errorArray.push("Password required")
    }
    if(errorArray.length==0){
      this.submit();
    }else{
      // console.log(errorArray)
      this.setState({
        error: errorArray.toString(),
        showAlert: true
      })
    }

  }
  retrieveData2 = async () => {
    try {
      const value = await AsyncStorage.getItem('newAuth');
      console.log("token retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }
  logOut() {
    this.retrieveData2().then((token) =>{
      fetch(url.url + 'admin/logout', {
      method: 'DELETE',
      headers: new Headers({
        'x-auth' : token,
      })
    })
      .then((response) => {
        if (response.ok) {
          //return response
          console.log('logged out')
        } else {
          return Promise.reject(response.json())
        }
      })
      .catch((errorResponse) => {
        console.log("error")
        console.log(errorResponse)
      })
    }).catch((error) => {
      console.log("error retrieving data")
      console.log(error)
    });
  }

  submit() {
    var res = '';
    fetch(url.url + 'user/adminOnboard',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        tokens: [this.state.ptoken],
      }),
    })
    .then((response) => {
      //store the response as a var
      res = response
      //return the response in json() to obtain the error message
      return response.json()
    })
    .then((response) => {
      if(response.error==null){
        //if does not exist, pull xauth from stored res var
        // console.log(res)
        // console.log(this.state.email + " logged in")
        // console.log("x-auth")
        // console.log(res.headers.get('x-auth'))
        //store x-auth in the app cache
        this.storeData('newAuth', res.headers.get('x-auth'));
        this.storeData('ptoken', this.state.ptoken);
        // console.log("Success")
        // console.log(this.state.email + " logged in")
        this.logOut()
        this.setState({
          showAlert2: true,
          loading: false
        })
      }

    })
    .catch((error) => {
      // console.log(error)
      this.setState({
        error: "Network error",
        loading: false,
        showAlert: true
      });
    })
  }

  validate(){
    var errorArray = []
    if(this.state.fullName==''){
      errorArray.push("Full Name required")
    }
    // if(this.state.ic==''){
    //   errorArray.push("NRIC required")
    // }
    if(this.state.email==''){
      errorArray.push("Email required")
    }
    if(this.state.password==''){
      errorArray.push("Password required")
    }
    if(errorArray.length==0){
      this.submit();
    }else{
      // console.log(errorArray)
      this.setState({
        error: errorArray.toString(),
        showAlert: true
      })
    }

  }
  render() {
    return (
      <View style={{flex:1}}>


        <View style={{height:85,marginTop:0, backgroundColor: 'white'}} >
          <FormLabel
            containerStyle={{flexDirection:"row",marginLeft:0}}
          >Full Name</FormLabel>
          <FormInput
            onChangeText={fullName => this.setState({ fullName })}
            value={this.state.fullName}
            placeholder='Full Name'
            // containerStyle={{flexDirection:"row", marginLeft:5}}
          />
        </View>

        <View style={{height:85,marginTop:5, backgroundColor: 'white'}} >
          <FormLabel>Email</FormLabel>
          <FormInput
            autoCapitalize='none'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder='Email'
          />
        </View>

        <View style={{height:85,marginTop:5, backgroundColor: 'white'}} >
          <FormLabel>Password</FormLabel>
          <FormInput
            autoCapitalize='none'
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder='Password'
          />
        </View>

        <Button
          title='Register!'
          color='white'
          backgroundColor='#C00000'
          onPress={() => {
            Keyboard.dismiss
            this.validate()
            this.submit()
          }}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />
        <AwesomeAlert
          show= {this.state.showAlert}
          title="Registration Error!"
          message={this.state.error}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonColor="#C00000"
          confirmText="Close"
          overlayStyle={{flex:1}}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        <AwesomeAlert
          show= {this.state.showAlert2}
          title="Registration Success!"
          message={this.state.error}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonColor="#C00000"
          confirmText="Close"
          overlayStyle={{flex:1}}
          onConfirmPressed={() => {
            this.setState({showAlert2:false})
            this.props.navigation.navigate('AdminMain')
          }}
        />
      />
      </View>
    );
  }
}
