import React from "react";
import CreateForm from "../services/CreateService";
import { colors } from "../constants/theme";

import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';


const CreateScreen = () => {
  return(
    <ScrollView style={styles.View}>
      <CreateForm />
    </ScrollView>
  );
};
 
export default CreateScreen;

const styles = StyleSheet.create({
  View: {
    backgroundColor: colors.maroon, 
  },
});