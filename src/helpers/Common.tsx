import {failureToast} from './Toast';

// validaing email
export function ValidateEmail(email: string) { 
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    failureToast('Invalid email');
    return false;
  }

  return true;
}
