import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, navigationOptions } from 'react-navigation';
import { Button } from 'react-native-elements';
import url from './constants/url';

//custom components
import { Input } from './components/Input';
import LogOutButton from './components/LogOutButton';

//icon imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';

//user related
import List from './components/List';
import UserListDivider from './components/UserListDivider';
import UserListItem from './components/UserListItem';
import UserSettingsScreen from './UserSettings';

//ticket related
import UserHistoryScreen from './TicketScreens/UserHistory';
import AllPawnTicketScreen from './TicketScreens/AllPawnTickets';
import AllSellTicketScreen from './TicketScreens/AllSellTickets';
import PawnTicket from './components/PawnTicket';
import SellTicket from './components/SellTicket';

//pawn tickets: approval/rejection
import PawnTicketApprovalScreen from './TicketScreens/PawnTickets/PawnTicketApproval';
import PawnTicketRejectionScreen from './TicketScreens/PawnTickets/PawnTicketRejection';

//pawn tickets: tabs
import CurrentPawnTickets from './TicketScreens/PawnTickets/CurrentPawnTickets';
import PastPawnTickets from './TicketScreens/PawnTickets/PastPawnTickets';
import PendingPawnTickets from './TicketScreens/PawnTickets/PendingPawnTickets';

//Pawn tickets: editing
import EditPawnTicketScreen from './TicketScreens/PawnTickets/EditPawnTicket';
import EditPawnItemScreen from './TicketScreens/PawnTickets/EditPawnItem';

//Sell tickets: approval/rejection
import SellTicketApprovalScreen from './TicketScreens/SellTickets/SellTicketApproval';
import SellTicketRejectionScreen from './TicketScreens/SellTickets/SellTicketRejection';

//Sell tickets: tabs
import PastSellTickets from './TicketScreens/SellTickets/PastSellTickets';
import PendingSellTickets from './TicketScreens/SellTickets/PendingSellTickets';

//Sell tickets: editing
import EditSellTicketScreen from './TicketScreens/SellTickets/EditSellTicket';
import EditSellItemScreen from './TicketScreens/SellTickets/EditSellItem';

//Recent Tickets
import RecentTicketsScreen from './RecentTickets';
import RecentPawnTicketsScreen from './RecentPawnTickets';
import RecentSellTicketsScreen from './RecentSellTickets';

//Admin Functions
import AdminFunctionsScreen from './AdminFunctions/AdminFunctions';
import UpdateInterestRateScreen from './AdminFunctions/UpdateInterestRate';
import OnboardNewAdminScreen from './AdminFunctions/OnboardNewAdmin';

//ImageView
import ImageView from './components/ImageView';

class LoginScreen extends React.Component {
  state = { email: '', password: '', error: '', loading: false, auth: '' };
  static navigationOptions = {
    header: null
  };

  //url = config.url;

