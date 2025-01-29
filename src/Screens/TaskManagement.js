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
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {setResultData} from '../Components/redux/dataSlice';
import * as Animatable from 'react-native-animatable';
import {report} from '../apiClient/api';
import AddButton from './AddButton';
import DatePicker from 'react-native-date-picker';
import {taskmangementlisting} from '../apiClient/api';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SelectList} from 'react-native-dropdown-select-list';
import {useDispatch} from 'react-redux';
const TaskManagement = ({navigation}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  // const [checkdata, setcheckdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [current, setcurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // Track if more data is available
  const [searchQuery, setSearchQuery] = useState('');
  const [total, settotal] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false); // Tracks if download was successful
  const [errorMessage, setErrorMessage] = useState(null); // To handle errors
  const [message, setMessage] = useState('');
  const [datashowloader,setdatashowloader] = useState([])
  const [screenwidth, setscreenwidth] = useState(
    Dimensions.get('window').width,
  );
  
  const [screenheight, setscreenheight] = useState(
    Dimensions.get('window').height,
  );
  const [selectedDate, setSelectedDate] = useState('');
  const datastateredux = useSelector(state => state.data.items);  

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
      return null;
    }

    const options = {month: 'short'};
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };


  const nodata = ()=>{
    return  <Text>No Data</Text>
  } 

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

  const handleCheckboxChange = async status => {
    
    const updatedCheckedStates = {
      ...checkedStates,
      [status]: !checkedStates[status],
    };
    setCheckedStates(updatedCheckedStates);

    const selectedStatuses = Object.keys(updatedCheckedStates).filter(
      key => updatedCheckedStates[key],
    );    
    if (selectedStatuses.length === 0) {

      const fetchAllData = await taskmangementlisting({
        status: '',
      }); 

      const result = fetchAllData.data;

      setTimeout(() => {
        dispatch(setResultData(result));
      }, 2000);
      setLoading(false);
    } 
    
    else {
      const fetchCheckListing = await taskmangementlisting({
        status: selectedStatuses.join(','),
      });
      const result = fetchCheckListing.data;
      setdatashowloader(result)
      if(result.length<1)
      {
        dispatch(setResultData(result));       
      }else{
        setTimeout(() => {
          dispatch(setResultData(result));
        }, 2000)
      }
    }
  };

  const clearData = async () => {
    const fetchedData = await taskmangementlisting({});

    if (fetchedData && Array.isArray(fetchedData.data)) {
      if (fetchedData.data.length > 0) {
        dispatch(setResultData(fetchedData.data));
        settotal(fetchedData.data.total);
        if (!fetchedData.next_page_url) {
          setHasMoreData(false);
        } else {
          setcurrent(prev => prev + 1);
        }
      } else {
        console.log('No more data to load.');
        dispatch(setResultData([]));
       
      }
    }
  };
  const handleSelectChange = val => {
    setSelected(val);
    dispatch(setResultData([]));
    setcurrent(1);
    handlesearch('', val, '');
  };

  const isfooterComponent = () => {
      return <ActivityIndicator size="large" style={{marginVertical: 36}} />
    
    // return null; // Don't show anything if no more data or not loading
  };

  useEffect(() => {
    handlesearch(searchQuery, '');
  }, [searchQuery]);

  const handlesearch = async (selectedValue, val, date) => {
    let currentPage = 1;
    let allData = []; // To hold all task data
    let hasMoreData = true;
    const pageSize = 10; // Adjust based on your API's default page size

    try {
      while (hasMoreData) {
        setLoading(true);
        // Fetch data for the current page
        const response = await taskmangementlisting({
          page: currentPage,
          searchQuery: selectedValue,
          status: val,
          assigned_date: date,
        });

        // Append fetched data to allData
        allData = [...allData, ...response.data];

        // Dispatch the data so far to update the UI
        dispatch(setResultData([...allData]));

        // Check if the number of items returned is less than the page size
        if (response.data.length < pageSize) {
          hasMoreData = false; // Stop fetching if no more data
        } else {
          currentPage++;
          // isfooterComponent()
          // await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
      }
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false); // Hide the loader
    }
  };

  const handleReport = async date => {
    const formattedDate = date.toISOString().slice(0, 10);

    setIsDownloading(true);
    setDownloadSuccess(false);
    setErrorMessage(null);

    const fetchreport = await report(formattedDate);

    if (fetchreport) {
      setDownloadSuccess(true);
      Alert.alert('Report downloaded successfully');
      console.log('Report downloaded successfully:', fetchreport);
    } else {
      setErrorMessage('Failed to download the report');
      console.error('Failed to fetch the report');
    }

    setIsDownloading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
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
              <Animatable.View
                style={styles.content}
                duration={3000}
                animation={'zoomIn'}>
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
                        style={{
                          fontFamily: 'Inter_28pt-Thin',
                          marginRight: 10,
                        }}>
                        {label}
                      </Text>
                    </View>
                  ))}
                </View>
              </Animatable.View>

              <Animatable.View
                style={{backgroundColor: '#FFFFFF', marginTop: 15}}
                duration={3000}
                animation={'zoomIn'}>
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
              </Animatable.View>

              <Animatable.View
                style={styles.containerree}
                duration={3000}
                animation={'zoomIn'}>
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
                      setDate(selectedDate);
                      setSelectedDate(selectedDate.toDateString());
                      handlesearch('', '', date);
                    }}
                    onCancel={() => setOpen(false)}
                  />

                  {/* clear button */}
                  <TouchableOpacity
                    style={{
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: '#E2E8F0',
                      marginTop: 20,
                      backgroundColor: '#FAF8F9',
                      width: finalWidth,
                      marginLeft: 10,
                    }}
                    onPress={clearData}>
                    <Text style={{fontSize: 13}}>Clear</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>

              {/* Search and Generate Report section */}
              <Animatable.View
                style={styles.containerrr}
                duration={3000}
                animation={'zoomIn'}>
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
                      {message}
                    </Text>
                  </View>
                ) : null}
                {/* Display error message if something went wrong */}
                {errorMessage && !isDownloading ? (
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color: 'red', fontSize: 16}}>
                      {errorMessage}
                    </Text>
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
                    marginLeft: isLandscape ? 185 : 14,
                  }}
                  onPress={() => {
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
              </Animatable.View>
            </View>
          </>
        }
        data={datastateredux}
        renderItem={({item, index}) => (
          <View key={index}>
            <Animatable.View
              style={{
                marginTop: 45,
                marginHorizontal: 30,
                width: '50%',
              }}
              duration={3000}
              animation={'lightSpeedIn'}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Inter_28pt-Bold',
                  fontWeight: '600',
                }}>
                Task Title will be here...
              </Text>
            </Animatable.View>
            <View
              style={{
                height: 0,
                width: '90%',
                borderWidth: 1,
                marginHorizontal: 30,
                borderColor: '#E5EDF2',
                marginTop: 5,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 30,
                marginHorizontal: 30,
                width: '85%',
                borderRadius: 5,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Inter_28pt-Bold',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  {formatDate(item?.assignment_date)}
                </Text>
                <Text style={{fontFamily: 'Inter_28pt-Regular', fontSize: 11}}>
                  {formatmonth(item?.assignment_date)}
                </Text>
              </View>

              <View>
                <Text style={{fontFamily: 'Inter_28pt-Medium', fontSize: 14}}>
                  {item?.assigned_to?.name}
                </Text>
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
                      item?.status?.title === 'Pending' ? '#FE9816' : '#38AA3A',
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
          datashowloader.length >0 &&   loading ? (
            <ActivityIndicator size={'large'} style={{ marginVertical: 40 }} />
          ) : datastateredux.length === 0 ? (
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 80,
              }}>
              No tasks available
            </Text>
          ) : null
        }
       
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        // onEndReachedThreshold={0.5}
        // ListFooterComponent={isfooterComponent}
      />

      <AddButton
        isLandscape={isLandscape}
        onPress={() => {
          Alert.alert('Welcome to the Delegation Project');
        }}
      />
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
