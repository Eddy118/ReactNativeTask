import React, {useRef, useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar, useColorScheme
} from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/header';
import {
  AppColor,
  Black,
  BlackLite,
  Secondary,
  secondary,
  White,
  WhiteLite,
} from '../../constants';
import {IProduct} from '../../interface';
import Input from '../../components/input';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export type RootStackParamList = {};

type PaymentScreenProps = NativeStackScreenProps<{}>;
const Payment: React.FC<PaymentScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [activeItem, setActiveItem] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const isCarousel = useRef();

  const getProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=13', {
      method: 'GET',
    });

    const data = await res.json();
    setCart(data?.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Cart',
      text2: 'Product added',
    });
  };

  return (
    <SafeAreaView
    style={{flex : 1 , backgroundColor : '#ffff'}}
    >
         <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header title="Billing Address" />
      <View style={Styles.contentContainer}>
        <View
          style={Styles.paymentTypeContainer}>
          <TouchableOpacity>
            <View
              style={Styles.selectedPayment}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/logo.jpg')}
              style={Styles.paymentIcon}
            />
            <Text>Cash on Delivery here</Text>
          </View>
        </View>

        <View
          style={Styles.paymentTypeContainer}>
          <TouchableOpacity>
            <View
              style={Styles.selectedPayment}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/logo.jpg')}
              style={Styles.paymentIcon}
            />
            <Text>Cash on Delivery here</Text>
          </View>
        </View>
      </View>
      
      <View
        style={Styles.confirmBtnContainer}>
        <TouchableOpacity
        onPress={() => navigation.push('review')}
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
   marginTop: 30, height: '71.5%', marginBottom: 10
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
  selectedPayment : {
   width: 20,
   height: 20,
   borderRadius: 50,
   backgroundColor: Secondary,
  },
  paymentIcon: {
   resizeMode: 'contain', height: 20, width: 20
  },
  confirmBtnContainer:{
   marginHorizontal: 10,
   height: '10%',
   alignItems: 'center',
   justifyContent: 'flex-end',
   marginTop: 20,
  },
  confirmBtn : {
   width: '90%',
   borderRadius: 10,
   backgroundColor: AppColor,
   alignItems: 'center',
   padding: 13,
  }
});

export default Payment;
