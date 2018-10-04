import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator, Button } from 'react-native';
import { GiftedForm } from 'react-native-gifted-form';
import LogOutButton from './components/LogOutButton';

export default class UserSettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'User Settings',
    headerLeft: null,
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
  };
  constructor(props){
    super(props)

    this.state={
      form: {
        email: '',
        password: '',
        fullName: '',
        gender: '',
        DOB: '',
        age: '',
        ic: '',
        mobileNumber: '',
        landlineNumber: '',
        address: '',
        citizenship: '',
        nationality: '',
      }
    }
  }
  handleValueChange(values) {
    console.log('handleValueChange', values)
    this.setState({ form: values });
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
      fetch('http://206.189.145.2:3000/admin/getUser',{
        method: 'POST',
        headers: new Headers({
          'x-auth': token,
        }),
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          fullName: this.state.fullName,
          gender: this.state.gender,
          dateOfBirth: this.state.DOB,
          //age: this.state.age,
          ic: this.state.ic,
          mobileNumber: parseInt(this.state.mobileNumber),
          landlineNumber: parseInt(this.state.landlineNumber),
          //mobileNumber: this.state.mobileNumber,
          //landlineNumber: this.state.landNumber,
          address: this.state.address,
          citizenship: this.state.citizenship,
          nationality: this.state.nationality,
        }),
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((response) => {
        console.log("profile changed")
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
  )
}
  render() {
    const currentUser = this.props.navigation.getParam('currentUser', {});
    const navigation = this.props.navigation.getParam('navigation');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        <GiftedForm
          formName="EditUserInformation"
          onValueChange={this.handleValueChange.bind(this)}
        >
          <GiftedForm.TextInputWidget
            name='fullName'
            title='Full name'
            placeholder={currentUser.fullName}
            clearButtonMode='while-editing'
            value={currentUser.fullName}
          />
          <GiftedForm.TextInputWidget
            name='email'
            title='Email'
            placeholder={currentUser.email}
            clearButtonMode='while-editing'
            value={currentUser.email}
          />

        </GiftedForm>
        <Button
          title="Submit Changes"
          color="#C00000"
          onPress={this.submit()}
        />

        <Text>{currentUser.fullName}</Text>
      </View>
    );
  }
}
