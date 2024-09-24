import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RecoilRoot } from "recoil";
import Home from "./src/screens/Home";

const App = () => {
  return (
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
};

export default App;

const styles = StyleSheet.create({});
