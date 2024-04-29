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
      const [value, setValue] = useState(field.value);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setValue(field.value);
        },
        [field.value, setValue]);
    const items = [
        {id: 1, label: 'Sports', value: 'sports'},
        {id: 2, label: 'Social', value: 'social'}, 
        {id: 3, label: 'Guest Speaker', value: 'guest-speaker'},
        {id: 4, label: 'Free food', value: 'free-food'},
        {id: 5, label: 'Sustainability', value: 'sustainability'},            
    ];
       
    return (
        <View style={styles.formItemContainer}>
                    <DropDownPicker
                    style={[
                        styles.borderDefault,
                      ]}
                    open={open}
                    value={value}
                    name={field.name}
                    items={items}
                    min={1}
                    setOpen={setOpen}
                    onBlur={field.onBlur}
                    setValue={ 
                        (tag) => {
                        field.onChange(tag);
                        setValue(tag);
                        console.log(value);
                    }}
                    mode="BADGE"
                    placeholder={'Select some tags'}
                    listMode="SCROLLVIEW"
                    multiple={true}
                    scrollEnabled={true}
                    dropDownDirection='TOP'
                />                  
              </View>
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
  