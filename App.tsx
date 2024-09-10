import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import StackNavigation from './src/navigation/StackNavigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
