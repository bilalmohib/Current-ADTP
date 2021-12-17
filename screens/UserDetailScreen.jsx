import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Image, Text, TouchableOpacity } from 'react-native';
//Importing Vector Icon
import { Entypo } from '@expo/vector-icons';
//Importing Image
import img from "../assets/User_details.png";
import firebase from '../database/firebaseDb';

function UserDetailScreen() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
  })

  const updateUser = () => {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('agencies').doc(this.state.key);
    updateDBRef.set({
      agency: this.state.agency,
      repName: this.state.repName,
    }).then((docRef) => {
      this.setState({
        key: '',
        agency: '',
        repName: '',
        isLoading: false,
      });
      this.props.navigation.navigate('UserScreen');
    })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  const deleteUser = () => {
    // const dbRef = firebase.firestore().collection('agencies').doc(this.props.route.params.userkey)
    //   dbRef.delete().then((res) => {
    //       console.log('Item removed from database')
    //       this.props.navigation.navigate('UserScreen');
    //   })
  }

  const openTwoButtonAlert = () => {
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.deleteUser() },
        { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }
  return (
    <ScrollView>
      <Image
        style={styles.tinyLogo}
        source={img}
      />
      <View style={styles.container}>
        <View style={styles.agency_name_container}>
          <View style={styles.halfWidth}>
            <Text style={styles.agency_txt}>Agency name</Text>
          </View>
          <View>
            <Text style={styles.agency_txt}>10</Text>
          </View>
        </View>
        <View>
          <Text style={styles.representative_txt}>Representative name</Text>
          <Text style={styles.txt_description}>The same monster also produced</Text>
        </View>
        <View>
          {["Brand name", "Brand name", "Brand name"].map((v, i) => (
            <View key={i}>
              <Text style={styles.brand_txt}>{v}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.container_edit_button}
          onPress={() => alert('Edit Button Pressed')}
        >
          <Entypo name="edit" size={23} style={{ marginLeft: 12, marginTop: 12 }} color="rgba(0, 0, 0, 0.87)" />
          <Text style={styles.edit_txt}>EDIT</Text>
        </TouchableOpacity>
        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Name'}
            value={this.state.agency}
            onChangeText={(val) => this.inputValueUpdate(val, 'agency')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Rep name'}
            value={this.state.repName}
            onChangeText={(val) => this.inputValueUpdate(val, 'repName')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    width: "85%",
    // borderWidth:1,
    alignItems: "center",
    textAlign: "center",
    paddingTop: 15
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
