import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

export default function ResetSuccessScreen({ navigation }) {
  const handleContinue = () => {
    // Kullanıcıyı şifre yenileme sonrası Giriş Yap ekranına yönlendirir
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        {/* Parlayan Başarılı Onay Kutusu İkonu */}
        <View style={styles.iconGlowWrapper}>
          <View style={styles.successBox}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        {/* Başlık ve Açıklama Metinleri */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Şifre sıfırlama başarılı</Text>
          <Text style={styles.subtitle}>
            Şimdi senin için yeni ve daha güvenli{"\n"}bir şifre oluşturabiliriz.
          </Text>
        </View>

        {/* Devam Et Butonu */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Devam Et</Text>
        </TouchableOpacity>

      </View>

      {/* Alt Çizgi Tasarımsal Öğe */}
      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF', // Figma'daki tam arka plan rengi
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  iconGlowWrapper: {
    // Figma'daki dış parlamayı simüle eden gölgelendirme katmanı
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 40,
  },
  successBox: {
    width: 110,
    height: 110,
    backgroundColor: '#2e6385', // Medora ana mavi rengi
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  checkmark: {
    color: 'white',
    fontSize: 44,
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 45,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0d1c2f',
    letterSpacing: -0.75,
    textAlign: 'center',
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    color: '#41484d',
    textAlign: 'center',
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: '#2e6385',
    height: 54,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 8,
    width: 120,
    height: 5,
    backgroundColor: '#0d1c2f',
    borderRadius: 10,
    opacity: 0.2,
  },
});