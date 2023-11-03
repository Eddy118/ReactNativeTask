import React, {useState, useEffect} from 'react';
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
  CART,
  ORDERS,
  Secondary,
  secondary,
  White,
  WhiteLite,
} from '../../constants';
import {IProduct} from '../../interface';
import Input from '../../components/input';
import {useAuth} from '../../context/auth-content';
import {v4 as uuidv4} from 'uuid';
import {
  failureToast,
  getItemByKey,
  setItemByKey,
  successToast,
} from '../../helpers';
import {StackActions} from '@react-navigation/native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export type RootStackParamList = {};

type ReviewOrderScreenProps = NativeStackScreenProps<{}>;
const ReviewOrder: React.FC<ReviewOrderScreenProps> = ({navigation}) => {
  const {
    cartProducts,
    setOrder,
    setCartProducts,
    deliveryAddress,
    payment,
    user,
  } = useAuth();
  const [activeItem, setActiveItem] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [shippingCharges] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async (id: string) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  };

  const getCartProductDetails = async () => {
    const cartItems = [];
    for await (const item of cartProducts) {
      const product: IProduct = await getProducts(item?.productId);
      const addToCartItem = {
        quantity: item?.productQuantity || 1,
        cartId: item?.id,
        ...product,
      };
      cartItems.push(addToCartItem);
    }
    setCart(cartItems);
  };

  useEffect(() => {
    getCartProductDetails();
  }, [cartProducts]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Cart',
      text2: 'Product added',
    });
  };

  const renderCartListing = (item, index) => {
    const subtotal = item?.price * item?.quantity;
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
                width: 180,
                justifyContent: 'space-between',
              }}>
              <Text style={Styles.priceTxt}>£ ${item?.price || ''}</Text>
              <Text style={{paddingLeft: 10, color: AppColor}}>Each</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: 180,
                justifyContent: 'space-between',
              }}>
              <Text style={Styles.priceTxt}>£ {subtotal || ''}</Text>
              <Text style={{paddingLeft: 10, color: AppColor}}>Subtotal</Text>
            </View>
            <View style={{justifyContent: 'flex-end', marginTop: 10}}></View>
          </View>
        </View>
      </View>
    );
  };

  const getCartSubTotal = () => {
    let subTotal = 0;
    cart?.map(item => {
      subTotal = subTotal + item.price * item?.quantity;
    });
    return subTotal;
  };

  const getCartTotal = () => {
    let subTotal = 0;
    cart?.map(item => {
      subTotal = subTotal + item.price * item?.quantity;
    });

    subTotal = subTotal + shippingCharges;
    return subTotal;
  };

  const removeCartProducts = async () => {
    const localStorageCart = await getItemByKey(CART);

    if (!localStorageCart) {
      failureToast('No Item found in Cart');
    }

    const updateCart = localStorageCart.filter(
      item => item?.email !== user?.email,
    );
    await setItemByKey(CART, updateCart);
  };

  const placeOrder = async () => {
    const orderDetail = {
      id: uuidv4(),
      cartProducts,
      deliveryAddress,
      payment,
      userId: user?.id,
    };
    const ordersList = await getItemByKey(ORDERS);

    if (!ordersList) {
      const activeUserOrder = [orderDetail];
      setItemByKey(ORDERS, activeUserOrder);
      successToast('Order Place Successfully');
    } else {
      ordersList.push(orderDetail);
      setItemByKey(ORDERS, ordersList);
      successToast('Order Place Successfully');
    }
    await removeCartProducts();
    setCartProducts([]);
    navigation.dispatch(StackActions.replace('dashboard'));
  };

  return (
    <View>
      <Header title="Review Order" />
      <View style={Styles.contentContainer}>
        <View style={{height: '80%'}}>
          <FlatList
            keyExtractor={(item, index) => String(index)}
            data={cart ?? []}
            renderItem={({item, index}) => renderCartListing(item, index)}
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
            width: '90%',
            alignSelf: 'center',
          }}>
          <View style={Styles.productPricingDetails}>
            <Text style={Styles.heading}>SubTotal</Text>
            <Text style={Styles.headingDetail}>£ {getCartSubTotal()}</Text>
          </View>

          <View style={Styles.productPricingDetails}>
            <Text style={Styles.heading}>Shipping</Text>
            <Text style={Styles.headingDetail}>£ {shippingCharges}</Text>
          </View>
          <View style={Styles.productPricingDetails}>
            <Text style={Styles.heading}>Total</Text>
            <Text style={Styles.headingDetail}>£ {getCartTotal()}</Text>
          </View>
        </View>
      </View>
      <View style={Styles.confirmBtnContainer}>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => placeOrder()}
          style={Styles.confirmBtn}>
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
  heading: {
    fontSize: 16,
    color: Black,
  },
  headingDetail: {
    fontSize: 16,
    color: AppColor,
  },
  productPricingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ReviewOrder;
