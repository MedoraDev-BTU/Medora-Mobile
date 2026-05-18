import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [sifre, setSifre] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sadece rakam girişine izin veren ve 11 haneyle sınırlayan fonksiyon
  const handleTcKimlikChange = (text) => {
    const numericValue = text.replace(/\D/g, "").slice(0, 11);
    setTcKimlikNo(numericValue);
  };

  const handleLogin = () => {
    // Backend bağlantısı yapıldığında burası tetiklenecek
    console.log("Giriş yapılıyor:", tcKimlikNo, sifre);
    
    // Şimdilik test edebilmek için sahte bir giriş başarılı tetikleyicisi (App.js'e gidiyor)
    if (onLoginSuccess) {
      onLoginSuccess({ name: "Melis Aksoy" });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Üst Logo ve Başlık Alanı */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../../assets/medora-logo.png')} 
                style={styles.logoImage} 
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>MEDORA</Text>
            <Text style={styles.subtitle}>Sağlığınız İçin Modern Bir Adım</Text>
          </View>

          {/* Form Alanı (Beyaz Kart) */}
          <View style={styles.card}>
            
            {/* T.C. Kimlik No Girişi */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>T.C. Kimlik No</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🪪</Text>
                <TextInput
                  style={styles.input}
                  placeholder="11 haneli kimlik numaranız"
                  placeholderTextColor="#c1c7ce"
                  keyboardType="numeric"
                  maxLength={11}
                  value={tcKimlikNo}
                  onChangeText={handleTcKimlikChange}
                />
              </View>
            </View>

            {/* Şifre Girişi */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#c1c7ce"
                  secureTextEntry={!showPassword}
                  value={sifre}
                  onChangeText={setSifre}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? "👁️" : "🙈"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Şifremi Unuttum */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
            </TouchableOpacity>

            {/* Giriş Yap Butonu */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Giriş Yap  →</Text>
            </TouchableOpacity>

          </View>

          {/* Alt Kısım: Üye Ol Alanı */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Henüz bir hesabınız yok mu?</Text>
            {/* HATA BURADAYDI: Register yerine Signup olmalıydı, düzeltildi 👇 */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.registerText}>Üye Ol</Text>
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
    backgroundColor: '#F8F9FF',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2e6385',
    letterSpacing: -0.75,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#71787e',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e6385',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 54,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#71787e',
    fontSize: 16,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#2e6385',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2e6385',
    height: 54,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#c1c7ce33',
    width: '100%',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#71787e',
    marginBottom: 8,
  },
  registerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2f6a3f',
  },
});