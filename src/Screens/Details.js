import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Inputname from '../Components/Inputname';
import Inputbox from '../Components/Inputbox';
// import { Button } from '@react-navigation/elements';
import Button from '../Components/Button';
const Details = ({navigation}) => {
  const [isOpen,setOpen] = useState(false)
  const [currentValue,setCurrentValue] = useState()
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="arrow-back" size={30} />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 24, fontWeight: 600}}>Details</Text>
        </View>
        <View>
          <Profile onPress="Details" navigation={navigation} />
        </View>
      </View>
      <ScrollView>
        <Inputname
          name={'DueDate'}
          style={{fontSize: 18, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.input}
          placeholder="19-08-2024"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Assigned Date'}
          style={{fontSize: 18, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="2024-07-05"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Completion Date'}
          style={{fontSize: 18, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="N/A"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Revised Date'}
          style={{fontSize: 18, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="N/A"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Status'}
          style={{fontSize: 18, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox, styles.add]}
          placeholder="In-Progress"
          placeholderTextColor="orange"
        />

        <Inputname
          name={'Title'}
          style={{fontSize: 18, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox]}
          placeholder="Delegation Module Presentation"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Description'}
          style={{fontSize: 18, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox, styles.description]}
          placeholder="Delegation Module Presentation jdsfg dsfgh sdfghskd sdfkghskj"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Attachment'}
          style={{
            fontSize: 18,
            paddingTop: 20,
            marginLeft: 15,
            fontWeight: 600,
          }}
        />
      </ScrollView>

      <Button
        name={'Update'}
        style={{
          justifyContent: 'center',
          alignItem: 'center',
          marginLeft: 15,
          width: 370,
        }}
      />
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  input: {
    width: 370,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 5,
    marginLeft: 45,
  },
  inputbox: {
    width: 370,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 5,
    marginLeft: 45,
  },
  add: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    height: 50,
    width: '85%',
  },
});
