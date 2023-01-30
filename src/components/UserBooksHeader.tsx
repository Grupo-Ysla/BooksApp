import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {normalize} from '../helpers/responsive';

const UserBooksHeader = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: normalize(65),
        }}>
        <Icon
          name="left"
          style={styles.iconsView}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>Add Book</Text>
      </View>
    </View>
  );
};

export default UserBooksHeader;

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: normalize(25),
    fontWeight: '500',
    alignSelf: 'center',
    top: normalize(10),
    left: normalize(40),
  },
  iconsView: {
    fontSize: normalize(45),
    marginTop: normalize(20),
    paddingHorizontal: normalize(18),
    color: 'rgba(40,29,28,0.8)',
    right: normalize(3),
    top: normalize(3),
    fontWeight: '700',
  },
});
