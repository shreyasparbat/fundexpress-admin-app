import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Avatar , Button, FormLabel, FormInput } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Picker, DatePicker, Form} from "native-base";
import url from '../../constants/url';

export default class EditSellTicketScreen extends React.Component{
  static navigationOptions = {
    title: 'Edit Sell Ticket',
    headerStyle: {
      backgroundColor: '#bf1e2d',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  };
  constructor(props){
    super(props)
    this.state= {
      currentUserID:  this.props.navigation.getParam('currentUserID'),
      sellTicketID: this.props.navigation.getParam('sellTicketID'),
      frontUri: this.props.navigation.getParam('frontUri'),
      backUri: this.props.navigation.getParam('backUri'),
      nameOfPreviousPage: this.props.navigation.getParam('nameOfPreviousPage'),
      item: {},
      pendingSellTicket:{},
      dateCreated: new Date() ,
      value: 0,
      approved: false,
      loading:false,
    }
  }

  componentWillMount(){

    this.retrieveTickets();


  }
  setStateOfPendingSellTicket(){
    var pendingSellTicket =  this.state.pendingSellTicket;
    this.setState({
      item: pendingSellTicket.item,
      dateCreated:  pendingSellTicket.dateCreated,
      expiryDate: pendingSellTicket.expiryDate,
      gracePeriodEndDate: pendingSellTicket.gracePeriodEndDate,
      indicativeTotalInterestPayable: pendingSellTicket.indicativeTotalInterestPayable,
      value: pendingSellTicket.value,
      approved: pendingSellTicket.approved,
      closed: pendingSellTicket.closed,
      expired: pendingSellTicket.expired,
      outstandingPrincipal:  pendingSellTicket.outstandingPrincipal,
      outstandingInterest:  pendingSellTicket.outstandingInterest,
    })
    this.setState({loading: false});
}
  getPendingSellTicket(pendingSellTickets){
    // console.log("6a. pendingSellTickets in getPendingSellTicket method: " + pendingSellTickets)
    for (i=0; i<pendingSellTickets.length; i++){
      var pendingSellTicket = pendingSellTickets[i];
      // console.log('pendingSellTicket: ' + pendingSellTicket._id);
      if (pendingSellTicket._id===this.state.sellTicketID ){
        // console.log("6b. return this Sell ticket: " + pendingSellTicket._id);

        return pendingSellTicket;

      }
    }
    // console.log("6c. returning an empty SellTicket");
    this.props.navigation.navigate(this.state.nameOfPreviousPage)
    return {};
  }
  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      // console.log('2a. auth retrieved: ' + value)
      return value;
    } catch (error) {
      console.log(error)
    }
  }

 storeData = async (key, item) => {
  try{
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    console.log(error)
  }
}

