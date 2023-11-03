import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import {AppColor, Black, BlackLite, White, WhiteLite} from '../../constants';

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
  const [activeItem, setActiveItem] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const isCarousel = useRef();
  const {images, brand, price, rating, discountPercentage, description, title} =
    product;
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

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Cart',
      text2: 'Product added',
    });
  };

  return (
    <View>
      <Header title="product Details" />
      <View>
        <View>
          <Carousel
            layoutCardOffset={15}
            ref={isCarousel}
            data={images}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index: number) => setActiveItem(index)}
            useScrollView={true}
          />
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
              <Text style={{fontSize: 16, fontWeight: '700', color : Black}}>
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
              onPress={showToast}
              style={Styles.confirmBtn}>
              <Text style={{color: White, fontWeight: '500'}}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
  confirmBtn : {
    width: 180,
                height: 40,
                backgroundColor: '#f3702a',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                borderRadius: 20,
  }
});

export default ProductDetails;