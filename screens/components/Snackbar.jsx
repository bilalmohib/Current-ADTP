import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
//Importing the icon family
import { Ionicons } from '@expo/vector-icons';

//Importing Device API to check the device type to render different content for android and ios
import * as Device from 'expo-device';


function Snackbar({ navigation }) {

    const [isLoading, setIsLoading] = useState(false);

    const device_name = Device.osName;

    //   const [agency, setAgency] = useState('');
    //   const [brand, setBrand] = useState('');
    //   const [representative_name, setRepresentative_name] = useState("");
    //   const [image, setImage] = useState('')

    //   const [picked, setPicked] = useState(1);
    //   const [pickedValue, setPickedValue] = useState("");

    //   useEffect(() => {
    //     if (isLoading) {
    //       return (
    //         <View style={styles.preloader}>
    //           <ActivityIndicator size="large" color="#9E9E9E" />
    //         </View>
    //       )
    //     }
    //   })

    return (
        <View style={styles.container}>
            <View style={styles.snackBar}>
                <View style={styles.IconContainer}>
                    <AntDesign name="delete" size={23} style={{ lineHeight: 40 }} color="#ffffff" />
                </View>
                <Text style={styles.snack_txt}>Agency was added to the list</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ffffff'
    },
    snackBar: {
        borderWidth: 0.5,
        borderColor: "#60AD7F",
        backgroundColor: "#60AD7F",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        position: "absolute",
        height: 54,
        width: "90%",
        zIndex: 2,
        shadowColor: "rgba(32, 32, 32, 0.08)",
        shadowRadius: "0px 9.75px 9.75px -7.3125px",
        borderRadius: 3.25,
        left: "5%",
        top: 75,
        // box-shadow: 0px 9.75px 9.75px -7.3125px rgba(32, 32, 32, 0.08);
        // border-radius: 3.25px;
    },
    IconContainer: {
        width: "10%",
        //borderWidth: 1,
        alignItems: "center"
    },
    snack_txt: {
        fontSize: 14,
        color: "#ffffff",
        width: "90%",
        // borderWidth:1,
        alignItems: "left",
        textAlign: "left",
        lineHeight: 40,
        left: 37
    }
})

export default Snackbar;
