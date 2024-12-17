import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Inputname from '../Components/Inputname';
import Inputbox from '../Components/Inputbox';
import {useState} from 'react';
import Button from '../Components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Navigation from '../navigation/Navigation';
import {useNavigation} from '@react-navigation/native';
import { loginUser } from '../apiClient/api';
const HomeScreen = ({navigation}) => {
  const navigate = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phone_email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleicon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = async () => {
    console.warn("hii");
  
    // Check if username or password is empty
    if (!phone_email || !password) {
      console.warn("inner");
      Alert.alert('Error', 'Please enter both username and password');
      return; 
    }
  
    console.warn("outer");
  
    try {
      // Call the login function from api.js
      const response = await loginUser(phone_email, password);
  
      console.warn("homescreen", response);
  
      if (response.status.code === 400) {
        // Handle validation errors from the server response
        const errors = response.error; // This will contain errors like 'password' and 'phone_email'
        
        if (errors.password) {
          Alert.alert('Error', errors.password.join('\n'));
        } else if (errors.phone_email) {
          Alert.alert('Error', errors.phone_email.join('\n'));
        } else {
          // If no specific error returned, show a generic error message
          Alert.alert('Error', 'Please check your credentials');
        }
      } else if (response.status.code === 200) {
        // If the response is successful, navigate to the next screen
        console.warn("Login successful!");
        navigation.navigate('Tabs'); // Navigate to the Tabs screen after successful login
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred while logging in. Please try again.');
    }
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
        style={{fontSize: 18, paddingTop: 20, marginLeft: -75}}
        name={'Email Address / Mobile Number'}
      />
      <Inputbox
        style={{
          width: 290,
          height: 50,
          borderColor: '#ccc',
          borderWidth: 1,
          paddingLeft: 5,
          borderRadius: 5,
        }}
        value={phone_email}
        onChangeText={setUsername}
        placeholder="Enter email/Mobile Number"
      />

      <Inputname
        style={{fontSize: 18, paddingTop: 20, marginLeft: -160}}
        name={'Password'}
      />

      <Inputbox
        style={{
          width: 290,
          height: 50,
          borderColor: '#ccc',
          borderWidth: 1,
          paddingLeft: 5,
          borderRadius: 5,
        }}
        iconn={
          <Icon
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={25}
            color="#0cbcb9"
            onPress={handleicon}
          />
        }
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter your password"
        isPasswordVisible={isPasswordVisible}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
        <Text
          style={{color: '#0cbcb9', paddingTop: 20, left: 50, fontSize: 17}}>
          Forget Password?
        </Text>
      </TouchableOpacity>

      <Button
        name={'Sign In'}
        onPress={handleSignIn}
      />

      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 20}}>OR</Text>
      </View>

      <View>
        <Text
          style={{
            color: '#0cbcb9',
            fontSize: 18,
            paddingTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('OTP')}>
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
    marginLeft: -165,
    paddingTop: 20,
  },
  logoimage: {
    marginLeft: -20,
  },
});
