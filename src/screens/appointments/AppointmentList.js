import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Modal
} from 'react-native';

// Assets klasöründeki Local Doktor Fotoğraflarını içe aktarma
import Doctor1Img from '../../../assets/doktor1.png';
import Doctor2Img from '../../../assets/doktor2.png';
import Doctor3Img from '../../../assets/doktor3.png';
import Doctor4Img from '../../../assets/doktor4.png';

// Göstermelik Randevu Verileri - Local Resimler Bağlandı
const MOCK_UPCOMING = [
  {
    id: '1',
    doctorName: 'Dr. Ahmet Yılmaz',
    specialty: 'Kardiyoloji',
    date: '12 Şub 2024',
    time: '10:30',
    status: 'Onaylandı',
    imageLocal: Doctor1Img, // Replaced URI with local image variable
  },
  {
    id: '2',
    doctorName: 'Uzm. Dr. Selin Erten',
    specialty: 'Dermatoloji',
    date: '18 Mart 2024',
    time: '14:15',
    status: 'İşleniyor',
    imageLocal: Doctor2Img, // Replaced URI with local image variable
  }
];

const MOCK_PAST = [
  {
    id: '3',
    doctorName: 'Prof. Dr. Caner Öz',
    specialty: '02 Şub 2024 — 10:30\n📍 Balat, Lozan Sk. Nilüfer/Bursa',
    rating: 5,
    imageLocal: Doctor3Img, // Replaced URI with local image variable
  },
  {
    id: '4',
    doctorName: 'Enes Mert Yılmaz',
    specialty: '15 Oca 2024 — 14:15',
    rating: null,
    imageLocal: Doctor4Img, // Replaced URI with local image variable
  }
];

const RATING_COLORS = {
  5: '#4CAF50',
  4: '#2196F3',
  3: '#FF9800',
  2: '#FFC107',
  1: '#F44336'
};

export default function AppointmentsScreen({ navigation }) {
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [ratingTarget, setRatingTarget] = useState(null);

  const openDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setDetailsModalVisible(true);
  };

  const openRating = (appointment) => {
    setRatingTarget(appointment);
    setRatingModalVisible(true);
  };

  const handleRate = (score) => {
    console.log(`${ratingTarget.doctorName} için verilen puan: ${score}`);
    setRatingModalVisible(false);
    setRatingTarget(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Gelecek Randevular</Text>
          <View style={styles.badgeBlue}>
            <Text style={styles.badgeBlueText}>2 Aktif</Text>
          </View>
        </View>

        {MOCK_UPCOMING.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={item.imageLocal} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{item.doctorName}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
              </View>
              
              <View style={[styles.statusBadge, item.status === 'Onaylandı' ? styles.statusConfirmed : styles.statusProcessing]}>
                <Text style={[styles.statusText, item.status === 'Onaylandı' ? styles.statusConfirmedText : styles.statusProcessingText]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.dateTimeBar}>
              <Text style={styles.dateTimeText}>📅 {item.date}</Text>
              <Text style={styles.dateTimeText}>🕒 {item.time}</Text>
            </View>

            <TouchableOpacity style={styles.actionButton} onPress={() => openDetails(item)}>
              <Text style={styles.actionButtonText}>Detayları Görüntüle</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={[styles.sectionHeader, { marginTop: 30 }]}>
          <Text style={[styles.sectionTitle, { color: '#71787e' }]}>Geçmiş Randevular</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Hepsini Gör</Text>
          </TouchableOpacity>
        </View>

        {MOCK_PAST.map(item => (
          <View key={item.id} style={[styles.card, item.rating === 5 && styles.cardRatedHigh]}>
            <View style={styles.cardHeader}>
              <Image source={item.imageLocal} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={[styles.doctorName, { fontSize: 15 }]}>{item.doctorName}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
              </View>
              
              {item.rating ? (
                <View style={styles.ratedBadgeContainer}>
                  <View style={styles.ratedCircle}>
                    <Text style={styles.ratedCircleText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.ratedSmallText}>değerlendirildi</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.rateButton} onPress={() => openRating(item)}>
                  <Text style={styles.rateButtonText}>değerlendir</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

      </ScrollView>

      <Modal visible={detailsModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Konum Bilgisi</Text>
            {selectedAppointment && (
              <View style={{ width: '100%' }}>
                <Text style={styles.modalDoctorName}>{selectedAppointment.doctorName}</Text>
                
                <View style={styles.mapPlaceholder}>
                  <Text style={styles.mapPlaceholderText}>📍 Harita</Text>
                  <Text style={styles.modalSubText}>Medora Ana Klinik, Bursa</Text>
                </View>
              </View>
            )}
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setDetailsModalVisible(false)}>
              <Text style={styles.closeModalText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={ratingModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Doktoru Değerlendir</Text>
            <Text style={styles.modalSubText}>Hizmetten ne kadar memnun kaldınız?</Text>
            
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map(score => (
                <TouchableOpacity 
                  key={score} 
                  style={[styles.ratingBubble, { backgroundColor: RATING_COLORS[score] }]}
                  onPress={() => handleRate(score)}
                >
                  <Text style={styles.ratingBubbleText}>{score}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={[styles.closeModalButton, { backgroundColor: 'transparent', marginTop: 10 }]} onPress={() => setRatingModalVisible(false)}>
              <Text style={[styles.closeModalText, { color: '#71787e' }]}>İptal Et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d1c2f',
  },
  badgeBlue: {
    backgroundColor: '#a5d8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeBlueText: {
    color: '#285f80',
    fontSize: 12,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 13,
    color: '#2e6385',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(193, 199, 206, 0.2)',
  },
  cardRatedHigh: {
    backgroundColor: '#eafaf1',
    borderColor: '#ccebd7',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  doctorInfo: {
    flex: 1,
    paddingLeft: 14,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0d1c2f',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 13,
    color: '#71787e',
    lineHeight: 18,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusConfirmed: {
    backgroundColor: '#d1fae5',
  },
  statusConfirmedText: {
    color: '#059669',
  },
  statusProcessing: {
    backgroundColor: '#f1f5f9',
  },
  statusProcessingText: {
    color: '#475569',
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  dateTimeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
    gap: 16,
  },
  dateTimeText: {
    fontSize: 13,
    color: '#0d1c2f',
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#2e6385',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  rateButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#c1c7ce',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  rateButtonText: {
    fontSize: 11,
    color: '#41484d',
    fontWeight: '500',
  },
  ratedBadgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratedCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratedCircleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratedSmallText: {
    fontSize: 10,
    color: '#059669',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d1c2f',
    marginBottom: 8,
  },
  modalDoctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e6385',
    textAlign: 'center',
    marginTop: 10,
  },
  modalSubText: {
    fontSize: 13,
    color: '#71787e',
    textAlign: 'center',
    marginBottom: 16,
  },
  mapPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: '#2e6385',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  ratingBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingBubbleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: '#2e6385',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
  closeModalText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
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
  }
});