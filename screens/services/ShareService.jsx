import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text,
    Button,
    Platform,
    Share
} from 'react-native';

const onShare = async (title, message, url) => {
    const messageAndUrl = message.concat('\n\n').concat(url);
    try {
        const result = await Share.share(
            {
                title,
                message: messageAndUrl
            },
            {
                subject: title
            },
        )
        if (result.action === Share.sharedAction) {
            //Always work with Android
            if (result.activityType) {
                //Shared with activity type of result.activityType
            } else {
                //Shared
            }
        } else if (result.action === Share.dismissedAction) {
            //Runs only for ios if share is cancelled
        }
    } catch (error) {
        //console.log("Error while Sharing , error")
    }
}

export default { onShare }