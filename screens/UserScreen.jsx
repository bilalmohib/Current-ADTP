// screens/UserScreen.js
//Importing the icon family
import { Entypo, Ionicons } from '@expo/vector-icons';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//Importing the icon family
import firebase from '../database/firebaseDb';


class UserScreen extends Component {
  // const [isLoading, setIsLoading] = useState(false);
  // const [userArr, setUserArr] = useState([])

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('agencies').orderBy("Count");
    this.state = {
      isLoading: true,
      userArr: [],
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    this.checkIfLoggedIn();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;

        console.log("User is Logged In")
        this.setState({
          isLoggedIn: true
        })
        // ...
      } else {
        // User is signed out
        // ...
        this.setState({
          isLoggedIn: false
        })
        console.log("User is Not Logged In.")
        //this.props.navigation.navigate('LoginScreen')
      }
    });
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    let count = 0
    querySnapshot.forEach((res) => {
      const {
        Agency,
        Brand,
        Representative_name,
        Image,
        Count
      } = res.data();
      //console.log("I is ==> ", count)
      userArr.push({
        id: count,
        key: res.id,
        Agency,
        Brand,
        Representative_name,
        Image,
        Count
      });
      //Incrementing the count
      ++count;
    });

    console.log("User Array is equal to : ", userArr);

    //Reversing the array
    userArr.reverse();
    ///////////////////////////Implementing the logic for getting only one Company to be displayed and displaying its appearance in count respectively ////////////////////////////////////////////
    //First Traversing through the array
    // let i = 0;
    // while (i < userArr.length) {
    //   console.log("The Company name is : ", userArr[i])
    //   ++i;
    // }

    //This code is written be https://github.com/talhabalaj
    // const maxCount = filtered.reduce((acc, cur) => {
    //   if (acc < cur.Count) {
    //     acc = cur.Count;
    //   }
    //   return acc;
    // }, 0);

    const uniqueAndMaxCountObj = userArr.reduce((acc, cur) => {
      if (!acc[cur.Agency]) {
        acc[cur.Agency] = cur;
      } else {
        if (acc[cur.Agency].Count < cur.Count) {
          acc[cur.Agency] = cur;
        }
      }

      return acc;
    }, {})
    //This code is written be https://github.com/talhabalaj.



    //To convert objects into array of objects.Used code from this stack overflow answer https://stackoverflow.com/a/46269007/13161180
    const finalAarrayofObjects = Object.keys(uniqueAndMaxCountObj).map(key => {
      return uniqueAndMaxCountObj[key];
    })
    console.log("Length of array after filter ==> ", finalAarrayofObjects.length)
    console.log("Filtered Array ==> ", finalAarrayofObjects)
    ///////////////////////////Implementing the logic for getting only one Company to be displayed and displaying its appearance in count respectively ////////////////////////////////////////////

    //Finally Pushing in the state
    this.setState({
      userArr: finalAarrayofObjects,
      isLoading: false
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} >
        {/* Monsters Container */}
        < TouchableOpacity
          style={styles.container_monsters}
          onPress={() => {
            this.props.navigation.navigate('AddUserScreen');
          }}
        >
          <Text style={styles.heading_txt}>Monsters</Text>
          <Ionicons name="add-circle-sharp" size={23} style={{ marginLeft: -5, marginTop: 15 }} color="black" />
        </TouchableOpacity >
        {/* Monsters Container */}

        < View>
          <Text style={styles.headingTop}>
            Businesses behaving badly
          </Text>
        </View>

        {
          this.state.userArr.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('UserDetailScreen', {
                    userkey: item.key,
                    Agency: item.Agency,
                    Representative_name: item.Representative_name,
                    Brand: item.Brand,
                    Image: item.Image,
                    Count: item.Count
                  });
                }}
                key={i}
                style={styles.agency_list_container}>
                <View>
                  <Text style={styles.agency_txt1}>
                    {item.Agency}
                  </Text>
                  <Text style={styles.agency_txt2}>
                    {item.Brand}
                  </Text>
                </View>
                <View>
                  <Text style={styles.agency_txt3}>
                    {item.Count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView >
    );
  }
}
const styles = StyleSheet.create({
  agency_list_container: {
    // borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#F8F8F8",
    borderBottomWidth: 1
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
  agency_txt3: {
    paddingRight: 100,
    fontSize: 20,
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
