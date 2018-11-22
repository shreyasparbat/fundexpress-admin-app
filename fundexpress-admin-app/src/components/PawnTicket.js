import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import React from 'react';
import ProgressBar from './ProgressBar';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList,Platform } from 'react-native';

const styles = {
  buttonStyle: {
    margin: 5,
    height:35,
    backgroundColor: '#bf1e2d',
    width:150,
    justifyContent: 'center'
  }
}

export default class PawnTicket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUserID: props.currentUserID,
      item: props.data.item,
      ticketNumber: props.data._id,
      dateCreated: new Date(props.data.dateCreated),
      expiryDate: new Date(props.data.expiryDate),
      gracePeriodEndDate: new Date(props.data.gracePeriodEndDate),
      indicativeTotalInterestPayable: this.roundTo(props.data.indicativeTotalInterestPayable),
      value: props.data.value,
      approvalStatus: props.data.approved,
      closed: props.data.closed,
      expired: props.data.expired,
      outstandingPrincipal:this.roundTo(props.data.outstandingPrincipal),
      outstandingInterest: this.roundTo(props.data.outstandingInterest),
      frontUri:'',
      backUri:'',
      nameOfPreviousPage: props.nameOfPreviousPage,
      loading: false,
    }
  }
  getFrontURI(ticketID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'+ticketID+ '_front.png';
    return uri;
  }
  getBackURI(ticketID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'+ticketID+ '_back.png';
    return uri;
  }

  componentWillMount(){
    this.setState({
      loading:true
    })
    this.setState({
      frontUri: this.getFrontURI(this.state.item._id),
      backUri: this.getBackURI(this.state.item._id)
    })
  }
  getTimePassed(dateCreated, expiryDate){

    //find number of milliseconds in days
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

    //get the day difference between dateCreated and expiryDate
    var totalDays = Math.round(Math.abs((dateCreated.getTime() - expiryDate.getTime())/(oneDay)));

    //get the difference in number of days between dateCreated and the date now
    var now = new Date();
    var progressedDays = Math.round(Math.abs((dateCreated.getTime() - now.getTime())/(oneDay)));

    //return the percentage of time passed
    var percentage = (progressedDays/totalDays)*100.0
    if (percentage<100){
      return percentage
    } else {
      return 100
    }
  }

  getProgressBarColor(dateCreated, expiryDate){
    //find number of milliseconds in days
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

    //get the difference in number of days between expiryDate and the date now
    var now = new Date();
    var remainingDays = Math.round((expiryDate.getTime() - now.getTime())/(oneDay));

    //get the ProgressBar color
    /*
    red: 100%
    yellow: 7days or less
    green: everything else
    */
    if (remainingDays <=0) {
      return "#bf1e2d"; //return red if remainingDays is negative
    } else if (remainingDays <= 7) {
      return "#FFc000"; // return yellow if there are 7 or less remainingDays
    } else {
      return "#4cbb17"; //return green for all other values of remainingDays
    }
  }

  getDateNicelyFormatted(date){
    if(Platform.OS==="ios"){
      // console.log("date: " + date);
      var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year:"numeric" })
      // console.log("currentDateString: " + currentDateString)
      var arrayOfDateParts = currentDateString.split(" ");
      // console.log("arrayOfDateParts: " + arrayOfDateParts)
      var month = arrayOfDateParts[0]
      // console.log('month: ' + month)
      var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
      // console.log('day: ' + day)
      var year = arrayOfDateParts[2]
      // console.log('year: ' + year)
      return day + " " + month.substring(0, 3) + " " + year;
    }else{
      // console.log("date: " + date);
      var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year:"numeric" })
      // console.log("currentDateString: " + currentDateString)
      var arrayOfDateParts = currentDateString.split("/");
      // console.log("arrayOfDateParts: " + arrayOfDateParts)
      var month = arrayOfDateParts[0]
      // console.log('month: ' + month)
      var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
      // console.log('day: ' + day)
      var year = arrayOfDateParts[2]
      // console.log('year: ' + year)
      return day + " " + month.substring(0, 3) + " " +year;
    }

  }
  roundTo(number) {
      return parseFloat(Math.round(number * 100) / 100).toFixed(2);
  }
  renderTicketApprovalButton(){
    if (!this.state.approvalStatus==true||this.state.closed==true){
      return(
        <CardItem style={{justifyContent: 'center'}}>
          {/* Ticket Approval Button */}
          <Button
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('EditPawnTicket', {
              currentUserID: this.state.currentUserID,
              pawnTicketID: this.state.ticketNumber,
              frontUri: this.state.frontUri,
              backUri: this.state.backUri,
              nameOfPreviousPage: this.state.nameOfPreviousPage,
            })}>
            <Text style={{fontSize: 16, color: '#ffffff', }}>Ticket Approval</Text>
          </Button>
        </CardItem>
      );
    }
    return <CardItem/>
  }



  render(){
    
    return(
      <View>
            <Card style={{flex: 1}}>
              <CardItem>
              <Left>
              <Image

                source={{uri: this.state.frontUri}}
                style={{ resizeMode: 'contain',width:120, height: 120}}
              />
              </Left>
                  <Body>
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize:25}}>{this.state.item.name}</Text>
                      {/* <Text note>Ticket #{this.state.ticketNumber}</Text> */}
                    </View>

                    {/* //ProgressBar */}
                    <ProgressBar
                        percentage={this.getTimePassed(this.state.dateCreated, this.state.expiryDate)}
                        color={this.getProgressBarColor(this.state.dateCreated, this.state.expiryDate)}
                    />

                    {/* // label for date under the ProgressBar */}
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{width:85}}>Date Created:</Text>
                      <Text style={{width:85, textAlign: 'right'}}>Expiry Date:</Text>
                    </View>

                    {/* // date under the ProgressBar */}
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                      <Text style={{width:85}}>{this.getDateNicelyFormatted(this.state.dateCreated)}</Text>
                      <Text style={{width:85, textAlign: 'right'}}>{this.getDateNicelyFormatted(this.state.expiryDate)}</Text>
                    </View>


                    {/* //outstandingPrincipal and outstandingInterest */}
                    <View style={{flexDirection: 'row', padding: 5}}>
                      {/* //column 1 */}
                      <View style={{flexDirection: 'column', backgroundColor: '#d3d3d3'}}>
                        <Text>Outstanding Principal: </Text>
                        <Text>Outstanding Interest: </Text>

                      </View>
                      {/* //column 2 */}
                      {/* //${Math.round(this.state.offeredValue)} */}
                      <View style={{flexDirection: 'column'}}>
                        <Text>{this.roundTo(this.state.outstandingPrincipal)}</Text>
                        <Text>{this.roundTo(this.state.outstandingInterest)}</Text>
                      </View>
                    </View>

                    {/* //Buttons container */}
                    {this.renderTicketApprovalButton()}

                  </Body>

              </CardItem>


            </Card>

        </View>
    );
  }

}
