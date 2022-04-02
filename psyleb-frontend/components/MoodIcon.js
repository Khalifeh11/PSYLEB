import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const MoodIcon = ({name, size, color}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <MaterialIcons name={name} size={size} color={color}/>
  )
}

export default MoodIcon

const styles = StyleSheet.create({})