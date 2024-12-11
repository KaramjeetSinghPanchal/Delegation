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
const Forgetpassword = ({navigation}) => {
  const navigate = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{position:'absolute',bottom:600,left:50,flexDirection:'row'}}>
        <Icon
          name={'arrow-back'}
          size={25}
          color="black"
          onPress={() => navigation.navigate('HomeScreen')}
          
        /><Text style={{paddingLeft:10,fontSize:20}} onPress={() => navigation.navigate('HomeScreen')}>Back</Text>
      </View>

      <View style={styles.logoimage}>
        <Image source={require('../assets/images/logo-black.png')} />
      </View>
      <View>
        <Text style={styles.signin}>Forget Password?</Text>
      </View>

      <Inputname
        style={{fontSize: 18, paddingTop: 30, marginLeft: -158}}
        name={'Email Address'}
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
        placeholder="Enter your email address"
      />

      <Button name={'Reset Password'} />
    </View>
  );
};

export default Forgetpassword;

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
    marginLeft: -60,
    paddingTop: 20,
  },
  logoimage: {
    paddingTop: 50,
  },
});
