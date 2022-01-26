// screens/UserScreen.js
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TouchableOpacity, Text, Button } from 'react-native';
//Importing the icon family
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
                console.log("User is Logged In" + signedInUserData)
                navigation.navigate('UserScreen')
                // ...
            } else {
                // User is signed out
                // ...
                setIsLoggedIn(false);
                console.log("User is Not Logged In")

            }
        });
    }, [])

    const googleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    const logout = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert("Logged out successfully")
        }).catch((error) => {
            // An error happened.
            console.log("Error logging out ==> ", error)
        });
    }

    return (
        <>
            {
                (isLoggedIn) ? (
                    <LinearGradient
                        // Button Linear Gradient
                        style={styles.container}
                        colors={['#8C1B16', '#FC5E36']}>
                        <Button title='Home' onPress={() => navigation.navigate("UserScreen")} />
                        <Text style={styles.monster}>Success</Text>
                        <Text>User name is : {signedInUserData.displayName}</Text>
                        <Text>User email is : {signedInUserData.email}</Text>
                        <Button title='Logout' onPress={logout} />

                    </LinearGradient>
                ) : (
                    <LinearGradient
                        style={styles.container}
                        // Button Linear Gradient
                        colors={['#8C1B16', '#FC5E36']}>
                        <Text style={styles.monster}>👹</Text>
                        <Text style={styles.txtRepeat}>Repeat Offenders</Text>
                        <Text style={styles.mistake}>A mistake repeated more than once is a decision </Text>
                        <TouchableOpacity style={styles.loginBTN} onPress={googleSignIn}>
                            <AntDesign name="google" size={24} color="#D0442A" />
                            <Text style={{ fontSize: 14, color: "#D0442A", marginLeft: 10, width: "80%", textTransform: "uppercase" }}>Sign in with google</Text>
                        </TouchableOpacity>
                        <Text style={styles.terms}>By creating an account you agree to our Terms of Service and Privacy Policy.</Text>
                    </LinearGradient>
                )
            }
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'orange',
        alignItems: "center",
        justifyContent: "center",
    },
    monster: {
        fontSize: 32
    },
    txtRepeat: {
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "Ariel",
        letterSpacing: 1,
        marginTop: 10,
        top: 40,
        color: "#ffffff"
    },
    loginBTN: {
        width: 329,
        height: 50,
        backgroundColor: "#ffffff",
        textAlign: 'center',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        borderRadius: 4
    },
    terms: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.87)",
        position: "absolute",
        bottom: 20
    },
    mistake: {
        fontSize: 18,
        lineHeight: 24,
        textAlign: "center",
        marginTop: 5,
        color: "#ffffff"
    }
})

export default LoginScreen;
