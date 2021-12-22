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

let picker_Items = [
  {
    label: "Company 1",
    value: 1
  },
  {
    label: "Company 2",
    value: 2
  },
  {
    label: "Company 3",
    value: 3
  },
  {
    label: "Company 4",
    value: 4
  },
  {
    label: "Company 5",
    value: 5
  },
  {
    label: "Company 6",
    value: 6
  },
  {
    label: "Company 7",
    value: 7
  },
  {
    label: "Company 8",
    value: 8
  },
  {
    label: "Company 9",
    value: 9
  },
  {
    label: "Company 10",
    value: 10
  }
]

function AddUserScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const device_name = Device.osName;

  const [agency, setAgency] = useState('');
  const [brand,setBrand] = useState('');
  const [representative_name,setRepresentative_name] = useState("");
  const [image,setImage] = useState('')

  const [picked, setPicked] = useState(1);

  useEffect(() => {
    if (isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    for (let i = 0; i < picker_Items.length; i++) {
      if (picker_Items[i].value == picked) {
        console.log("The Picked item label is ==> ", picker_Items[i].label);
      }  
    }
    console.log("Agency name is : ",agency)
  })

  const storeUser = () => {
    if (agency === '') {
      alert('Fill at least your name!')
    } else {
      setIsLoading(true);
      const dbRef = firebase.firestore().collection('agencies');
      dbRef.add({
        Category:picked,
        Agency: agency,
        Brand: brand,
        Representative_name:representative_name,
        Image:image
      }).then((res) => {
        setAgency('');
        setBrand('');
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
              {picker_Items.map((v, i) => {
                return (
                  <Picker.Item key={i} label={v.label} value={v.value} />
                )
              })}
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
              {picker_Items.map((v, i) => {
                return (
                  <Picker.Item key={i} label={v.label} value={v.value} />
                )
              })}
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
          value={agency}
          onChangeText={(val) => setAgency(val)}
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
          value={brand}
          onChangeText={(val) => setBrand(val)}
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
          value={representative_name}
          onChangeText={(val) => setRepresentative_name(val)}
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
          value={image}
          onChangeText={(val) => setImage(val)}
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
          <Text style={styles.save_button_txt}>SAVE</Text>
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
          <Text style={styles.delete_button_txt}>DELETE</Text>
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
    borderWidth: 1,
    height: 50,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.87)",
    borderRadius: 4,
    flex: 1,
    flexDirection: "row"
  },
  delete_button_txt: {
    fontSize: 14,
    color: "#000000",
    width: "90%",
    //borderWidth:1,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 40
  },
  save_button_txt: {
    fontSize: 14,
    color: "#60AD7F",
    width: "90%",
    //borderWidth:1,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 40
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
