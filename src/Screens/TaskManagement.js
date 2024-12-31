import React, {useCallback, useState} from 'react';
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
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AddButton from './AddButton';
import DatePicker from 'react-native-date-picker';
import {taskmangementlisting} from '../apiClient/api';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {SelectList} from 'react-native-dropdown-select-list';

const TaskManagement = ({navigation}) => {
  const [selected, setSelected] = useState('');
  // const [checkdata, setcheckdata] = useState([]);

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [datastate, setData] = useState([]);
  const [error, setError] = useState(null);
  const [current, setcurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true); // Track if more data is available

  const [searchQuery, setSearchQuery] = useState('');
  const [rotation, setRotation] = useState(0);
  const [total, settotal] = useState();
  const [screenwidth, setscreenwidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenheight, setscreenheight] = useState(
    Dimensions.get('window').height,
  );

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selected) {
      handlesearch(selected);
    }
  }, [selected]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setscreenheight(window.height);
      setscreenwidth(window.width);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const newpage = current + 1;

  const calculatedWidth = screenwidth * 0.4 + 9;

  // Optionally cap the width to a maximum value (e.g., max 80% of the screen width)
  const maxWidth = screenwidth * 0.3 + 80;
  const minWidth = screenwidth * 0.3;

  const finalWidth = Math.min(Math.max(calculatedWidth, minWidth), maxWidth);

  const isLandscape = screenwidth > screenheight;

  const data = [
    'All',
    'In-progress',
    'Completed',
    'In-Draft',
    'Pending',
    'Rejected',
    'Revised date',
  ]; 

  // const data = [
  //   { id: 1, label: 'All' },
  //   { id: 2, label: 'In-progress' },
  //   { id: 3, label: 'Completed' },
  //   { id: 4, label: 'In-Draft' },
  //   { id: 5, label: 'Pending' },
  //   { id: 6, label: 'Rejected' },
  //   { id: 7, label: 'Revised date' },
  // ];
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

  // Handle checkbox state toggle
  const handleCheckboxChange = index => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
  };

  // Fetch data function with delay
  const fetchData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 5000)); 

      const fetchedData = await taskmangementlisting(current);

      if (fetchedData && Array.isArray(fetchedData.data)) {
        if (fetchedData.data.length > 0) {
          settotal(fetchedData.data.total);
          setData(prevData => [...prevData, ...fetchedData.data]); 
          if (!fetchedData.next_page_url) {
            setHasMoreData(false); 
          } else {
            setcurrent(prev => prev + 1);
          }
        } else {
          console.log('No more data to load.');
        }
      } else {
        console.error(
          'Fetched data is not in the expected format:',
          fetchedData,
        );
      }

      // **Green Comment: Only increment the current page if more data is available**
    
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false); // Turn off loading spinner when done
    }
  };

  const isfooterComponent = useCallback(() => {
    if (hasMoreData) {
      return <ActivityIndicator size="large" style={{ marginVertical: 36 }} />;
    }
    return null; // No footer if loading is false or no more data
  }, [hasMoreData]);

  useEffect(() => {
    fetchData();
  }, [current]);

  // console.log(datastate[0].assigned_to.name, 'datastate');

  const handlesearch = async selectedValue => {
    const filtereddata = await taskmangementlisting(selectedValue);
    setData(filtereddata);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.main2}>
            <Image
              source={require('../assets/images/Picon.png')}
              style={styles.icon}
            />
            <Text
              style={{
                fontFamily: 'Inter_24pt-SemiBold',
                fontSize: 20,
                marginTop: 12,
                fontWeight: 600,
              }}>
              Task Management
            </Text>
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
                  <Text
                    style={{fontFamily: 'Inter_28pt-Thin', marginRight: 10}}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{backgroundColor: '#FFFFFF', marginTop: 15}}>
            <SelectList
              setSelected={val => setSelected(val)}
              data={data}
              save="value"
              dropdownStyles={{color: '#A0AEC0', marginHorizontal: 15}}
              dropdownTextStyles={{color: '#A0AEC0'}}
              boxStyles={{
                marginHorizontal: 16,
                backgroundColor: '#F8F9FA',
                borderColor: '#E2E8F0',
                borderWidth: 1,
              }}
            />
          </View>

          <View style={styles.containerree}>
            <View style={styles.containerr}>
              <TouchableOpacity
                style={[styles.datePickerButton, {width: finalWidth}]}
                onPress={() => setOpen(true)}>
                <Text style={styles.buttonText}>
                  {selectedDate ? `${selectedDate}` : 'Due Date'}
                </Text>
                <View style={{marginHorizontal: 10, marginTop: 8}}>
                  <Icon name="calendar-month" size={20} color="gray" />
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
              {/* clear button */}
              <View
                style={{
                  height: 40,
                  // width: 155,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  borderWidth: 2,
                  borderColor: '#E2E8F0', // Border color for all sides
                  marginTop: 20,
                  backgroundColor: '#FAF8F9',
                  width: finalWidth,
                  marginLeft: 10,
                }}>
                <TouchableOpacity>
                  <Text style={{fontSize: 13}}>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.containerrr}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 38,
                width: finalWidth,
                marginHorizontal: 25,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#F8F9FA',
                position: 'relative',
                borderColor: '#E2E8F0',
              }}>
              <Image source={require('../assets/images/Vector.png')} />
              {/* Text Input */}
              <TextInput
                style={styles.inputBox}
                placeholder="Search"
                onChangeText={text => setSearchQuery(text)} // Capture the input text
                onSubmitEditing={() => handlesearch(searchQuery)} // Call search when user submits input
              />
            </View>

            <TouchableOpacity
              style={{
                height: 37,
                width: 155,
                backgroundColor: '#0cbcb9',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                alignContent: 'center',
                alignContent: 'center',
                textAlign: 'center',
                marginLeft: isLandscape ? 185 : 14,
              }}>
              <Text
                style={{
                  color: 'white',
                  width: 107,
                  height: 17,
                  fontFamily: 'inter',
                }}>
                Generate Report
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={datastate} // Pass users array as data
            keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key (assuming 'id' is present)
            renderItem={({item, index}) => (
              <View>
                <View
                  style={{
                    marginTop: 45,
                    marginHorizontal: 30,
                    // backgroundColor: '#E5EDF2',
                    width: '50%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Inter_28pt-Bold',
                      fontWeight: 600,
                    }}>
                    Task Title will be here...
                  </Text>
                </View>
                <View
                  style={{
                    height: 0,
                    width: '90%',
                    borderWidth: 1,
                    marginHorizontal: 30,
                    borderColor: '#E5EDF2',
                    marginTop: 5,
                  }}></View>
                {/* <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Inter_28pt-Bold',
                  }}>
                  Task Index: {index}
                </Text> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 30,
                    marginHorizontal: 30,
                    // borderWidth:2,
                    width: '85%',
                    borderRadius: 5,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Inter_28pt-Bold',
                        fontSize: 16,
                        fontWeight: 600,
                      }}>
                      {formatDate(item.assignment_date)}
                    </Text>
                    <Text
                      style={{fontFamily: 'Inter_28pt-Regular', fontSize: 11}}>
                      {formatmonth(item.assignment_date)}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{fontFamily: 'Inter_28pt-Medium', fontSize: 14}}>
                      {item?.assigned_to?.name}
                    </Text>
                    {'\n'}
                    <Text>
                      Priority |{' '}
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color:
                            item.priority === 'Low'
                              ? '#38AA3A'
                              : item.priority === 'Medium'
                              ? '#FE9816'
                              : '#E31B1B',
                        }}>
                        {item.priority}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(254, 152, 22, 0.12)',
                      padding: 2,
                      marginTop: 3,
                      width: 120,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color:
                          item.status.title == 'Pending'
                            ? '#FE9816'
                            : '#38AA3A',
                        fontWeight: '500',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        opacity: 1,
                        marginTop: 5,
                        borderRadius: 10,
                      }}>
                      {item.status.title}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text>No tasks available</Text>} // Show message when no tasks are available
            onEndReached={fetchData} // Trigger pagination when end is reached
            onEndReachedThreshold={0.5} // Start loading more when 50% of the list is visible
            ListFooterComponent={isfooterComponent}
          />
        </View>
      </ScrollView>

      <AddButton isLandscape={isLandscape} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  content: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
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
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2,
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
    fontFamily: 'Inter_28pt-Thin',
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
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    borderBlockColor: '#A0AEC0',
    fontFamily: 'Inter_18pt-Regular',
  },
  main: {
    flex: 1,
    paddingHorizontal: 1,
  },
  main2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 18,
    // fontWeight: 'bold',
    // marginTop: 20,
  },

  icon: {
    height: 30,
    width: 25,
    marginTop: 10,
    marginHorizontal: 10,
  },
  containerr: {
    width: 180,
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',

    // marginTop:50
  },
  containerree: {
    width: '100%',
    height: 90,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    // borderWidth:2
  },
  containerrr: {
    width: 180,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    marginTop: 35,
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
    width: '105%',
    height: 40,
    marginHorizontal: 20,
    backgroundColor: '#F8F9FA',
    marginTop: 20,
    borderColor: '#E2E8F0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    width: 180,
    marginHorizontal: 25,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#F8F9FA',
    position: 'relative',
    borderColor: '#E2E8F0',
  },
  inputBox: {
    marginLeft: 12,
    width: 155,
  },
  floatingButton: {
    position: 'absolute', // Keeps the button fixed
    right: 20, // Position the button on the right
    bottom: 40, // Position the button at the bottom (fixed to bottom)
    backgroundColor: '#0cbcb9', // Button color
    borderRadius: 100, // Rounded corners
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    shadowColor: '#000', // Button shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
    height: 57, // Make the button's height the same as its width
    width: 57, // Fixed width and height for circular button
  },
});

export default TaskManagement;
