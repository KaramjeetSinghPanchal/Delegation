import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Inputname from '../Components/Inputname';
import Inputbox from '../Components/Inputbox';
// import { Button } from '@react-navigation/elements';
import Button from '../Components/Button';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const Details = ({navigation}) => {
  const [isOpen, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
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
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.input}
          placeholder="19-08-2024"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Assigned Date'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="2024-07-05"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Completion Date'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="N/A"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Revised Date'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="N/A"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Status'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox, styles.add]}
          placeholder="In-Progress"
          placeholderTextColor="#FE9816"
        />

        <Inputname
          name={'Title'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox]}
          placeholder="Delegation Module Presentation"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Description'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox, styles.description]}
          placeholder="Delegation Module Presentation jdsfg dsfgh sdfghskd sdfkghskj"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Attachment'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
      </ScrollView>

      <Button
        name={'Update'}
        style={{
          justifyContent: 'center',
          alignItem: 'center',
          marginLeft: 50,
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
    borderColor: '',
  },
  container: {
    flex: 1,
  },
  input: {
    width: '85%',
    height: 40,
    borderColor: '#DFEAF2',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 5,
    marginLeft: 45,
  },
  inputbox: {
    width: '85%',
    height: 40,
    borderColor: '#DFEAF2',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 5,
    marginLeft: 45,
    fontFamily: 'Inter_28pt-Regular',
    fontSize: 12,
  },
  add: {
    // fontWeight: 'bold',
    // fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 12,
    fontWeight: 600,
  },
  description: {
    height: 50,
    width: '85%',
  },
});
