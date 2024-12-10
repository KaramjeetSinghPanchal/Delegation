import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HomeScreen from '../Screens/HomeScreen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    
    <SafeAreaProvider>
      <NavigationContainer>
    <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen
          name="HomeScreen"
          options={{
            animation: 'fade',
          }}
          component={HomeScreen}
        />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
      </Stack.Navigator>   
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
