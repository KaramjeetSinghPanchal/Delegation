import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Profile from '../Components/Profile';
import DropDownPicker from 'react-native-dropdown-picker';
const Dashboard = ({navigation}) => {
  return (
    <SafeAreaView style={styles.containermain}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.main}>
          <View style={styles.main2}>
            <Image
              source={require('../assets/images/Picon.png')}
              style={styles.icon}
            />
            <Text style={styles.text}>Dashboard</Text>
            <Profile
              onPress="Details"
              navigation={navigation}
              style={{marginTop: 10}}
            />
          </View>
        </View>

        <View style={styles.center}>
          <Image
            source={require('../assets/images/Bot.png')}
            style={{width: 150, height: 209}}
          />
        </View>

     

        <View style={styles.admin}>
          <Text style={{fontSize: 32, fontWeight: 600, color: '#0CBCB9'}}>
            Hello Admin
          </Text>
          <View>
            <Text style={{fontSize: 26, fontWeight: 600}}>
              How Can I Help You Today?
            </Text>
          </View>
        </View>

        <View style={styles.setthree}>
          <View style={{marginLeft: 20}}>
            {' '}
            <Image source={require('../assets/images/Group1.png')} style={{height:40, width:40}}  />
          </View>
          <View style={{marginRight: 60}}>
            {' '}
            <Text style={{fontSize: 16, marginLeft: 50, color: 'black'}}>
              Provide an update on the status of every task that was created
              this week
            </Text>
          </View>
        </View>

        <View style={styles.setthree}>
          <View style={{marginLeft: 20}}>
            {' '}
            <Image source={require('../assets/images/Group2.png')} style={{height:40, width:40}} />
          </View>
          <View style={{marginRight: 60}}>
            {' '}
            <Text style={{fontSize: 16, marginLeft: 50}}>
              Provide an update on the status of every task that was created
              this week
            </Text>
          </View>
        </View>

        <View style={styles.setthree}>
          <View style={{marginLeft: 20}}>
            {' '}
            <Image source={require('../assets/images/Group3.png')} style={{height:40, width:40}}/>
          </View>
          <View style={{marginRight: 60}}>
            {' '}
            <Text style={{fontSize: 16, marginLeft: 50}}>
              Provide an update on the status of every task that was created
              this week
            </Text>
          </View>
        </View>

        <View style={styles.setthree}>
          <View style={{marginLeft: 20}}>
            {' '}
            <Image source={require('../assets/images/Group1.png')} style={{height:40, width:40}}/>
          </View>
          <View style={{marginRight: 60}}>
            {' '}
            <Text style={{fontSize: 16, marginLeft: 50}}>
              Provide an update on the status of every task that was created
              this week
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 70,
            borderWidth: '1',
            width: '90%',
            backgroundColor: 'white',
            marginHorizontal: 20,
            marginRight: 20,
            marginTop: 20,
            borderRadius: 15,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/images/gymone.jpeg')}
            style={{
              borderRadius: 100,
              height: 45,
              width: 45,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          />
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 12}}>You</Text>
            {'\n'}
            <Text style={{marginTop: 5, fontSize: 18}}>hello</Text>
          </View>
        </View>

        <View
          style={{
            height: 70,
            borderWidth: '1',
            width: '90%',
            backgroundColor: 'white',
            marginHorizontal: 20,
            marginRight: 20,
            marginTop: 20,
            borderRadius: 15,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: '#0CBCB9',
              borderRadius: 100,
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <Image
              source={require('../assets/images/Rbot.png')}
              style={{
                height: 20,
                width: 20,
                marginVertical: 10,
                marginHorizontal: 10,
              }}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 12}}>You</Text>
            {'\n'}
            <Text style={{marginTop: 5, fontSize: 17}}>
              Hello! How can i assist you today?
            </Text>
          </View>
        </View>
        </ScrollView>

        {/* <DropDownPicker
          items={items}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={currentValue}
          setValue={val => setCurrentValue(val)}
          maxHeight={200}
          autoScroll
        /> */}
     
    
    </SafeAreaView>
  );
};

export default Dashboard;

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

  listContainer: {
    width: '45%', // Adjust width for the list container
    marginTop: 10,
    height: 300, // Fixed height for the list container, adjust as needed
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    overflow: 'hidden', // Ensure content doesn't overflow
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },

  icon: {
    height: 35,
    width: 30,
    marginTop: 10,
    marginHorizontal: 10,
  },
  roundedIcon: {
    borderRadius: 100,
  },
  center: {
    flex: 1, // This ensures the container takes up the full screen
    justifyContent: 'center', // Vertically centers the content
    alignItems: 'center',
    marginTop: -35,
  },
  admin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  setthree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // justifyContent:'center'
  },
});
