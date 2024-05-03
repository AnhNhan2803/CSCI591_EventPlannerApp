import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useEffect } from "react";
import { useController } from 'react-hook-form';
import { StyleSheet } from "react-native";

import { colors } from "../constants/theme";


/**
 * TagPicker component for selecting tags.
 *
 * @component
 * @param {object} control - The control object from react-hook-form.
 * @param {string} name - The name of the field.
 * @returns {JSX.Element} The rendered TagPicker component.
 */
const TagPicker = ({ control, name }) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(field.value);

  const [items, setItems] = useState([
    { label: 'Sports', value: 'sports'},
    { label: 'Social', value: 'social'}, 
    { label: 'Guest Speaker', value: 'guest-speaker'},
    { label: 'Free food', value: 'free-food'},
    { label: 'Sustainability', value: 'sustainability'},            
  ]);
  
  useEffect(()  => {
    const newValue = values;
    field.onChange(newValue);
  }, [values, setValues]);
   
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
  