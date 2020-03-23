import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';

const RootStack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen name='Main' component={BottomTabNavigator} />
    </RootStack.Navigator>
  </NavigationContainer>
)