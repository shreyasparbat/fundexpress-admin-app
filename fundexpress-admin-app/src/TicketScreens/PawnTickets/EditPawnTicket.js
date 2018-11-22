import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Avatar , Button, FormLabel, FormInput } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Picker, DatePicker, Form} from "native-base";
import url from '../../constants/url';

export default class EditPawnTicketScreen extends React.Component{
  static navigationOptions = {
    title: 'Edit Pawn Ticket',
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
      pawnTicketID: this.props.navigation.getParam('pawnTicketID'),
      frontUri: this.props.navigation.getParam('frontUri'),
      backUri: this.props.navigation.getParam('backUri'),
      nameOfPreviousPage: this.props.navigation.getParam('nameOfPreviousPage'),
      item: {},
      pendingPawnTicket:{},
      dateCreated: new Date() ,
      expiryDate: new Date(),
      gracePeriodEndDate: new Date(),
      indicativeTotalInterestPayable: 0,
      value: 0,
      approved: false,
      closed: false,
      expired: false,
      outstandingPrincipal: 0,
      outstandingInterest: 0,
      loading:false,
    }
    console.log("1. this state is initialised");
  }

  componentWillMount(){
    console.log("2. componentWillMount")
    console.log("edit ticket pawnTicketID: " + this.state.pawnTicketID);
    console.log("edit ticket currentUserID: " + this.state.currentUserID);
    this.retrieveTickets();


  }
  setStateOfPendingPawnTicket(){
    console.log("8. start of setStateOfPendingPawnTicket")
    var pendingPawnTicket =  this.state.pendingPawnTicket;
    console.log("9. retrieved pendingPawnTicket: " + pendingPawnTicket);
    this.setState({
      item: pendingPawnTicket.item,
      dateCreated:  pendingPawnTicket.dateCreated,
      expiryDate: pendingPawnTicket.expiryDate,
      gracePeriodEndDate: pendingPawnTicket.gracePeriodEndDate,
      indicativeTotalInterestPayable: pendingPawnTicket.indicativeTotalInterestPayable,
      value: pendingPawnTicket.value,
      approved: pendingPawnTicket.approved,
      closed: pendingPawnTicket.closed,
      expired: pendingPawnTicket.expired,
      outstandingPrincipal:  pendingPawnTicket.outstandingPrincipal,
      outstandingInterest:  pendingPawnTicket.outstandingInterest,
    })
    console.log("10.set state of pendingPawnTicket complete")
    console.log("dateCreated: " + this.state.dateCreated)
    console.log("expiryDate: " + this.state.expiryDate)
    console.log("gracePeriodEndDate: " + this.state.gracePeriodEndDate)
    console.log("11.set loading=false")

    console.log("name of previous page:"+ this.state.nameOfPreviousPage);
    this.setState({loading: false});
}
  getPendingPawnTicket(pendingPawnTickets){
    console.log("6a. pendingPawnTickets in getPendingPawnTicket method: " + pendingPawnTickets)
    for (i=0; i<pendingPawnTickets.length; i++){
      var pendingPawnTicket = pendingPawnTickets[i];
      console.log('pendingPawnTicket: ' + pendingPawnTicket._id);
      if (pendingPawnTicket._id===this.state.pawnTicketID ){
        console.log("6b. return this pawn ticket: " + pendingPawnTicket._id);

        return pendingPawnTicket;

      }
    }
    console.log("6c. returning an empty pawnTicket");
    return {};
  }
  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      console.log('2a. auth retrieved: ' + value)
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
  console.log("3. start of retrieveTickets in pendingPawnTickets and set loading=true")
  this.setState({loading: true});
  //normal client retrieve tickets

  this.retrieveData().then((auth) =>{
    console.log({ //fetch from admin url
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth
      },
      body: JSON.stringify({
        "userID": this.state.currentUserID,
      }) //not in client side
    });
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
    console.log("4. response.ok: " + response.ok);
    console.log()
    return response.json()
  })
  .then((response) => {
    console.log("5. success: set PendingPawnTicket");
    this.setState({pendingPawnTicket:this.getPendingPawnTicket(response.pawnTicketsPendingApproval)});
    console.log("6. ")
    console.log("7. calling setStateOfPendingPawnTicket");
    this.setStateOfPendingPawnTicket();

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
    // console.log("arrayOfDateParts: " + arrayOfDateParts)
    var month = arrayOfDateParts[0]
    // console.log('month: ' + month)
    var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
    // console.log('day: ' + day)
    var year = arrayOfDateParts[2]
    // console.log('year: ' + year)
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
    console.log('approved method reached');
    if (this.props.navigation.getParam('itemState')!=null){
      this.setState({item: this.props.navigation.getParam('itemState')});
    }
    var objectToSend = {
      currentUserID: this.state.currentUserID,
      nameOfPreviousPage: this.state.nameOfPreviousPage,
      editedTicketState: {
        // "__v": this.state.__v,
        // "_id": this.state._id,
        "pawnTicketID":this.state.pawnTicketID,
        "item": this.state.item,
        "dateCreated": this.state.dateCreated,
        "expiryDate": this.state.expiryDate,
        "gracePeriodEndDate": this.state.gracePeriodEndDate,
        "indicativeTotalInterestPayable": this.state.indicativeTotalInterestPayable,
        "value": this.state.value,
        "approved": this.state.approved,
        "closed": this.state.closed,
        "expired": this.state.expired,
        "outstandingPrincipal": this.state.outstandingPrincipal,
        "outstandingInterest": this.state.outstandingInterest
      }
    };
    //if (this.state.nameOfPreviousPage=='TicketsMain'){
      this.props.navigation.navigate('PawnTicketApproval', objectToSend);
    //}
    //  this.props.navigation.navigate('PawnTicketApprovalUser', objectToSend);
  }
  reject(){
    console.log('reject method reached');


    console.log('pawnTicketID: ' + this.state.pawnTicketID);
    //if (this.state.nameOfPreviousPage=='TicketsMain'){
      this.props.navigation.navigate('PawnTicketRejection', {pawnTicketID: this.state.pawnTicketID, nameOfPreviousPage: this.state.nameOfPreviousPage});
    //}
    //this.props.navigation.navigate('PawnTicketRejectionUser', {pawnTicketID: this.state.pawnTicketID, nameOfPreviousPage: this.state.nameOfPreviousPage});

  }

  render(){

    if(this.state.loading){
      return <ActivityIndicator/>;
    }
    // if (this.props.navigation.getParam('itemState')!=null && this.state.item!=this.props.navigation.getParam('itemState')){
    //   this.setState({item: this.props.navigation.getParam('itemState')});
    // }
    return(
      <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
        extraScrollHeight = {150}
        keyboardOpeningTime = {10}
      >


      <TouchableOpacity
        onPress={()=>{this.props.navigation.navigate('ImageView', {frontUri: this.state.frontUri, backUri: this.state.backUri, isPawnTicket: true})}}
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
                  placeHolderText="Select Date Created"
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "#c7c7cd" }}
                  onDateChange={dateCreated => this.setState({ dateCreated })}
                  />

          </View>


          {/* expiryDate */}
          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
            <FormLabel style={{alignSelf: 'flex-start'}}>Expiry Date</FormLabel>

            <DatePicker
                  defaultDate={new Date(this.state.expiryDate)}
                  style={{marginLeft:15}}
                  locale={"SGP"}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select Expiry Date"
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "#c7c7cd" }}
                  onDateChange={expiryDate => this.setState({ expiryDate })}
                  />

          </View>


          {/* gracePeriodEndDate */}

          <View style={{flex: 1,height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
            <FormLabel>Grace Period End Date</FormLabel>

            <DatePicker
                  defaultDate={new Date(this.state.gracePeriodEndDate)}
                  style={{marginLeft:15}}
                  locale={"SGP"}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select Grace Period End Date"
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "#c7c7cd" }}
                  onDateChange={gracePeriodEndDate => this.setState({ gracePeriodEndDate })}
                  />

          </View>

          {/* interestPayable */}
          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
            <FormLabel>Indicative Total Interest Payable</FormLabel>
            <FormInput
              name='indicativeTotalInterestPayable'
              // onChangeText={()=>{
              //   event.persist()
              //   indicativeTotalInterestPayable => this.setState({ indicativeTotalInterestPayable })
              // }}
              onChangeText={ indicativeTotalInterestPayable => this.setState({ indicativeTotalInterestPayable })}
              keyboardType={'phone-pad'}
              value={this.state.indicativeTotalInterestPayable.toString()}
              //value={this.state.indicativeTotalInterestPayable}
            />
          </View>

          {/* value */}
          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
            <FormLabel>Value</FormLabel>
            <FormInput
              name='value'
              // onChangeText={()=>{
              //   event.persist()
              //   value => this.setState({ value })
              // }}
              onChangeText={ value => this.setState({ value })}
              keyboardType={'phone-pad'}
              value={this.state.value.toString()}
              //value={this.state.value}
            />
          </View>

          {/* approved */}
          {/* closed */}
          {/* expired */}
          {/* outstandingPrincipal  */}

          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
            <FormLabel>Outstanding Principal</FormLabel>
            <FormInput
              name='outstandingPrincipal'
              // onChangeText={()=>{
              //   event.persist()
              //   outstandingPrincipal => this.setState({ outstandingPrincipal })
              // }}
              onChangeText={ outstandingPrincipal => this.setState({ outstandingPrincipal })}
              keyboardType={'phone-pad'}
              value={this.state.outstandingPrincipal.toString()}
              //value={this.state.outstandingPrincipal}
            />
          </View>

          {/* outstandingInterest */}
          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
            <FormLabel>Outstanding Interest</FormLabel>
            <FormInput
              name='outstandingInterest'
              // onChangeText={()=>{
              //   event.persist()
              //   outstandingInterest => this.setState({ outstandingInterest })
              // }}
              onChangeText={ outstandingInterest => this.setState({ outstandingInterest })}
              keyboardType={'phone-pad'}
              value={this.state.outstandingInterest.toString()}
              //value={this.state.outstandingInterest}
            />
          </View>


          {/* Item */}
          <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'center', width: '100%', flexDirection:'row'}} >
            <Button
              style={{padding:5}}
              title='Edit Item'
              color='#ffffff'
              backgroundColor='#bf1e2d'
              onPress={() => {
                  this.props.navigation.navigate('EditPawnItem', {itemState: this.state.item})
                }
              }
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
