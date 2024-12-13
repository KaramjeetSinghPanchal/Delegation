import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import PieChart from 'react-native-pie-chart';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Dashboard = () => {
  const gap = 5;
  const data = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 2',
    'Item 3',
    'Item 4',
  ]; // Example data

  const [selectedDate, setSelectedDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const widthAndHeight = 170;
  const series = [145, 321, 123, 789, 537];
  const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];

  return (
    <SafeAreaView style={styles.containermain}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.main}>
          <View style={styles.main2}>
            {/* Image with padding */}
            <Image
              source={require('../assets/images/Picon.png')}
              style={styles.icon}
            />
            <Text style={styles.text}>Dashboard</Text>
            <Image
              source={require('../assets/images/gymone.jpeg')}
              style={[styles.icon, styles.roundedIcon]}
            />
          </View>

          <View style={styles.firstBoxmain}>
            <View style={styles.firstBox}>
              <Text style={{color: 'gray', fontSize: 20}}>
                In-Progress {'\n'}{' '}
                <Text
                  style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
                  43
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.secondBoxmain}>
            <View style={styles.secondBox}>
              <Text
                style={{color: '#1E2633', fontSize: 20, fontWeight: 'bold'}}>
                Task Report {'\n'}{' '}
              </Text>

              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <View style={styles.containerchart}>
                  <Text style={styles.title}>Basic</Text>
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    innerRadius="30%" // This will create space between slices (inner radius)
                    padAngle={0.03}
                  />
                </View>
                <View style={styles.listContainer}>
                  {/* FlatList to display list items */}
                  <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()} // Ensure that each item has a unique key
                    renderItem={({item, index}) => {
                      // Accessing index and item
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
                  color: '#1E2633',
                  fontSize: 20,
                  fontWeight: 'bold',
                  width: 1010,
                  height: 50,
                }}>
                Weekly Filter {'\n'}
              </Text>

              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.datePickerButton}
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
                    width: 60,
                    backgroundColor: '#0cbcb9',
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    alignContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    marginLeft: 5,
                  }}>
                  <Text>Filter</Text>
                </View>

                <View
                  style={{
                    height: 40,
                    width: 50,
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    alignContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    borderWidth: 0.2,
                    marginLeft: 5,
                    borderBlockColor: 'gray',
                  }}>
                  <Text style={{fontSize: 18}}>Clear</Text>
                </View>

                <View
                  style={{
                    height: 40,
                    width: 40,
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    alignContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    borderWidth: 0.2,
                    marginLeft: 7,
                    borderBlockColor: 'gray',
                  }}>
                  <Icon name="search" size={28} color="gray" />
                </View>
              </View>

              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 23, fontWeight: '600'}}>
                  In-Progress
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>21</Text>
                </View>
                <View>
                  <Text>Sachin Sharma</Text>
                  {'\n'}
                  <Text>
                    Prority |{' '}
                    <Text style={{fontWeight: 'bold', color: 'green'}}>
                      Low
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text
                    style={{fontSize: 17, color: '#0cbcb9', fontWeight: 500}}>
                    View Details
                  </Text>
                </View>
               
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
                  <Icon name="add" size={40} color="white" />
                </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    backgroundColor: '#CACACA',
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
    height: 40,
    width: 40,
    marginTop: 10,
    marginHorizontal: 10,
  },
  roundedIcon: {
    borderRadius: 100,
  },
  listContainer: {
    width: '45%', // Adjust width for the list container
    marginTop: 10,
    height: 300, // Fixed height for the list container, adjust as needed
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    overflow: 'hidden', // Ensure content doesn't overflow
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  firstBox: {
    height: 81,
    width: 219.6,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  firstBoxmain: {
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  secondBox: {
    height: 400,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  secondBoxmain: {
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdBoxmain: {
    paddingTop: 10,
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
    fontSize: 16,
    color: '#333',
  },
  container: {
    width: 180,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  datePickerButton: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 0.3,
    width: 200,
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
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
    position: 'absolute',  // Keeps the button fixed
    right: 20,  // Position the button on the right
    bottom: 40, // Position the button at the bottom (fixed to bottom)
    backgroundColor: '#0cbcb9',  // Button color
    borderRadius: 100,  // Rounded corners
    padding: 15,  // Button padding
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',  // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,  // For Android shadow
  }
});
