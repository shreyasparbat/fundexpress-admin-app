import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import React from 'react';
import ProgressBar from './ProgressBar';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList } from 'react-native';

const styles = {
  buttonStyle: {
    margin: 5,
    height:35,
    backgroundColor: '#C00000',
    width:160,
    justifyContent: 'center'
  }
}

export default class PawnTicket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navigation: props.navigation,
      _id: props._id,
      userId: props.userId,
      itemId: props.itemId,
      itemName: props.itemName,
      ticketNumber: props.ticketNumber,
      dateCreated: new Date(props.dateCreated),
      expiryDate: new Date(props.expiryDate),
      interestPayable: props.interestPayable,
      offeredValue: props.offeredValue,
      specifiedValue: props.specifiedValue,
      approvalStatus: props.approvalStatus
    }
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
      return "#C00000"; //return red if remainingDays is negative
    } else if (remainingDays <= 7) {
      return "#FFc000"; // return yellow if there are 7 or less remainingDays
    } else {
      return "#4cbb17"; //return green for all other values of remainingDays
    }
  }

  getDateNicelyFormatted(date){
    var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year:"numeric" })
    var arrayOfDateParts = currentDateString.split(" ");
    var month = arrayOfDateParts[0]
    var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
    var year = arrayOfDateParts[2]
    return day + " " + month.substring(0, 3) + "\r\n" + year;
  }
  render(){
    return(
      <View>
            <Card style={{flex: 0}}>
              <CardItem>
              <Left>
              <Image
                source={require('../images/feplaceholder.png')}
                style={{ resizeMode: 'contain', width: 90 , height: 90}}
              />
              </Left>
                  <Body>

                    //
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize:25}}>Ticket #{this.state.ticketNumber}</Text>
                      <Text note>{this.state.itemName}</Text>
                    </View>

                    //ProgressBar
                    <ProgressBar
                        percentage={this.getTimePassed(this.state.dateCreated, this.state.expiryDate)}
                        color={this.getProgressBarColor(this.state.dateCreated, this.state.expiryDate)}
                    />

                    // date under the ProgressBar
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                      <Text style={{width:85}}>{this.getDateNicelyFormatted(this.state.dateCreated)}</Text>
                      <Text style={{width:85, textAlign: 'right'}}>{this.getDateNicelyFormatted(this.state.expiryDate)}</Text>
                    </View>

                    //pawn amount and interestPayable
                    <View style={{flexDirection: 'row', padding: 5}}>
                      //column 1
                      <View style={{flexDirection: 'column', backgroundColor: '#d3d3d3'}}>
                        <Text>Pawn amount: </Text>
                        <Text>Interest Payable: </Text>

                      </View>
                      //column 2
                      <View style={{flexDirection: 'column'}}>
                        <Text>{this.state.offeredValue}</Text>
                        <Text>{this.state.interestPayable}</Text>
                      </View>
                    </View>

                    //Buttons container
                    <CardItem style={{justifyContent: 'center'}}>
                      //Renew Now Button
                      <Button style={styles.buttonStyle} onPress={() => this.state.navigation.navigate('TicketApproval', {stateOfTicket: this.state})}>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Ticket Approval</Text>
                      </Button>
                    </CardItem>

                  </Body>

              </CardItem>


            </Card>

        </View>
    );
  }

}
