import {StyleSheet} from 'react-native';
import {Black, Grey, White} from '../../constants';
const Styles = StyleSheet.create({
  productDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 5,
  },
  listContainer: {
    width: '46%',
    height: 220,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 6,
    marginVertical: 6,
    borderRadius : 10

  },
  productImage: {
    resizeMode: 'contain',
    width: '100%',
    height: 150,
    marginTop: 10,
  },
  productlistContainer: {
   width: '95%', alignSelf: 'center'
  },
  productContentContainer:{
   height: '90%'
  },
  productTitleContainer:{
   marginHorizontal: 10, marginVertical: 10
  },
  productTitle: {
   fontSize: 20, fontWeight: 'bold', color: Black
  },
  productPricingDetail: {
   color: Black,
   fontSize : 12
  }
});

export default Styles;
