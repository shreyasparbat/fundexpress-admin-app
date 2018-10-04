import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import React from 'react';
import ProgressBar from './ProgressBar';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList } from 'react-native';

const styles = {
  buttonStyle: {
    height:35,
    backgroundColor: '#C00000',
    width:160,
    justifyContent: 'center'
  }
}

export default class SellTicket extends React.Component {
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
      value: props.value,
      approvalStatus: props.approvalStatus
    }
  }
  getDateNicelyFormatted(date){
    var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year:"numeric" })
    var arrayOfDateParts = currentDateString.split(" ");
    var month = arrayOfDateParts[0]
    var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
    var year = arrayOfDateParts[2]
    return day + " " + month.substring(0, 3)  + " " + year;
  }
  render(){
    return(
      <View>
            <Card style={{flex: 0}}>
              <CardItem>
              <Left>
              <Image
                source={require('../images/feplaceholder.png')}
                style={{ resizeMode: 'contain', width: 100 , height: 100}}
              />
              </Left>
                  <Body>

                    //
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize:25}}>Ticket #{this.state._id}</Text>
                      <Text note>{this.state.itemName}</Text>
                    </View>


                    //pawn amount and interestPayable
                    <View style={{flexDirection: 'row', padding: 5}}>
                      //column 1
                      <View style={{flexDirection: 'column', backgroundColor: '#d3d3d3'}}>
                        <Text>Date Created: </Text>
                        <Text>Item Value: </Text>

                      </View>
                      //column 2
                      <View style={{flexDirection: 'column'}}>
                        <Text>{this.getDateNicelyFormatted(this.state.dateCreated)}</Text>
                        <Text>{this.state.value}</Text>
                      </View>
                    </View>

                    //Buttons container
                    <View style={{alignSelf: 'center'}}>
                    <CardItem>
                      //Value Button
                      <Button style={styles.buttonStyle} onPress={() => this.state.navigation.navigate('TicketApproval', {stateOfTicket: this.state})}>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Ticket Approval</Text>
                      </Button>
                    </CardItem>z
                    </View>
                  </Body>

              </CardItem>


            </Card>

        </View>
    );
  }

}
