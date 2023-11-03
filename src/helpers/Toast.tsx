// import Toast from 'react-native-toast-message';
import Toast from 'react-native-simple-toast';
import { AppColor, White } from '../constants';
export const successToast = (msg: string) => {
  Toast.show(msg, Toast.BOTTOM, {
   textColor : White,
   backgroundColor : AppColor
  });
};

export const failureToast = (msg: string) => {
  Toast.show(msg, Toast.BOTTOM);
};

export const infoToast = (msg: string = '') => {
  Toast.show(msg, Toast.BOTTOM);
};
