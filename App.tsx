import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './src/navigation';
import {AuthProvider} from './src/context/auth-content';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
export default App;
