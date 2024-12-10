import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoimage}>
        <Image source={require('../assets/images/logo-black.png')} />
      </View>
      <View>
        <Text style={styles.signin}>Sign In</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the container takes up the full screen
    justifyContent: 'center', // Vertically centers the content
    alignItems: 'center',
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 70,
    fontWeight: 700,
    fontSize: 25,
    fontFamily: 'bold',
    top: 10,
  },
});
