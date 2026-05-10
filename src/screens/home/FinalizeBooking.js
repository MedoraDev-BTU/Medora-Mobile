import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function FinalizeBooking({ route, navigation }) {
  const { doctorName } = route.params || { doctorName: 'Seçili Doktor' };

  const handleConfirm = () => {
    Alert.alert("Success", "Randevunuz başarıyla oluşturuldu!", [
      { text: "Tamam", onPress: () => navigation.popToTop() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointment Confirmation</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Doktor:</Text>
        <Text style={styles.value}>{doctorName}</Text>

        <Text style={styles.label}>Tarih:</Text>
        <Text style={styles.value}>15 Mayıs 2026</Text>

        <Text style={styles.label}>Saat Seçin:</Text>
        <View style={styles.timeGrid}>
          {['09:00', '10:30', '14:00', '16:30'].map((time) => (
            <TouchableOpacity key={time} style={styles.timeBadge}>
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Randevuyu Tamamla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#2D9CDB', marginBottom: 30 },
  infoBox: { padding: 20, backgroundColor: '#F9F9F9', borderRadius: 15, marginBottom: 40 },
  label: { color: '#828282', fontSize: 14, marginTop: 10 },
  value: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 },
  timeBadge: { padding: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#2D9CDB', borderRadius: 5, marginRight: 10, marginBottom: 10 },
  timeText: { color: '#2D9CDB', fontWeight: 'bold' },
  confirmButton: { backgroundColor: '#2D9CDB', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});