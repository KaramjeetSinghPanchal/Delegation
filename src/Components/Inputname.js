import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Inputname = ({style,name}) => {
  return (
    <View>
      <Text style={[style,{fontFamily:'Inter_18pt-Bold',color:'#232323'}]}>{name}</Text>
    </View>
  )
}

export default Inputname

const styles = StyleSheet.create({})