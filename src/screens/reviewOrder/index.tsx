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

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export type RootStackParamList = {};

type ReviewOrderScreenProps = NativeStackScreenProps<{}>;
const ReviewOrder: React.FC<ReviewOrderScreenProps> = ({navigation}) => {
  const [activeItem, setActiveItem] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const isCarousel = useRef();

  const getProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=10', {
      method: 'GET',
    });

    const data = await res.json();
    setProducts(data?.products);
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

  const renderCartListing = (item: IProduct) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderWidth: 1,
          borderColor: 'gray',
          marginHorizontal: 10,
          marginVertical: 5,
          borderRadius: 10,
          backgroundColor: White,
        }}>
        <Image
          source={{uri: item?.images[0]}}
          style={{width: 100, height: 100, resizeMode: 'contain'}}
        />
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <View style={{paddingHorizontal: 10}}>
            <Text style={Styles.title}>{item?.title || ''}</Text>
            <View
              style={{
                flexDirection: 'row',
                width: 120,
                justifyContent: 'space-between',
              }}>
              <Text style={Styles.priceTxt}>£ ${item?.price || ''}</Text>
              <Text style={{paddingLeft: 10, color: AppColor}}>Each</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: 120,
                justifyContent: 'space-between',
              }}>
              <Text style={Styles.priceTxt}>£ ${item?.price * 2 || ''}</Text>
              <Text style={{paddingLeft: 10, color: AppColor}}>Subtotal</Text>
            </View>
            <View style={{justifyContent: 'flex-end', marginTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 130,
                  justifyContent: 'flex',
                }}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>
                  Qty: {productQuantity}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Header title="Review Order" />
      <View style={Styles.contentContainer}>
        <View style={{height: '70%'}}>
          <FlatList
            data={products ?? []}
            renderItem={({item}) => renderCartListing(item)}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: AppColor,
            padding: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: White,
          }}>
          <View style={Styles.productPricingDetails}>
            <Text style={Styles.heading}>Subttoal</Text>
            <Text style={Styles.headingDetail}>Subtoal</Text>
          </View>

          <View style={Styles.productPricingDetails}>
            <Text style={Styles.heading}>Shipping</Text>
            <Text style={Styles.headingDetail}>Shipping</Text>
          </View>
          <View style={Styles.productPricingDetails}>
            <Text style={Styles.heading}>Total</Text>
            <Text style={Styles.headingDetail}>Total</Text>
          </View>
        </View>
      </View>
      <View style={Styles.confirmBtnContainer}>
        <TouchableOpacity style={Styles.confirmBtn}>
          <Text style={{fontSize: 14, color: White}}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  productPricingDetails: {
   flexDirection : 'row', justifyContent : 'space-between'
  },
});

export default ReviewOrder;
