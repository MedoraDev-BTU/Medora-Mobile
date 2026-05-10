import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileTab({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Info</Text>
      <Text>Name: {user.ad_soyad}</Text>
      <Text>Email: {user.eposta}</Text>
      <Text style={styles.header}>Personal Info</Text>
      <Text>Height: 175cm | Weight: 70kg</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { padding: 20 }, header: { fontSize: 20, fontWeight: 'bold', marginTop: 20 } });