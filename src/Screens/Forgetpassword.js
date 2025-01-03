import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
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
import Lanscape from './Lanscape';
import { SafeAreaView } from 'react-native-safe-area-context';
const Forgetpassword = ({navigation}) => {
  const isLandscape = Lanscape()
  const navigate = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={{position:'absolute',top:isLandscape?40:10,left:10,flexDirection:'row'}}>
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
        <Text style={[styles.signin]}>Forgot Password?</Text>
      </View>

      <Inputname
        style={{fontSize: 18, paddingTop: 40}}
        name={'Email Address'}
      />
      <Inputbox
        style={{
          width:isLandscape?'90%': 290,
          height: 50,
          borderColor: '#ccc',
          borderWidth: 1,
          paddingLeft: 5,
          borderRadius: 5,
          marginLeft:35
        }}
        placeholder="Enter your email address"
      />

      <Button name={'Reset Password'} isLandscape={isLandscape}/>
      </ScrollView>
    </SafeAreaView>
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
   
    paddingTop: 240,
  },
  logoimage: {
    position:'absolute',
    top:120
  },
});
