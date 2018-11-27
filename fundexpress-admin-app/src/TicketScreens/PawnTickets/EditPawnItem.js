import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator, Platform } from 'react-native';
import { Avatar , Button, FormLabel, FormInput  } from 'react-native-elements';
import { GiftedForm } from 'react-native-gifted-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Picker, DatePicker, Form, CardItem} from "native-base";


export default class EditPawnItemScreen extends React.Component{
  static navigationOptions = {
    title: 'Edit Item',
    headerLeft:null,
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
    this.state={
      name: '',
      type: '',
      material: '',
      condition: 'NA',
      weight: 0,
      dateOfPurchase: new Date(),
      meltingPercentage: 0,
      sellPercentage: 0,
      brand: '',
      otherComments: '',
      pawnOfferedValue: 0,
      sellOfferedValue: 0,
    }
    this.state={
      _id: "",
      userID: "",
      type: "",
      __v: 0,
      brand: "",
      condition: "",
      dateOfPurchase: "",
      material: "",
      name: "",
      otherComments: "",
      purity: "",
      weight: 0,
      meltingPercentage: 0,
      pawnOfferedValue: 0,
      sellOfferedValue: 0,
      sellPercentage: 0,
    }
  }
  goBack(){
    this.props.navigation.navigate('EditPawnTicket', {itemState: this.state})
  }

  componentWillMount(){
    this.setState({loading:true})
    const itemState = this.props.navigation.getParam('itemState');

    this.setState({
      _id: itemState._id,
      userID: itemState.userID,
      type: itemState.type,
      __v: itemState.__v,
      brand: itemState.brand,
      condition: itemState.condition,
      dateOfPurchase: itemState.dateOfPurchase,
      material: itemState.material,
      name: itemState.name,
      otherComments: itemState.otherComments,
      purity: itemState.purity,
      weight: itemState.weight,
      meltingPercentage: itemState.meltingPercentage,
      pawnOfferedValue: itemState.pawnOfferedValue,
      sellOfferedValue: itemState.sellOfferedValue,
      sellPercentage: itemState.sellPercentage
    })

  }
  render(){
    if (this.state.pendingPawnTicket=={}){
      this.props.navigation.navigate(this.state.nameOfPreviousPage);
    }
    return(
      <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
        extraScrollHeight = {150}
        keyboardOpeningTime = {10}
      >

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Name</FormLabel>
          <FormInput
            name='name'
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Type</FormLabel>
          <FormInput
            name='type'
            onChangeText={type => this.setState({ type })}
            value={this.state.type}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Material</FormLabel>
          <FormInput
            name='material'
            onChangeText={material => this.setState({ material })}
            value={this.state.material}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Condition</FormLabel>
          <FormInput
            name='condition'
            onChangeText={condition => this.setState({ condition })}
            value={this.state.condition.toString()}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Weight</FormLabel>
          <FormInput
            name='weight'
            onChangeText={weight => this.setState({ weight })}
            value={this.state.weight.toString()}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Date Of Purchase</FormLabel>
          <DatePicker
            name='dateOfPurchase'
            defaultDate={new Date(this.state.dateOfPurchase)}
            style={{marginLeft:15}}
            locale={"SGP"}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText={this.state.dateOfPurchase}
            textStyle={{ color: "black" }}
            placeHolderTextStyle={{ color: "#c7c7cd" }}
            onDateChange={dateOfPurchase => this.setState({ dateOfPurchase })}
            />
        </View>


        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Melting Percentage</FormLabel>
          <FormInput
            name='meltingPercentage'
            onChangeText={meltingPercentage => this.setState({ meltingPercentage })}
            value={this.state.meltingPercentage.toString()}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Sell Percentage</FormLabel>
          <FormInput
            name='sellPercentage'
            onChangeText={sellPercentage => this.setState({ sellPercentage })}
            value={this.state.sellPercentage.toString()}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Brand</FormLabel>
          <FormInput
            name='brand'
            onChangeText={brand => this.setState({ brand })}
            value={this.state.brand.toString()}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Comments</FormLabel>
          <FormInput
            name='otherComments'
            onChangeText={otherComments => this.setState({ otherComments })}
            value={this.state.otherComments.toString()}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Pawn Offered Value</FormLabel>
          <FormInput
            name='pawnOfferedValue'
            onChangeText={pawnOfferedValue => this.setState({ pawnOfferedValue })}
            value={this.state.pawnOfferedValue.toString()}
          />
        </View>

        <View style={{height:70,borderBottomColor:"black", backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Sell Offered Value</FormLabel>
          <FormInput
            name='sellOfferedValue'
            onChangeText={sellOfferedValue => this.setState({ sellOfferedValue })}
            value={this.state.sellOfferedValue.toString()}
          />
        </View>
        {/* //Buttons container */}

        <Button
          style={{padding:5}}
          title='Save Changes'
          color='#ffffff'
          backgroundColor='#bf1e2d'
          onPress={() => this.props.navigation.navigate('EditPawnTicket', {itemState: this.state})}
        />
      </KeyboardAwareScrollView>
    );
  }
}
// _id: this.state._id,
// __v: this.state.__v,
// userID: this.state.userID,
// type: this.state.type,
// brand: this.state.brand,
// condition: this.state.condition,
// dateOfPurchase: this.state.dateOfPurchase,
// material: this.state.material,
// name: this.state.name,
// otherComments: this.state.otherComments,
// purity: this.state.purity,
// weight: this.state.weight,
// meltingPercentage: this.state.meltingPercentage,
// pawnOfferedValue: this.state.pawnOfferedValue,
// sellOfferedValue: this.state.sellOfferedValue,
// sellPercentage: this.state.sellPercentage
