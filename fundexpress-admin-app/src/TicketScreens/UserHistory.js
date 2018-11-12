import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AllPawnTicketsScreen from './AllPawnTickets';
import AllSellTicketsScreen from './AllSellTickets';
import { Container, Header, Tab, Tabs, TabHeading} from 'native-base';
import { createStackNavigator } from 'react-navigation';
import LogOutButton from '../components/LogOutButton';

export default class UserHistoryScreen extends React.Component {
  // static navigationOptions = {
  //   title: "User History",
  //     headerStyle: {
  //       backgroundColor: "#C00000",
  //     },
  //     headerTintColor: "#ffffff",
  //     headerTitleStyle: {
  //       fontWeight: "bold",
  //       color: "#ffffff"
  //     },
  // }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Home",
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
  render() {
    console.log("User History Screen");
    const currentUserID = this.props.navigation.getParam('currentUserID');
    console.log("My Tickets: " + currentUserID);

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:0.14, alignSelf: 'center', justifyContent: 'center', marginTop: 20}}>
          <Image
            source={require('../images/felogo.png')}
            style={{ resizeMode: 'contain', width: 200 }}
          />
        </View>
        <View style={{flex: 0.4, marginTop: 100, alignSelf: 'center'}}>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AllPawnTickets', {currentUserID: currentUserID})}
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
                onPress={() => this.props.navigation.navigate('AllSellTickets', {currentUserID: currentUserID})}
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
          <View style={{ flexDirection: 'row', marginTop: 7, alignSelf: 'center'}}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('UserSettings', {currentUserID: currentUserID})}
                activeOpacity= {0.8}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>
                  User Settings
                </Text>
                <View style={{alignSelf: 'center'}}>
                  <Icon name={'cog'} size={50}
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
    paddingBottom: 10,
    //fontFamily: 'sans'
  },
  buttonStyle: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    backgroundColor: '#ededed',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    marginLeft: 6,
    marginRight: 2,
  }

}
