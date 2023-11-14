import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Input from '../../components/input';
import {Black, USERS} from '../../constants';
import Styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerModal} from '../../components/imagePickerModal';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  failureToast,
  getItemByKey,
  setItemByKey,
  successToast,
  ValidateEmail,
} from '../../helpers';
import Header from '../../components/header';
import {useAuth} from '../../context/auth-content';
import {StackActions} from '@react-navigation/native';

export type RootStackParamList = {};

type ProfileScreenProps = NativeStackScreenProps<{}>;

const Profile: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {user, cartProducts, isInternetAvailable} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState<string>(user?.email);
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>(user?.firstName);
  const [lastName, setLastName] = useState<string>(user?.lastName);

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

  // function to update User info pausing it here due to submission
  const createUser = async (uri: string) => {
    try {
      if (!firstName || !lastName || !email) {
        // error messages can be moved to constants file as well
        failureToast('Please fill all fields and then try agin');
        return;
      }

      if (!ValidateEmail(email)) {
        failureToast('Invalid Email');
        return;
      }

      const users = await getItemByKey(USERS);

      const activeUserUpdatedInfo = [
        {
          id: user?.id,
          firstName,
          lastName,
          email: email.toLowerCase(),
          avatar: uri,
        },
      ];

      const activeUserIndex = users.findIndex(item => item?.id === user?.id);

      if (activeUserIndex >= 0) {
        users[activeUserIndex] = activeUserUpdatedInfo;

        await setItemByKey(USERS, users);

        successToast('User updated');

        return;
      }

      successToast('Somrthing went wrong');
    } catch (error) {}
  };

  const logoutUser = () => {
    navigation.dispatch(StackActions.replace('login'));
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

      <Header
        title={'Profile'}
        showUserAvatar={true}
        user={user}
        cartItems={cartProducts?.length || '0'}
      />

      {!isInternetAvailable?.isConnected && (
        <View style={Styles.productTitleContainer}>
          <Text style={Styles.appOffline}>
            App is in offline Mode and few features may not work
          </Text>
        </View>
      )}

      {isInternetAvailable?.isConnected && (
        <TouchableOpacity
          onPress={() => logoutUser()}
          style={Styles.logoutContainer}>
          <Text style={Styles.logoutTxt}>Logout</Text>
        </TouchableOpacity>
      )}

      {isInternetAvailable?.isConnected ? (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={Styles.contentContainer}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{alignSelf: 'center', borderWidth: 1}}>
              <Image
                source={{
                  uri: uri ?? user?.avatar,
                }}
                style={{width: 80, height: 80}}
              />

              <View style={{position: 'absolute', right: -10, top: -10}}>
                <Image
                  source={require('../../assets/images/plus.png')}
                  style={{width: 30, height: 30, resizeMode: 'contain'}}
                />
              </View>
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

              {/* <Pressable onPress={() => createUser(uri)} style={Styles.loginBtn}>
              <Text style={Styles.login}>Update Profile</Text>
            </Pressable> */}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{flex : 1}}>
          <Text style={{color : Black, fontSize : 14 , marginTop : '60%',paddingHorizontal : 20, alignSelf : 'center', fontWeight : 'bold'}}>
            Your profile Data will show here once your internet get's restored
            and you login/signup using your email and password
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
