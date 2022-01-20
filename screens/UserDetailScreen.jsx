import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, ScrollView, ActivityIndicator, View, Image, Text, TouchableOpacity, Platform } from 'react-native';
//Importing Vector Icon
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
//Importing Image
// import img from "../assets/User_details.png";
//Importing Device API to check the device type to render different content for android and ios
// import * as Device from 'expo-device';
//Importing Device API to check the device type to render different content for android and ios
import firebase from '../database/firebaseDb';

function UserDetailScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signedInUserData, setSignedInUserData] = useState([])

  //For storing retrieved data
  const [firestoreData, setFirestoreData] = useState([]);

  //For storing brands list of data produced by the same monster
  const [listOfBrands, setListOfBrands] = useState([]);

  // const device_name = Device.osName;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;

        setIsLoggedIn(true);
        setSignedInUserData(user)

        console.log("User is Logged In" + user)
        // ...
      } else {
        // User is signed out
        // ...
        setIsLoggedIn(false);
        console.log("User is Not Logged In")
        this.props.navigation.navigate('LoginScreen')
      }
    });
  }, [])

  useEffect(() => {
    if (loading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }

    console.log("Data from firestore in user details screen equals ==> ", firestoreData);

    console.warn("The device name is equal to ==> ", Platform.OS)

    let length = firestoreData.length;

    if (length != 0) {
      let tempArray = [];
      for (let i = 0; i < length; i++) {
        //To know if the same moster i.e with agency has produced some other brands check the condition 
        if (firestoreData[i].Agency == route.params.Agency) {
          tempArray.push(firestoreData[i]);
        }
      }
      //If length of local array is not equal to length of global array then set the new data array
      if (listOfBrands.length != tempArray.length) {
        setListOfBrands(tempArray);
      }
      console.warn("Temp Array at user detail screen equals ==> ", listOfBrands);
    }

    ///////////////////////////////////Retrieving the data from firestore for purpose of counter///////////////////////
    const db = firebase.firestore();
    db.collection(`agencies`)
      .get()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(element => {
          data.push(Object.assign({
            id: element.id,
            "Agency": element.Agency,
            "Brand": element.Brand,
            "Representative_name": element.Representative_name,
            "Image": element.Image,
          }, element.data()))
        })
        // console.log("data=> ", data)

        if (firestoreData.length != data.length) {
          setFirestoreData(data);
          // console.log("Updated")
        }
      }).catch(err => {
        console.log("Firebase data error ==> ", err)
      })
    ///////////////////////////////////Retrieving the data from firestore for purpose of counter///////////////////////


  })

  // const updateUser = () => {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const updateDBRef = firebase.firestore().collection('agencies').doc(this.state.key);
  //   updateDBRef.set({
  //     agency: this.state.agency,
  //     repName: this.state.repName,
  //   }).then((docRef) => {
  //     this.setState({
  //       key: '',
  //       agency: '',
  //       repName: '',
  //       isLoading: false,
  //     });
  //     this.props.navigation.navigate('UserScreen');
  //   })
  //     .catch((error) => {
  //       console.error("Error: ", error);
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });
  // }

  const deleteRecord = () => {
    if (Platform.OS != "web") {
      Alert.alert(
        'Delete User',
        'Are you sure?',
        [
          { text: 'Yes', onPress: () => alert("Delete button pressed") },
          { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
        ],
        {
          cancelable: true
        }
      );
    }
    else {
      let return_value = confirm("Are you want to delete?");
      if (return_value) {
        //alert("Ok I will delete")
        const dbRef = firebase.firestore().collection('agencies').doc(route.params.userkey)
        dbRef.delete().then((res) => {
          console.log('Item removed from database')
          navigation.push('UserScreen');
          // setTimeout(() => {  }, 2000);
        })
      }
    }
  }

  return (
    <>
      {(isLoggedIn) ? (
        <ScrollView>
          <Image
            style={styles.tinyLogo}
            source={route.params.Image}
          />
          <View style={styles.container}>
            <View style={styles.agency_name_container}>
              <View style={styles.halfWidth}>
                <Text style={styles.agency_txt}>{route.params.Agency}</Text>
              </View>
              <View>
                <Text style={styles.agency_txt}>{route.params.Count}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.representative_txt}>{route.params.Representative_name}</Text>
              <Text style={styles.txt_description}>The same monster also produced</Text>
            </View>
            <View>
              {listOfBrands.map((v, i) => (
                <View key={i}>
                  <Text style={styles.brand_txt}>{v.Brand}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.container_edit_button}
              onPress={() => alert('Edit Button Pressed')}
            >
              <View style={styles.IconContainer}>
                <Entypo name="edit" size={23} style={{ lineHeight: 40 }} color="rgba(0, 0, 0, 0.87)" />
              </View>
              <Text style={styles.edit_txt}>EDIT</Text>
            </TouchableOpacity>

            {/* Delete Button Container */}
            <TouchableOpacity
              style={styles.container_button}
              onPress={deleteRecord}
            >
              <View style={styles.IconContainer}>
                <AntDesign name="delete" size={23} style={{ lineHeight: 40 }} color="#000000" />
              </View>
              <Text style={styles.delete_button_txt}>DELETE</Text>
            </TouchableOpacity>
            {/* Delete Button Container */}
          </View>
        </ScrollView>
      ) : (
        <>
          <Text>User Is Not Logged In</Text>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  delete_button_txt: {
    fontSize: 14,
    color: "#000000",
    width: "90%",
    //borderWidth:1,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 40
  },
  container_button: {
    marginTop: 20,
    borderColor: "rgba(0, 0, 0, 0.12)",
    justifyContent: "flex-start",
    borderWidth: 1,
    height: 50,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.87)",
    borderRadius: 4,
    flex: 1,
    flexDirection: "row"
  },
  tinyLogo: {
    width: "100%",
    height: 273
  },
  IconContainer: {
    width: "10%",
    //borderWidth: 1,
    alignItems: "center"
  },
  container_edit_button: {
    marginTop: 20,
    borderColor: "rgba(0, 0, 0, 0.12)",
    justifyContent: "flex-start",
    borderWidth: 1,
    height: 50,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.87)",
    borderRadius: 4,
    flex: 1,
    flexDirection: "row"
  },
  edit_txt: {
    fontSize: 14,
    color: "#979797",
    width: "90%",
    //borderWidth:1,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 40
  },
  agency_name_container: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#000000",
    justifyContent: "space-between",
    // borderWidth: 1,
    width: "100%"
  },
  representative_txt: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    paddingTop: 20
  },
  txt_description: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 18,
    paddingTop: 30
  },
  brand_txt: {
    color: "rgba(0, 0, 0, 0.87);",
    fontSize: 20,
    paddingTop: 15
  },
  agency_txt: {
    fontSize: 26,
    fontWeight: "100",
    width: "auto"
  },
  halfWidth: {
    width: "50%"
  },
  topImage: {
    width: "100%",
    height: 50,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7,
  },
})

export default UserDetailScreen;
