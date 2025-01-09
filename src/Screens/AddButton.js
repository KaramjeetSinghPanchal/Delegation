import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';


const AddButton = ({isLandscape,onPress}) => {
  
  return (
    <TouchableOpacity style={[styles.floatingButton,{right: isLandscape?190:20 }]}>
    <Icon name="add" size={35} color="white" onPress={onPress}/>
  </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute', // Keeps the button fixed
        // Position the button on the right
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
})