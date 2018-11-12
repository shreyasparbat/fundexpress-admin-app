import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator, Platform, Modal } from 'react-native';
import { Avatar , Button, FormLabel, FormInput } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Picker, DatePicker, Form} from "native-base";
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImageView extends React.Component{
  constructor(props){
    super(props)
    this.state={
      frontUri:this.props.navigation.getParam('frontUri'),
      backUri: this.props.navigation.getParam('backUri'),
      modalVisible: true,
      isPawnTicket: this.props.navigation.getParam('isPawnTicket')

    }
  }
  render(){
    return (
      <View
        style={{
          padding: 10
        }}
      >
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageViewer
            imageUrls={[{url:this.state.frontUri},{url:this.state.backUri}]}
            onSwipeDown={() => {
              console.log('onSwipeDown');
              if(this.state.isPawnTicket==true){
                  this.props.navigation.navigate('EditPawnTicket');
              } else {
                  this.props.navigation.navigate('EditSellTicket');
              }

            }}
            enableSwipeDown={true}

          />
        </Modal>
      </View>
    );

  }
}
