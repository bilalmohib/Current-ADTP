import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
//Importing the icon family
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Importing the react native drop down picker
import { Picker } from 'react-native'

//Importing Device API to check the device type to render different content for android and ios
import * as Device from 'expo-device';

import firebase from '../database/firebaseDb';

function AddUserScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const device_name = Device.osName;

  const [agency, setAgency] = useState('');
  const [repName, setRepName] = useState('');

  const [picked, setPicked] = useState(1.15);

  useEffect(() => {
    if (isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    console.log("The device type is ==> ", device_name);
  })

  const storeUser = () => {
    if (agency === '') {
      alert('Fill at least your name!')
    } else {
      setIsLoading(true);
      const dbRef = firebase.firestore().collection('agencies');
      dbRef.add({
        agency: agency,
        repName: repName,
      }).then((res) => {
        setAgency('');
        setRepName('');
        setIsLoading(false);

        alert("You should now navigate to the listing screen because you've added the item")
        //this.props.navigation.navigate('UserScreen')
      })
        .catch((err) => {
          console.error("Error found: ", err);
          setIsLoading(false);
        });
    }
  }

  return (
    <ScrollView style={styles.container}>

      {/* Choose Agency Container */}
      {(device_name == "iOS") ? (
        <View style={styles.inputGroupTop}>
          <View>
            <Text style={styles.labelTop}>Agency name</Text>
            <Picker
              selectedValue={picked}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setPicked(itemValue)
              }>
              <Picker.Item label="Canda 5%" value={1.05} />
              <Picker.Item label="Japan 8%" value={1.08} />
              <Picker.Item label="USA 10%" value={1.10} />
              <Picker.Item label="Egypt 14%" value={1.14} />
              <Picker.Item label="Saudi Arabia 15%" value={1.15} />
              <Picker.Item label="China 16%" value={1.16} />
              <Picker.Item label="Algeria 17%" value={1.17} />
              <Picker.Item label="18%" value={1.18} />
              <Picker.Item label="German 19%" value={1.19} />
              <Picker.Item label="German 19%" value={1.20} />
            </Picker>
          </View>
        </View>
      ) : (
        <View style={styles.inputGroupTop}>
          <View>
            <Text style={styles.labelTop}>Agency name</Text>
            <Picker
              selectedValue={picked}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setPicked(itemValue)
              }>
              <Picker.Item label="Canda 5%" value={1.05} />
              <Picker.Item label="Japan 8%" value={1.08} />
              <Picker.Item label="USA 10%" value={1.10} />
              <Picker.Item label="Egypt 14%" value={1.14} />
              <Picker.Item label="Saudi Arabia 15%" value={1.15} />
              <Picker.Item label="China 16%" value={1.16} />
              <Picker.Item label="Algeria 17%" value={1.17} />
              <Picker.Item label="18%" value={1.18} />
              <Picker.Item label="German 19%" value={1.19} />
              <Picker.Item label="German 19%" value={1.20} />
            </Picker>
          </View>
        </View>
      )}
      {/* Choose Agency Container */}

      {/* Agency Name Container */}
      <View style={styles.inputGroup}>
        <View>
          <Text style={styles.label}>Add New</Text>
        </View>
        <TextInput
          style={styles.inputtxt}
          placeholder={'Agency name'}
          value={repName}
          onChangeText={(val) => setRepName(val)}
        />
      </View>
      {/* Agency Name Container */}

      {/* Brand Name Container */}
      <View style={styles.inputGroup}>
        <View>
          <Text style={styles.label}>Brand</Text>
        </View>
        <TextInput
          style={styles.inputtxt}
          placeholder={'Brand name'}
          value={repName}
          onChangeText={(val) => setRepName(val)}
        />
      </View>
      {/* Brand Name Container */}

      {/* Representative Name Container */}
      <View style={styles.inputGroup}>
        <View>
          <Text style={styles.label}>Repersentative Name</Text>
        </View>
        <TextInput
          style={styles.inputtxt}
          placeholder={'First & last name'}
          value={repName}
          onChangeText={(val) => setRepName(val)}
        />
      </View>
      {/* Representative Name Container */}

      {/* Image Container */}
      <View style={styles.inputGroup}>
        <View>
          <Text style={styles.label}>Image</Text>
        </View>
        <TextInput
          style={styles.inputtxt}
          placeholder={'Image'}
          value={repName}
          onChangeText={(val) => setRepName(val)}
        />
      </View>
      {/* Image Container */}

      {/* ---------------------------Main Button Container--------------------------- */}
      <View style={styles.buttons_main_container}>
        {/* Save Button Container */}
        <TouchableOpacity
          style={styles.container_button}
          onPress={() => alert('Save Button Pressed')}
        >
          <View style={styles.IconContainer}>
            <Entypo name="save" size={23} style={{ lineHeight: 40 }} color="#60AD7F" />
          </View>
          <Text style={styles._button_txt}>SAVE</Text>
        </TouchableOpacity>
        {/* Save Button Container */}

        {/* Delete Button Container */}
        <TouchableOpacity
          style={styles.container_button}
          onPress={() => alert('Delete Button Pressed')}
        >
          <View style={styles.IconContainer}>
            <AntDesign name="delete" size={23} style={{ lineHeight: 40 }} color="#000000" />
          </View>
          <Text style={styles._button_txt}>DELETE</Text>
        </TouchableOpacity>
        {/* Delete Button Container */}
      </View>
      {/* ---------------------------Main Button Container--------------------------- */}

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  IconContainer: {
    width: "10%",
    //borderWidth: 1,
    alignItems: "center"
  },
  container_button: {
    marginTop: 20,
    borderColor: "rgba(0, 0, 0, 0.12)",
    justifyContent: "flex-start",
    //borderWidth: 1,
    height: 50,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.87)",
    borderRadius: 4,
    flex: 1,
    flexDirection: "row"
  },
  _button_txt: {
    fontSize: 14,
    color: "#60AD7F",
    width: "90%",
    // borderWidth:1,
    alignItems: "center",
    textAlign: "center",
    lineHeight:40
  },
  buttons_main_container: {
    paddingTop: 0
  },
  container: {
    padding: 10,
    backgroundColor: '#ffffff'
  },
  inputtxt: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.87);",
    paddingTop: 0
  },
  labelTop: {
    fontSize: 12,
    color: "#60AD7F"
  },
  label: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.38);"
  },
  picker: {
    width: "100%",
    color: "black",
    zIndex: 1000,
    marginTop: -12
  },
  label_txt: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.87)"
  },
  inputGroup: {
    flex: 1,
    height: 56,
    padding: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#65a984',
    backgroundColor: '#ededed',
  },
  inputGroupTop: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: "space-between",
    height: 60,
    padding: 10,
    marginTop: 30,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#65a984',
    backgroundColor: '#ededed',
    zIndex: 1
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
    alignItems: 'center',
    color: '#6fa686',
    backgroundColor: '#ffffff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e9e9e9',
  },
  buttonInner: {
    padding: 10,
  },
})

export default AddUserScreen;
