import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Modal // Açılır takvim penceresi için ekledik
} from 'react-native';

const INITIAL_SLOTS = [
  { time: "08.00", status: "available" },
  { time: "08.30", status: "available" },
  { time: "09.00", status: "booked" },
  { time: "09.30", status: "booked" },
  { time: "10.00", status: "booked" },
  { time: "13.30", status: "available" }, 
  { time: "14.00", status: "available" },
  { time: "14.30", status: "available" },
  { time: "15.00", status: "available" },
  { time: "15.30", status: "booked" },
  { time: "16.00", status: "booked" },
  { time: "16.30", status: "booked" },
];

// Seçilebilecek örnek tarihler
const AVAILABLE_DATES = ["21/04/2026", "22/04/2026", "23/04/2026", "24/04/2026"];

export default function DoctorDetailScreen({ navigation }) {
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [selectedSlot, setSelectedSlot] = useState("13.30"); 
  const [appointmentDate, setAppointmentDate] = useState("21/04/2026");
  
  // Takvim pencerisinin açık/kapalı olma durumu
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleSlotPress = (time, isBooked) => {
    if (!isBooked) {
      setSelectedSlot(time);
    }
  };

  const handleSelectDate = (date) => {
    setAppointmentDate(date);
    setIsCalendarVisible(false); // Tarih seçilince takvimi kapat
  };

  const handleCreateAppointment = () => {
    if (selectedSlot) {
      console.log(`${appointmentDate} - ${selectedSlot} için randevu oluşturuldu.`);
      navigation.navigate('Appointments');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Üst Bar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Doktor Detayı</Text>
        </TouchableOpacity>

        {/* Doktor Bilgileri Kartı */}
        <View style={styles.doctorCard}>
          <View style={styles.doctorHeader}>
            <View style={styles.avatarBorder}>
              {/* Yukarıda anlattığım assets içindeki resmi okuyan kısım */}
              <Image 
                source={require('../../../assets/gokhan-aydin.png')} 
                style={styles.doctorImage}
                resizeMode="cover"
              />
            </View>
            
            <View style={styles.doctorInfoContainer}>
              <Text style={styles.doctorName}>Uzm. Dt. Gökhan{"\n"}Aydın</Text>
              <Text style={styles.specialtyText}>Ortodontist</Text>
            </View>

            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>4.3 ★</Text>
              <Text style={styles.ratingMax}>/5</Text>
            </View>
          </View>
        </View>

        {/* Saat Seçim Paneli */}
        <View style={styles.appointmentCard}>
          
          {/* TIKLANABİLİR TAKVİM SATIRI */}
          <TouchableOpacity 
            style={styles.dateHeaderRow} 
            onPress={() => setIsCalendarVisible(true)} // Basılınca takvimi açar
            activeOpacity={0.7}
          >
            <Text style={styles.calendarIcon}>📅</Text>
            <Text style={styles.dateText}>{appointmentDate}</Text>
            <Text style={styles.clickHintText}>(Tarih Değiştir)</Text>
          </TouchableOpacity>

          {/* Saat Kutuları */}
          <View style={styles.slotsGrid}>
            {slots.map((slot) => {
              const isBooked = slot.status === "booked";
              const isSelected = selectedSlot === slot.time;

              return (
                <TouchableOpacity
                  key={slot.time}
                  disabled={isBooked}
                  onPress={() => handleSlotPress(slot.time, isBooked)}
                  style={[
                    styles.slotButton,
                    isBooked && styles.slotBooked,
                    isSelected && styles.slotSelected
                  ]}
                >
                  <Text style={[
                    styles.slotButtonText,
                    isBooked && styles.textBooked,
                    isSelected && styles.textSelected
                  ]}>
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity 
            style={[styles.createButton, !selectedSlot && styles.createButtonDisabled]} 
            onPress={handleCreateAppointment}
            disabled={!selectedSlot}
          >
            <Text style={styles.createButtonText}>Randevu oluştur</Text>
          </TouchableOpacity>
        </View>

        {/* Klinik ve Konum Paneli */}
        <View style={styles.clinicCard}>
          <View style={styles.clinicHeaderRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.clinicName}>Kazan Denta</Text>
          </View>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>🗺️ Harita Konum Gösterimi</Text>
          </View>
          <Text style={styles.clinicAddress}>Çağlayan Sokağı, Koza Parkı Yakını</Text>
        </View>

      </ScrollView>

      {/* AÇILIR TAKVİM PENCERESİ (MODAL) */}
      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModalCard}>
            <Text style={styles.modalTitle}>Randevu Tarihi Seçin</Text>
            
            {AVAILABLE_DATES.map((date) => (
              <TouchableOpacity 
                key={date} 
                style={[styles.dateOptionButton, appointmentDate === date && styles.dateOptionSelected]}
                onPress={() => handleSelectDate(date)}
              >
                <Text style={[styles.dateOptionText, appointmentDate === date && styles.dateOptionTextSelected]}>
                  📅  {date}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              style={styles.closeModalButton} 
              onPress={() => setIsCalendarVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>İptal</Text>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 110,
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2e6385',
    fontWeight: '600',
  },
  doctorCard: {
    backgroundColor: 'rgba(178, 242, 187, 0.3)', 
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#41484d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBorder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  doctorInfoContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d1c2f',
    lineHeight: 24,
  },
  specialtyText: {
    fontSize: 14,
    color: '#41484d',
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0d1c2f',
  },
  ratingMax: {
    fontSize: 11,
    color: '#71787e',
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#41484d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  dateHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#EFF4FF',
    padding: 12,
    borderRadius: 10,
  },
  calendarIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e6385',
  },
  clickHintText: {
    fontSize: 12,
    color: '#71787e',
    marginLeft: 'auto',
    fontWeight: '500',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  slotButton: {
    width: '23%', 
    height: 40,
    backgroundColor: '#d5e3fd', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  slotSelected: {
    backgroundColor: '#a5d8ff', 
    borderWidth: 1,
    borderColor: 'rgba(46, 99, 133, 0.2)',
  },
  slotBooked: {
    backgroundColor: '#ffdad6', 
    opacity: 0.6,
  },
  slotButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#41484d',
  },
  textSelected: {
    color: '#285f80',
  },
  textBooked: {
    color: '#93000a',
  },
  createButton: {
    backgroundColor: '#a5d8ff', 
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#285f80',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clinicCard: {
    backgroundColor: 'rgba(239, 244, 255, 0.5)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#c1c7ce33',
  },
  clinicHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d1c2f',
  },
  mapPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: '#64748B',
  },
  clinicAddress: {
    fontSize: 13,
    color: '#41484d',
    textAlign: 'center',
  },
  
  // MODAL (TAKVİM PENCERESİ) STİLLERİ
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModalCard: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d1c2f',
    marginBottom: 20,
  },
  dateOptionButton: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    marginBottom: 10,
  },
  dateOptionSelected: {
    backgroundColor: '#a5d8ff',
    borderWidth: 1,
    borderColor: '#2e6385',
  },
  dateOptionText: {
    fontSize: 15,
    color: '#41484d',
    fontWeight: '500',
  },
  dateOptionTextSelected: {
    color: '#285f80',
    fontWeight: 'bold',
  },
  closeModalButton: {
    marginTop: 10,
    padding: 10,
  },
  closeModalButtonText: {
    color: '#71787e',
    fontSize: 15,
    fontWeight: '600',
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
  },
  activeNavText: {
    color: '#2e6385',
    fontWeight: 'bold',
  },
});