import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Lanscape from './Lanscape';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {listing} from '../apiClient/api';
import {useEffect, useState} from 'react';
import { setuserData } from '../Components/redux/dataSlice';
import AddButton from './AddButton';
import { useDispatch, useSelector } from 'react-redux';
const Usermanagement = ({navigation}) => {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const isLandscape = Lanscape();
  const userData = useSelector((state) => state.data.userData);
  useEffect(() => { 
    const fetchUsers = async () => { 
      try { 
        // console.warn('Fetching users...');
        const data = await listing(); // Call the listing function from API

        if (data && data.data) {
          // Assuming data.data contains the array of users
            dispatch(setuserData(data?.data?.data))
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

  return (
    <SafeAreaView style={styles.containermain} >
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
  
      <Animatable.View style={styles.inputContainer} duration={2000} animation={'zoomIn'}>
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
              <TouchableOpacity
                onPress={() => console.log(`View details of ${item.name}`)}>
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
});
