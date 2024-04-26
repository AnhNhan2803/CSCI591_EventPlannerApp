import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

import CreateForm from "../services/CreateService";
import { colors } from "../constants/theme";
import BgWrapper from "../components/BgWrapper";


const CreateScreen = () => {
  return(
    <BgWrapper>
      <Image source={require('../assets/wave-spacer.png')} />
      <ScrollView style={styles.View}>
        <CreateForm />
      </ScrollView>
    </BgWrapper>
  );
};
 
export default CreateScreen;

const styles = StyleSheet.create({
});