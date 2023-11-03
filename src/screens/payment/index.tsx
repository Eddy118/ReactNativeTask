import React, { useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/header';
import {
  AppColor,
  Black,
  Secondary,
  White,
  WhiteLite,
} from '../../constants';
import Input from '../../components/input';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAuth} from '../../context/auth-content';
import { successToast } from '../../helpers';
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export type RootStackParamList = {};

type PaymentScreenProps = NativeStackScreenProps<{}>;
const Payment: React.FC<PaymentScreenProps> = ({navigation}) => {
  const {setPayment} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvc, setCVC] = useState<string>('');

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Cart',
      text2: 'Product added',
    });
  };
  const onPaymentConfirm = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiry || !cvc) {
        successToast('Please provide required card InformATION')
        return;
      }
    }

    const paymentDetails =
      paymentMethod === 'card'
        ? {paymentMethod}
        : {paymentMethod, cardNumber, cvc, expiry};
    setPayment(paymentDetails);

    navigation.push('review', {});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: White}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header title="Payment" />
      <View style={Styles.contentContainer}>
        <View style={Styles.paymentTypeContainer}>
          <TouchableOpacity onPress={() => setPaymentMethod('cash')}>
            <View
              style={[
                Styles.selectedPayment,
                {
                  backgroundColor:
                    paymentMethod === 'cash' ? Secondary : WhiteLite,
                  borderWidth: paymentMethod === 'cash' ? 0 : 1,
                },
              ]}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/icons/cash.png')}
              style={Styles.paymentIcon}
            />
            <Text style={{color: Black}}>Cash on Delivery</Text>
          </View>
        </View>

        <View style={Styles.paymentTypeContainer}>
          <TouchableOpacity onPress={() => setPaymentMethod('card')}>
            <View
              style={[
                Styles.selectedPayment,
                {
                  backgroundColor:
                    paymentMethod === 'card' ? Secondary : WhiteLite,
                  borderWidth: paymentMethod === 'card' ? 0 : 1,
                },
              ]}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/icons/card.png')}
              style={Styles.paymentIcon}
            />
            <Text style={{color: Black}}>Card Payment</Text>
          </View>
        </View>

        {paymentMethod === 'card' ? (
          <View style={{paddingTop: 50}}>
            <Text
              style={{
                color: Black,
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              Card Details
            </Text>
            <Input
              placeholder="Card Number"
              onChangeText={val => setCardNumber(val)}
              value={cardNumber}
              fullWidth
            />
            <Input
              placeholder="expiry (MM/YY)"
              onChangeText={val => {
                if (val?.length > expiry?.length && val?.length === 2) {
                  setExpiry(val + '/');
                  return;
                } else if (
                  val.length > 2 &&
                  !val.includes('/') &&
                  val.length <= 5
                ) {
                  var txt2 = val.slice(0, 2) + '/' + val.slice(2);
                  setExpiry(txt2);
                } else if (val.length <= 5) {
                  setExpiry(val);
                }
              }}
              value={expiry}
              numeric
            />
            <Input
              placeholder="CVC"
              onChangeText={val => {
                if (val?.length <= 3) {
                  setCVC(val);
                }
              }}
              value={cvc}
              numeric
            />
          </View>
        ) : null}
      </View>

      <View style={Styles.confirmBtnContainer}>
        <TouchableOpacity
          onPress={() => onPaymentConfirm()}
          // onPress={() => navigation.push('review')}
          style={Styles.confirmBtn}>
          <Text style={{fontSize: 14, color: White}}>Confirm payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: Black,
  },
  priceTxt: {
    fontSize: 14,
    fontWeight: '800',
    color: Black,
  },
  contentContainer: {
    marginTop: 30,
    height: '71.5%',
    marginBottom: 10,
  },
  paymentTypeContainer: {
    width: '90%',
    padding: 10,
    flexDirection: 'row',
    marginLeft: '5%',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  selectedPayment: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: Secondary,
  },
  paymentIcon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginRight: 10,
  },
  confirmBtnContainer: {
    marginHorizontal: 10,
    height: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  confirmBtn: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: AppColor,
    alignItems: 'center',
    padding: 13,
  },
});

export default Payment;
