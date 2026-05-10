import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>Filter: Date, City, Area</Text>
      <Button title="Search Appointments" onPress={() => navigation.navigate('AppointmentList')} />
    </View>
  );
}
const styles = StyleSheet.create({ center: { flex: 1, justifyContent: 'center', alignItems: 'center' } });