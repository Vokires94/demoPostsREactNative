import * as React from 'react';
import Posts from './components/Posts';
import Comments from './components/Comments';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as DialogProvider } from '@react-native-material/core';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import store from './store/store'
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <DialogProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Posts'>
            <Stack.Screen
              name="Posts"
              component={Posts}
            />
            <Stack.Screen
              name="Post Details"
              component={Comments}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DialogProvider>
      <Toast visibilityTime={2000} autoHide />
    </Provider>
  );
}