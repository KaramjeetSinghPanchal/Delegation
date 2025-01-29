import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Dimensions,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Lanscape from './Lanscape';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {listing} from '../apiClient/api';
import {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';

import {setuserData} from '../Components/redux/dataSlice';
import AddButton from './AddButton';
import {useDispatch, useSelector} from 'react-redux';
const Usermanagement = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const [screenwidth, setscreenwidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenheight, setscreenheight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setscreenheight(window.height);
      setscreenwidth(window.width);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  // const [users, setUsers] = useState([]);
  const calculatedWidth = screenwidth * 0.4 + 9;
  const maxWidth = screenwidth * 0.3 + 80;
  const minWidth = screenwidth * 0.3;
  // const finalWidth = Math.min(Math.max(calculatedWidth, minWidth), maxWidth);
  const dispatch = useDispatch();
  const isLandscape = Lanscape();
  const [isModalVisible, setModalVisible] = useState(false);

  const userData = useSelector(state => state.data.userData);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // console.warn('Fetching users...');
        const data = await listing(); // Call the listing function from API

        if (data && data.data) {
          // Assuming data.data contains the array of users
          dispatch(setuserData(data?.data?.data));
          // setUsers(data.data.data); // Set the users array to state
        } else {
          console.warn('No users data found.');
        }
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };

    fetchUsers();
  }, []); // Empt

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlesearch = () => {
    Alert.alert('hii');
  };

  const viewdetailsmodal = val => {
    return (
      <View>
        <Modal>
          <View style={{flex: 1}}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containermain}>
      <View style={styles.main}>
        <View style={styles.main2}>
          <Image
            source={require('../assets/images/Picon.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>User Management</Text>
          <Profile
            onPress="Details"
            navigation={navigation}
            style={{marginTop: 10}}
          />
        </View>

        <Animatable.View
          style={styles.inputContainer}
          duration={2000}
          animation={'zoomIn'}>
          {/* Search Icon */}
          <Icon name="search" size={27} color="gray" style={styles.iconS} />

          {/* Text Input */}
          <TextInput
            style={styles.inputBox}
            placeholder="Search For Something"
          />
        </Animatable.View>

        <View style={{marginHorizontal: 20, marginTop: 50}}>
          {/* FlatList to render each user */}
          <FlatList
            data={userData} // Pass users array as data
            keyExtractor={item => item.id.toString()} // Ensure each item has a unique key (assuming 'id' is present)
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.userContainer}>
                <View>
                  <Text
                    style={[
                      styles.userName,
                      {
                        fontFamily: 'Inter_28pt-Medium',
                        fontSize: isLandscape ? 20 : 14,
                      },
                    ]}>
                    {item?.name}
                  </Text>
                  <Text
                    style={[
                      styles.email,
                      {
                        fontFamily: 'Inter_28pt-Regular',
                        fontSize: isLandscape ? 18 : 12,
                      },
                    ]}>
                    {item?.email}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => toggleModal(1)}>
                  <Text
                    style={[
                      styles.viewDetailsText,
                      {
                        fontFamily: 'Inter_28pt-Medium',
                        fontSize: isLandscape ? 16 : 12,
                      },
                    ]}>
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text>No users available</Text>} // Optional: Display this if the list is empty
          />
        </View>
      </View>

      <Modal isVisible={isModalVisible}>                    
        <View style={{backgroundColor: 'white', height: 'auto', padding: 20}}>
          <Text style={{fontSize: 20,fontWeight:600, paddingLeft: 10}}>Update User</Text>

          <View style={{marginVertical: 10}}>
            <Text style={{paddingLeft: 10,paddingTop:20}}>First Name</Text>
            <TextInput
              placeholder="Enter name"
              style={{marginHorizontal: 10}}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{paddingLeft: 10}}>Last Name</Text>
            <TextInput
              placeholder="Enter name"
              style={{marginHorizontal: 10}}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{paddingLeft: 10}}>Email ID</Text>
            <TextInput
              placeholder="Enter name"
              style={{marginHorizontal: 10}}
            />
          </View>

        
          <View style={{marginVertical: 10}}>
            <Text style={{paddingLeft: 10}}>Mobile No.</Text>
            <TextInput
              placeholder="Enter name"
              style={{marginHorizontal: 10}}
            />
          </View>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>

      <AddButton isLandscape={isLandscape} />
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
  datePickerButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    shadowColor: '#000',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // shadowRadius: 5,
    // elevation: 2,
    borderWidth: 1.5,
    // width: 200,
    width: 300,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: '#F8F9FA',
    marginTop: 10,
    borderColor: '#E2E8F0',
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
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 90,
    width: '100%',
  },
  userName: {
    fontWeight: '400',
  },
  email: {
    fontWeight: '400',
    color: 'gray',
  },
  viewDetailsText: {
    color: '#0CBCB9',

    fontWeight: 400,
    // fontSize:400
  },
  containerree: {
    width: '100%',
    height: 90,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    // borderWidth:2
  },
  containerr: {
    width: 180,
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',

    // marginTop:50
  },
});
