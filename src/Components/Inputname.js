import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Inputname = ({style,name}) => {
  return (
    <View>
      <Text style={style}>{name}</Text>
    </View>
  )
}

export default Inputname

const styles = StyleSheet.create({})