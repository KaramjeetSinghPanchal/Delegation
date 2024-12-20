import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {taskmangementlisting} from '../apiClient/api';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {SelectList} from 'react-native-dropdown-select-list';

const TaskManagement = ({navigation}) => {
  const [selected, setSelected] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [datastate, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const dataselect = [
    {key: '1', value: 'Mobiles', disabled: true},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers', disabled: true},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
  ];
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if(selected)
    {
      handlesearch(selected)
    }
  }, [selected])


  const data = [
    'All',
    'In-progress',
    'Completed',
    'In-Draft',
    'Pending',
    'Rejected',
    'Revised date',
  ]; // Example data

  const formatDate = dateString => {
    const date = new Date(dateString); // Convert the string to a Date object
    const options = {day: 'numeric'}; // Format options: day and short month name (e.g., Dec)
    return new Intl.DateTimeFormat('en-GB', options).format(date); // 'en-GB' ensures the month is in English
  };

  const formatmonth = dateString => {
    const date = new Date(dateString); // Convert the string to a Date object
    const options = {month: 'short'}; // Format options: day and short month name (e.g., Dec)
    return new Intl.DateTimeFormat('en-GB', options).format(date); // 'en-GB' ensures the month is in English
  };

  const [checkedStates, setCheckedStates] = useState(
    new Array(data.length).fill(false),
  );


  console.warn("datastatedatastatedatastate",datastate);
  
  // Handle checkbox state toggle
  const handleCheckboxChange = index => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await taskmangementlisting();
        console.warn('Fetched Data:', data.data[0].assigned_by_id);
        setData(data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.warn('datastate', datastate);

  // console.log(datastate[0].assigned_to.name, 'datastate');

  const handlesearch = async(selectedValue) => {
    const filtereddata =await taskmangementlisting(selectedValue)
    setData(filtereddata)

  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.main2}>
          <Image
            source={require('../assets/images/Picon.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Task Management</Text>
          <Profile
            onPress="Details"
            navigation={navigation}
            style={{marginTop: 10}}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.checkboxContainer}>
            {data.map((label, index) => (
              <View style={styles.checkboxItem} key={index}>
                {/* TouchableOpacity for custom checkbox */}
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    checkedStates[index] && styles.checkedCheckbox,
                  ]}
                  onPress={() => handleCheckboxChange(index)}>
                  {/* Checkmark (only shows when checked) */}
                  {checkedStates[index] && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View>
          <SelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
            dropdownTextStyles={{color: 'gray'}}
            boxStyles={{marginHorizontal: 16, borderBlockColor: 'gray'}}            
          />
        </View>

        <View style={styles.containerr}>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setOpen(true)}>
            <Text style={styles.buttonText}>
              {selectedDate ? `${selectedDate}` : 'Due Date'}
            </Text>
            <View style={{marginHorizontal: 10, marginTop: 8}}>
              <Icon name="calendar-month" size={25} color="gray" />
            </View>
          </TouchableOpacity>

          {/* DatePicker Modal */}
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setSelectedDate(date.toDateString());
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <View
            style={{
              height: 40,
              width: '85%',
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              alignContent: 'center',
              alignContent: 'center',
              textAlign: 'center',
              // borderWidth: 0.2,
              // marginRight: 15,
              borderBlockColor: 'gray',
              marginTop: 20,
              backgroundColor: '#E2E8F0',
              borderBlockColor: '#A0AEC0',
              // marginRight:20
            }}>
            <TouchableOpacity>
              <Text style={{fontSize: 18}}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerrr}>
          <View style={styles.inputContainer}>
            {/* Search Icon */}
            <Icon
              name="search"
              size={27}
              color="black"
              style={{marginLeft: 10}}
            />

            {/* Text Input */}
            <TextInput
              style={styles.inputBox}
              placeholder="Search"
              onPress={handlesearch}
              
            />
          </View>
          <TouchableOpacity
            style={{
              height: 42,
              width: '85%',
              backgroundColor: '#0cbcb9',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              alignContent: 'center',
              alignContent: 'center',
              textAlign: 'center',
              marginLeft: 1,
            }}>
            <Text style={{color: 'white'}}>Generate Report</Text>
          </TouchableOpacity>
        </View>
{console.warn(datastate,"datastatedatastate")}

        <FlatList
          data={datastate} // Pass users array as data
          
          keyExtractor={item => item.id.toString()} // Ensure each item has a unique key (assuming 'id' is present)
          renderItem={({item}) => (
            <View>
              <View style={{marginTop: 45, marginHorizontal: 20}}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                  Task titile will be here...
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 30,
                  marginHorizontal: 20,
                }}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    {formatDate(item.assignment_date)}
                  </Text>
                  <Text style={{fontSize: 16}}>
                    {formatmonth(item.assignment_date)}
                  </Text>
                </View>

                <View>
                  <Text>{item.assigned_to.name}</Text>
                  {'\n'}
                  <Text>
                    Priority |{' '}
                    <Text style={{fontWeight: 'bold', color: 'green'}}>
                      {item.priority}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#E2E8F0',
                    padding: 2,
                    marginTop: 3,
                    width: 120,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'orange',
                      fontWeight: 500,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    {item.status.title}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text>No users available</Text>} // Optional: Display this if the list is empty
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  content: {
    marginTop: 12,
    marginHorizontal: 15,
  },
  checkboxContainer: {
    flexDirection: 'row', // This ensures the checkboxes are aligned horizontally
    flexWrap: 'wrap', // Allows the checkboxes to wrap onto the next line if they overflow
    justifyContent: 'flex-start', // Align checkboxes to the left (optional)
    paddingBottom: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // Space between checkboxes
    marginBottom: 10, // Space below each checkbox (for wrapping)
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  checkedCheckbox: {
    backgroundColor: '#0CBCB9', // Change background color when checked
    borderColor: '#0CBCB9', // Border color when checked
  },
  checkmark: {
    color: 'white', // Checkmark color when checked
    fontSize: 12, // Ensure the checkmark is large enough
    fontWeight: 'bold', // Make checkmark bold for better visibility
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#A0AEC0',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    borderBlockColor: '#A0AEC0',
  },
  main: {
    flex: 1,
    paddingHorizontal: 1,
  },
  main2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    width: '100%',
    backgroundColor: 'white',
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
  containerr: {
    width: 180,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    // marginTop:50
  },
  containerrr: {
    width: 180,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginTop: 50,
  },
  datePickerButton: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowRadius: 5,
    elevation: 2,
    // borderWidth: 0.3,
    // width: 200,
    width: '105%',
    height: 40,
    marginHorizontal: 20,
    backgroundColor: '#E2E8F0',
    marginTop: 20,
    borderBlockColor: '#A0AEC0',
  },
  inputContainer: {
    flexDirection: 'row', // Align Icon and TextInput horizontally
    alignItems: 'center', // Center vertically within the container
    height: 45,
    width: '100%',
    marginHorizontal: 25,
    borderRadius: 5,
    // borderWidth:1,
    backgroundColor: '#E2E8F0',
    position: 'relative', // This ensures the icon can be positioned absolutely inside the container
    borderBlockColor: '#E2E8F0',
  },
});

export default TaskManagement;