  componentWillMount(){
    this.isLoggedIn()
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
          backgroundColor='#bf1e2d'
          //onPress={() => this.props.navigation.navigate('Home')}
          onPress={() => this.onButtonPress()}

        />
      </View>
    );
  }
  isLoggedIn(){
    this.retrieveData().then((token) => {
      fetch(url.url + 'admin/allUsers', {
      method: 'GET',
      headers: new Headers({
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth' : token,
      }),
      // body: JSON.stringify({
      //   auth : token
      // })
    })
      .then((response) => {
        // console.log(response.ok)
        if (response.ok) {
          this.props.navigation.navigate('TicketsMain');
        }
      })
    })
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

   fetch(url.url + 'user/adminLogin', {
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
     //console.log(this.retrieveData());
     this.props.navigation.navigate('TicketsMain');
  }

  render() {

    return (
      <View style={styles.container}>
        <Image
          source={require('./images/felogo.png')}
          //source={{uri: 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/2018-8-28_5bade7c71eb6bf1a9312b441_back.jpg'}}
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
    mainFlow : {
      screen: createBottomTabNavigator({
        "Admin Functions": {
          screen: createStackNavigator({
            AdminMain: {screen: AdminFunctionsScreen},
            LogOut : {screen: LogOutButton},
            UpdateInterestRate: {screen: UpdateInterestRateScreen},
            OnboardNewAdmin: {screen: OnboardNewAdminScreen},
          }),
          navigationOptions: {
            initialRouteName: 'AdminMain',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-construct'} size={25}
              color={'white'} />;
            },
            swipeEnabled: false,
            gesturesEnabled: false,
          }
        },
        Tickets: {
          screen: createStackNavigator({
            TicketsMain: {screen: RecentTicketsScreen},
            LogOut : {screen: LogOutButton},
            RecentPawnTickets: {screen: RecentPawnTicketsScreen},
            RecentSellTickets: {screen: RecentSellTicketsScreen},
            SellTicket: {screen: SellTicket},
            PawnTicket: {screen: PawnTicket},
            EditPawnTicket:{screen: EditPawnTicketScreen},
            EditPawnItem:{screen: EditPawnItemScreen},
            SellTicketApproval: {screen: SellTicketApprovalScreen},
            SellTicketRejection: {screen: SellTicketRejectionScreen},
            EditSellTicket: {screen: EditSellTicketScreen},
            EditSellItem:{screen: EditSellItemScreen},
            PawnTicketApproval: {screen: PawnTicketApprovalScreen},
            PawnTicketRejection: {screen: PawnTicketRejectionScreen},
            ImageView:{screen: ImageView},
          }),
          navigationOptions: {
            initialRouteName: 'TicketsMain',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-home'} size={25}
              color={'white'} />;
            },
            swipeEnabled: false,
            gesturesEnabled: false,

          }
        },
        Users: {
          screen: createStackNavigator({
            main:{screen: HomeScreen},
            LogOut : {screen: LogOutButton},
            UserHistory: {screen: UserHistoryScreen},
            UserSettings: {screen: UserSettingsScreen},
            AllPawnTickets: {screen: AllPawnTicketScreen},
            AllSellTickets: {screen: AllSellTicketScreen},
            SellTicket: {screen: SellTicket},
            PawnTicket: {screen: PawnTicket},
            CurrentPawnTickets: {screen: CurrentPawnTickets},
            PastPawnTickets: {screen: PastPawnTickets},
            PendingPawnTickets: {screen: PendingPawnTickets},
            PastSellTickets: {screen: PastSellTickets},
            PendingSellTickets: {screen: PendingSellTickets},
            PawnTicketApproval: {screen: PawnTicketApprovalScreen},
            PawnTicketRejection: {screen: PawnTicketRejectionScreen},
            EditPawnTicket:{screen: EditPawnTicketScreen},
            EditPawnItem:{screen: EditPawnItemScreen},
            SellTicketApproval: {screen: SellTicketApprovalScreen},
            SellTicketRejection: {screen: SellTicketRejectionScreen},
            EditSellTicket: {screen: EditSellTicketScreen},
            EditSellItem:{screen: EditSellItemScreen},
            ImageView:{screen: ImageView},
          }),
          navigationOptions: {
            gesturesEnabled:false,
            hardwareBackPress: true,
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-contact'} size={25}
              color={'white'} />;
            },
          }
        },
    },
    {
      initialRouteName: 'Tickets',
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      barStyle: { backgroundColor: '#bf1e2d' },
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        fontWeight: 'bold',
        style: {
          backgroundColor: '#bf1e2d',
        }
      },

    }
  ),navigationOptions: {
    headerStyle: {
      backgroundColor: '#bf1e2d',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
    header:null,
    gesturesEnabled: false,

    // const routes = navigation.state.routes;
    // if (routes && routes.length > 0) {
    //     const route = routes[routes.length - 1];
    //     if (route.routeName == 'approve or reject') {  // match by last routeName
    //         return false;
    //     }
    // }
    // return true;
  }
  }
});


export default RootStack;
