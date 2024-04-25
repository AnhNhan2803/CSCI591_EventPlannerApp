//TODO
//user authorization check
//set organizer value to Current User

//uses react-hook-form library for validation
import { useForm, Controller, useController } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
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
  SafeAreaView
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from "../config/firebase";
import { colors } from "../constants/theme";
import TagPicker from "../components/TagPicker";

const FormItem = ({ control, name, err, ph="", required=true }) => {
  return (
    <View style={styles.formItemContainer}>
      <Text style={styles.rowTitle}>{name.toUpperCase()}{required && "*"}</Text>
      <Controller
        control={control}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.textInput, err ? styles.borderErr : styles.borderDefault]}
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
  )
}

export default CreateForm = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log(date)
  };

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

  //submit button
  const handleSubmission = (data) => {
    Alert.alert("Submit", "Do you want to post this event?", [
      {
        text: "No",
        onPress: () => console.log("Didn't submit"),
      },
      {
        text: "Yes",
        onPress: async () => {
          const docRef = await addDoc(collection(db, "Events"), { data });
          navigation.navigate("HomeScreen");
        },
      },
    ]);
  };

  let isErr = Object.keys(errors).length > 0;

  return (
    <>
      <View style={styles.view}>
        <FormItem control={control} name={"Title"} err={errors.title} ph={"What's your event called?"} />
        <FormItem control={control} name={"Organizer"} err={errors.organizer} ph={"Who's organizing your event?"} />
        <FormItem control={control} name={"Location"} err={errors.location} ph={"Where's your event?"} />
        <FormItem control={control} name={"Description"} err={errors.description} ph={"Tell us about your event!"} />
        {/* <FormItem control={control} name={"Tags"} err={errors.tags} ph={"**WORK IN PROGRESS**"} /> */}
        <TagPicker control={control} name={"Tags"} getValues={getValues} />

        <View style={styles.dateTimeContainer}>
          <Text style={styles.rowTitle}>DATE AND TIME*</Text>
            <View style={styles.dateTimeSubContainer}>
              <DateTimePicker
                style={styles.dateTimePicker}
                testID="dateAndTime"
                value={date}
                mode="date"
                is24Hour={true}
                onChange={onChange}
              />
              <DateTimePicker
                style={styles.dateTimePicker}
                testID="dateAndTime"
                value={date}
                mode="time"
                is24Hour={true}
                onChange={onChange}
              />
            </View>
        </View>

        {isErr && <Text style={styles.errText}>You're missing something!</Text>}

        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View style={[ styles.button, isErr ? styles.buttonError : styles.buttonSuccess ]}>
              <Button
                title="Submit"
                onPress={handleSubmit(handleSubmission)}
                color={colors.white}
                disabled={isErr}
              />
            </View>
          </TouchableOpacity>
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
    display: 'flex',
    width: '90%',
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
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  dateTimeSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.maroon,
    borderRadius: 10,
  }
});
