// src/navigation/Navigation.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../Screens/HomeScreen';
import Forgetpassword from '../Screens/Forgetpassword';
import OTP from '../Screens/OTP';
import Tabnavigation from './Tabnavigation'; // Import your Tabnavigator component
import Details from '../Screens/Details';
import Chart from '../Screens/Chart';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="HomeScreen"
            component={HomeScreen}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Chart" component={Chart} />
          <Stack.Screen name="Tabs" component={Tabnavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
