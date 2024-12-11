import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({name}) => {

  
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
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
    fontSize: 18,
    // fontWeight: 'bold',
  },
});

export default Button;
