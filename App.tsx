import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './src/navigation';
import {AuthProvider} from './src/context/auth-content';
import 'react-native-get-random-values';
import {NetworkProvider} from 'react-native-offline';

function App(): JSX.Element {
  return (
    <NetworkProvider>
      <AuthProvider>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </AuthProvider>
    </NetworkProvider>
  );
}
export default App;
