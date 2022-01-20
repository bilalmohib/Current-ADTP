// screens/UserScreen.js
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TouchableOpacity, Text } from 'react-native';
//Importing the icon family
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//Importing the icon family
import firebase from '../database/firebaseDb';

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userArr, setUserArr] = useState([])

    useEffect(() => {
        firebase.firestore().collection('agencies').onSnapshot(getCollection);
        if (isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
    })

    return (
        <ScrollView style={styles.container} >

        </ScrollView >
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
