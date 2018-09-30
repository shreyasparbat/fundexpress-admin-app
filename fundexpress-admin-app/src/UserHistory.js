import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PawnTicketScreen from './components/AllPawnTicketScreens';
import SellTicketScreen from './components/AllSellTicketScreens';
import { Container, Header, Tab, Tabs, TabHeading} from 'native-base';
import { createStackNavigator } from 'react-navigation';
import LogOutButton from './components/LogOutButton';



export default class UserHistoryScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerLeft:<LogOutButton/>,
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
      navigation: props.navigation,
      allTickets: props.ticket,
    }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex:0.14, alignSelf: 'center', justifyContent: 'center', marginTop: 20}}>
        <Image
          source={require('./images/felogo.png')}
          style={{ resizeMode: 'contain', width: 200 }}
        />
      </View>
      <View style={{flex: 0.4, marginTop: 25, alignSelf: 'center'}}>
        <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity
            onPress={() => this.state.navigation.navigate('AllPawnTickets', {allTickets: this.state.allTickets})}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Pawn Tickets
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Icon name={'ticket'} size={50}
              color={'#C00000'} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => this.state.navigation.navigate('AllSellTickets', {allTickets: this.state.allTickets})}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Sell Tickets
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Icon name={'dollar'} size={50}
              color={'#C00000'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
}
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
    //fontFamily: 'sans'
  },
  buttonStyle: {
      width: 105,
      height: 105,
      alignSelf: 'center',
      backgroundColor: '#ededed',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'transparent',
      marginLeft: 6,
      marginRight: 2,
      //marginTop: 20
  }
};
