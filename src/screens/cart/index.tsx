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
  StatusBar,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/header';
import {AppColor, Black, BlackLite, White} from '../../constants';
import {IProduct} from '../../interface';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAuth} from '../../context/auth-content';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export type RootStackParamList = {};

type CartScreenProps = NativeStackScreenProps<{}>;
const Cart: React.FC<CartScreenProps> = ({navigation}) => {
  const {cartProducts, setOrder, setCartProducts} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [activeItem, setActiveItem] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [shippingCharges] = useState(10);
  const isCarousel = useRef();

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

  const decreaseQuantity = (product, index) => {
    const activeUserCartProducts = [...cartProducts];
    const selectedProductIndex = activeUserCartProducts.findIndex(
      item => item?.id === product?.cartId,
    );

    if (
      selectedProductIndex >= 0 &&
      activeUserCartProducts[selectedProductIndex].productQuantity > 1
    ) {
      activeUserCartProducts[selectedProductIndex].productQuantity =
        activeUserCartProducts[selectedProductIndex].productQuantity - 1;
      setCartProducts(activeUserCartProducts);
    }
  };
  const increaseQuantity = product => {
    const activeUserCartProducts = [...cartProducts];
    const selectedProductIndex = activeUserCartProducts.findIndex(
      item => item?.id === product?.cartId
    );
    if (selectedProductIndex >= 0) {
      activeUserCartProducts[selectedProductIndex].productQuantity =
        activeUserCartProducts[selectedProductIndex].productQuantity + 1;
        console.log({activeUserCartProducts});
      setCartProducts(activeUserCartProducts);
    }
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
            <View style={{justifyContent: 'flex-end', marginTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 130,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  disabled={item?.quantity === 1}
                  onPress={() => {
                    if (item?.quantity > 1) {
                      decreaseQuantity(item, index);
                    }
                  }}
                  style={{
                    backgroundColor: item?.quantity === 1 ? 'gray' : '#19a8b0',
                    borderRadius: 50,
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/icons/minus.png')}
                    style={{
                      resizeMode: 'contain',
                      width: 20,
                      height: 20,
                      tintColor: White,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 16, fontWeight: '700', color: Black}}>
                  {item?.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: '#19a8b0',
                    borderRadius: 50,
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/icons/plus.png')}
                    style={{
                      resizeMode: 'contain',
                      width: 20,
                      height: 20,
                      tintColor: White,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: White,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header title="Cart" />
      <View style={{marginTop: 30, height: '60%', marginBottom: 10}}>
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

      <View
        style={{
          marginHorizontal: 10,
          height: '10%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 20,
          width: '90%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setOrder({
              products: cart,
            });
            navigation.push('checkout', {});
          }}
          style={{
            width: '90%',
            borderRadius: 10,
            backgroundColor: AppColor,
            alignItems: 'center',
            padding: 13,
          }}>
          <Text style={{fontSize: 14, color: White}}>Checkout</Text>
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

export default Cart;
