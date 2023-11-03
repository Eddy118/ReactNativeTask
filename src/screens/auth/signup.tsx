import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Input from '../../components/input';
import {Black, SecretText, USERS} from '../../constants';
import Styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerModal} from '../../components/imagePickerModal';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Alert} from 'react-native';
import {getItemByKey, setItemByKey} from '../../helpers';
import CryptoJS from 'react-native-crypto-js';
import {v4 as uuidv4} from 'uuid';

export type RootStackParamList = {};

type loginScreenProps = NativeStackScreenProps<{}>;

const Login: React.FC<loginScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse).finally(() => {
      setVisible(false);
    });
  }, []);

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse).finally(() => {
      setVisible(false);
    });
  }, []);

  const createUser = async () => {
    try {
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        Alert.alert('missing info');

        return;
        // show Required Fields Error
      }

      const users = await getItemByKey(USERS);

        // To Make sure User info is secure I'm encrypting user password
      const encryptPassword = CryptoJS.AES.encrypt(
        password,
        SecretText,
      ).toString();
      if (!users) {

      
        const newUser = [
          {
            id: uuidv4(),
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptPassword,
          },
        ];

        await setItemByKey(USERS, newUser);
      } else {

        users.push({
          id: uuidv4(),
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: encryptPassword,
        });

        await setItemByKey(USERS, users);
      }

      navigation.navigate('login');

      Alert.alert('User Created ');
    } catch (error) {}
  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {visible && (
        <ImagePickerModal
          isVisible={visible}
          onClose={() => setVisible(false)}
          onImageLibraryPress={onImageLibraryPress}
          onCameraPress={onCameraPress}
        />
      )}

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/logo.jpg')}
            style={Styles.logo}
          />
        </TouchableOpacity>
        <View style={Styles.contentContainer}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{alignSelf: 'center'}}>
            <Image
              source={uri ? {uri: uri} : require('../../assets/logo.jpg')}
              style={{width: 80, height: 80}}
            />
          </TouchableOpacity>
          <View style={Styles.content}>
            <Input
              style={{
                marginTop: 20,
              }}
              placeholder="First Name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />

            <Input
              style={{
                marginTop: 10,
              }}
              placeholder="Last Name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />

            <Input
              style={{
                marginTop: 10,
              }}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />

            <Input
              style={{
                marginTop: 10,
              }}
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />

            <Input
              style={{
                marginTop: 10,
              }}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry
            />

            <Pressable onPress={() => createUser()} style={Styles.loginBtn}>
              <Text style={Styles.login}>Sign up</Text>
            </Pressable>

            <Pressable onPress={() => navigation.push('login')}>
              <Text style={{color: Black}}>Alreay have an account ?</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
