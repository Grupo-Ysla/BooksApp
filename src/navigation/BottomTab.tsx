import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeScreenStack} from './Stack';
import HomeScreen from '../screens/HomeScreen';
import UserBooksScreen from '../screens/UserBooksScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';
          switch (route.name) {
            case 'home':
              iconName = 'home-outline';
              break;
            case 'List':
              iconName = 'ios-bar-chart-outline';
              break;
            case 'mic':
              iconName = 'ios-mic-outline';
              break;
            case 'doc':
              iconName = 'ios-bookmark-outline';
              break;
            case 'user':
              iconName = 'person-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="home"
        component={HomeScreenStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="List"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="mic"
        component={HomeScreenStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="doc"
        component={HomeScreenStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="user"
        component={UserBooksScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
