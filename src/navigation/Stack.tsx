import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SceneName from './SceneNames';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const HomeScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SceneName.LoginScreen}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SceneName.HomeScreen}
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
