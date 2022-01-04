import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
  Button,
  Image,
  Platform
} from 'react-native';
//Importing the icon family
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Importing the react native drop down picker
import { Picker } from 'react-native'

//Importing Device API to check the device type to render different content for android and ios
import * as Device from 'expo-device';

//Importing Image Picker 
import * as ImagePicker from 'expo-image-picker';

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

function AddUserScreen({ navigation }) {

  const [isLoading, setIsLoading] = useState(false);

  const [visibility, setVisibility] = useState(false);

  const [imageUri, setImageUri] = useState(null);


  const device_name = Device.osName;

  const [agency, setAgency] = useState('');
  const [brand, setBrand] = useState('');
  const [representative_name, setRepresentative_name] = useState("");
  const [image, setImage] = useState('')

  const [picked, setPicked] = useState(1);
  const [pickedValue, setPickedValue] = useState("");

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
        setPickedValue(picker_Items[i].label);
      }
    }
    console.log("Agency name is : ", agency)
  })

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result ==> ", result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const storeUser = () => {
    if (pickedValue === '' || agency === '' || brand === '' || representative_name === '' || image === '') {
      alert('Fill all the fields!');
    } else {
      setIsLoading(true);
      const dbRef = firebase.firestore().collection('agencies');
      dbRef.add({
        Category: pickedValue,
        Agency: agency,
        Brand: brand,
        Representative_name: representative_name,
        Image: image
      }).then((res) => {
        setAgency('');
        setBrand('');
        setIsLoading(false);

        //alert("You should now navigate to the listing screen because you've added the item")
        //props.navigation.navigate('UserScreen')
        //navigate('UserScreen')
        setVisibility(true);
        setTimeout(() => { navigation.push('UserScreen'); }, 5000);
        setTimeout(() => { setVisibility(false); }, 5000);
      })
        .catch((err) => {
          console.error("Error found: ", err);
          setIsLoading(false);
        });
    }
  }

  return (
    <ScrollView style={styles.container}>

      {(visibility) ? (
        <View style={styles.snackBar}>
          <View style={styles.IconContainer}>
            <AntDesign name="delete" size={23} style={{ lineHeight: 40 }} color="#ffffff" />
          </View>
          <Text style={styles.snack_txt}>Agency was added to the list</Text>
        </View>
      ) : (
        <></>
      )}


      {/* Choose Agency Container */}
      {(device_name == "iOS") ? (
        <View style={styles.inputGroupTop}>

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
      ) : (
        <View style={styles.inputGroupTop}>

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
      )}
      {/* Choose Agency Container */}

      {/* Agency Name Container */}
      <View style={styles.inputGroup}>

        <Text style={styles.label}>Add New</Text>

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

        <Text style={styles.label}>Brand</Text>

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

        <Text style={styles.label}>Repersentative Name</Text>

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
        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.inputtxt} onPress={pickImage}>
          <Text>Pick an image from camera roll</Text>
        </TouchableOpacity>

      </View>
      {/* Image Container */}

      {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: 400 }} />}

      {/* ---------------------------Main Button Container--------------------------- */}
      <View style={styles.buttons_main_container}>
        {/* Save Button Container */}
        <TouchableOpacity
          style={styles.container_button}
          onPress={storeUser}
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
  snack_txt: {
    fontSize: 14,
    color: "#ffffff",
    width: "90%",
    // borderWidth:1,
    alignItems: "left",
    textAlign: "left",
    lineHeight: 40,
    left: 37
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
