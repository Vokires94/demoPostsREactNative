import * as React from 'react';
import Posts from './Posts';
import PostDetails from './PostDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store';
import { Provider } from 'react-redux';
import { Provider as DialogProvider } from '@react-native-material/core';

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
    </Provider>
  );
}