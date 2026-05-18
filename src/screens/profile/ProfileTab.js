import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';

const INITIAL_HEALTH_INFO = [
  { id: '1', label: 'Doğum Tarihi', value: '12 Mayıs 1990', icon: '📅' },
  { id: '2', label: 'Boy', value: '172 cm', icon: '📏' },
  { id: '3', label: 'Kilo', value: '64 kg', icon: '⚖️' },
];

const INITIAL_DOCTORS = [
  { id: '1', name: 'Dr. Caner Yılmaz', specialty: 'Kardiyoloji Uzmanı', icon: '👨‍⚕️' },
  { id: '2', name: 'Uzm. Dr. Ayşe Kaya', specialty: 'Dermatolog', icon: '👩‍⚕️' },
];

export default function ProfileTab({ user }) {
  const [healthInfo, setHealthInfo] = useState(INITIAL_HEALTH_INFO);
  const [favoriteDoctors, setFavoriteDoctors] = useState(INITIAL_DOCTORS);

  const handleDeleteDoctor = (id, name) => {
    Alert.alert(
      "Doktoru Kaldır",
      `${name} favorilerinizden kaldırılsın mı?`,
      [
        { text: "İptal", style: "cancel" },
        { 
          text: "Kaldır", 
          style: "destructive", 
          onPress: () => setFavoriteDoctors(prev => prev.filter(d => d.id !== id)) 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Profil Başlığı */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.userName}>Melis Aksoy</Text>
          <Text style={styles.userEmail}>melis.aksoy@email.com</Text>
        </View>

        {/* Sağlık Bilgileri Bölümü */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sağlık Bilgileri</Text>
          {healthInfo.map((item) => (
            <View key={item.id} style={styles.healthCard}>
              <View style={styles.cardLeft}>
                <View style={styles.iconBoxBlue}>
                  <Text style={styles.emojiText}>{item.icon}</Text>
                </View>
                <Text style={styles.cardLabel}>{item.label}</Text>
              </View>
              <TouchableOpacity style={styles.valueButton}>
                <Text style={styles.cardValue}>{item.value}</Text>
                <Text style={styles.editIcon}>✎</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Favori Doktorlar Bölümü */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favori Doktorlar</Text>
          {favoriteDoctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorCard}>
              <View style={styles.cardLeft}>
                <View style={styles.iconBoxPurple}>
                  <Text style={styles.emojiText}>{doctor.icon}</Text>
                </View>
                <View>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDeleteDoctor(doctor.id, doctor.name)}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          {/* Yeni Doktor Ekle Butonu */}
          <TouchableOpacity style={styles.addDoctorButton} activeOpacity={0.7}>
            <Text style={styles.addDoctorText}>+ Yeni Doktor Ekle</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFF4FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d1c2f',
    marginTop: 12,
  },
  userEmail: {
    fontSize: 14,
    color: '#71787e',
    marginTop: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d1c2f',
    marginBottom: 12,
  },
  healthCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFF4FF',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBoxBlue: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a5d8ff4c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBoxPurple: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emojiText: {
    fontSize: 18,
  },
  cardLabel: {
    fontSize: 15,
    color: '#0d1c2f',
    fontWeight: '500',
  },
  valueButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d1c2f',
    marginRight: 8,
  },
  editIcon: {
    color: '#2e6385',
    fontSize: 14,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFF4FF',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d1c2f',
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#71787e',
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 18,
  },
  addDoctorButton: {
    backgroundColor: '#EFF4FF',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  addDoctorText: {
    color: '#2e6385',
    fontSize: 15,
    fontWeight: 'bold',
  },
});