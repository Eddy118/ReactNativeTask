import {StyleSheet} from 'react-native';
import { Secondary, White } from '../../constants';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },

  logo : {
    width: 100, height: 100, resizeMode: 'contain'
  },

  contentContainer: {
    borderWidth: 1,
    width : '90%',
    borderColor: '#19a8b0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal : 35,
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    marginVertical : 40 
  },
  forgotPasswordBtn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
    marginVertical: 15,
  },
  loginBtn: {
    width: 200,
    height: 40,
    backgroundColor: '#f3702a',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 20,
  },
  login : {
    color: White, fontSize : 15, fontWeight : '600'

  },
  createAccountBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutContainer : {
    width : 100 ,
    height : 50,
    backgroundColor : Secondary,
    position : 'absolute',
    top : 80,
    right : 20,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 10,
    zIndex : 999
    
  },
  logoutTxt : {
    fontWeight : 'bold',
    fontSize : 14,
    color : White
  }
});

export default Styles;
