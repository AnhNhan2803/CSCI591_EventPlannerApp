//TODO
//user authorization check
//set organizer value to Current User

//uses react-hook-form library for validation
import { useForm, Controller } from "react-hook-form";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { app } from "../config/firebase";
import { colors } from "../constants/theme";
import React, { useState, useEffect } from "react";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";

// Create database object
const db = getFirestore(app);

const CreateForm = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //cancel button
  const handleCancelButton = () => {
    Alert.alert("Cancel", "Do you want to cancel creating this event?", [
      {
        text: "Yes",
        onPress: () => navigation.navigate("HomeScreen"),
        style: "cancel",
      },
      {
        text: "No",
        onPress: () => console.log("Didn't cancel"),
      },
    ]);
  };

  //submit button
  const handleSubmission = (data) => {
    Alert.alert("Submit", "Do you want to post this event?", [
      {
        text: "Yes",
        onPress: async () => {
          const docRef = await addDoc(collection(db, "Events"), { data });
          navigation.navigate("HomeScreen");
        },
      },
      {
        text: "No",
        onPress: () => console.log("Didn't submit"),
      },
    ]);
  };

  return (
    <>
      <View style={styles.View}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.TextInput}
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && <Text style={styles.Text}>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.TextInput}
              placeholder="Organizer"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="organizer"
        />
        {errors.title && <Text style={styles.Text}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.TextInput}
              placeholder="Date"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="date"
        />
        {errors.date && <Text style={styles.Text}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.TextInput}
              placeholder="Time"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="time"
        />
        {errors.time && <Text style={styles.Text}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.TextInput}
              placeholder="Location"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="location"
        />
        {errors.location && <Text style={styles.Text}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.TextInput}
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text style={styles.Text}>This is required.</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.TextInput}
              placeholder="Type of event, separate by commas"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="type"
        />
        {errors.type && <Text style={styles.Text}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.TextInput}
              placeholder="Contact for event"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="contact"
        />
        {errors.contact && <Text style={styles.Text}>This is required.</Text>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSubmission)}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancelButton}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CreateForm;

const styles = StyleSheet.create({
  View: {
    alignItems: "center",
    backgroundColor: colors.maroon,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  Text: {
    color: colors.white,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.copper,
    margin: 10,
    padding: 10,
  },
  TextInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: "row",
    padding: 12,
    marginVertical: 12,
    width: "80%",
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
});
