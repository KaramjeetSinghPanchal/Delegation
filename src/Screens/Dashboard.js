import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import AddButton from './AddButton';
import {useEffect} from 'react';
import React from 'react';
import {useState} from 'react';
import Profile from '../Components/Profile';
import PieChart from 'react-native-pie-chart';
import {delegationtask} from '../apiClient/api';

// import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lanscape from './Lanscape';
const Dashboard = ({navigation}) => {
  const widthAndHeight = 160;

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
  ]; // Example data
  const isLandscape = Lanscape();
  console.warn(isLandscape);

  const [selectedDate, setSelectedDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [task, settask] = useState({});

  useEffect(() => {
    console.warn('usermanagement');

    const fetchUsers = async () => {
      try {
        console.warn('Fetching users...');
        const data = await delegationtask(); // Call the listing function from API
  

        if (data && data.data) {
          // Assuming data.data contains the array of users

          settask(data.data.allCount); // Set the users array to state
        } else {
          console.warn('No users data found.');
        }
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.containermain}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            <ScrollView horizontal={true}>
              {' '}
              <TouchableOpacity style={styles.firstBox}>
                <Text style={styles.textthe}>
                  {/* {item?.data?.assigned_by_id} {'\n'}{' '} */}
                  In-Progress
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'black',
                      fontFamily: '',
                    }}>
                    {'\n'} {task.inProgressCount}
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.firstBox}>
                <Text style={styles.textthe}>
                  {/* {item?.data?.assigned_by_id}  */}
                  Overdue
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {'\n'} {task.inOverDueCount}
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.firstBox}>
                <Text style={styles.textthe}>
                  {/* {item?.data?.assigned_by_id}  */}
                  Draft Count
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {'\n'} {task.inDraftCount}
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.firstBox}>
                <Text style={styles.textthe}>
                  {/* {item?.data?.assigned_by_id}  */}
                  To Be Completed
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {'\n'} {task.taskToBeAcceptedCount}
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.firstBox}>
                <Text style={styles.textthe}>
                  {/* {item?.data?.assigned_by_id}  */}
                  In Draft
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {'\n'} {task.inDraftCount}
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.firstBox}>
                <Text style={styles.textthe}>
                  {/* {item?.data?.assigned_by_id}  */}
                  Completed
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {'\n'} {task.completeCount}
                  </Text>
                </Text>
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
                Task Report {'\n'}{' '}
              </Text>

              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                {/* <View style={styles.containerchart}>
                
                </View> */}

                <View style={styles.containerttt}>
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    cover={0.45}
                  />
                </View>

                <View style={styles.listContainer}>
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
                </View>
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
                  style={[
                    styles.datePickerButton,
                    {width: isLandscape ? 280 : 200},
                  ]}
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
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

                <View
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
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Inter_28pt-Regular',
                    }}>
                    Filter
                  </Text>
                </View>

                <View
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
                  }}>
                  <Text
                    style={{fontSize: 14, fontFamily: 'Inter_28pt-Regular'}}>
                    Clear
                  </Text>
                </View>

                <View
                  style={{
                    height: 40,
                    width: isLandscape ? 160 : 40,
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    alignContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    borderWidth: 1,
                    marginLeft: 7,
                    backgroundColor: '#F8F9FA',
                    borderColor: '#E2E8F0',
                  }}>
                  <Icon name="search" size={25} color="#000000" />
                </View>
              </View>

              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    fontFamily: 'Inter_28pt-SemiBold',
                    color: '#2D3748',
                  }}>
                  In-Progress
                </Text>
              </View>

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
                <View
                  style={{
                    backgroundColor: '#EAFAFA',
                    height: 45,
                    width: 45,
                    // borderColor:'red',
                    // borderWidth:2
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter_28pt-Bold',
                      fontSize: 16,
                      fontWeight: 600,
                    }}>
                    {/* {formatDate(item.assignment_date)} */}3
                  </Text>
                  <Text
                    style={{fontFamily: 'Inter_28pt-Regular', fontSize: 12}}>
                    {/* {formatmonth(item.assignment_date)} */}Jul
                  </Text>
                </View>

                <View>
                  <Text style={{fontFamily: 'Inter_28pt-Medium', fontSize: 14}}>
                    {/* {item.assigned_to.name} */}karm
                  </Text>
                  {'\n'}
                  <Text>
                    Priority |{' '}
                    <Text style={{fontWeight: 'bold', color: 'green'}}>
                      {/* {item.priority} */}Low
                    </Text>
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#0CBCB9',
                      fontWeight: '500',
                      fontFamily: 'Inter_28pt-Medium',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      opacity: 1,
                      marginTop: 3,
                    }}>
                    {/* {item.status.title} */}View Details
                  </Text>
                </View>
              </View>
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
                <View
                  style={{
                    backgroundColor: '#EAFAFA',
                    height: 45,
                    width: 45,
                    // borderColor:'red',
                    // borderWidth:2
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter_28pt-Bold',
                      fontSize: 16,
                      fontWeight: 600,
                    }}>
                    {/* {formatDate(item.assignment_date)} */}3
                  </Text>
                  <Text
                    style={{fontFamily: 'Inter_28pt-Regular', fontSize: 12}}>
                    {/* {formatmonth(item.assignment_date)} */}Jul
                  </Text>
                </View>

                <View>
                  <Text style={{fontFamily: 'Inter_28pt-Medium', fontSize: 14}}>
                    {/* {item.assigned_to.name} */}karm
                  </Text>
                  {'\n'}
                  <Text>
                    Priority |{' '}
                    <Text style={{fontWeight: 'bold', color: 'green'}}>
                      {/* {item.priority} */}Low
                    </Text>
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#0CBCB9',
                      fontWeight: '500',
                      fontFamily: 'Inter_28pt-Medium',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      opacity: 1,
                      marginTop: 3,
                    }}>
                    {/* {item.status.title} */}View Details
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <AddButton isLandscape={isLandscape} />
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
  firstBox: {
    height: 81,
    width: 219.6,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginLeft: 10,
  },
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
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdBox: {
    height: 290,
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
  textthe: {
    color: '#A0AEC0',
    fontSize: 14,
    marginHorizontal: 10,
    fontFamily: 'Inter_18pt-Medium',
  },
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
});
