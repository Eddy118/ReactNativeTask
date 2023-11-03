import React from 'react';
import {View, Image, Text, FlatList, SafeAreaView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProductSkeleon = () => {
  const renderSkeleton = () => {
    return (
      <View
        style={{
          width: '46%',
          height: 220,
          marginHorizontal: 6,
          marginVertical: 6,
          borderRadius: 10,
        }}>
        <SkeletonPlaceholder borderRadius={4}>
          <View>
            <View style={{width: 170, height: 200}} />
            <View style={{width: 170}}>
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={Array(6)}
        renderItem={({}) => renderSkeleton()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProductSkeleon;
