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

import { ProgressBar, Colors } from 'react-native-paper';

// Importing the react native drop down picker
import { Picker } from 'react-native'

//Importing Device API to check the device type to render different content for android and ios
import * as Device from 'expo-device';

import alt from "../assets/alter.png";

//Importing Image Picker 
import * as ImagePicker from 'expo-image-picker';

import "firebase/storage";

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

  const [pickerItems, setPickerItems] = useState(picker_Items);

  const [visibility, setVisibility] = useState(false);

  const [imageUri, setImageUri] = useState(null);


  const device_name = Device.osName;

  const [agency, setAgency] = useState('');
  const [brand, setBrand] = useState('');
  const [representative_name, setRepresentative_name] = useState('');
  const [image, setImage] = useState('')

  const [picked, setPicked] = useState(1);
  const [pickedValue, setPickedValue] = useState('');

  const [selected_brand_count, set_selected_brand_count] = useState(0);

  //For storing retrieved data
  const [firestoreData, setFirestoreData] = useState([]);

  //Show Agency Add
  const [showAgencyAdd, setShowAgencyAdd] = useState(false);
  const [addCount, setAddCount] = useState(false);

  useEffect(() => {

    if (pickedValue != '') {
      //For counting the number of times this Company has been choosen its count
      let count = 0;
      for (let i = 0; i < firestoreData.length; i++) {
        if (firestoreData[i].Agency == pickedValue) {
          count = count + 1;
        }
      }

      //console.log(`The slected agency '${pickedValue}' had appeared "${count}" number of times previously`);
      console.log(`The slected agency '${pickedValue}' had appeared "${count}" number of times previously`);
      // if (addCount) {
      console.log("----------?" + count)
      set_selected_brand_count(count);
      // setAddCount(false);
      //}
      // setAddCount(false);
      //For counting the number of times this Company has been choosen its count
    }

    if (isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    for (let i = 0; i < pickerItems.length; i++) {
      if (pickerItems[i].value == picked) {
        //console.log("The Picked item label is ==> ", pickerItems[i].label);
        setPickedValue(pickerItems[i].label);
      }
    }
    // console.log("Agency name is : ", agency);
    // console.log("Picker Items is ==> ", pickerItems);

    // console.log("Data from firestore equals ==> ", firestoreData);

    //Retrieving the data from firestore for purpose of counter 
    if (true) {
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
    }
    //

  })

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result of Image ==> ", result);

    //For Uploading Images to Cloud Storage
    // Create a root reference
    // var storageRef = firebase.storage().ref();
    // const storageRef = ref(storage, 'some-child');

    if (!result.cancelled) {
      setImageUri(result.uri);
      // Data URL string
      // const message4 = result.uri;
      // uploadString(storageRef, message4, 'data_url').then((snapshot) => {
      //   console.log('Uploaded a data_url string!',snapshot);
      // });
      // 'file' comes from the Blob or File API
      // storageRef.put(file).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      // });

    }
  };

  const addAgency = () => {
    if (agency != '') {
      let length = pickerItems.length;
      //console.log("Length is ", length, agency);

      //console.log("--===================> ",temp_picker_items)

      setPickerItems(
        [
          ...pickerItems,
          {
            label: agency,
            value: length + 1
          }
        ]
      );
      setShowAgencyAdd(false);
      alert("Agency Added");
    }
    else {
      alert("Please enter an agency name to add it to the list.");
    }
  }

  const storeUser = () => {
    if (pickedValue === '' || brand === '' || representative_name === '' || imageUri === '') {
      alert('Fill all the fields!');
    } else {
      setIsLoading(true);
      const dbRef = firebase.firestore().collection('agencies');
      let count = selected_brand_count + 1;
      dbRef.add({
        Agency: pickedValue,
        // Agency: agency,
        Brand: brand,
        Representative_name: representative_name,
        Image: "imageUri",
        Count: count
      }).then((res) => {
        // setAgency('');
        setVisibility(true);
        setPickedValue('');
        setBrand('');
        setAgency('');
        setPicked(1);
        setRepresentative_name('');
        set_selected_brand_count(0);
        setIsLoading(false);
        setImageUri('');
        //alert("You should now navigate to the listing screen because you've added the item")
        //props.navigation.navigate('UserScreen')
        //navigate('UserScreen')
        setTimeout(() => { navigation.push('UserScreen'); }, 2000);
        setTimeout(() => { setVisibility(false); }, 4000);
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
            onValueChange={(itemValue, itemIndex) => {
              setPicked(itemValue)
              setAddCount(true)
            }
            }>
            {pickerItems.map((v, i) => {
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
            onValueChange={(itemValue, itemIndex) => {
              setPicked(itemValue)
              setAddCount(true)
              // console.log(" ): ", itemIndex)
            }
            }>
            {pickerItems.map((v, i) => {
              return (
                <Picker.Item key={i} label={v.label} value={v.value} />
              )
            })}
          </Picker>
        </View>
      )}
      {/* Choose Agency Container */}

      {
        (showAgencyAdd) ? (
          <View>
            {/* Agency Name Container */}
            < View style={styles.inputGroup}>
              <View>
                <Text style={styles.label}>Add New</Text>

                <TextInput
                  style={styles.inputtxt}
                  placeholder={'Agency name'}
                  value={agency}
                  onChangeText={(val) => setAgency(val)}
                />
              </View>
            </View>
            {/* Agency Name Container */}

            {/* ---------------------------Add Button Container--------------------------- */}
            <View style={styles.add_main_container}>
              {/* Add Button Container */}
              <TouchableOpacity
                style={styles.container_button}
                onPress={addAgency}
              >
                <View style={styles.IconContainer}>
                  <Entypo name="add-to-list" size={23} style={{ lineHeight: 40 }} color="#60AD7F" />
                </View>
                <Text style={styles.add_button_txt}>Add Agency</Text>
              </TouchableOpacity>
              {/* Add Button Container */}
            </View>
            {/* ---------------------------Add Button Container--------------------------- */}
          </View>
        ) : (
          <View style={styles.add_main_container}>
            {/* Add Button Container */}
            <TouchableOpacity
              style={styles.container_button}
              onPress={() => setShowAgencyAdd(true)}
            >
              <View style={styles.IconContainer}>
                <AntDesign name="pluscircleo" size={23} style={{ lineHeight: 40 }} color="#60AD7F" />
              </View>
              <Text style={styles.save_button_txt}>Add Agency in List</Text>
            </TouchableOpacity>
            {/* Add Button Container */}
          </View>
        )
      }



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

      <ProgressBar style={{ marginTop: 10, marginBottom: 20, borderRadius: 10, width: "100%", height: 15 }} progress={0.5} color="#7db597" />

      <View style={styles.ImageContainer}>
        {(imageUri) ?
          (
            <Image source={{ uri: imageUri }} style={{ width: "95%", height: 200, borderRadius: 10 }} />
          ) : (
            <Image source={alt} style={{ width: "90%", height: 200, borderRadius: 10 }} />
          )
        }
      </View>

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
  ImageContainer: {
    alignItems: "center"

  },
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
  add_button_txt: {
    fontSize: 16,
    color: "#60AD7F",
    width: "90%",
    //borderWidth:1,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 40
  },
  add_main_container: {
    marginTop: -25,
    marginBottom: 10
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
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#65a984',
    backgroundColor: '#ededed',
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
