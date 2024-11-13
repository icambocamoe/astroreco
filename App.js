import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator.js';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <StackNavigator/>
    </NavigationContainer>
  );
}

