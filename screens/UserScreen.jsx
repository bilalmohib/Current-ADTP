// screens/UserScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TouchableOpacity, Text } from 'react-native';
//Importing the icon family
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//Importing the icon family
import firebase from '../database/firebaseDb';

const UserScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userArr, setUserArr] = useState([])

  useEffect(() => {
    if (isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    firebase.firestore().collection('agencies').onSnapshot(getCollection);
  })
  // constructor() {
  //   super();
  //   this.firestoreRef = firebase.firestore().collection('agencies');
  //   this.state = {
  //     isLoading: true,
  //     userArr: []
  //   };
  // }

  // componentDidMount() {
  //   this.unsubscribe = this.firestoreRef.onSnapshot(getCollection);
  // }

  // componentWillUnmount(){
  //   this.unsubscribe();
  // }

  const getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { agency, repName } = res.data();
      userArr.push({
        key: res.id,
        res,
        agency,
        repName,
      });
    });
    setUserArr(userArr);
    setIsLoading(false);
  }

  return (
    <ScrollView style={styles.container} >
      {/* Monsters Container */}
      <TouchableOpacity
        style={styles.container_monsters}
        onPress={() => alert('Save Button Pressed')}
      >
        <Text style={styles.heading_txt}>Monsters</Text>
        <Ionicons name="add-circle-sharp" size={23} style={{ marginLeft: -5, marginTop: 15 }} color="black" />
      </TouchableOpacity>
      {/* Monsters Container */}

      <View>
        <Text style={styles.headingTop}>
          List of monster 👹
        </Text>
      </View>




      {
        userArr.map((item, i) => {
          return (
            <View key={i} style={styles.agency_list_container}>
              <View>
                <Text style={styles.agency_txt1}>
                  Agency Name
                </Text>
                <Text style={styles.agency_txt2}>
                  Brand
                </Text>
              </View>
              <View>
                <Text style={styles.agency_txt1}>
                  33
                </Text>
              </View>
            </View>
          );
        })
      }
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  agency_list_container: {
    // borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  agency_txt1: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.87)"
  },
  agency_txt2: {
    paddingTop: 10,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.87)"
  },
  container: {
    flex: 1,
    paddingBottom: 22,
    backgroundColor: "#ffffff"
  },
  headingTop: {
    fontSize: 26,
    color: "rgba(0, 0, 0, 0.87)",
    // borderWidth:1,
    // borderColor:"black",
    paddingTop: 30,
    padding: 10,
    paddingBottom: 30
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
  container_monsters: {
    marginTop: 0,
    borderColor: "#F5F5F5",
    justifyContent: "flex-start",
    borderWidth: 1,
    height: 56,
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 0,
    flex: 1,
    flexDirection: "row"
  },
  heading_txt: {
    fontSize: 20,
    color: "#212121",
    width: "90%",
    // borderWidth:1,
    alignItems: "center",
    textAlign: "center",
    paddingTop: 13,
    paddingLeft: 22
  },
})

export default UserScreen;
