import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
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
const HomeScreen = ({navigation}) => {
  const navigate = useNavigation();
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
        placeholder="Enter your password"
        isPasswordVisible={isPasswordVisible}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
        <Text
          style={{color: '#0cbcb9', paddingTop: 20, left: 50, fontSize: 17}}>
          Forget Password?
        </Text>
      </TouchableOpacity>

      <Button name={'Sign In'} />

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
          onPress={()=>navigation.navigate('OTP')}
          >
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
