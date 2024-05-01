//TODO
//user authorization check
//set organizer value to Current User

//uses react-hook-form library for validation
import { format } from "date-fns"; // Import date-fns library for date formatting
import { useForm, Controller } from "react-hook-form";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { db } from "../config/firebase";
import { colors } from "../constants/theme";
import MaroonButton from "../components/MaroonButton";

const FormItem = ({ control, name, err, ph = "", required = true }) => {
  return (
    <View style={styles.formItemContainer}>
      <Text style={styles.rowTitle}>
        {name.toUpperCase()}
        {required && "*"}
      </Text>
      <Controller
        control={control}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.textInput,
              err ? styles.borderErr : styles.borderDefault,
            ]}
            placeholder={ph}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={colors.medium}
          />
        )}
        name={name.toLowerCase()}
      />
    </View>
  );
};

export default CreateForm = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Fallback to existing date if no new date is selected
    setDate(currentDate);
    setShowDatePicker(false); // Hide the date picker after selection
    setShowTimePicker(false); // Hide the time picker after selection
  };

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to format date and time for the buttons
  const formatDate = (date) => format(date, "PPP"); // 'PPP' is a date format in date-fns: Jan 1, 2020
  const formatTime = (date) => format(date, "p"); // 'p' is a time format in date-fns: 12:00 PM

  //cancel button
  const handleCancelButton = () => {
    Alert.alert("Cancel", "Do you want to cancel creating this event?", [
      {
        text: "No",
        onPress: () => console.log("Didn't cancel"),
        style: "cancel",
      },
      {
        text: "Yes",
        // TODO: Submission logic controlled here. Be sure to include Date state (not included in form instance)
        onPress: () => navigation.navigate("HomeScreen"),
      },
    ]);
  };

  const handleSubmission = (data) => {
    data.Date = date; // Ensure date is correctly formatted or adjusted if needed

    Alert.alert("Submit", "Do you want to post this event?", [
      {
        text: "No",
        onPress: () => console.log("Didn't submit"),
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            // Create the document with the data object spread at the root level
            const docRef = await addDoc(collection(db, "Events"), data);

            // Update the document to add the document ID
            await updateDoc(docRef, {
              id: docRef.id, // Add the document ID as 'id'
            });

            console.log("Event submitted with ID:", docRef.id);
            navigation.navigate("HomeScreen");
          } catch (error) {
            console.error("Error submitting the event:", error);
          }
        },
      },
    ]);
  };

  let isErr = Object.keys(errors).length > 0;
  return (
    <>
      <View style={styles.view}>
        <FormItem
          control={control}
          name={"Title"}
          err={errors.title}
          ph={"What's your event called?"}
        />
        <FormItem
          control={control}
          name={"Organizer"}
          err={errors.organizer}
          ph={"Who's organizing your event?"}
        />
        <FormItem
          control={control}
          name={"Location"}
          err={errors.location}
          ph={"Where's your event?"}
        />
        <FormItem
          control={control}
          name={"Description"}
          err={errors.description}
          ph={"Tell us about your event!"}
        />
        <FormItem
          control={control}
          name={"Tags"}
          err={errors.tags}
          ph={"**WORK IN PROGRESS**"}
        />

        <View style={styles.dateTimeContainer}>
          <Text style={styles.rowTitle}>DATE AND TIME*</Text>
          <View style={styles.dateTimeSubContainer}>
            <Button
              title={showDatePicker ? "Select Date" : formatDate(date)}
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                style={styles.dateTimePicker}
                testID="datePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Button
              title={showTimePicker ? "Select Time" : formatTime(date)}
              onPress={() => setShowTimePicker(true)}
            />
            {showTimePicker && (
              <DateTimePicker
                style={styles.dateTimePicker}
                testID="timePicker"
                value={date}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>

        {isErr && <Text style={styles.errText}>You're missing something!</Text>}

        <View style={styles.buttonContainer}>
          <MaroonButton buttonText="Submit" title="Submit" onPress={handleSubmit(handleSubmission)} disabled={isErr} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  errText: {
    color: colors.danger,
    fontSize: 20,
    paddingBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    paddingHorizontal: 10,
    gap: 15,
  },
  textInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: "row",
    padding: 12,
    marginVertical: 12,
    width: "100%",
  },
  borderDefault: {
    borderWidth: 1,
    borderColor: colors.medium,
  },
  borderErr: {
    borderWidth: 2,
    borderColor: colors.danger,
  },
  rowTitle: {
    color: colors.dark,
    fontSize: 14,
    margin: 0,
  },
  formItemContainer: {
    display: "flex",
    width: "90%",
    gap: -6,
  },
  buttonError: {
    backgroundColor: colors.danger,
  },
  buttonSuccess: {
    backgroundColor: colors.maroon,
  },
  dateTimeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  dateTimeSubContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    padding: 10,
    backgroundColor: colors.maroon,
    borderRadius: 10,
  },
});
