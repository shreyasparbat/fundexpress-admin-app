import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, navigationOptions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Input } from './components/Input';

import HomeScreen from './Home';
import UserSettingsScreen from './UserSettings';
import TicketApprovalScreen from './TicketScreens/TicketApproval';
import UserHistoryScreen from './UserHistory';
import List from './components/List';
import UserListDivider from './components/UserListDivider';
import UserListItem from './components/UserListItem';
import Tickets from './components/Tickets';
import LogOutButton from './components/LogOutButton';
import AllPawnTicketScreens from './components/AllPawnTicketScreens'
import AllSellTicketScreens from './components/AllSellTicketScreens'

class LoginScreen extends React.Component {
  state = { email: '', password: '', error: '', loading: false, auth: '' };
  static navigationOptions = {
    header: null
  };

  //url = config.url;

  componentWillMount(){
    this.setState({
      email: '',
      password:'',
      error:'',
      loading: false,
      auth: '',
    })
  }

  storeData = async (auth) => {
    try{
      await AsyncStorage.setItem('auth', auth);
      console.log("auth storeed: " + auth);
    } catch (error) {
      console.log(error)
    }
  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={{width: 300, marginTop: 30}} >
        <Button
          title='Log in'
          color='white'
          backgroundColor='#C00000'
          //onPress={() => this.props.navigation.navigate('Home')}
          onPress={() => this.onButtonPress()}

        />
      </View>
    );
  }

  onButtonPress() {
    console.log('login pressed')
    console.log(this.state.email)
    console.log(this.state.password)

    this.setState({ error: '', loading: true });

    const user = {
      email: this.state.email,
      password: this.state.password
    }

   fetch('http://206.189.145.2:3000/user/adminLogin', {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.email,
        'password': this.state.password
      })
    })
      .then((response) => {
        if (response.ok) {
          return response
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((response) => {
        console.log("logged in")
        console.log("x-auth");
        console.log(response.headers.get('x-auth'));
        this.storeData(response.headers.get('x-auth'));
        this.onLoginSuccess()
      })
      .catch((errorResponse) => {
        console.log("error")
        console.log(errorResponse.error)
        this.onLoginFail(errorResponse.error)
      })
  }

  onLoginFail(error) {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
     });
     console.log(this.retrieveData());
     this.props.navigation.navigate('Home');
  }

  render() {

    return (
      <View style={styles.container}>
        <Image
          source={require('./images/felogo.png')}
          style={{ resizeMode: 'contain', width: 300, height: 80, }}
        />
        <View style={{
          width: 260, height: 100,
          marginTop: 50,
          borderColor: 'grey',
          borderWidth: 1,
          borderRadius: 3 }}>
          <View style={{width: 260, height: 50, borderColor: 'grey', borderBottomWidth: 1}}>
            <Input
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder='Email'
            />
          </View>
          <Input
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder='Password'
            secureTextEntry= {true}
          />
        </View>
        <Text style={styles.textStyle}>
          {this.state.error}
        </Text>
          {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
      fontSize: 20,
      fontFamily: Expo.Font.OpenSansLight,
      alignSelf: 'center',
      color: 'red',
      marginTop: 10
  }
});

const RootStack = createStackNavigator({
    LogOut : {screen: LogOutButton},
    loginFlow : {
      screen: createStackNavigator({
        login: { screen: LoginScreen },
        LogOut : {screen: LogOutButton},
      }),
      navigationOptions: {
        header: null,
        disabledBackGesture: true
      }
    },
    Home : {
      screen: createStackNavigator({
        main:{screen: HomeScreen},
        UserHistory: {screen: UserHistoryScreen},
        Tickets: {screen: Tickets},
        AllPawnTickets: {screen: AllPawnTicketScreens},
        AllSellTickets: {screen: AllSellTicketScreens},
        LogOut : {screen: LogOutButton},
        TicketApproval: {screen: TicketApprovalScreen},
      }),
      navigationOptions: {
        header:null,
        headerStyle: {
          backgroundColor: '#C00000',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#ffffff'
        },
      }},
    },
    {
      initialRouteName: 'loginFlow',
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      barStyle: { backgroundColor: '#C00000' }
    },
  navigationOptions: {
    header:null,
    headerStyle: {
      backgroundColor: '#C00000',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },


  }
);
export default RootStack;
