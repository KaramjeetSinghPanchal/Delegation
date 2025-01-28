import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import {useRef, useState, useEffect} from 'react';
import Profile from '../Components/Profile';
import {SelectList} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dashboard = ({navigation}) => {
  const data = ['Query', 'Task'];
  const flatListRef = useRef(null); // Reference to FlatList for scrolling

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setScreenHeight(window.height);
      setScreenWidth(window.width);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const userMessage = {
        id: messages.length.toString(),
        text: message,
        sender: 'user', // This indicates it's the user's message
        image: require('../assets/images/gymone.jpeg'),
      };

      // Add the user message to the state
      setMessages([...messages, userMessage]);

      // Clear the message input
      setMessage('');

      // Simulate a bot response after a short delay
      setTimeout(() => {
        const botMessage = {
          id: (messages.length + 1).toString(),
          text: ['Hii'],
          sender: 'bot', // This indicates it's the bot's message
          image: require('../assets/images/Bot.png'), // Bot's image
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1500); // Bot responds after 1.5 seconds
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Wrapper to handle Keyboard Avoiding */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.main}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={require('../assets/images/Picon.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>Delegation Bot</Text>
            <Profile
              onPress="Details"
              navigation={navigation}
              style={{marginTop: 10}}
            />
          </View>
        </View>

        {/* Bot Image */}
        <Animatable.View
          style={styles.center}
          animation={'zoomIn'}
          duration={2000}>
          <Image
            source={require('../assets/images/Bot.png')}
            style={styles.botImage}
          />
        </Animatable.View>

        {/* Greeting Text when no messages */}
        {messages.length === 0 && (
          <Animatable.View
            style={styles.adminMessage}
            duration={2000}
            animation={'zoomIn'}>
            <Text style={styles.greetingText}>Hello Admin</Text>
            <Text style={styles.assistanceText}>How Can I Help You Today?</Text>
          </Animatable.View>
        )}

        {/* Chat Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageContainer,
                {bottom: messages.length < 3 ? 10 : 90},
                item.sender === 'bot'
                  ? [
                      styles.botMessageContainer,
                      {bottom: messages.length < 3 ? 10 : 90},
                    ]
                  : [
                      styles.userMessageContainer,
                      {bottom: messages.length < 3 ? 10 : 90},
                    ],
              ]}>
              {item.image && (
                <Image source={item.image} style={styles.messageImage} />
              )}

              <Text
                style={[
                  styles.messageText,
                  {marginRight: item.text.length < 50 ? 0 : 15},
                ]}>
                <Text style={styles.messageTextt}>
                  {item.sender === 'bot' ? 'Bot' : 'User'}
                </Text>
                {'\n'}
                {item.text}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageContentContainer}
        />

        {/* Chat Input Area */}
        <Animatable.View
          style={styles.inputContainer}
          animation={'slideInDown'}
          duration={2000}>
          {/* Select List for Task */}
          <SelectList
            data={data}
            placeholder="Task"
            style={styles.selectList}
            dropdownStyles={styles.dropdownStyles}
            boxStyles={styles.selectListBox}
          />
          <Text style={styles.verticalBar}>|</Text>

          {/* TextInput for message */}
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={text => setMessage(text)}
            onSubmitEditing={sendMessage} // Send message on enter
          />

          {/* Mic Icon */}
          <TouchableOpacity style={styles.firstCircle}>
            <View style={styles.iconContainer}>
              <Icon name="mic" size={25} color="#9AACC2" />
            </View>
          </TouchableOpacity>

          {/* Send Arrow Icon */}
          <TouchableOpacity style={styles.arrowCircle} onPress={sendMessage}>
            <View style={styles.iconContainer}>
              <Icon name="arrow-upward" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  main: {
    flex: 1,
    paddingHorizontal: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 85,
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -350,
  },
  botImage: {
    width: 93.46,
    height: 130,
  },
  adminMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 600,
    color: '#0CBCB9',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  assistanceText: {
    fontSize: 22,
    fontWeight: 600,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    // bottom: 90,
  },
  userMessageContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 50,
    // marginBottom: 10,
    // alignSelf: 'flex-end',
  },
  botMessageContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 50,
    // marginBottom: 10,
    // alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 12,
    color: '#000000',
    padding: 5,
  },
  messageTextt: {
    fontSize: 9,
    color: '#1E2633',
    padding: 10,
  },
  messageImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 10,
  },
  messageList: {
    flex: 1,
  },
  messageContentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    height: 50,
    width: '95%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    position: 'absolute',
    bottom: 0, // Keep the input at the bottom
    borderColor: '#E2E8F0',
    marginLeft: 10,
    borderRadius: 50,
  },
  selectList: {
    height: 46,
    width: '30%',
  },
  dropdownStyles: {
    width: 100,
    height: 80,
  },
  selectListBox: {
    borderColor: 'white',
  },
  verticalBar: {
    fontSize: 30,
    marginTop: -5,
    marginLeft: -15,
  },
  textInput: {
    height: 46,
    width: '68%',
    marginLeft: 0,
  },
  firstCircle: {
    height: 35,
    width: 35,
    borderRadius: 100,
    backgroundColor: '#DEE5ED',
    marginTop: 0,
    marginLeft: -62,
  },
  arrowCircle: {
    height: 35,
    width: 35,
    borderRadius: 100,
    backgroundColor: '#1E2633',
    marginTop: 3,
    marginLeft: 9,
  },
  iconContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
});
