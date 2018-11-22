import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Tab, Tabs, TabHeading} from 'native-base';
import LogOutButton from '../components/LogOutButton';

export default class AdminFunctionsScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Admin Functions",
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
  render() {
    console.log("Admin Functions Screen");
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
                //onPress={() => this.props.navigation.navigate('UpdateInterestRate')}
                activeOpacity= {0.8}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>
                  Update Interest Rate
                </Text>
                <View style={{alignSelf: 'center'}}>
                  <Icon name={'dollar'} size={50}
                  color={'#bf1e2d'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OnboardNewAdmin')}
                activeOpacity= {0.8}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>
                  Onboard New Admin
                </Text>
                <View style={{alignSelf: 'center'}}>
                  <Icon name={'user'} size={50}
                  color={'#bf1e2d'} />
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
    fontSize: 16,
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
