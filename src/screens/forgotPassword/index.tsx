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
import {SecretText, USERS} from '../../constants';
import Styles from './styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  getItemByKey,
  removeItemByKey,
  successToast,
  ValidateEmail,
} from '../../helpers';
import {IUser} from '../../interface';
import CryptoJS from 'react-native-crypto-js';
import {useAuth} from '../../context/auth-content';

export type RootStackParamList = {};

type ForgotPasswordScreenProps = NativeStackScreenProps<{}>;

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [email, setEmail] = useState<string>('');
  const resetUser = () => {
    // just showing Toast for now
    successToast('Rest Email sent');
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Pressable
        onPress={() => navigation.navigate('login', {})}
        style={{position: 'absolute', top: 20, left: 20}}>
        <Image
          source={require('../../assets/icons/backIcon.png')}
          style={[Styles.logo, {width: 40, height: 40}]}
        />
      </Pressable>
      <Image source={require('../../assets/logo.jpg')} style={Styles.logo} />
      <View style={Styles.contentContainer}>
        <View style={Styles.content}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Pressable onPress={() => resetUser()} style={Styles.loginBtn}>
            <Text style={Styles.login}>Reset Password</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
