import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Header from '../../components/header';
import {AppColor, Black, BlackLite, White} from '../../constants';
import Input from '../../components/input';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAuth} from '../../context/auth-content';
import {successToast} from '../../helpers';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export type RootStackParamList = {};

type CheckoutScreenProps = NativeStackScreenProps<{}>;
const Checkout: React.FC<CheckoutScreenProps> = ({navigation}) => {
  const {setDeliveryAddress} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [countury, setCountury] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [town, setTown] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [contactNo, setContactNo] = useState<string>('');

  const onSubmitBillingAddress = () => {
    if (!countury || !city || !town || !postalCode || !contactNo) {
      successToast('Please fill are adress fields and then try again');
      return;
    }

    const addressinfo = {
      countury,
      city,
      town,
      postalCode,
      contactNo,
    };

    setDeliveryAddress(addressinfo);

    navigation.push('payment', {});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fffff'}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header title="Billing Address" />
      <View style={{marginTop: 30, height: '71.5%', marginBottom: 10}}>
        <Input
          placeholder="Countury"
          fullWidth
          onChangeText={val => setCountury(val)}
          value={countury}
        />
        <Input
          placeholder="City"
          fullWidth
          onChangeText={val => setCity(val)}
          value={city}
        />
        <Input
          placeholder="Town"
          fullWidth
          onChangeText={val => setTown(val)}
          value={town}
        />
        <Input
          placeholder="Postal Code"
          fullWidth
          onChangeText={val => setPostalCode(val)}
          value={postalCode}
        />
        <Input
          placeholder="Contact No"
          fullWidth
          onChangeText={val => setContactNo(val)}
          value={contactNo}
          numeric
        />
      </View>

      <View
        style={{
          marginHorizontal: 10,
          height: '10%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => onSubmitBillingAddress()}
          style={{
            width: '90%',
            borderRadius: 10,
            backgroundColor: AppColor,
            alignItems: 'center',
            padding: 13,
          }}>
          <Text style={{fontSize: 14, color: White}}>Prceed To Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;
