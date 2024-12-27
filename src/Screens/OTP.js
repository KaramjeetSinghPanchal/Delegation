import {StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView, ScrollView} from 'react-native';
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
const OTP = ({navigation}) => {
  const navigate = useNavigation();
  const isLandscape =Lanscape()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 600,
          left: 50,
          flexDirection: 'row',
        }}>
        <Icon
          name={'arrow-back'}
          size={25}
          color="black"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <Text
          style={{paddingLeft: 10, fontSize: 20}}
          onPress={() => navigation.navigate('HomeScreen')}>
          Back
        </Text>
      </View>

      <View style={styles.logoimage}>
        <Image source={require('../assets/images/logo-black.png')} />
      </View>
      <View>
        <Text style={styles.signin}>Sign In</Text>
      </View>

      <Inputname
        style={{fontSize: 18, paddingTop: 350}}
        name={'Email Address / Mobile Number'}
        isLandscape={isLandscape}
      />
      <Inputbox
        style={{
          width:isLandscape?'90%':290,
          height: 50,
          borderColor: '#ccc',
          borderWidth: 1,
          paddingLeft: 5,
          borderRadius: 5,
          left: 10,
          marginLeft:25
        }}
        placeholder="Enter your email address"
      />
      <View >
        <Button name={'Send OTP'} isLandscape={isLandscape} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTP;

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
    position:'absolute',
    top:280
  },
  logoimage: {
    paddingTop: 50,
    position:'absolute',
    top:130
  },
});
