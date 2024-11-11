import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator.js';


export default function App() {

  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}

