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
import {CART, ORDERS, White} from '../../constants';

export type RootStackParamList = {};

type OrdersScreenProps = NativeStackScreenProps<{}>;

const Orders: React.FC<OrdersScreenProps> = ({navigation}) => {
  const {user, setCartProducts, cartProducts} = useAuth();
  const [products, setProducts] = useState<IProduct[]>();
  const [page, setPage] = useState<number>(0);
  const [orders, setOrders] = useState([]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getUserOrderedProducts = async () => {
    const usersOrders = await getItemByKey(ORDERS);
    console.log({usersOrders});
    console.log({user});
    if (usersOrders) {
      const activeUserCartItems = usersOrders.filter(
        item => item.userId === user.id,
      );
      console.log({activeUserCartItems});
      setOrders(activeUserCartItems);
    }
  };

  useEffect(() => {
    getUserOrderedProducts();
  }, []);

  const renderProductList = item => {

    return (
      <View style={Styles.listContainer}>
         <View style={Styles.productDetails}>
          <Text style={Styles.productDetailTitle}>Number of Products</Text>
          <Text style={Styles.productDetailDescription}>{item?.cartProducts?.length}</Text>
        </View>
        <View style={Styles.productDetails}>
          <Text style={Styles.productDetailTitle}>Status</Text>
          <Text  style={Styles.productDetailDescription}>Pending</Text>
        </View>
        <View style={Styles.productDetails}>
          <Text style={Styles.productDetailTitle}>Payment Methods</Text>
          <Text style={Styles.productDetailDescription}>{item?.payment?.paymentMethod}</Text>
        </View>
        <View style={Styles.productDetails}>
          <Text style={Styles.productDetailTitle}>Contact No</Text>
          <Text style={Styles.productDetailDescription}>{item?.deliveryAddress?.contactNo}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: White, flex : 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header
        title={'Orders'}
        showUserAvatar={true}
        user={user}
        cartItems={cartProducts?.length || '0'}
      />
      <View style={Styles.productTitleContainer}>
        <Text style={Styles.productTitle}>Orders Listing</Text>
      </View>

      <View style={Styles.productlistContainer}>
        <View style={Styles.productContentContainer}>
          {orders && orders?.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => String(index)}
              numColumns={2}
              data={orders}
              renderItem={({item}) => renderProductList(item)}
              ItemSeparatorComponent={() => <View style={{height: 1}} />}
              contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ProductSkeleon />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
