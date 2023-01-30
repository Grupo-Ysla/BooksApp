import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import UserBooksForm from '../components/UserBooksForm';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SceneName from '../navigation/SceneNames';

type UserBooksScreen = NativeStackNavigationProp<
  RootStackParamList,
  SceneName.HomeScreen
>;

type Props = {
  navigation: UserBooksScreen;
};

const UserBooksScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <UserBooksForm navigation={navigation} />
    </View>
  );
};

export default UserBooksScreen;
