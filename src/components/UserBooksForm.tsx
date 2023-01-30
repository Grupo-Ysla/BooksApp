import {useIsFocused} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, TextInput, Alert, View} from 'react-native';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {normalize} from '../helpers/responsive';
import {SelectList} from 'react-native-dropdown-select-list';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SceneName from '../navigation/SceneNames';
import {postCollection} from '../genery/firebaseFuntions';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import literaryGenre from './literaryGenre';
import Collections from '../navigation/Collections';
import UserBooksHeader from './UserBooksHeader';

type UserBooksForm = NativeStackNavigationProp<
  RootStackParamList,
  SceneName.HomeScreen
>;

type Props = {
  navigation: UserBooksForm;
};

const UserBooksForm = ({navigation}: Props) => {
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('');

  const isFocusScreen = useIsFocused();

  const addBooks = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   const {path} = image;
    //   const filename = path.substring(path.lastIndexOf('/') + 1);
    //   const uploadUri =
    //     Platform.OS === 'ios' ? path.replace('file://', '') : path;
    //   storage()
    //     .ref(filename)
    //     .putFile(uploadUri)
    //     .then(uri1 => {
    //       console.log('uri1:', uri1);
    //       const ref = storage().ref(uri1.metadata.fullPath);
    //       ref.getDownloadURL().then(uri2 => {
    //         console.log('uri2:', uri2);
    postCollection(Collections.booksCollection, {
      create: Date.parse(new Date().toISOString()),
      author: author,
      name: name,
      update: Date.parse(new Date().toISOString()),
      timeZone: selected,
      // image: uri2,
    });
    //       });
    //     });
    // });
    if (selected) {
      Alert.alert('book created!');
      navigation.navigate(SceneName.HomeScreen);
    } else {
      Alert.alert('You must add a book');
    }
  };
  const newLiteraryGenre = literaryGenre.map((item, index) => {
    return {key: index, value: item};
  });

  const defaultSelect = {key: '', value: ''};
  useEffect(() => {}, [isFocusScreen]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <UserBooksHeader />
          <View style={{marginTop: normalize(15)}}>
            <View style={{marginTop: normalize(50)}}>
              <TextInput
                placeholder="author"
                style={styles.inputContainer}
                value={author}
                onChangeText={text => setAuthor(text)}
              />
            </View>
            <View style={{marginTop: normalize(50)}}>
              <TextInput
                placeholder="name"
                style={styles.inputContainer}
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={{marginTop: normalize(50)}}>
              <SelectList
                placeholder="LiteraryGenre"
                boxStyles={styles.inputContainerLiteraryGenre}
                data={newLiteraryGenre}
                setSelected={setSelected}
                dropdownStyles={styles.inputDropDown}
                save="value"
                defaultOption={defaultSelect}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{bottom: normalize(65), paddingHorizontal: normalize(80)}}>
        <Button
          color={'rgba(40,29,28,0.8)'}
          title="add book"
          onPress={() => addBooks()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserBooksForm;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: `#dcdcdc`,
    fontSize: normalize(15),
    marginHorizontal: normalize(60),
    borderRadius: normalize(20),
    paddingHorizontal: normalize(20),

    shadowColor: '#000',
    shadowOffset: {
      width: normalize(0),
      height: normalize(4),
    },
    shadowOpacity: normalize(0.3),
    shadowRadius: normalize(4.65),

    elevation: normalize(8),
  },
  inputContainerLiteraryGenre: {
    backgroundColor: `#dcdcdc`,
    fontSize: normalize(15),
    marginHorizontal: normalize(60),
    borderRadius: normalize(20),
    paddingHorizontal: normalize(20),
    borderWidth: normalize(2),
  },
  inputDropDown: {
    backgroundColor: `#dcdcdc`,
    fontSize: normalize(15),
    marginHorizontal: normalize(60),
    borderRadius: normalize(20),
    paddingHorizontal: normalize(20),
    height: '55%',
  },
});
