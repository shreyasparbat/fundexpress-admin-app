import React, { Component } from 'react';
import { Text, View } from 'react-native';

const EmptyBar = (props) => {
  return(
    <View style={{ height: 20, width: 170, borderWidth: 1}}>
      <Fill percentage={props.percentage} color={props.color}/>
    </View>
  );
}

const Fill = (props) => {
  return (
    <View style={{ height: 18, width: `${props.percentage}%`, borderRightWidth: 1, backgroundColor: `${props.color}`,}}>

    </View>
  );
}

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: props.percentage,
      color: props.color
    }
  }
  render(){
    return(
    <View>
      <EmptyBar percentage={this.state.percentage} color={this.state.color}/>
    </View>
  );
  }
}

export default ProgressBar;
