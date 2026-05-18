import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  // Telefon numarasını formatlamak istersen (İsteğe bağlı, temiz giriş için)
  const handlePhoneChange = (text) => {
    // Sadece rakamları tut ve formatla veya direkt ata
    setPhone(text);
  };

  const handleSendLink = () => {
    console.log("Sıfırlama bağlantısı gönderiliyor:", phone);
    // Backend API bağlantısı buraya gelecek
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Geri Dön Butonu */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Geri Dön</Text>
          </TouchableOpacity>

          {/* Üst İkon Alanı (Kilit ve Geri Ok İkonlu Beyaz Kutu) */}
          <View style={styles.iconContainer}>
            <View style={styles.whiteBox}>
              <Text style={styles.lockIcon}>🔄🔒</Text>
            </View>
          </View>

          {/* Başlık ve Açıklama */}
          <View style={styles.header}>
            <Text style={styles.title}>Şifre Sıfırlama</Text>
            <Text style={styles.subtitle}>
              Şifre sıfırlama bağlantısı alabilmek için lütfen{"\n"}kayıtlı telefon numaranızı girin.
            </Text>
          </View>

          {/* Form Alanı (Beyaz Transparan Kart) */}
          <View style={styles.card}>
            
            {/* Telefon Numarası Giriş Alanı */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.phoneIcon}>📱</Text>
                <View style={styles.textInputContainer}>
                  <Text style={styles.inputLabel}>Telefon Numarası</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+90 5XX XXX XX XX"
                    placeholderTextColor="#c1c7ce"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={handlePhoneChange}
                  />
                </View>
              </View>
            </View>

            {/* Bağlantı Gönder Butonu (Tam Yuvarlak / Pill-shaped) */}
            <TouchableOpacity style={styles.sendButton} onPress={handleSendLink}>
              <Text style={styles.sendButtonText}>Bağlantı Gönder</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF', // Figma'daki hafif mavi/açık arka plan
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2e6385',
    fontWeight: '600',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  whiteBox: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  lockIcon: {
    fontSize: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0d1c2f',
    letterSpacing: -0.24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#41484d',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 24,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9', // Slate-100 arka plan
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 64,
  },
  phoneIcon: {
    fontSize: 20,
    marginRight: 12,
    color: '#71787e',
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 11,
    color: '#c1c7ce',
    fontWeight: '500',
    marginBottom: 2,
  },
  input: {
    color: '#0d1c2f',
    fontSize: 15,
    padding: 0,
    height: 22,
  },
  sendButton: {
    backgroundColor: '#2e6385',
    height: 54,
    borderRadius: 27, // Tam yuvarlak (rounded-full) görünüm için height değerinin yarısı
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});