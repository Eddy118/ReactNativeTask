import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import {
  AppColor,
  Black,
  BlackLite,
  CART,
  White,
  WhiteLite,
} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ICartProducts} from '../../interface';
import {useAuth} from '../../context/auth-content';
import {getItemByKey, setItemByKey} from '../../helpers';
import {v4 as uuidv4} from 'uuid';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export type RootStackParamList = {};

type ProductDetailsScreenProps = NativeStackScreenProps<{}>;
const ProductDetails: React.FC<ProductDetailsScreenProps> = ({
  navigation,
  route: {
    params: {product},
  },
}) => {
  const {user, setCartProducts, isInternetAvailable} = useAuth();
  const [activeItem, setActiveItem] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const isCarousel = useRef();
  const {images, brand, price, rating, discountPercentage, description, title} =
    product;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const _renderItem = ({item}) => {
    return (
      <>
        <Image
          source={{uri: item}}
          style={{resizeMode: 'contain', width: '100%', height: 300}}
        />
      </>
    );
  };

  const addProductToCart = async () => {
    const addToCart: ICartProducts = {
      id: uuidv4(),
      productId: product.id,
      userId: user?.id,
      email: user?.email,
      productQuantity: productQuantity,
    };

    const usersCartItems = await getItemByKey(CART);
    const userCart = [addToCart];

    // check if cart already exist in our local storage but if not then we will store a new array with Cart key
    // right now we're treating every product added in cart as individual
    // entry but we can also increase the quantity of the products if we add the same product

    if (!usersCartItems) {
      setItemByKey(CART, userCart);
      setCartProducts(userCart);
    } else {
      const allUsersCartItems = [...usersCartItems];
      allUsersCartItems.push(addToCart);
      setItemByKey(CART, allUsersCartItems);

      // filtering our current active user cart items
      const activeUserCartItems = allUsersCartItems.filter(
        item => item?.email === user?.email,
      );
      setCartProducts(activeUserCartItems);
    }
    showToast();
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Cart',
      text2: 'Product added',
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffff'}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header title={'product Details'} />
      {!isInternetAvailable?.isConnected && (
        <View style={Styles.productTitleContainer}>
          <Text style={Styles.appOffline}>
            App is in offline Mode and few features may not work
          </Text>
        </View>
      )}
      <View>
        <View>
          {!isInternetAvailable?.isConnected ? (
            <Image
              source={require('../../assets/images/productPlaceholder.png')}
              alt={'No product image found'}
              style={{
                width: '80%',
                height: 300,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          ) : (
            <Carousel
              layoutCardOffset={15}
              ref={isCarousel}
              data={images || ['']}
              renderItem={_renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              onSnapToItem={(index: number) => setActiveItem(index)}
              useScrollView={true}
            />
          )}
        </View>

        <View style={{marginHorizontal: 20, marginVertical: 20}}>
          <View style={Styles.flexRowSpace}>
            <Text style={Styles.title}>{title}</Text>
            <Text style={Styles.priceTxt}>{price} £</Text>
          </View>
          <View style={[Styles.flexRowSpace, {marginVertical: 10}]}>
            <Text style={Styles.brandTxt}>Brand : </Text>
            <Text style={Styles.brandTxt}>{brand}</Text>
          </View>

          <Text style={Styles.descriptionTitle}>Description</Text>
          <Text style={Styles.descriptionTxt}>{description}</Text>
        </View>

        <Toast />
        <View>
          <View
            style={{
              height: '45%',
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: 130,
                justifyContent: 'space-between',
                height: 40,
              }}>
              <TouchableOpacity
                disabled={productQuantity === 1}
                onPress={() => {
                  if (productQuantity > 1) {
                    setProductQuantity(productQuantity - 1);
                  }
                }}
                style={{
                  backgroundColor: productQuantity === 1 ? 'gray' : '#19a8b0',
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
                {productQuantity}
              </Text>
              <TouchableOpacity
                onPress={() => setProductQuantity(productQuantity + 1)}
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
            <TouchableOpacity
              disabled={!isInternetAvailable?.isConnected}
              onPress={() => {
                if (isInternetAvailable?.isConnected) {
                  addProductToCart();
                }
              }}
              style={[
                Styles.confirmBtn,
                {
                  backgroundColor: !isInternetAvailable?.isConnected
                    ? 'gray'
                    : '#f3702a',
                },
              ]}>
              <Text style={{color: White, fontWeight: '500'}}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: Black,
  },
  priceTxt: {
    fontSize: 18,
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
  confirmBtn: {
    width: 180,
    height: 40,
    backgroundColor: '#f3702a',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 20,
  },
  productTitleContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Black,
  },
  appOffline: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Black,
  },
});

export default ProductDetails;
