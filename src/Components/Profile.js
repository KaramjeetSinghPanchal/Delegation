import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Profile = ({ onPress, navigation ,style}) => {
  const handlePress = () => {
    // Correctly navigate when the button is pressed
    navigation.navigate(onPress);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
    <Image
      source={require('../assets/images/gymone.jpeg')}
      style={[styles.icon, styles.roundedIcon, style]}  // Combine the styles properly
    />
  </TouchableOpacity>
  );
};

export default Profile;

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
    // marginTop: 10,
    marginHorizontal: 10,
  },
  roundedIcon: {
    borderRadius: 100,
  },
});
