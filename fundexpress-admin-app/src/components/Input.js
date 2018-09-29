import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
      <View style={containerStyle}>
        
        <TextInput 
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={'#c7c7cd'}
          secureTextEntry={secureTextEntry}
          underlineColorAndroid= 'transparent'
        />
      </View>
    );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 16,
    fontSize: 16,
    //lineHeight: 23,
    flex: 2,
    
  },
  labelStyle: {
    fontSize: 18,
    //paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
