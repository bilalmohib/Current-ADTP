import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import LoginScreen from './screens/LoginScreen';

import firebase from "./database/firebaseDb";

const Stack = createStackNavigator();

function MyStack() {

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        var uid = user.uid;

        console.log("User is Logged In.Welcome")
        // ...
      } else {
        // User is signed out
        // ...
        alert("Please login first if you want to write data.")
        console.log("User is Not Logged In.Wapis bhejo ise ye nahi likh sakta.Rule is rule.No breakage of rule is allowed here.Go back login and come back if you are logged in.Thats it.")
        navigation.navigate('LoginScreen')
      }
    });
  }

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
        name="LoginScreen"
        component={LoginScreen}
        screenOptions={{
          headerShown: false
        }}
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

