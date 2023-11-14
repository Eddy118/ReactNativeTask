// react
import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type AuthContextType = {
  user: {[key: string]: any} | null;
  setUser: Dispatch<SetStateAction<{[key: string]: any} | null>>;
  cartProducts: {[key: string]: any} | null;
  setCartProducts: Dispatch<SetStateAction<{[key: string]: any} | null>>;
  order: {[key: string]: any} | null;
  setOrder: Dispatch<SetStateAction<{[key: string]: any} | null>>;
  deliveryAddress: {[key: string]: any} | null;
  setDeliveryAddress: Dispatch<SetStateAction<{[key: string]: any} | null>>;
  payment: {[key: string]: any} | null;
  setPayment: Dispatch<SetStateAction<{[key: string]: any} | null>>;
  isInternetAvailable: {[key: string]: any} | null;
  setIsInternetAvailable: Dispatch<SetStateAction<{[key: string]: any} | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthProvider = (props: {children: ReactNode}): ReactElement => {
  const [user, setUser] = useState<{[key: string]: any} | null>(null);
  const [cartProducts, setCartProducts] = useState<{[key: string]: any} | null>(
    null,
  );
  const [order, setOrder] = useState<{[key: string]: any} | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<{
    [key: string]: any;
  } | null>(null);
  
  const [payment, setPayment] = useState<{[key: string]: any} | null>(null);

  const [isInternetAvailable, setIsInternetAvailable] = useState<{[key: string]: any} | null>(null);

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user,
        setUser,
        cartProducts,
        setCartProducts,
        order,
        setOrder,
        deliveryAddress,
        setDeliveryAddress,
        payment,
        setPayment,
        isInternetAvailable,
        setIsInternetAvailable
        
      }}
    />
  );
};

export {AuthProvider, useAuth};
