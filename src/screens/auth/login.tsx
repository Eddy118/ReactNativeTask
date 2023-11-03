import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Pressable,
  StatusBar,
  useColorScheme,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackActions} from '@react-navigation/native';
import Input from '../../components/input';
import {Black, invalidEmail, SecretText, USERS} from '../../constants';
import Styles from './styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';
import {getItemByKey, ValidateEmail} from '../../helpers';
import {IUser} from '../../interface';
import CryptoJS from 'react-native-crypto-js';

export type RootStackParamList = {};

type loginScreenProps = NativeStackScreenProps<{}>;

const Login: React.FC<loginScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validatePassword = () => {
    return true;
  };
  const loginUser = async () => {
    if (ValidateEmail(email) && validatePassword()) {
      const allUsers = await getItemByKey(USERS);

      if (!allUsers) {
        const user: IUser = allUsers.find(
          (item: IUser) => item.email === email,
        );

        if (!user) {
          // invlaid email or password toast needs to be shown here
          Alert.alert('No User found');
        }

        const decryptedTxt = CryptoJS.AES.decrypt(user.password, SecretText);
        const originalPasswordVal = decryptedTxt.toString(CryptoJS.enc.Utf8);

        if(email !== user.email || password !== originalPasswordVal ){

            // invlaid email or password toast needs to be shown here
            Alert.alert('Invalid email or Password');
        }

        // will show Error Message Here
      }

      // will add user finding and email + password matching logic here
      navigation.dispatch(StackActions.replace('dashboard', {email}));
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Image source={require('../../assets/logo.jpg')} style={Styles.logo} />
      <View style={Styles.contentContainer}>
        <View style={Styles.content}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            error={emailError}
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

          <Pressable style={Styles.forgotPasswordBtn}>
            <Text style={{color: Black}}>Forgot password</Text>
          </Pressable>

          <Pressable onPress={() => loginUser()} style={Styles.loginBtn}>
            <Text style={Styles.login}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.push('signup')}>
            <Text style={{color: Black}}>Don't have an account ?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
