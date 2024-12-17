import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { listing } from '../apiClient/api';
import { useEffect } from 'react';
const Usermanagement = () => {

  return (
    <SafeAreaView style={styles.containermain}>
      <View style={styles.main}>
        <View style={styles.main2}>
          <Image
            source={require('../assets/images/Picon.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Dashboard</Text>
          <Profile
            onPress="Details"
            // navigation={navigation}
            style={{marginTop: 10}}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* Search Icon */}
          <Icon name="search" size={27} color="gray" style={styles.iconS} />

          {/* Text Input */}
          <TextInput
            style={styles.inputBox}
            placeholder="Search For Something"
          />
        </View>

        <View style={{marginHorizontal:20,marginTop:50,flexDirection:'row',justifyContent:'space-between'}}>
          <View><Text style={{fontSize:18,fontWeight:400}}>Sachin Sharama</Text></View> 
          <View><Text style={{color:'#0CBCB9',fontSize:16}}>View Details</Text></View>
        </View>
        <View style={{marginHorizontal:20,marginTop:50,flexDirection:'row',justifyContent:'space-between'}}>
          <View><Text style={{fontSize:18,fontWeight:400}}>Sachin Sharama</Text></View> 
          <View><Text style={{color:'#0CBCB9',fontSize:16}}>View Details</Text></View>
        </View>
        <View style={{marginHorizontal:20,marginTop:50,flexDirection:'row',justifyContent:'space-between'}}>
          <View><Text style={{fontSize:18,fontWeight:400}}>Sachin Sharama</Text></View> 
          <View><Text style={{color:'#0CBCB9',fontSize:16}}>View Details</Text></View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default Usermanagement;

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20, // Adds space from the top (adjust as needed)
  },
  main: {
    flex: 1,
    paddingHorizontal: 1,
    // marginTop:20
  },
  main2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    width: '100%',
    backgroundColor: 'white',
    // borderWidth: 2,
    backgroundColor: 'white',
  },
  icon: {
    height: 35,
    width: 30,
    marginTop: 10,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row', // Align Icon and TextInput horizontally
    alignItems: 'center', // Center vertically within the container
    height: 45,
    width: '80%',
    marginHorizontal: 25,
    borderRadius: 50,
    backgroundColor: '#FBF4F4',
    position: 'relative', // This ensures the icon can be positioned absolutely inside the container
  },
  inputBox: {
    flex: 1, // Take up remaining space
    height: '100%',
    paddingLeft: 35, // Make space for the icon inside the input field
    borderRadius: 50,
    backgroundColor: '#FBF4F4',
    fontSize: 16,
    color: '#333',
  },
  icons: {
    position: 'absolute', // Position the icon inside the container
    left: 10, // Distance from the left side of the container
  },
});
