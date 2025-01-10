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
  Alert,
} from 'react-native';
import {report} from '../apiClient/api';
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
  const [getdate, setdate] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false); // Tracks if download was successful
  const [errorMessage, setErrorMessage] = useState(null); // To handle errors
  const [message, setMessage] = useState('');

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

  const maxWidth = screenwidth * 0.3 + 80;
  const minWidth = screenwidth * 0.3;

  const finalWidth = Math.min(Math.max(calculatedWidth, minWidth), maxWidth);

  const isLandscape = screenwidth > screenheight;

  const data = {
    All: '',
    'In-Draft': '1',
    'In-progress': '2',
    Completed: '3',
    Pending: '8',
    Rejected: '7',
    'Revised Date': '9',
  };

  const statusMapping = {
    All: '',
    'In-Draft': '1',
    'In-progress': '2',
    'In-Completed': '4',
    Completed: '3',
    Pending: '8',
    Rejected: '7',
    'Revised Date': '9',
  };

  const formatDate = dateString => {
    const date = new Date(dateString);

    if (isNaN(date)) {
      console.error('Invalid date string:', dateString);
      return '13-Dec';
    }

    const options = {day: 'numeric'};

    return new Intl.DateTimeFormat('en-GB', options).format(date); // 'en-GB' ensures it's in English
  };

  const formatmonth = dateString => {
    // Ensure a proper format, e.g., add time or use a valid format
    const date = new Date(dateString + 'T00:00:00'); // Adding time part to avoid issues

    // Check if the date is valid (not NaN)
    if (isNaN(date)) {
      console.error('Invalid date string:', dateString);
      return null;
    }

    const options = {month: 'short'};
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };


  useEffect(() => {
    if (downloadSuccess && !isDownloading) {
      // Set the message after the download is successful
      setMessage('Report Downloaded successfully');
      
      // Hide the message after 5 seconds
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      
      // Cleanup the timer if the component unmounts or dependencies change
      return () => clearTimeout(timer);
    }
  }, [downloadSuccess, isDownloading]);


  const [checkedStates, setCheckedStates] = useState({
    All: false,
    'In-Draft': false,
    'In-progress': false,
    Completed: false,
    Pending: false,
    Rejected: false,
    'Revised Date': false,
  });

  const handleCheckboxChange = async (status) => {
    Alert.alert("hii");
    console.warn("status======>", status);
  
    // Toggle the checkbox state
    const updatedCheckedStates = {
      ...checkedStates,
      [status]: !checkedStates[status],
    };
    setCheckedStates(updatedCheckedStates);
  
    // Get selected statuses (statuses with true value)
    const selectedStatuses = Object.keys(updatedCheckedStates).filter(
      (key) => updatedCheckedStates[key]
    );
  
    // If no statuses are selected (i.e., all checkboxes are unchecked)
    if (selectedStatuses.length === 0) {
      // Fetch all data without any filters
      const fetchAllData = await taskmangementlisting({
        status: '',  // Empty or null for "All" statuses
      });
  
      const result = fetchAllData.data;
      setData(result);  // Update with all data
      console.warn("Fetched all data:", result);
    } else {
      // If some checkboxes are selected, fetch data for those specific statuses
      const fetchCheckListing = await taskmangementlisting({
        status: selectedStatuses.join(','), // Join the selected statuses
      });
  
      const result = fetchCheckListing.data;
      setData(result);  // Update with filtered data
      console.warn("Fetched filtered data:", result);
    }
  };
  

  const clearData = async () => {
    const fetchedData = await taskmangementlisting({});

    if (fetchedData && Array.isArray(fetchedData.data)) {
      if (fetchedData.data.length > 0) {
        setData(fetchedData.data);
        settotal(fetchedData.data.total);
        if (!fetchedData.next_page_url) {
          setHasMoreData(false);
        } else {
          setcurrent(prev => prev + 1);
        }
      } else {
        console.log('No more data to load.');
        setData([]);
      }
    }
  };

  const fetchData = async (status = 'All', selectedDate) => {
    setLoading(true);
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const fetchedData = await taskmangementlisting({
        currentPage: current,
        status: statusMapping[status],
        assigned_date: formattedDate,
      });

      if (fetchedData && Array.isArray(fetchedData.data)) {
        if (fetchedData.data.length > 0) {
          setData(fetchedData.data);
          settotal(fetchedData.data.total);
          if (!fetchedData.next_page_url) {
            setHasMoreData(false);
          } else {
            setcurrent(prev => prev + 1);
          }
        } else {
          console.log('No more data to load.');
          setData([]);
        }
      } else {
        console.error(
          'Fetched data is not in the expected format:',
          fetchedData,
        );
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = val => {
    setSelected(val);
    setData([]);
    setcurrent(1);
    fetchData(val);
  };
  const isfooterComponent = useCallback(() => {
    if (hasMoreData) {
      return <ActivityIndicator size="large" style={{marginVertical: 36}} />;
    }
    return null;
  }, [hasMoreData]);

  useEffect(() => {
    fetchData();
  }, []);


  const print =()=>{
    const timer = setTimeout(() => {
      return 'hello'
    }, 5000);

    // Cleanup the timer when component unmounts
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    handlesearch();
  }, [searchQuery]);

  const handlesearch = async selectedValue => {
    const filtereddata = await taskmangementlisting({
      currentPage: 1,
      searchQuery: selectedValue,
    });
    setData(filtereddata.data);
  };

  const handleReport = async date => {
    const formattedDate = date.toISOString().slice(0, 10);

    setIsDownloading(true);
    setDownloadSuccess(false);
    setErrorMessage(null);

    const fetchreport = await report(formattedDate);

    if (fetchreport) {
      setDownloadSuccess(true);
      console.log('Report downloaded successfully:', fetchreport);
    } else {
      setErrorMessage('Failed to download the report');
      console.error('Failed to fetch the report');
    }

    setIsDownloading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              {Object.entries(data).map(([label, status], index) => (
                <View style={styles.checkboxItem} key={index}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      checkedStates[status] && styles.checkedCheckbox,
                    ]}
                    onPress={() => handleCheckboxChange(status)}>
                    {checkedStates[status] && (
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
              setSelected={handleSelectChange}
              data={[
                'All',
                'In-progress',
                'Completed',
                'In-Draft',
                'Pending',
                'Rejected',
                'Revised date',
              ]}
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

              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={selectedDate => {
                  setOpen(false);
                  setDate(selectedDate); // Update the date state
                  setSelectedDate(selectedDate.toDateString()); // Update selected date as string

                  // Pass the date to fetchData function
                  fetchData('', date); // Pass the selected date to fetchData
                }}
                onCancel={() => setOpen(false)} // Close modal when cancel is pressed
              />

              {/* clear button */}
              <TouchableOpacity
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
                }}
                onPress={clearData}>
                <TouchableOpacity>
                  <Text style={{fontSize: 13}}>Clear</Text>
                </TouchableOpacity>
              </TouchableOpacity>
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
            {isDownloading ? (
              <View style={{position: 'absolute', left: 100, top: 10}}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Downloading report...</Text>
              </View>
            ) : null}
            {/* Display success message when download is complete */}
            {'\n'}{' '}
            {downloadSuccess && !isDownloading ? (
              <View style={{position: 'absolute', left: 100, top: 50}}>
                <Text style={{color: 'green', fontSize: 16}}>
                  {/* Report Downloaded successfully */}
                    {message}
                  
                </Text>
              </View>
            ) : null}
            {/* Display error message if something went wrong */}
            {errorMessage && !isDownloading ? (
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'red', fontSize: 16}}>{errorMessage}</Text>
              </View>
            ) : null}
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
              }}
              onPress={() => {
                console.log('Button pressed');
                handleReport(date); // Pass the state `date`
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
            // keyExtractor={item => item?.id?.toString()} // Ensure each item has a unique key (assuming 'id' is present)
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
                      {formatDate(item?.assignment_date)}
                    </Text>
                    <Text
                      style={{fontFamily: 'Inter_28pt-Regular', fontSize: 11}}>
                      {formatmonth(item?.assignment_date)}
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
                          item?.status?.title == 'Pending'
                            ? '#FE9816'
                            : '#38AA3A',
                        fontWeight: '500',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        opacity: 1,
                        marginTop: 5,
                        borderRadius: 10,
                      }}>
                      {item?.status?.title ? item?.status?.title : 'Pending'}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 80,
                }}>
                No tasks available
              </Text>
            } // Show message when no tasks are available
            onEndReached={fetchData} // Trigger pagination when end is reached
            onEndReachedThreshold={0.5} // Start loading more when 50% of the list is visible
            ListFooterComponent={isfooterComponent}
          />
        </View>
      </ScrollView>

      <AddButton isLandscape={isLandscape} onPress={()=>{Alert.alert("Welcome to the Delegation Project")}} />
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
