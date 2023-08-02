import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Posts from './Posts';
import Post from './Post';
import { Provider } from 'react-redux';
import store from './store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Posts"
            component={Posts}
          />
          <Stack.Screen
            name="Post"
            component={Post}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}