import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import LoginScreen from './screens/LoginScreen';
import ShareScreen from './screens/ShareScreen';
//Importing the header
import Header from './screens/components/Header';

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
      {/* <Stack.Screen
        name="ShareScreen"
        component={ShareScreen}
        options={{ title: "Share Screen", headerRight: () => <Header /> }}
      /> */}
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ title: "Repeat Offenders", headerRight: () => <Header /> }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        screenOptions={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{ title: 'Select or add to the list', headerRight: () => <Header /> }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: 'Agency Detail', headerRight: () => <Header /> }}
      />
      <Stack.Screen
        name="Header"
        component={Header}
        options={{ header: null }}
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

