import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/splash'
import Signup from '../screens/auth/signup';
import Login from '../screens/auth/login';
import Dashboard from '../screens/dashboard/';


import * as React from 'react';
import { Text, View , Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductDetails from '../screens/productDetails';
import { AppColor } from '../constants';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
import Payment from '../screens/payment';
import ReviewOrder from '../screens/reviewOrder';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="login" component={Login} /> 
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="dashboard" component={BottomTabs} />
      <Stack.Screen name="productDetails" component={ProductDetails} />
      <Stack.Screen name="cart" component={Cart} />
      <Stack.Screen name="checkout" component={Checkout} />
      <Stack.Screen name="payment" component={Payment} />
      <Stack.Screen name="review" component={ReviewOrder} />

    
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        
        if (route.name === 'Home') {
          console.log({color})
          return (
            <Image
              source={require('../assets/icons/home.png')}
              style={{width : 20 , height : 20 , resizeMode : 'contain', tintColor  : focused ? AppColor : 'gray'}}
            />
          );
        } else if (route.name === 'Orders') {
          return (
           <Image
              source={require('../assets/icons/order.png')}
              style={{width : 20 , height : 20 , resizeMode : 'contain',tintColor  : focused ? AppColor : 'gray'}}
            />
          );
        } else if (route.name === 'Profile') {
          return (
           <Image
              source={require('../assets/icons/profile.png')}
              style={{width : 20 , height : 20 , resizeMode : 'contain', tintColor  : focused ? AppColor : 'gray'}}
            />
          );
        }
      },
      tabBarInactiveTintColor: 'gray',
      tabBarActiveTintColor: AppColor,
      headerShown: false,
     tabBarShowLabel: false,
    })}
  >
    <Tab.Screen
      name="Home"
      component={Dashboard}
    />
    <Tab.Screen name="Orders" component={Dashboard} />
    <Tab.Screen name="Profile" component={Dashboard} />
  </Tab.Navigator>
  )
}

export default MyStack;


