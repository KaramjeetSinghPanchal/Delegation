import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {listing} from '../apiClient/api';
import {useEffect, useState} from 'react';
const Usermanagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.warn('usermanagement');

    const fetchUsers = async () => {
      try {
        console.warn('Fetching users...');
        const data = await listing(); // Call the listing function from API
        console.warn(data, 'datadata');

        if (data && data.data) {
          // Assuming data.data contains the array of users
         
          setUsers(data.data.data); // Set the users array to state
        } else {
          console.warn('No users data found.');
        }
      } catch (err) {
        console.error('Error fetching users:', err.message);
        setError(err.message || 'Failed to load users');
      }
    };

    fetchUsers();
  }, []); // Empt

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

        <View style={{marginHorizontal: 20, marginTop: 50}}>
          {/* FlatList to render each user */}
          <FlatList
            data={users} // Pass users array as data
            keyExtractor={item => item.id.toString()} // Ensure each item has a unique key (assuming 'id' is present)
            renderItem={({item}) => (
              <View style={styles.userContainer}>
                <View>
                  <Text style={styles.userName}>{item?.name}</Text>
                  <Text style={styles.email}>{item?.email}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => console.log(`View details of ${item.name}`)}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                  
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text>No users available</Text>} // Optional: Display this if the list is empty
          />
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
    height:90,
    width:'100%'
  },
  userName: {
    fontSize: 18,
    fontWeight: '400',
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
    color:'gray'
  },
  viewDetailsText: {
    color: '#0CBCB9',
    fontSize: 16,
    fontWeight:400
    // fontSize:400
  },
});
