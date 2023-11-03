import React from 'react';
import type {PropsWithChildren} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AppColor, White} from '../constants';

type HeaderProps = PropsWithChildren<{
  title: string;
  showUserAvatar?: boolean;
}>;

const Header = ({
  title,
  showUserAvatar,
}: HeaderProps): JSX.Element => {

 const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      {showUserAvatar ? (
        <Image
          source={require('../assets/logo.jpg')}
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

      <Pressable
      onPress={() => navigation.push('cart')}
      >
        <Image
          source={require('../assets/icons/cart.png')}
          style={{resizeMode: 'contain', width: 20, height: 20,tintColor : White}}
        />
        <View style={{
         justifyContent : 'center', alignItems : 'center',
         position : 'absolute', right :0 , top : -10 ,   backgroundColor: '#19a8b0',width : 15 , height : 15, borderRadius : 50}}>
         <Text style={{color : White, fontSize : 10}}>2</Text>
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
