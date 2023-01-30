import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import HomeForm from '../components/HomeForm';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SceneName from '../navigation/SceneNames';

type HomeScreen = NativeStackNavigationProp<
  RootStackParamList,
  SceneName.HomeScreen
>;

type Props = {
  navigation: HomeScreen;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <Text>Hola Mundooo</Text>
    </View>
  );
};

export default HomeScreen;
