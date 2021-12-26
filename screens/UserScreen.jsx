// screens/UserScreen.js
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TouchableOpacity, Text } from 'react-native';
//Importing the icon family
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//Importing the icon family
import firebase from '../database/firebaseDb';

class UserScreen extends Component {
  // const [isLoading, setIsLoading] = useState(false);
  // const [userArr, setUserArr] = useState([])

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('agencies');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // useEffect(() => {
  //   firebase.firestore().collection('agencies').onSnapshot(getCollection);
  //   if (isLoading) {
  //     return (
  //       <View style={styles.preloader}>
  //         <ActivityIndicator size="large" color="#9E9E9E" />
  //       </View>
  //     )
  //   }
  // })

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const {
        Category,
        Agency,
        Brand,
        Representative_name,
        Image
      } = res.data();
      userArr.push({
        key: res.id,
        Category,
        Agency,
        Brand,
        Representative_name,
        Image
      });
    });

    console.log("User Array is equal to : ", userArr);
    this.setState({
      userArr,
      isLoading: false,
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
            List of monster 👹
          </Text>
        </View>

        {
          this.state.userArr.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('UserDetailScreen', {
                    userkey: item.key
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
                  <Text style={styles.agency_txt1}>
                    {item.key}
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
