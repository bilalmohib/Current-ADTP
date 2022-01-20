import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#eeeeee',
        },
        headerTintColor: '#242424',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ title: 'Repeat Offenders' }}
      />
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{ title: 'Select or add to the list' }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: 'Agency Detail' }}
      />
       <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

