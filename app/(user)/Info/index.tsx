import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

const Info = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/info.jpg")}
        />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Nama:</Text>
        <Text style={styles.value}>Anisah Tri Apsari</Text>
        <Text style={styles.label}>Kelas:</Text>
        <Text style={styles.value}>5CD</Text>
        <Text style={styles.label}>NIM:</Text>
        <Text style={styles.value}>062230701472</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 40,
  },
  infoWrapper: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#212529",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Info;
