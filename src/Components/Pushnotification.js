import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const Pushnotification = () => {
  // Request permission on iOS and get the token
  const requestUserPermissionIos = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken(); // Get the FCM token
    } else {
      console.log('User denied notification permissions.');
    }
  };

  // Fetch FCM token
  const getToken = async () => {
    const token = await messaging().getToken();
    console.warn('FCM Token:', token);
  };

  // Handle foreground notifications
  const handleForegroundNotification = async (remoteMessage) => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    await onDisplayNotification(remoteMessage);
  };

  // Display notification using Notifee
  const onDisplayNotification = async (remoteMessage) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
  
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  
    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        attachments: [
          {
            url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400', // Replace with your image URL
            id: 'image-id',
          },
        ],
      },
    });
  };
  

  useEffect(() => {
    // Request notification permissions
    requestUserPermissionIos();

    // Handle foreground messages
    const unsubscribe = messaging().onMessage(handleForegroundNotification);

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
      <Text>Push Notifications</Text>
    </View>
  );
};

export default Pushnotification;

const styles = StyleSheet.create({});
