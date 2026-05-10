import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const MOCK_APPOINTMENTS = [
  { id: '1', doctor: 'Dr. Nejla Dilay', specialty: 'Kardiyoloji' },
  { id: '2', doctor: 'Dr. Sıla Yıldırım', specialty: 'Nöroloji' },
  { id: '3', doctor: 'Dr. Leman Şayir', specialty: 'Dermatoloji' },
];

export default function AppointmentList({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Doctors</Text>
      <FlatList
        data={MOCK_APPOINTMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('FinalizeBooking', { doctorName: item.doctor })}
          >
            <Text style={styles.doctorName}>{item.doctor}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 20, borderWidth: 1, borderColor: '#eee', borderRadius: 10, marginBottom: 15 },
  doctorName: { fontSize: 18, fontWeight: 'bold', color: '#2D9CDB' },
  specialty: { color: '#828282', marginTop: 5 }
});