import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackActions} from '@react-navigation/native';

export type RootStackParamList = {};

type SplashScreenProps = NativeStackScreenProps<{}>;

const Splash: React.FC<SplashScreenProps> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('login', {}));
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.jpg')}
        style={{resizeMode: 'contain', width: 200, height: 200}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
});

export default Splash;
