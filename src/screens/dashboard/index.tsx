import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../components/header';
import ProductSkeleon from '../../components/productSkeleton';
import {ICartProducts, IProduct} from '../../interface';
import Styles from './styles';
import {ProductAPI} from '../../api/productAPi';
import {useAuth} from '../../context/auth-content';
import {getItemByKey} from '../../helpers';
import {CART, White} from '../../constants';

export type RootStackParamList = {};

type DasboardScreenProps = NativeStackScreenProps<{}>;

const Dasboard: React.FC<DasboardScreenProps> = ({navigation}) => {
  const {user, setCartProducts, cartProducts, isInternetAvailable} = useAuth();
  const [products, setProducts] = useState<IProduct[]>();
  const [listSize] = useState<number>(20);
  const [page, setPage] = useState<number>(0);
  const [skipSize] = useState<number>(20);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getProducts = async () => {
    if (isInternetAvailable?.isConnected) {
      const res = await ProductAPI.getAll(listSize, page * skipSize);
      if (products && products?.length > 0) {
        const allProducts = [...(products as IProduct[]), ...res];
        setProducts(allProducts);
      } else {
        setProducts(res);
      }
    } else {
      const res = await ProductAPI.getOfflinProducts();
      setProducts(res);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page, isInternetAvailable]);

  const getUserCartProducts = async () => {
    const usersCart = await getItemByKey(CART);
    if (usersCart) {
      const activeUserCartItems = usersCart.filter(
        (item: ICartProducts) => item.email === user?.email,
      );

      setCartProducts(activeUserCartItems);
    }
  };

  useEffect(() => {
    getUserCartProducts();
  }, []);

  const renderProductList = (item: IProduct) => {
    return (
      <Pressable
        onPress={() =>
          navigation.push('productDetails', {
            product: item,
          })
        }
        style={Styles.listContainer}>
        <View>
          {isInternetAvailable?.isConnected ? (
            <Image
              source={{
                uri:
                  item?.thumbnail ||
                  'https://www.google.com/url?sa=i&url=https%3A%2F%2Funiversalele.websites.co.in%2Fproducts%2Fpvc-clip%2F8841&psig=AOvVaw3SLr_xs_H8w8spuWVgZHYw&ust=1699052826126000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCLC4_pW3poIDFQAAAAAdAAAAABAI',
              }}
              style={Styles.productImage}
            />
          ) : (
            <Image
              source={require('../../assets/images/productPlaceholder.png')}
              style={Styles.productImage}
            />
          )}
        </View>
        <View style={Styles.productDetails}>
          <Text style={Styles.productPricingDetail}>{item.title}</Text>
          <Text style={Styles.productPricingDetail}>{item.rating}</Text>
        </View>
        <View style={Styles.productDetails}>
          <Text style={Styles.productPricingDetail}>{item.brand}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: White}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header
        title={'HOME'}
        showUserAvatar={true}
        user={user}
        cartItems={cartProducts?.length || '0'}
      />
      {!isInternetAvailable?.isConnected && (
        <View style={Styles.productTitleContainer}>
          <Text style={Styles.appOffline}>
            App is in offline Mode and few features may not work
          </Text>
        </View>
      )}
      <View style={Styles.productTitleContainer}>
        <Text style={Styles.productTitle}>Products</Text>
      </View>

      <View style={Styles.productlistContainer}>
        <View style={Styles.productContentContainer}>
          {products && products?.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => String(index)}
              numColumns={2}
              data={products}
              renderItem={({item}) => renderProductList(item)}
              ItemSeparatorComponent={() => <View style={{height: 1}} />}
              contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.7}
              onEndReached={() => setPage(page + 1)}
            />
          ) : (
            <ProductSkeleon />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dasboard;
