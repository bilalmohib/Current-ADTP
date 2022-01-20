// screens/UserScreen.js
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TouchableOpacity, Text } from 'react-native';
//Importing the icon family
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//Importing the icon family
import firebase from '../database/firebaseDb';

const LoginScreen = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signedInUserData, setSignedInUserData] = useState([])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;
                setSignedInUserData(user);
                setIsLoggedIn(true);
                console.log("User is Logged In")
                // ...
            } else {
                // User is signed out
                // ...
                setIsLoggedIn(false);
                console.log("User is Not Logged In")
                navigation.navigate('LoginScreen')
            }
        });
    }, [])

    return (
        <>
            {
                (isLoggedIn) ? (
                    <ScrollView style={styles.container}>
                        <Text>Is Logged In</Text>
                    </ScrollView>
                ) : (
                    <ScrollView style={styles.container}>
                        <Text>Is Not Logged In</Text>
                        <TouchableOpacity onPress={()=>alert("Lets Login Now")}>
                            <Text>
                                Login Now
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                )
            }

        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22,
        backgroundColor: "#ffffff"
    },
})

export default LoginScreen;
