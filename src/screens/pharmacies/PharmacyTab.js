import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

// This data simulates what you will eventually pull from 'eczaneler' and 'klinikler' [cite: 1, 43, 78]
const places = [
  {
    id: 'c1',
    name: "Medora Kliniği",
    address: "Bağcılar, İstanbul",
    hours: "Pzt–Cmt 09:00–18:00",
    type: "clinic",
    lat: 41.039,
    lng: 28.856,
  },
  {
    id: 'p1',
    name: "Yeşilyurt Eczanesi",
    address: "Bağcılar, İstanbul",
    hours: "Nöbetçi • 24 saat", // Matches your 'nobetci_eczaneler' logic [cite: 78, 82]
    type: "pharmacy",
    lat: 41.041,
    lng: 28.862,
  },
];

export default function PharmacyTab() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.040,
          longitude: 28.859,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.lat, longitude: place.lng }}
            pinColor={place.type === 'pharmacy' ? 'green' : 'red'}
          >
            {/* Callout is the info bubble that appears when you tap a marker */}
            <Callout tooltip onPress={() => {}}>
              <View style={styles.card}>
                <Text style={styles.title}>{place.name}</Text>
                <Text style={styles.sub}>{place.address}</Text>
                <Text style={styles.sub}>{place.hours}</Text>

                <View style={styles.row}>
                  {place.type === 'clinic' && (
                    <TouchableOpacity
                      style={styles.btnPrimary}
                      onPress={() => navigation.navigate('Home', { screen: 'AppointmentList' })}
                    >
                      <Text style={styles.btnPrimaryText}>Randevu Al</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.btnSecondary}
                    onPress={() => console.log("Detail for:", place.id)}
                  >
                    <Text style={styles.btnSecondaryText}>Detay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: 200,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  sub: { fontSize: 12, color: '#666', marginBottom: 2 },
  row: { flexDirection: 'row', gap: 6, marginTop: 8 },
  btnPrimary: {
    backgroundColor: '#2D9CDB',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnPrimaryText: { color: '#fff', fontSize: 12 },
  btnSecondary: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnSecondaryText: { color: '#444', fontSize: 12 },
});