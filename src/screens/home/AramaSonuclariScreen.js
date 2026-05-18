import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';

// Görseldeki arama sonuçlarına uygun göstermelik (mock) veri seti
const MOCK_RESULTS = [
  { id: '1', clinicName: 'Gama Ortodonti', doctorName: 'Uzm. Dt. Gökhan Aydın', rating: '4.7' },
  { id: '2', clinicName: 'Kazan Denta', doctorName: 'Uzm. Dt. Betül Kazan', rating: '4.5' },
  { id: '3', clinicName: 'Gama Ortodonti', doctorName: 'Uzm. Dt. Gökhan Aydın', rating: '4.1' },
  { id: '4', clinicName: 'Kazan Denta', doctorName: 'Uzm. Dt. Betül Kazan', rating: '3.6' }, // Görselde seçili duran kart
  { id: '5', clinicName: 'Kazan Denta', doctorName: 'Uzm. Dt. Betül Kazan', rating: '3.1' },
  { id: '6', clinicName: 'Gama Ortodonti', doctorName: 'Uzm. Dt. Gökhan Aydın', rating: '3.0' },
];

export default function SearchResultsScreen({ navigation }) {
  // Görseldeki 4 numaralı kartın mavi kenarlıklı (seçili) durmasını simüle etmek için varsayılan state verdik
  const [selectedId, setSelectedId] = useState('4'); 

  // Sonuç listesindeki her bir klinik kartının tasarımı
  const renderResultCard = ({ item }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity 
        style={[styles.card, isSelected && styles.cardSelected]} 
        activeOpacity={0.8}
        onPress={() => {
          setSelectedId(item.id);
          // Herhangi bir doktora/kliniğe tıklandığında detay sayfasına yönlendirme yapıyor
          navigation.navigate('DoctorDetail'); 
        }}
      >
        <View style={styles.cardContent}>
          <View style={styles.textGroup}>
            <Text style={styles.clinicName}>{item.clinicName}</Text>
            <Text style={styles.doctorName}>{item.doctorName}</Text>
          </View>
          
          {/* Yıldızlı Puan Rozeti */}
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{item.rating} ★</Text>
            <Text style={styles.ratingMax}>/5</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Üst Gezinme Barı (Geri Butonu) */}
      <View style={styles.topNavigation}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.placeholderView} />
      </View>

      {/* Tarih Seçici Şerit (< 📅 GG/AA/YYYY >) */}
      <View style={styles.dateSelectorRibbon}>
        <TouchableOpacity style={styles.ribbonArrow}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        
        <View style={styles.dateCenter}>
          <Text style={styles.calendarIcon}>📅</Text>
          <Text style={styles.dateText}>GG/AA/YYYY</Text>
        </View>

        <TouchableOpacity style={styles.ribbonArrow}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Sonuç Listesi */}
      <FlatList
        data={MOCK_RESULTS}
        keyExtractor={(item) => item.id}
        renderItem={renderResultCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButtonText: {
    fontSize: 24,
    color: '#71787e',
    fontWeight: 'bold',
  },
  placeholderView: {
    width: 40,
  },
  dateSelectorRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF4FF',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ribbonArrow: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 22,
    color: '#2e6385',
    fontWeight: '600',
  },
  dateCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#2e6385',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#2e6385',
    shadowOpacity: 0.08,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textGroup: {
    flex: 1,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e6385',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 14,
    color: '#71787e',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0d1c2f',
  },
  ratingMax: {
    fontSize: 11,
    color: '#71787e',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: '#71787e',
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 10,
    color: '#71787e',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#2e6385',
    fontWeight: 'bold',
  },
});