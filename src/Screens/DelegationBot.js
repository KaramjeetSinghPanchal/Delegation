import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import Profile from '../Components/Profile';
import DropDownPicker from 'react-native-dropdown-picker';
import {SelectList} from 'react-native-dropdown-select-list';
import Inputbox from '../Components/Inputbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Dashboard = ({navigation}) => {
  const data = ['Query', 'Task'];
  const [screenheight, setscreenheight] = useState(
    Dimensions.get('window').height,
  );
  const [screenwidth, setscreenwidth] = useState(
    Dimensions.get('window').width,
  );
  console.warn(screenheight, screenwidth, 'get spaces');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setscreenheight(window.height);
      setscreenwidth(window.width);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const isLandscape = screenwidth > screenheight;
  console.warn(isLandscape, 'isLandscape');

  return (
    <SafeAreaView style={styles.containermain}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.main}>
          <View style={styles.main2}>
            <Image
              source={require('../assets/images/Picon.png')}
              style={styles.icon}
            />
            <Text style={styles.text}>Delegation Bot</Text>
            <Profile
              onPress="Details"
              navigation={navigation}
              style={{marginTop: 10}}
            />
          </View>
        </View>

        <View style={styles.center}>
          <Image
            source={require('../assets/images/Bot.png')}
            style={{width: 93.46, height: 130}}
          />
        </View>

        <View style={styles.admin}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: '#0CBCB9',
              fontFamily: 'Inter_28pt-SemiBold',
            }}>
            Hello Admin
          </Text>
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 600,
                fontFamily: 'Inter_28pt-SemiBold',
              }}>
              How Can I Help You Today?
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 216,
            width: isLandscape ? 580 : 323,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 30,
            backgroundColor: '#F5F7FA',
            // borderColor:'red',
            // borderWidth:1,
            marginRight:isLandscape?100:0
          }}>
          <View
            style={{
              width: isLandscape ? 550 : 323,
              height: 65,
              backgroundColor: '#FFFFFF',
            }}>
            <View style={styles.setthree}>
              <View>
                {' '}
                <Image
                  source={require('../assets/images/Group1.png')}
                  style={{
                    height: 32,
                    width: 30.61,
                    marginBottom: 30,
                    marginRight: isLandscape ? 300 : 0,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: isLandscape ? -270 : 0,
                  marginRight: isLandscape ? 0 : 60,
                }}>
                {' '}
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 20,
                    color: 'black',
                    fontFamily: 'Inter_28pt-Regular',
                    marginBottom: 30,
                    color: '#2D3748',
                  }}>
                  Provide an update on the status of every task that was created
                  this week
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: 65,
              margin: 10,
              backgroundColor: '#FFFFFF',
              width: isLandscape ? 550 : 323,
            }}>
            <View style={styles.setthree}>
              <View>
                {' '}
                <Image
                  source={require('../assets/images/Group1.png')}
                  style={{
                    height: 32,
                    width: 30.61,
                    marginBottom: 15,
                    marginRight: isLandscape ? 200 : 0,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: isLandscape ? -170 : 0,
                  marginRight: isLandscape ? 0 : 60,
                }}>
                {' '}
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 20,
                    color: 'black',
                    fontFamily: 'Inter_28pt-Regular',
                    marginBottom: 12,
                    color: '#2D3748',
                  }}>
                  Provide an update on the status of every task that was created
                  this week
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: isLandscape ? 550 : 323,
              height: 65,
              backgroundColor: '#FFFFFF',
            }}>
            <View style={styles.setthree}>
              <View>
                {' '}
                <Image
                  source={require('../assets/images/Group1.png')}
                  style={{
                    height: 32,
                    width: 30.61,
                    marginBottom: 15,
                    marginRight: isLandscape ? 200 : 0,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: isLandscape ? -170 : 0,
                  marginRight: isLandscape ? 0 : 60,
                }}>
                {' '}
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 20,
                    color: 'black',
                    fontFamily: 'Inter_28pt-Regular',
                    marginBottom: 12,
                    color: '#2D3748',
                  }}>
                  Provide an update on the status of every task that was created
                  this week
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 53,

            backgroundColor: '#FAFAFA',
            marginHorizontal: 20,
            marginLeft: 40,
            marginTop: 20,
            borderRadius: 15,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/images/gymone.jpeg')}
            style={{
              borderRadius: 100,
              height: 25,
              width: 25,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          />

          <TouchableOpacity style={{marginTop: 10, marginLeft: 10}}>
            <Text style={{fontSize: 10, fontFamily: 'Inter_28pt-Regular'}}>
              You
            </Text>
            {'\n'}
            <Text
              style={{
                marginTop: 5,
                fontSize: 14,
                fontFamily: 'Inter_28pt-Regular',
              }}>
              hello
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 53,
            width: isLandscape ? 580 : 323,

            backgroundColor: 'white',
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 15,
            flexDirection: 'row',
            marginLeft: 40,
          }}>
          <View>
            <Image
              source={require('../assets/images/fullrobot.png')}
              style={{
                height: 25,
                width: 25,
                marginVertical: 10,
                marginHorizontal: 10,
              }}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 10, fontFamily: 'Inter_28pt-Regular'}}>
              Delegation Bot
            </Text>
            {'\n'}
            <Text
              style={{
                marginTop: 5,
                fontSize: 13,
                fontFamily: 'Inter_28pt-Regular',
              }}>
              Hello! How can i assist you today?
            </Text>
          </View>
        </View>

        {/* AI chat Box */}
        <View
          style={{
            height: 49,
            width: '90%',
            borderWidth: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
            flexDirection: 'row', // Ensures horizontal layout
            justifyContent: 'flex-start', // Aligns items to the start
            borderRadius: 20,
            borderColor: '#E2E8F0',
            backgroundColor: '#F8F9FA',
          }}>
          {/* SelectList takes 30% width */}
          <SelectList
            data={data}
            placeholder="Task"
            style={{
              height: 46,
              width: '30%', // 30% width for the SelectList
            }}
            dropdownStyles={{
              width: 100, // Adjust dropdown width if necessary
              height: 80,
            }}
            boxStyles={{borderColor: 'white'}}
          />

          {/* Vertical Bar between SelectList and Inputbox */}
          <Text style={{fontSize: 30, marginTop: 5, marginLeft: -15}}>|</Text>

          {/* Inputbox takes 50% width */}

          <Inputbox
            style={{
              height: 46,
              width: '68%', // Adjust width to 40% to give space for circles
              marginLeft: 33, // Margin to separate Inputbox from the vertical bar
            }}
          />

          {/* First Circle */}
          <TouchableOpacity
            style={{
              height: 35,
              width: 35,
              borderRadius: 100,
              backgroundColor: '#DEE5ED',
              marginTop: 10,
              marginLeft: -62,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 5,
              }}>
              <Icon name="mic" size={25} color="#9AACC2" />
            </View>
          </TouchableOpacity>
          {/* Second Circle */}
          <TouchableOpacity
            style={{
              height: 35,
              width: 35,
              borderRadius: 100,
              backgroundColor: '#1E2633',
              marginTop: 10,
              marginLeft: 5,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 5,
              }}>
              <Icon name="arrow-upward" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    marginTop: 10,
    height: 300, // Fixed height for the list container, adjust as needed
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    overflow: 'hidden', // Ensure content doesn't overflow
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 20,
    color: '#2D3748',
    fontFamily: 'Inter_18pt-SemiBold',
  },

  icon: {
    height: 35,
    width: 30,
    marginTop: 10,
    marginHorizontal: 10,
  },
  roundedIcon: {
    borderRadius: 100,
  },
  center: {
    flex: 1, // This ensures the container takes up the full screen
    justifyContent: 'center', // Vertically centers the content
    alignItems: 'center',
    marginTop: -10,
  },
  admin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  setthree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 330,
    height: 65,
    // borderColor:'red',
    // borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 55,
    // backgroundColor:'#FFFFFF'
  },
});
