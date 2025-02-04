import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import Inputname from '../Components/Inputname';
import Inputbox from '../Components/Inputbox';
import {useState} from 'react';
import Button from '../Components/Button';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../apiClient/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import Lanscape from './Lanscape';
import Pushnotification from '../Components/Pushnotification';
const HomeScreen = ({navigation}) => {
  const navigate = useNavigation();
  const isLandscape = Lanscape();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phone_email, setUsername] = useState('admin@zapbuild.com');
  const [password, setPassword] = useState('Ztech@44');
  const handleicon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = async () => {
    // console.warn('hii');

    // Check if username or password is empty
    if (!phone_email || !password) {
      console.warn('inner');
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    // console.warn('outer');

    try {
      // Call the login function from api.js
      const response = await loginUser(phone_email, password);

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
        console.warn('Login successful!');
        navigation.navigate('Tabs'); // Navigate to the Tabs screen after successful login
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Error',
        'An error occurred while logging in. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Pushnotification />
        <Animatable.View
          style={styles.logoimage}
          animation={'zoomIn'}
          duration={3000}>
          <Image source={require('../assets/images/logo-black.png')} />
        </Animatable.View>
        <View>
          <Animatable.Text
            style={[styles.signin, {marginRight: isLandscape ? 320 : 230}]}
            animation="zoomIn"
            duration={3000}>
            Sign In
          </Animatable.Text>
        </View>

        <Inputname
          style={{
            fontSize: 18,
            paddingTop: 20,
            marginLeft: isLandscape ? 0 : 0,
          }}
          name={'Email Address / Mobile Number'}
        />
        <Inputbox
          style={{
            width: isLandscape ? '90%' : 290,
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            paddingLeft: 5,
            borderRadius: 5,
            marginLeft: 35,
          }}
          value={phone_email}
          onChangeText={setUsername}
          placeholder="Enter email/Mobile Number"
        />

        <Inputname
          style={{
            fontSize: 18,
            paddingTop: 20,
            marginLeft: isLandscape ? 0 : 0,
          }}
          name={'Password'}
        />

        <Inputbox
          style={{
            width: isLandscape ? '90%' : 290,
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            paddingLeft: 5,
            borderRadius: 5,
            marginLeft: 35,
          }}
          // iconn={
          //   <Icon
          //     name={isPasswordVisible ? 'visibility-off' : 'visibility'}
          //     size={25}
          //     color="#0cbcb9"
          //     onPress={handleicon}
          //     style={{paddingTop:6,marginRight:40}}
          //   />

          // }

          iconn={
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={25}
              color="#0cbcb9"
              onPress={handleicon}
              style={{paddingTop: 6, marginRight: 40}}
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
            style={{
              color: '#0cbcb9',
              paddingTop: 20,
              left: isLandscape ? 531 : 155,
              fontSize: 17,
            }}>
            Forget Password?
          </Text>
        </TouchableOpacity>

        <Button
          name={'Sign In'}
          onPress={handleSignIn}
          isLandscape={isLandscape}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
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
              // marginLeft:80,
              alignSelf: 'center',
            }}
            onPress={() => navigation.navigate('OTP')}>
            Login With OTP
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the container takes up the full screen
    justifyContent: 'center', // Vertically centers the content
    alignItems: 'center',
  },
  scrollViewContent: {
    flex: 1, // This ensures the container takes up the full screen
    justifyContent: 'center', // Vertically centers the content
    alignItems: 'center',
    // marginLeft:30
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: 30,
    fontFamily: 'bold',
    // marginLeft: -165,
    paddingTop: 20,
  },
  logoimage: {
    marginLeft: 0,
    marginBottom: 10,
    paddingTop: 100,
  },
});
