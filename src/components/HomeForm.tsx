import React, {useState, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {getCollectionOrderBy} from '../genery/firebaseFuntions';
import Collections from '../navigation/Collections';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SceneName from '../navigation/SceneNames';
import firestore from '@react-native-firebase/firestore';
import {normalize} from '../helpers/responsive';
import {FlatList} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native/Libraries/Components/Touchable/TouchableOpacity';

type BookFirestore = {
  update: string;
  author: string;
  name: string;
  id: string;
  image: string;
  LiteraryGenre: string;
};
type HomeForm = NativeStackNavigationProp<
  RootStackParamList,
  SceneName.HomeScreen
>;
type Props = {
  navigation: HomeForm;
};

const HomeForm = ({navigation}: Props) => {
  const isFocusScreen = useIsFocused();

  const [data, setData] = useState<BookFirestore[]>([]);

  const update = Date.parse(new Date().toISOString());

  const getBook = async () => {
    getCollectionOrderBy(Collections.booksCollection, 'update', false).then(
      (item: BookFirestore[]) => {
        setData(item);
      },
    );
  };

  const dataBooks: BookFirestore = data.length
    ? data[data.length - 1]
    : {
        update: '',
        author: '',
        name: '',
        id: '',
        image: '',
        LiteraryGenre: '',
      };
  console.log(dataBooks.image);

  // const actionSelectTimeZone = (timeZoneId: string) => {
  //   Alert.alert(`SELECT AN OPTION`, 'what do you want to do?', [
  //     {
  //       text: 'Cancel',
  //     },
  //     {
  //       text: 'delete',
  //       onPress: () => {
  //         firestore()
  //           .collection(Collections.booksCollection)
  //           .doc(timeZoneId)
  //           .delete()
  //           .then(() => {
  //             Alert.alert('Delete correct');
  //           });
  //         navigation.navigate(SceneName.HomeScreen);
  //       },
  //     },
  //     {
  //       text: 'Select',
  //       onPress: () => {
  //         try {
  //           firestore()
  //             .collection(Collections.booksCollection)
  //             .doc(timeZoneId)
  //             .update({
  //               update,
  //             });
  //           navigation.navigate(SceneName.HomeScreen);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       },
  //     },
  //   ]);
  // };
  useEffect(() => {
    getBook();
  }, [isFocusScreen]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
          <Text style={styles.text}>All Books</Text>
        </View>
        <View
          style={{
            height: '100%',
            borderWidth: 1,
          }}>
          {/* <View style={styles.viewList}>
            {dataBooks.image ? (
              <Image
                style={[
                  {
                    position: 'absolute',
                    top: normalize(140),
                    height: normalize(120),
                    width: normalize(120),
                  },
                ]}
                source={{uri: dataBooks.image}}
              />
            ) : null}
          </View> */}
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.viewList}>
                <Image
                  style={[
                    {
                      position: 'absolute',
                      height: normalize(120),
                      width: normalize(120),
                      flex: 1,
                    },
                  ]}
                  source={{uri: dataBooks.image}}
                />
                <View style={styles.viewLocation}>
                  <Text style={styles.textLocation}>{item.name}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeForm;

const styles = StyleSheet.create({
  text: {
    color: 'rgba(40,29,28,0.8)',
    fontSize: normalize(25),
    fontWeight: '500',
    alignSelf: 'center',
    top: normalize(10),
    left: normalize(30),
  },
  textLocation: {
    color: 'black',
    margin: normalize(5),
    fontWeight: '500',
    fontSize: normalize(20),
    alignSelf: 'flex-start',
    left: normalize(20),
  },
  textHour: {
    color: '#FFFFFF',
    margin: normalize(5),
    fontSize: normalize(30),
    alignSelf: 'center',
    top: normalize(11),
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
  viewList: {
    alignItems: 'center',
    height: normalize(60),
    marginHorizontal: normalize(5),
    marginVertical: normalize(5),
    flexDirection: 'row',
  },
  viewLocation: {
    borderRadius: normalize(15),
    width: normalize(190),
  },
  viewHour: {
    borderRadius: normalize(15),
    height: normalize(62),
    left: normalize(7),
    width: normalize(120),
  },
});
