import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {normalize} from '../helpers/responsive';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Svg, {Image} from 'react-native-svg';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SceneName from '../navigation/SceneNames';

type LoginForm = NativeStackNavigationProp<
  RootStackParamList,
  SceneName.HomeScreen
>;

type Props = {
  navigation: LoginForm;
};

const LoginForm = ({navigation}: Props) => {
  const {height, width} = Dimensions.get('window');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (email: string, password: string) => {
    try {
      if (password.length < 6) {
        Alert.alert('Enter Atleast Six Characters!');

        return;
      }

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        });
    } catch (error) {}
  };

  const login = (email: string, password: string) => {
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log('User account created & signed in!:', user);
        });
    } catch (error) {}
    {
      Alert.alert('Welcome!', 'Enjoy the app', [
        {
          text: 'OK',
        },
      ]);
      navigation.navigate(SceneName.HomeScreen);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'flex-end'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}>
            <Svg height={height} width={width}>
              <Image
                href={require('./imgs/books.png')}
                width={width}
                height={height}
                preserveAspectRatio="XMidyMid slice"
              />
            </Svg>
          </View>
          <View style={{justifyContent: 'center', height: height}}>
            <View
              style={{
                bottom: normalize(90),
                height: normalize(50),
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(40),
                  fontWeight: '500',
                }}>
                WELCOME
              </Text>
            </View>
            <View style={{justifyContent: 'center', bottom: normalize(30)}}>
              <TextInput
                placeholder="email"
                style={styles.inputContainer}
                value={email}
                onChangeText={email => setEmail(email)}
              />
              <View style={{marginTop: normalize(10)}}>
                <TextInput
                  placeholder="password"
                  style={styles.inputContainer}
                  secureTextEntry={true}
                  value={password}
                  autoCorrect={false}
                  onChangeText={password => setPassword(password)}
                />
                <View style={styles.fornBottom}>
                  <TouchableOpacity onPress={() => signUp(email, password)}>
                    <Text style={{fontSize: normalize(20), color: 'white'}}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.fornBottom}>
                  <TouchableOpacity onPress={() => login(email, password)}>
                    <Text style={{fontSize: normalize(20), color: 'white'}}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;

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

  fornBottom: {
    backgroundColor: 'rgba(40,29,28,0.8)',
    height: normalize(55),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(35),
    marginHorizontal: normalize(28),
    marginVertical: normalize(10),
    borderWidth: normalize(2),
    borderColor: 'white',
  },
});
