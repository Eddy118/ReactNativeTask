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

type CheckoutScreenProps = NativeStackScreenProps<{}>;
const Checkout: React.FC<CheckoutScreenProps> = ({navigation}) => {
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
    style={{flex : 1 , backgroundColor : '#fffff'}}
    >
         <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header title="Billing Address" />
      <View style={{marginTop: 30, height: '71.5%', marginBottom: 10}}>
      <Input
          placeholder="Countury"
          fullWidth
          onChangeText={val => {}}
          value={''}
        />
        <Input
          placeholder="City"
          fullWidth
          onChangeText={val => {}}
          value={''}
        />
         <Input
          placeholder="Town"
          fullWidth
          onChangeText={val => {}}
          value={''}
        />
          <Input
          placeholder="Postak Code"
          fullWidth
          onChangeText={val => {}}
          value={''}
        />
        <Input
          placeholder="Contact No"
          fullWidth
          onChangeText={val => {}}
          value={''}
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
        onPress={() => navigation.push('payment')}
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

const Styles = StyleSheet.create({
  flexRowSpace: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  brandTxt: {
    fontSize: 18,
    fontWeight: '500',
    color: Black,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Black,
  },
  descriptionTxt: {
    fontSize: 13,
    color: BlackLite,
    lineHeight: 20,
    marginTop: 8,
  },
  productPricingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
    color: Black,
  },
  headingDetail: {
    fontSize: 16,
    color: AppColor,
  },
});

export default Checkout;
