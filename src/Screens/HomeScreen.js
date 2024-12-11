import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Inputname from '../Components/Inputname';
import Inputbox from '../Components/Inputbox';
import {useState} from 'react';
import Button from '../Components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const HomeScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleicon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
      <Inputbox
        style={{
          width: 250,
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          paddingLeft: 5,
          borderRadius: 5,
        }}
        placeholder="Enter email/Mobile Number"
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
        iconn={
          <Icon
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={25}
            color="gray"
            onPress={handleicon}
          />
        }
        placeholder="Enter your password"
        isPasswordVisible={isPasswordVisible}
      />

      <View>
        <Text style={{color: '#0cbcb9', paddingTop: 10, left: 50}}>
          Forget Password?
        </Text>
      </View>

      <Button />

      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 20}}>OR</Text>
      </View>

      <View>
        <Text style={{color: '#0cbcb9',fontSize:18, paddingTop: 10,justifyContent:'center',alignItems:'center'}}>
          Login With OTP
        </Text>
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
    fontWeight: 700,
    fontSize: 30,
    fontFamily: 'bold',
    marginLeft: -150,
    paddingTop: 10,
    // top: 10,
  },
});
