import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Pressable,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackActions} from '@react-navigation/native';
import Input from '../../components/input';
import {Black, SecretText, USERS} from '../../constants';
import Styles from './styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  failureToast,
  getItemByKey,
  ValidateEmail,
} from '../../helpers';
import {IUser} from '../../interface';
import CryptoJS from 'react-native-crypto-js';
import {useAuth} from '../../context/auth-content';

export type RootStackParamList = {};

type loginScreenProps = NativeStackScreenProps<{}>;

const Login: React.FC<loginScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {setUser} = useAuth();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginUser = async () => {
    if (!email || !password) {
      failureToast('Please fill email and password and then try again');
      return;
    }
    if (ValidateEmail(email)) {
      const allUsers = await getItemByKey(USERS);

      if (!allUsers) {
        failureToast('Invalid email or password');
        return;
      }

      const user: IUser = allUsers.find((item: IUser) => item.email === email);

      if (!user) {
        failureToast('Invalid email or password');
        return;
      }

      const decryptedTxt = CryptoJS.AES.decrypt(user.password, SecretText);
      const originalPassword = decryptedTxt.toString(CryptoJS.enc.Utf8);

      if (email === user.email && password === originalPassword) {
        setUser(user);
        navigation.dispatch(StackActions.replace('dashboard'));
      } else {
        // invlaid email or password toast needs to be shown here
        failureToast('invalid email or password');
      }
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

          <Pressable
            onPress={() => navigation.push('forgotPassword')}
            style={Styles.forgotPasswordBtn}>
            <Text style={{color: Black}}>Forgot password ?</Text>
          </Pressable>

          <Pressable onPress={() => loginUser()} style={Styles.loginBtn}>
            <Text style={Styles.login}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.push('signup')}>
            <Text style={{color: Black}}>Don't have an account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
