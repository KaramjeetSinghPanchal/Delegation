import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Inputname from '../Components/Inputname';
import Inputbox from '../Components/Inputbox';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoimage}>
        <Image source={require('../assets/images/logo-black.png')} />
      </View>
      <View>
        <Text style={styles.signin}>Sign In</Text>
      </View>
      <Inputname
        style={{fontSize: 17, paddingTop: 10, marginLeft: -50}}
        name={'Email Address / Mobile Number'}
      />
      {/* Input box  */}
      <Inputbox
        style={{
          width: 250,
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          paddingLeft: 5,
          borderRadius: 5,
        }}
        placeholder='Enter email/Mobile Number'
      />

      <Inputname
        style={{fontSize: 17, paddingTop: 10, marginLeft: -140}}
        name={'Password'}
      />

      <Inputbox
        style={{
          width: 250,
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          paddingLeft: 5,
          borderRadius: 5,     
        }}
        placeholder='Enter your password'
      />
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
    // position: 'absolute',
    // right: 70,
    fontWeight: 700,
    fontSize: 25,
    fontFamily: 'bold',
    marginLeft: -150,
    paddingTop: 10,
    // top: 10,
  },
});
