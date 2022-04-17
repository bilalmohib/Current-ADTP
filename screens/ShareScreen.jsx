import React from "react";

import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text,
    Button,
    Platform
} from 'react-native';
import { SvgXml } from "react-native-svg";

import ShareService from "./services/ShareService";

const ShareScreen = ({ navigation }) => {

    const onShare = () => {
        // alert("adsfjasdlk;f")
        const url = "https://muslims.islamicfinder.org/p-111843";

        ShareService.onShare('My App', 'Checkout this post', url);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onShare}>
                <Text>Share now</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'orange',
        alignItems: "center",
        justifyContent: "center",
    }
})

export default ShareScreen;