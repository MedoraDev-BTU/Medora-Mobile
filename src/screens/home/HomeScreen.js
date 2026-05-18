import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  FlatList
} from 'react-native';

// Göstermelik Popüler Klinik Verileri
const MOCK_CLINICS = [
  {
    id: '1',
    name: 'Medicana Sağlık',
    rating: '4.8',
    distance: '2.4km',
    icon: '🏢',
    iconBg: '#E6F0FA'
  },
  {
    id: '2',
    name: 'Acıbadem Hospital',
    rating: '4.9',
    distance: '1.1km',
    icon: '➕',
    iconBg: '#E8F5E9'
  }
];

export default function HomeScreen({ navigation }) {
  const [selectedCity, setSelectedCity] = useState("İstanbul");
  const [selectedBranch, setSelectedBranch] = useState("Kardiyoloji");
  const [appointmentDate, setAppointmentDate] = useState("11/25/2023");

  // Popüler Klinik Kartı Bileşeni
  const renderClinicCard = ({ item }) => (
    <View style={styles.clinicCard}>
      <View style={[styles.clinicIconContainer, { backgroundColor: item.iconBg }]}>
        <Text style={styles.clinicIconText}>{item.icon}</Text>
      </View>
      <Text style={styles.clinicName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.clinicSubtext}>{item.rating} • {item.distance}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Üst Logo ve Başlık Alanı */}
        <View style={styles.header}>
          <Text style={styles.title}>MEDORA</Text>
          <Text style={styles.subtitle}>Sağlık randevunuzu hemen planlayın</Text>
        </View>

        {/* Filtreleme ve Arama Alanı */}
        <View style={styles.searchCard}>
          
          {/* Şehir Seçimi */}
          <TouchableOpacity style={styles.selectorWrapper} activeOpacity={0.7}>
            <View style={[styles.selectorIconBox, { backgroundColor: '#E6F0FA' }]}>
              <Text style={styles.selectorIcon}>📍</Text>
            </View>
            <View style={styles.selectorTextContainer}>
              <Text style={styles.selectorLabel}>Şehir Seçiniz</Text>
              <Text style={styles.selectorValue}>{selectedCity}</Text>
            </View>
            <Text style={styles.chevron}>▼</Text>
          </TouchableOpacity>

          {/* Branş Seçimi */}
          <TouchableOpacity style={styles.selectorWrapper} activeOpacity={0.7}>
            <View style={[styles.selectorIconBox, { backgroundColor: '#E8F5E9' }]}>
              <Text style={styles.selectorIcon}>🩺</Text>
            </View>
            <View style={styles.selectorTextContainer}>
              <Text style={styles.selectorLabel}>Branş Seçiniz</Text>
              <Text style={styles.selectorValue}>{selectedBranch}</Text>
            </View>
            <Text style={styles.chevron}>▼</Text>
          </TouchableOpacity>

          {/* Tarih Seçimi */}
          <TouchableOpacity style={styles.selectorWrapper} activeOpacity={0.7}>
            <View style={[styles.selectorIconBox, { backgroundColor: '#F1F5F9' }]}>
              <Text style={styles.selectorIcon}>📅</Text>
            </View>
            <View style={styles.selectorTextContainer}>
              <Text style={styles.selectorLabel}>Randevu Tarihi</Text>
              <Text style={styles.selectorValue}>{appointmentDate}</Text>
            </View>
            <Text style={styles.chevron}>📅</Text>
          </TouchableOpacity>

         {/* Randevu Ara Butonu */}
<TouchableOpacity 
  style={styles.searchButton} 
  activeOpacity={0.9}
  onPress={() => navigation.navigate('AramaSonuclari')} // <-- Burası 'AppointmentList' idi, 'AramaSonuclari' olarak değiştirdik
>
  <Text style={styles.searchButtonText}>Randevu Ara</Text>
</TouchableOpacity>
        </View>

        {/* Popüler Klinikler Bölümü */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popüler Klinikler</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>

        {/* Yatay Klinik Listesi */}
        <FlatList
          data={MOCK_CLINICS}
          keyExtractor={(item) => item.id}
          renderItem={renderClinicCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.clinicList}
        />

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
    flexGrow: 1,
    paddingBottom: 20, // <-- BOŞLUK DÜZELTİLDİ
  },
  header: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e6385',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#71787e',
  },
  searchCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 3,
  },
  selectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  selectorIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectorIcon: {
    fontSize: 18,
  },
  selectorTextContainer: {
    flex: 1,
  },
  selectorLabel: {
    fontSize: 11,
    color: '#71787e',
    fontWeight: '500',
    marginBottom: 2,
  },
  selectorValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0d1c2f',
  },
  chevron: {
    fontSize: 12,
    color: '#71787e',
    paddingRight: 4,
  },
  searchButton: {
    backgroundColor: '#2e6385',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d1c2f',
  },
  seeAllText: {
    fontSize: 13,
    color: '#2e6385',
    fontWeight: '600',
  },
  clinicList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  clinicCard: {
    backgroundColor: 'white',
    width: 155,
    borderRadius: 16,
    padding: 12,
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  clinicIconContainer: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  clinicIconText: {
    fontSize: 32,
  },
  clinicName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d1c2f',
    marginBottom: 4,
  },
  clinicSubtext: {
    fontSize: 11,
    color: '#71787e',
  }
});