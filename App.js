import * as React from 'react';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store/store'
import { Provider } from 'react-redux';
import { Provider as DialogProvider } from '@react-native-material/core';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

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
              component={PostDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DialogProvider>
      <Toast visibilityTime={2000} autoHide />
    </Provider>
  );
}