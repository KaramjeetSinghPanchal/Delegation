import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import * as Animatable from 'react-native-animatable';
import {updateUser} from '../apiClient/api';
import Lanscape from './Lanscape';
import Profile from '../Components/Profile';
import React from 'react';
import {listing} from '../apiClient/api';
import {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {setuserData} from '../Components/redux/dataSlice';
import AddButton from './AddButton';
import {useDispatch, useSelector} from 'react-redux';
import {userdetails} from '../apiClient/api';

let userId = 0;
const Usermanagement = ({navigation}) => {
  const [screenwidth, setscreenwidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenheight, setscreenheight] = useState(
    Dimensions.get('window').height,
  );
  const [Searchvalue,setSearchvalue] = useState('')
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setscreenheight(window.height);
      setscreenwidth(window.width);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  const dispatch = useDispatch();

  const isLandscape = Lanscape();
  const [isModalVisible, setModalVisible] = useState(false);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [mobileNo, setmobile] = useState('');
  const [emailId, setemailId] = useState('');
  const [selected, setSelected] = useState('');

  const userData = useSelector(state => state.data.userData);
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers(Searchvalue)
  }, [Searchvalue])

  const fetchUsers = async (selectedValue) => {
    let currentPage = 1;
    let allData = []; // To hold all task data
    let hasMoreData = true;
    const pageSize = 10; // Adjust based on your API's default page size
  
    try {
      while (hasMoreData) {
        const response = await listing({
          page: currentPage,
          searchQuery: selectedValue,
        });

  
        if (!response || !response.data || !response.data.data) {
          console.warn("No data received, stopping fetch");
          hasMoreData = false;
          break;
        }
        const newData = response?.data?.data;
        
        // Append new data to allData
        allData = [...allData, ...newData];
  
        // Dispatch the data to update the UI
        dispatch(setuserData([...allData]));
  
        if (newData.length < pageSize) {
          hasMoreData = false;
        } else {
          currentPage++;
        }
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, [!isModalVisible]);


  const toggleModal = async id => {
    userId = id;
    setModalVisible(!isModalVisible);
    const result = await userdetails(id);

    if (result) {
      setfirstName(result?.first_name);
      setlastName(result?.last_name);
      setmobile(result.phone);
      setemailId(result?.email);
      setSelected(result?.type);
    }
  };

  const handleUpdate = async () => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: emailId,
      phone: mobileNo,
      userId: userId,
      type: selected,
    };

    const result = await updateUser({payload});
    if (result) {
      dispatch(setuserData(result));
      setModalVisible(!isModalVisible);
    } else {
      console.error('Error updating user:', result?.message);
    }
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
          <Icon name="search" size={27} color="gray" />

          {/* Text Input */}
          <TextInput
            style={styles.inputBox}
            placeholder="Search For Something"
            onChangeText={(val)=>setSearchvalue(val)}
            onSubmitEditing={()=>fetchUsers(Searchvalue)} 
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
                <TouchableOpacity onPress={() => toggleModal(item.id)}>
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

      <View>
        <Modal isVisible={isModalVisible}>
          <Animatable.View
            animation="pulse" // Specify the animation type
            easing='ease'
            duration={5000} // Animation duration in milliseconds
            style={{
              backgroundColor: 'white',
              height: 550,
              padding: 20,
              borderRadius: 10,
            }}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{fontSize: 20, fontWeight: 600, paddingLeft: 5}}>
                Update User
              </Text>

              <TouchableOpacity
                style={{height: 20, width: 20, borderWidth: 0.5}}>
                <Icon
                  name="close"
                  size={18}
                  style={{color: 'gray', marginTop: 2, left: 1}}
                  onPress={toggleModal}
                />
              </TouchableOpacity>
            </View>

            <View>
              <View style={{marginTop: 20}}>
                <SelectList
                  setSelected={val => setSelected(val)}
                  data={['PC', 'Delegatee', 'Completed']}
                  value={selected}
                  dropdownStyles={{
                    backgroundColor: '#f0f0f0',
                    borderColor: '#ccc',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    position: 'absolute',
                    zIndex: 500,
                    width: 310,
                    marginLeft: 5,
                    marginTop: 50,
                  }}
                  defaultOption={
                    selected ? {key: selected, value: selected} : null
                  }
                  boxStyles={{
                    borderWidth: 0.3,
                  }}
                  placeholder="Select type"
                />
              </View>

              <View style={{marginVertical: 10}}>
                <Text style={{paddingLeft: 10, paddingTop: 20}}>
                  First Name<Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  placeholder="Enter name"
                  style={{
                    marginHorizontal: 10,
                    borderWidth: 0.1,
                    borderColor: 'black',
                    height: 30,
                    marginTop: 10,
                  }}
                  value={firstName}
                  onChangeText={setfirstName}
                />
              </View>

              <View style={{marginVertical: 10}}>
                <Text style={{paddingLeft: 10}}>Last Name</Text>
                <TextInput
                  placeholder="Enter name"
                  style={{
                    marginHorizontal: 10,
                    borderWidth: 0.1,
                    borderColor: 'black',
                    height: 30,
                    marginTop: 10,
                  }}
                  value={lastName}
                  onChangeText={setlastName}
                />
              </View>

              <View style={{marginVertical: 10}}>
                <Text style={{paddingLeft: 10}}>
                  Email ID <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  placeholder="Enter name"
                  style={{
                    marginHorizontal: 10,
                    borderWidth: 0.1,
                    borderColor: 'black',
                    height: 30,
                    marginTop: 10,
                  }}
                  value={emailId}
                  onChangeText={setemailId}
                />
              </View>

              <View style={{marginVertical: 10}}>
                <Text style={{paddingLeft: 10}}>
                  Mobile Number <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  placeholder="Enter name"
                  style={{
                    marginHorizontal: 10,
                    borderWidth: 0.1,
                    borderColor: 'black',
                    height: 30,
                    marginTop: 10,
                  }}
                  value={mobileNo}
                  onChangeText={setmobile}
                />
              </View>
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 50,
              }}>
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 100,
                  borderWidth: 1,
                  borderColor: '#0cbcb9',
                }}>
                <Text
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#0cbcb9',
                    paddingTop: 7,
                  }}
                  onPress={() => setModalVisible(!isModalVisible)}>
                  Clear{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 35,
                  width: 100,
                  borderWidth: 1,
                  borderColor: '#0cbcb9',
                }}>
                <Text
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#0cbcb9',
                    paddingTop: 7,
                    color: 'white',
                  }}
                  onPress={handleUpdate}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </Modal>
      </View>
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
    borderWidth: 1.5,
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
