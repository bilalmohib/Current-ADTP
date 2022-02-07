import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
//Import firebase 
import firebase from "../../database/firebaseDb";

const Header = () => {
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        loggedInTrigger();
    }, [])

    const loggedInTrigger = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                let uid = user.uid;

                const userInfo = {
                    uid: uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    janna_aen_pata_kara: user.isAnonymous
                }
                //Pass the user info if user is signed In.
                setUserData(userInfo);
                //Yes return true if logged in.
                setStatus(true);
                console.log("User is Logged In.Welcome")
                // ...
            } else {
                // User is signed out
                // ...
                //Pass the empty object when not logged in.
                setUserData({});
                setStatus(false)
                console.log("Ok as you wish.You are not logged in.Right.")
            }
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
        <View style={styles.container}>
            {/* Conditional Rendering based on logged in or not */}
            {(status) ? (
                <View>
                    <Text>Logged In As: {userData.email}</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignContent: "right", justifyContent: "right" }}>
                        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                            <Text>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View>
                    <Text>Signed Out</Text>
                    {/* <TouchableOpacity onClick={() => navigation.navigate('LoginScreen')} style={styles.loginBtn}>
                        <Text>Login Now</Text>
                    </TouchableOpacity> */}
                </View>
            )}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    loginBtn: {
        borderWidth: 1,
        marginTop: 10,
        borderColor: "grey",
        borderRadius: 5,
        backgroundColor: "#ffffff",
    },
    logoutBtn: {
        borderWidth: 1,
        marginTop: 10,
        borderColor: "red",
        borderRadius: 5,
        width: 60,
        backgroundColor: "white"
    }
})

export default Header;