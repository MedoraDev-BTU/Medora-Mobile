import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppointmentsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Geçmiş ve Gelecek Randevularım</Text>
      <Text style={styles.subtext}>Henüz bir randevunuz bulunmamaktadır.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, fontWeight: 'bold', color: '#2D9CDB' },
  subtext: { color: '#828282', marginTop: 10 }
});