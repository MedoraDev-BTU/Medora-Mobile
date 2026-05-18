import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PharmaciesScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 🗺️ HARİTA BÖLÜMÜ (Yer Tutucu) */}
      {/* İleride buraya react-native-maps eklenecek */}
      <View style={styles.mapBackground}>
        
        {/* Temsili Mavi Eczane Pinleri */}
        <View style={[styles.bluePin, { top: '30%', left: '75%' }]}>
          <Text style={styles.pinIcon}>🏥</Text>
        </View>
        <View style={[styles.bluePin, { top: '55%', left: '60%' }]}>
          <Text style={styles.pinIcon}>🏥</Text>
        </View>

        {/* Aktif/Seçili Kırmızı Nöbetçi Pini */}
        <View style={styles.redPinContainer}>
          <View style={styles.redPinBubble}>
            <Text style={styles.redPinIcon}>💊</Text>
            <Text style={styles.redPinText}>Nöbetçi: Merkez Eczanesi</Text>
          </View>
          <View style={styles.redPinTriangle} />
        </View>

      </View>

      {/* 🔍 ÜST ARAMA VE FİLTRE ÇUBUĞU */}
      <View style={styles.topOverlay}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder="Şehir ve İlçe Seç..."
            placeholderTextColor="#71787e99"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Sağ Taraf Harita Kontrol Butonları */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlIcon}>🎯</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlIcon}>📚</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 💊 SEÇİLİ ECZANE KARTI (Alt Kısım) */}
      {/* İsteğine uygun olarak yol tarifi ok butonu KALDARILMIŞTIR */}
      <View style={styles.pharmacyCardOverlay}>
        <View style={styles.pharmacyCard}>
          
          <View style={styles.cardHeader}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>ŞU AN AÇIK (NÖBETÇİ)</Text>
            </View>
            <Text style={styles.pharmacyName}>Merkez Eczanesi</Text>
            <Text style={styles.pharmacyAddress}>📍 850m • Barbaros Bulvarı No:42</Text>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.callButton}>
              <Text style={styles.callButtonText}>📞 Ara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>↗️ Paylaş</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#D4E6E2', // Temsili harita arka plan rengi
  },
  bluePin: {
    position: 'absolute',
    width: 36,
    height: 36,
    backgroundColor: '#9accf3',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  pinIcon: {
    fontSize: 16,
  },
  redPinContainer: {
    position: 'absolute',
    top: '42%',
    left: '20%',
    alignItems: 'center',
  },
  redPinBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ba1a1a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#ba1a1a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  redPinIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  redPinText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  redPinTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ba1a1a',
    transform: [{ rotate: '180deg' }],
    marginTop: -2,
  },
  topOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    height: 52,
    borderRadius: 26,
    paddingHorizontal: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#71787e',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0d1c2f',
  },
  filterButton: {
    padding: 4,
  },
  filterIcon: {
    fontSize: 18,
  },
  mapControls: {
    alignItems: 'center',
    gap: 12,
  },
  controlButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  controlIcon: {
    fontSize: 18,
  },
  pharmacyCardOverlay: {
    position: 'absolute',
    bottom: 95, // Bottom nav'ın hemen üstünde
    left: 20,
    right: 20,
  },
  pharmacyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  cardHeader: {
    marginBottom: 16,
  },
  badgeContainer: {
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeText: {
    color: '#ba1a1a',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e6385',
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 13,
    color: '#71787e',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E5F8E8', // Light Green
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    color: '#357044',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#a5d8ff', // Light Blue
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#285f80',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: 'rgba(193, 199, 206, 0.2)',
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