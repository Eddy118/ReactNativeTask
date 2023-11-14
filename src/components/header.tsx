import React from 'react';
import type {PropsWithChildren} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppColor, White} from '../constants';
import {IUser} from '../interface';
import {useAuth} from '../context/auth-content';

type HeaderProps = PropsWithChildren<{
  title: string;
  showUserAvatar?: boolean;
  user: any;
  cartItems: string;
}>;

const Header = ({title, showUserAvatar, user}: HeaderProps): JSX.Element => {
  const {cartProducts, isInternetAvailable} = useAuth();
  const navigation = useNavigation();

  const cart = cartProducts?.length || 0;

  return (
    <View
      style={[
        Styles.container,
        {backgroundColor: isInternetAvailable?.isConnected ? AppColor : 'gray'},
      ]}>
      {showUserAvatar ? (
        <Image
          source={{
            uri:
              user?.avatar ||
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dprofile%2Bplaceholder&psig=AOvVaw1eueGW9B84tHum7cok0PNI&ust=1699105331269000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCNCQ6979p4IDFQAAAAAdAAAAABAD',
          }}
          style={{resizeMode: 'contain', width: 20, height: 20}}
        />
      ) : (
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets//icons/backIcon.png')}
            style={{
              resizeMode: 'contain',
              width: 25,
              height: 25,
              tintColor: White,
            }}
          />
        </Pressable>
      )}

      <Text style={Styles.titleTxt}>{title}</Text>

      <Pressable onPress={() => navigation.push('cart')}>
        <Image
          source={require('../assets/icons/cart.png')}
          style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            tintColor: White,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: -10,
            backgroundColor: '#19a8b0',
            width: 15,
            height: 15,
            borderRadius: 50,
          }}>
          <Text style={{color: White, fontSize: 10}}>{cart}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Header;

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: AppColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  titleTxt: {
    color: White,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
