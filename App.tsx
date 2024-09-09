import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import StackNavigation from './src/navigation/StackNavigation';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
