import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import LoginForm from '../components/LoginForm';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SceneName from '../navigation/SceneNames';

type LoginScreen = NativeStackNavigationProp<
  RootStackParamList,
  SceneName.HomeScreen
>;

type Props = {
  navigation: LoginScreen;
};

const LoginScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default LoginScreen;
