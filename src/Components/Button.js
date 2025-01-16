import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

const Button = ({name,onPress,style,isLandscape}) => {

  
  return (
    <Animatable.View
    style={[styles.button, style, { width: isLandscape ? '95%' : 290 }]}
    animation={'zoomIn'}
    duration={2000}
  >
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  </Animatable.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0cbcb9',
    paddingVertical: 12,
    width: 290,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginRight:30
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight:'bold'
  },
});

export default Button;
