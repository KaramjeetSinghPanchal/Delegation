import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Dashboard = () => {
  const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4']; // Example data
  const [selectedDate, setSelectedDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const handleDayPress = day => {
    setSelected(day.dateString);
    setCalendarVisible(false); // Hide the calendar when a day is selected
  };
  return (
    <SafeAreaView style={styles.containermain}>
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
              <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
                43
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.secondBoxmain}>
          <View style={styles.secondBox}>
            <Text style={{color: '#1E2633', fontSize: 20, fontWeight: 'bold'}}>
              Task Report {'\n'}{' '}
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderWidth: 2,
                  borderRadius: 100,
                }}></View>
              <View style={styles.containerlist}>
                {data.map((item, index) => (
                  <View style={styles.listItem} key={index}>
                    <Text>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.thirdBoxmain}>
          <View style={styles.thirdBox}>
            <Text style={{color: '#1E2633', fontSize: 20, fontWeight: 'bold'}}>
              Weekly Filter {'\n'}
            </Text>

            <View style={styles.container}>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setOpen(true)}>
                <Text style={styles.buttonText}>
                  {selectedDate ? `${selectedDate}` : 'Select Date'}
                </Text>
                <View style={{marginHorizontal: 10,marginTop:8}}>
                  <Icon name={'calendar-month'} size={25} color="#0cbcb9" />
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
            </View>
          </View>
        </View>
      </View>
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
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  secondBoxmain: {
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdBoxmain: {
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdBox: {
    height: 230,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },

  secondBox: {
    height: 225,
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
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space out the items
    paddingVertical: 10,
  },
  container: {
    width: 180,
    height: 40,

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
    marginTop:10,
    marginHorizontal:10
  },
  selectedDate: {
    width: 250,
    fontSize: 16,
    color: '#666', // Lighter gray text for the selected date
    marginTop: 12,
  },
});
