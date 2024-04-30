import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from "react";
import { Controller, useController } from 'react-hook-form';
import {
    View,
    StyleSheet,
  } from "react-native";
  import { colors } from "../constants/theme";
  import { useEffect } from 'react';
const TagPicker = ({ control, name }) => {

    const { field } = useController({
        name,
        control,
        rules: { required: true },
    });
    const [values, setValues] = useState(field.value);
    useEffect(()  => {
        const newValue = values;
        field.onChange(newValue);
        console.log("in useEffect: " + field.value);
        // return () => {
        //     const newReturnValue = value;
        //     field.onChange(newReturnValue);
        // }
    }, [values, setValues]);
    

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Sports', value: 'sports'},
        { label: 'Social', value: 'social'}, 
        { label: 'Guest Speaker', value: 'guest-speaker'},
        { label: 'Free food', value: 'free-food'},
        { label: 'Sustainability', value: 'sustainability'},            
    ]);
   
    return (
                    <DropDownPicker
                    style={styles.borderDefault}
                    open={open}
                    value={values}
                    items={items}
                    min={1}
                    max={5}
                    setOpen={setOpen}
                    setValue={setValues}
                    setItems={setItems}
                    containerStyle={styles.formItemContainer}
                    // onChangeValue={() => {
                    //      console.log("value = " + value);
                    //      console.log("field.value = " + field.value);
                    // }}
                    mode="BADGE"
                    placeholder={'Select some tags'}
                    listMode="SCROLLVIEW"
                    multiple={true}
                    scrollEnabled={true}
                    dropDownDirection='TOP'
                />                  
            );
          };
          
export default TagPicker;

const styles = StyleSheet.create({
    view: {
      alignItems: "center",
      backgroundColor: "transparent",
    },
    buttonContainer: {
      paddingHorizontal: 10,
      flexDirection: "row",
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
      flexDirection: "column",
      maxHeight: 300,
    },
  });
  