retrieveTickets(){

  this.setState({loading: true});
  //normal client retrieve tickets

  this.retrieveData().then((auth) =>{
    // console.log({ //fetch from admin url
    //   method: 'POST',
    //   headers: {
    //     //Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'x-auth': auth
    //   },
    //   body: JSON.stringify({
    //     "userID": this.state.currentUserID,
    //   }) //not in client side
    // });
    return auth
  })
  .then((auth) => {

  fetch(url.url + 'admin/tickets/',{ //fetch from admin url
    method: 'POST',
    headers: {
      //Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-auth': auth,
    },
    body: JSON.stringify({
      "userID": this.state.currentUserID,
    }), //not in client side
  })
  .then((response) => {
    return response.json()
  })
  .then((response) => {
    this.setState({pendingSellTicket:this.getPendingSellTicket(response.sellTicketPendingApproval)});
    this.setStateOfPendingSellTicket();

  })
  .catch((error) => {
    console.log("error")
    console.log(error)
  })
})
}
getDateObject(date){
  if(Platform.OS==="ios"){
     //console.log("date: " + date);
    var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "numeric", year:"numeric" })
     //console.log("currentDateString: " + currentDateString)
    var arrayOfDateParts = currentDateString.split("/");
     //console.log("arrayOfDateParts: " + arrayOfDateParts)
    var month = arrayOfDateParts[0]
     //console.log('month: ' + month)
    var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
     //console.log('day: ' + day)
    var year = arrayOfDateParts[2]
     //console.log('year: ' + year)
    return new Date(year, month, day);
  }else{
    // console.log("date: " + date);
    var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "numeric", year:"numeric" })
    // console.log("currentDateString: " + currentDateString)
    var arrayOfDateParts = currentDateString.split("/");
    // console.log("arrayOfDateParts: " + arrayOfDateParts)
    var month = arrayOfDateParts[0]
    // console.log('month: ' + month)
    var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
    // console.log('day: ' + day)
    var year = arrayOfDateParts[2]
    // console.log('year: ' + year)
    return new Date(year, month, day);
  }
}
  //approve the tickets
  approve(){
    if (this.props.navigation.getParam('itemState')!=null){
      this.setState({item: this.props.navigation.getParam('itemState')});
    }
    var objectToSend = {
      currentUserID: this.state.currentUserID,
      nameOfPreviousPage: this.state.nameOfPreviousPage,
      editedTicketState: {
        "sellTicketID":this.state.sellTicketID,
        "item": this.state.item,
        "dateCreated": this.state.dateCreated,
        "value": this.state.value,
        "approved": this.state.approved,
      }
    };
      this.props.navigation.navigate('SellTicketApproval', objectToSend);

  }
  reject(){
    if (this.props.navigation.getParam('itemState')!=null){
      this.setState({item: this.props.navigation.getParam('itemState')});
    }
      this.props.navigation.navigate('SellTicketRejection', {sellTicketID: this.state.sellTicketID, nameOfPreviousPage: this.state.nameOfPreviousPage});

  }
  render(){

    if(this.state.loading){
      return <ActivityIndicator/>;
    }
    const ticket = this.state;
    if (this.state.dateCreated==null){
      this.props.navigation.navigate(this.state.nameOfPreviousPage);
    }
    return(
      <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
        extraScrollHeight = {150}
        keyboardOpeningTime = {10}
      >
      <TouchableOpacity
        onPress={()=>{this.props.navigation.navigate('ImageView', {frontUri: this.state.frontUri, backUri: this.state.backUri, isPawnTicket: false})}}
      >
        <View
          style={{height:200,borderBottomColor:"black", backgroundColor: 'white', flexDirection: 'row', alignSelf: 'center', width: '100%'}}
        >

          <Image
            source={{uri: this.state.frontUri}}
            style={{ resizeMode: 'contain',width:'50%', backgroundColor: 'white', }}
          />

          <Image
            source={{uri: this.state.backUri}}
            style={{ resizeMode: 'contain',width: '50%', backgroundColor: 'white', }}
          />
        </View>
      </TouchableOpacity>

          {/* dateCreated */}
          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
            <FormLabel>Date Created</FormLabel>
            <DatePicker
                  defaultDate={new Date(this.state.dateCreated)}
                  style={{marginLeft:15}}
                  locale={"SGP"}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={this.state.dateCreated}
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "#c7c7cd" }}
                  onDateChange={dateCreated => this.setState({ dateCreated })}
                  />

          </View>

          {/* value */}
          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
            <FormLabel>Value</FormLabel>
            <FormInput
              name='value'
              onChange={value => this.setState({ value })}
              value={ticket.value.toString()}
            />
          </View>


          {/* approved */}



          {/* Item */}
          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'center', width: '100%', flexDirection:'row'}} >

            <Button
              style={{padding:5}}
              title='Edit Item'
              color='#ffffff'
              backgroundColor='#bf1e2d'
              onPress={() => {this.props.navigation.navigate('EditSellItem', {itemState: this.state.item})}}
            />



            {/* Approve or reject buttons */}
            <Button
              style={{padding:5}}
              title='Approve'
              color='#ffffff'
              backgroundColor='#bf1e2d'
              onPress={() => {this.approve()}}
            />

            <Button
              style={{padding:5}}
              title='Reject'
              color='#ffffff'
              backgroundColor='#bf1e2d'
              onPress={() => {this.reject()}}
            />
          </View>

      </KeyboardAwareScrollView>
    );
  }
}
