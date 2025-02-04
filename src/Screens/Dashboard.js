import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {delegationtaskk} from '../apiClient/api';
import * as Animatable from 'react-native-animatable';
import AddButton from './AddButton';
import {useCallback} from 'react';
import React from 'react';
import {useState} from 'react';
import Profile from '../Components/Profile';
import PieChart from 'react-native-pie-chart';
import {delegationtask} from '../apiClient/api';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lanscape from './Lanscape';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setExapmle} from '../Components/redux/dataSlice';
import {setListingData} from '../Components/redux/dataSlice';
const Dashboard = ({navigation}) => {
  const listingDataa = useSelector(state => state?.data?.listingDataa);
  const example = useSelector(state => state.data.exapmle);
  const dispatch = useDispatch();
  const widthAndHeight = 160;
  const [listing, setlisting] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true); // Track if more data is available
  const [status, setstatus] = useState([]);
  const [activeStatus, setActiveStatus] = useState(null); // Track active status
  const [width, setwidth] = useState(40);
  const [got, setgot] = useState(false);
  const series = [
    {value: 430, color: '#fbd203'},
    {value: 321, color: '#ffb300'},
    {value: 185, color: '#ff9100'},
    {value: 123, color: '#ff6c00'},
  ];
  const data = [
    'In-Progress',
    'To Be Accepted',
    'In-progress',
    'Completed',
    'In-Draft',
  ];
  const isLandscape = Lanscape();

  const [selectedDate, setSelectedDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [task, settask] = useState({});

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

  const listingdata = async status => {
    const data = await delegationtask(status, ''); // Call the listing function from API
    setHasMoreData(false);
    dispatch(setListingData(data?.data?.taskData?.data));
    // setlisting(data?.data?.taskData?.data);

    setstatus(listing[0].status.id);
  };

  const calenderreport = async date => {
    const formattedDate = date.toISOString().slice(0, 10);
    const data = await delegationtaskk('3', formattedDate);
    setlisting(data?.data?.taskData?.data);
  };

  const isfooterComponent = useCallback(() => {
    if (hasMoreData) {
      return <ActivityIndicator size="large" style={{marginVertical: 36}} />;
    }
    return null; // No footer if loading is false or no more data
  }, [hasMoreData]);
  const appliedWidth = got ? 110 : isLandscape ? 280 : 200;

  const handleserach = () => {
    setgot(true);
    setwidth(150);
  };

  const cleardata = () => {
    listingdata();
  };

  const filterdatatestredux = val => {
    dispatch(setExapmle(val));
  };
  return (
    <SafeAreaView style={styles.containermain}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.main}>
              <View style={styles.main2}>
                <Image
                  source={require('../assets/images/Picon.png')}
                  style={styles.icon}
                />
                <Text style={styles.text}>Dashboard</Text>
                <Profile
                  onPress="Details"
                  navigation={navigation}
                  style={{marginTop: 10}}
                />
              </View>

              <View style={styles.firstBoxmain}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {' '}
                  <TouchableOpacity
                    style={styles.firstBox(activeStatus === 2)}
                    onPress={() => {
                      listingdata(2);
                      setActiveStatus(2);
                    }}>
                    <Text style={styles.textthe(activeStatus === 2)}>
                      {/* {item?.data?.assigned_by_id} {'\n'}{' '} */}
                      In-Progress
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: activeStatus ? 'white' : 'black',
                          fontFamily: '',
                        }}>
                        {'\n'} {task.inProgressCount}
                      </Text>
                    </Text>

                    <Image
                      source={require('../assets/images/iconprogress.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.firstBox(activeStatus === 3)}
                    onPress={() => {
                      setActiveStatus(3); // Set the active status when pressed
                      listingdata(3);
                    }}>
                    <Text style={styles.textthe(activeStatus === 3)}>
                      {/* {item?.data?.assigned_by_id}  */}
                      Completed
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: activeStatus ? 'white' : 'black',
                        }}>
                        {'\n'} {task.taskToBeAcceptedCount}
                      </Text>
                    </Text>

                    <Image
                      source={require('../assets/images/iconCompleted.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.firstBox(activeStatus === 1)}
                    onPress={() => {
                      listingdata(1);
                      setActiveStatus(1);
                    }}>
                    <Text style={styles.textthe(activeStatus === 1)}>
                      {/* {item?.data?.assigned_by_id}  */}
                      In-Draft
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: activeStatus ? 'white' : 'black',
                        }}>
                        {'\n'} {task.inDraftCount}
                      </Text>
                    </Text>

                    <Image
                      source={require('../assets/images/iconprogreesgray.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.firstBox(activeStatus === 8)}
                    onPress={() => {
                      listingdata(8);
                      setActiveStatus(8);
                    }}>
                    <Text style={styles.textthe(activeStatus === 8)}>
                      {/* {item?.data?.assigned_by_id}  */}
                      To Be Accepted
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: activeStatus ? 'white' : 'black',
                        }}>
                        {'\n'} {task.inDraftCount}
                      </Text>
                    </Text>

                    <Image
                      source={require('../assets/images/Acceptedblue.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.firstBox(activeStatus === 5)}
                    onPress={() => {
                      listingdata(5);
                      setActiveStatus(5);
                    }}>
                    <Text style={styles.textthe(activeStatus === 5)}>
                      {/* {item?.data?.assigned_by_id}  */}
                      Overdue
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: activeStatus ? 'white' : 'black',
                        }}>
                        {'\n'} {task.inOverDueCount}
                      </Text>
                    </Text>

                    <Image
                      source={require('../assets/images/iconprogressred.png')}
                    />
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View style={styles.secondBoxmain}>
                <View style={styles.secondBox}>
                  <Text
                    style={{
                      color: '#1E2633',
                      fontSize: 18,
                      fontFamily: 'Inter_18pt-ExtraBold',
                      fontWeight: 700,
                    }}>
                    {example ? example : 'Task Report'} {'\n'}{' '}
                  </Text>

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    {/* <View style={styles.containerchart}>
                
                </View> */}

                    <Animatable.View
                      style={styles.containerttt}
                      duration={4000}
                      animation={'zoomIn'}>
                      <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        cover={0.45}
                      />
                    </Animatable.View>

                    <Animatable.View
                      style={styles.listContainer}
                      animation={'zoomIn'}
                      duration={3000}>
                      <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()} // Ensure that each item has a unique key
                        renderItem={({item, index}) => {
                          const bulletColor = [
                            '#fbd203',
                            '#ffb300',
                            '#ff9100',
                            '#ff6c00',
                            '#ff3c00',
                          ][index % 5]; // Cycling colors

                          return (
                            <View style={styles.listItem}>
                              {/* Bullet with dynamic color */}
                              <View
                                style={[
                                  styles.bullet,
                                  {backgroundColor: bulletColor}, // Set the bullet color dynamically
                                ]}
                              />
                              {/* List item text */}
                              <Text style={styles.listText}>{item}</Text>
                            </View>
                          );
                        }}
                      />
                    </Animatable.View>
                  </View>
                </View>
              </View>

              <View style={styles.thirdBoxmain}>
                <View style={styles.thirdBox}>
                  <Text
                    style={{
                      color: '#2D3748',
                      fontSize: 18,
                      fontWeight: 'bold',
                      width: 1010,
                      height: 50,
                      fontFamily: 'Inter_28pt-SemiBold',
                    }}>
                    Weekly Filter {'\n'}
                  </Text>

                  <View style={[styles.container, {width: 80}]}>
                    <TouchableOpacity
                      style={[styles.datePickerButton, {width: appliedWidth}]}
                      onPress={() => setOpen(true)}>
                      <Text style={styles.buttonText}>
                        {selectedDate ? `${selectedDate}` : 'Select Date'}
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
                        calenderreport(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />

                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: isLandscape ? 160 : 60,
                        backgroundColor: '#0cbcb9',
                        borderRadius: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        alignContent: 'center',
                        alignContent: 'center',
                        textAlign: 'center',
                        marginLeft: 5,
                      }}>
                      <TouchableOpacity onPress={() => filterdatatestredux(1)}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontFamily: 'Inter_28pt-Regular',
                          }}>
                          Filter
                        </Text>
                      </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: isLandscape ? 160 : 50,
                        backgroundColor: '#F8F9FA',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        alignContent: 'center',
                        alignContent: 'center',
                        textAlign: 'center',
                        borderWidth: 1,
                        marginLeft: 5,
                        borderColor: '#E2E8F0',
                      }}
                      onPress={cleardata}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Inter_28pt-Regular',
                        }}>
                        Clear
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: width,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        alignContent: 'center',
                        alignContent: 'center',
                        textAlign: 'center',
                        borderWidth: 1,
                        marginLeft: 7,
                        backgroundColor: '#F8F9FA',
                        // backgroundColor: 'black',
                        borderColor: '#E2E8F0',
                        flexDirection: 'row',
                      }}
                      onPress={handleserach}>
                      <TextInput
                        placeholder={'Search Something'}
                        style={{flex: 1}}></TextInput>
                      <Icon name="search" size={25} color="#000000" />
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        fontFamily: 'Inter_28pt-SemiBold',
                        color: '#2D3748',
                      }}>
                      {
                        status === 2
                          ? 'In-Progress'
                          : status === 1
                          ? 'Draft'
                          : status === 3
                          ? 'Completed'
                          : status === 8
                          ? 'To Be Accepted'
                          : status === 5
                          ? 'Overdue'
                          : '' // Default case if none of the conditions match
                      }
                    </Text>
                  </View>

                  {/* Listing */}
                  <FlatList
                    data={listingDataa} // Pass users array as data
                    keyExtractor={item => item.id.toString()} // Ensure each item has a unique key (assuming 'id' is present)
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
                              fontSize: 16,
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
                              style={{
                                fontFamily: 'Inter_28pt-Regular',
                                fontSize: 11,
                              }}>
                              {formatmonth(item.assignment_date)}
                            </Text>
                          </View>

                          <View>
                            <Text
                              style={{
                                fontFamily: 'Inter_28pt-Medium',
                                fontSize: 14,
                              }}>
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
                    onEndReached={listingdata} // Trigger pagination when end is reached
                    onEndReachedThreshold={0.5} // Start loading more when 50% of the list is visible
                    ListFooterComponent={isfooterComponent}
                  />
                </View>
              </View>
            </View>
          </>
        }
        data={listingDataa}
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
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />

      <AddButton
        isLandscape={isLandscape}
        onPress={() => navigation.navigate('Chart')}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
    height: 85,
    width: '100%',
    backgroundColor: 'white',
    // borderWidth: 2,
    backgroundColor: 'white',
  },

  listContainer: {
    width: '45%', // Adjust width for the list container
    height: 222, // Fixed height for the list container, adjust as needed
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    overflow: 'hidden', // Ensure content doesn't overflow

    marginTop: -23,
    marginLeft: 46,
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 20,
    fontFamily: 'Inter_24pt-SemiBold',
    color: '#2D3748',
  },
  firstBox: isActive => ({
    height: 81,
    width: 219.6,
    borderRadius: 10,
    backgroundColor: isActive ? '#0CBCB9' : '#FFFFFF', // Change background color when active
    padding: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  firstBoxmain: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  secondBox: {
    height: 225,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  secondBoxmain: {
    paddingTop: 30,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdBoxmain: {
    marginTop: 70,
    // paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdBox: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },

  containerlist: {
    flex: 1,
    paddingHorizontal: 10,
    paddingLeft: 140,
  },
  listItem: {
    flexDirection: 'row', // To align bullet and text horizontally
    alignItems: 'center', // Ensure the text is aligned with the bullet
    marginBottom: 10, // Space between list items
    paddingVertical: 5,
  },
  listText: {
    fontSize: 13,
    color: '#333',
    fontFamily: 'Inter_28pt-Medium',
  },
  textthe: isActive => ({
    color: isActive ? 'white' : '#A0AEC0',
    fontSize: 14,
    marginHorizontal: 10,
    fontFamily: 'Inter_18pt-Medium',
  }),
  container: {
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderColor: 'red',
    // borderWidth:5,
    // marginBottom:15
  },
  datePickerButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 5,
    shadowColor: '#000',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,

    height: 40,
    borderColor: '#F8F9FA',
  },
  buttonText: {
    fontSize: 16,
    color: '#A0AEC0',
    textAlign: 'center',
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  selectedDate: {
    width: 250,
    fontSize: 16,
    color: '#666', // Lighter gray text for the selected date
    marginTop: 12,
  },

  containerchart: {
    width: '45%', // Adjust width for pie chart
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
    height: 150,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  bullet: {
    width: 12, // Size of the bullet
    height: 12, // Size of the bullet
    borderRadius: 6, // Make it round
    marginRight: 10, // Space between bullet and text
  },
  floatingButton: {
    position: 'absolute', // Keeps the button fixed
    right: 20, // Position the button on the right
    bottom: 40, // Position the button at the bottom (fixed to bottom)
    backgroundColor: '#0cbcb9', // Button color
    borderRadius: 100, // Rounded corners
    padding: 15, // Button padding
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Button shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
  icon: {
    height: 30,
    width: 30,
    marginTop: 10,
    marginHorizontal: 10,
  },
  roundedIcon: {
    borderRadius: 100,
  },
  containerttt: {
    flex: 1,
    alignItems: 'center',
  },
  titlettt: {
    fontSize: 24,
    margin: 10,
  },
  listItemContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2, // Optional: to give shadow to each item
  },
  taskTitleContainer: {
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'Inter_28pt-Bold',
    fontWeight: '600',
  },
  dividerLine: {
    height: 1,
    width: '90%',
    borderWidth: 1,
    marginVertical: 5,
    borderColor: '#E5EDF2',
  },
  taskInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  assignmentDate: {
    fontFamily: 'Inter_28pt-Bold',
    fontSize: 16,
    fontWeight: '600',
  },
  assignmentMonth: {
    fontFamily: 'Inter_28pt-Regular',
    fontSize: 11,
  },
  assignedTo: {
    fontFamily: 'Inter_28pt-Medium',
    fontSize: 14,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  priority: {
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: 'rgba(254, 152, 22, 0.12)',
    padding: 5,
    marginTop: 3,
    width: 120,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '500',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  emptyMessage: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 80,
    fontSize: 18,
    color: '#6C757D',
  },
});
