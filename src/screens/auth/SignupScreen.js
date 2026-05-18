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
  ScrollView,
  Switch
} from 'react-native';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // T.C. Kimlik numarasını sadece rakam yapar ve 11 hane ile sınırlar
  const handleTcKimlikChange = (text) => {
    const numericValue = text.replace(/\D/g, "").slice(0, 11);
    setTcKimlikNo(numericValue);
  };

  // Telefon numarasını otomatik biçimlendirir: 0 (5xx) xxx xx xx
  const handlePhoneChange = (text) => {
    let digits = text.replace(/\D/g, "").slice(0, 11);
    if (digits.length > 0 && digits[0] !== '0') {
      digits = '0' + digits;
    }
    
    let formatted = digits;
    if (digits.length > 0) {
      formatted = digits[0];
      if (digits.length > 1) {
        formatted += ` (${digits.slice(1, 4)}`;
      }
      if (digits.length >= 4) {
        formatted += ') ';
      }
      if (digits.length > 4) {
        formatted += digits.slice(4, 7);
      }
      if (digits.length > 7) {
        formatted += ` ${digits.slice(7, 9)}`;
      }
      if (digits.length > 9) {
        formatted += ` ${digits.slice(9, 11)}`;
      }
    }
    setPhone(formatted);
  };

  const handleSignup = () => {
    console.log("Kayıt verileri:", { fullName, tcKimlikNo, phone, password });
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Üst Logo Paneli */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../../assets/medora-logo.png')} 
                style={styles.logoImage} 
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Kayıt Ol</Text>
            <Text style={styles.subtitle}>Sağlığınız için ilk adımı atın.</Text>
          </View>

          {/* Giriş Alanları (Inputlar) */}
          <View style={styles.formCard}>
            
            {/* Ad Soyad */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ad Soyad</Text>
              <TextInput
                style={styles.input}
                placeholder="Örn: Ahmet Yılmaz"
                placeholderTextColor="#c1c7ce"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* T.C. Kimlik No */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>T.C. Kimlik No</Text>
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

            {/* Telefon Numarası */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Telefon Numarası</Text>
              <TextInput
                style={styles.input}
                placeholder="0 (5xx) xxx xx xx"
                placeholderTextColor="#c1c7ce"
                keyboardType="phone-pad"
                maxLength={18}
                value={phone}
                onChangeText={handlePhoneChange}
              />
            </View>

            {/* Şifre */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="••••••••"
                  placeholderTextColor="#c1c7ce"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                  <Text style={styles.eyeIcon}>{showPassword ? "👁️" : "🙈"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Şifre Tekrar */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Şifre Tekrar</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="••••••••"
                  placeholderTextColor="#c1c7ce"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
                  <Text style={styles.eyeIcon}>{showConfirmPassword ? "👁️" : "🙈"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Onay Kutusu */}
            <View style={styles.termsRow}>
              <Switch
                value={acceptedTerms}
                onValueChange={setAcceptedTerms}
                trackColor={{ false: "#c1c7ce", true: "#a5d8ff" }}
                thumbColor={acceptedTerms ? "#2e6385" : "#f4f3f4"}
              />
              <Text style={styles.termsText}>
                Kullanım Koşullarını ve <Text style={styles.linkText}>Gizlilik Politikası</Text>'nı okudum, onaylıyorum.
              </Text>
            </View>

            {/* Kayıt Ol Butonu */}
            <TouchableOpacity 
              style={[styles.submitButton, !acceptedTerms && styles.disabledButton]} 
              onPress={handleSignup}
              disabled={!acceptedTerms}
            >
              <Text style={styles.submitButtonText}>Kayıt Ol  →</Text>
            </TouchableOpacity>

          </View>

          {/* Alt Link (Giriş Yap) */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Zaten bir hesabınız var mı?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>

          {/* KVKK Güvenlik Bilgisi */}
          <View style={styles.securityBox}>
            <View style={styles.shieldIconContainer}>
              <Text style={styles.shieldText}>🛡️</Text>
            </View>
            <View>
              <Text style={styles.securityTitle}>GÜVENLİ KAYIT</Text>
              <Text style={styles.securitySubtext}>Verileriniz KVKK kapsamında korunmaktadır.</Text>
            </View>
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
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 72,
    height: 72,
    marginBottom: 12,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0d1c2f',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#71787e',
  },
  formCard: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputLabel: {
    fontSize: 11,
    color: '#71787e',
    marginBottom: 2,
  },
  input: {
    fontSize: 15,
    color: '#0d1c2f',
    padding: 0,
    height: 30,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    paddingLeft: 10,
  },
  eyeIcon: {
    fontSize: 16,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    paddingRight: 32,
  },
  termsText: {
    fontSize: 12,
    color: '#71787e',
    marginLeft: 10,
    lineHeight: 16,
  },
  linkText: {
    color: '#2e6385',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#2e6385',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2e6385',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#b1c7d6',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#71787e',
    marginRight: 6,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e6385',
  },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 244, 255, 0.8)',
    borderRadius: 16,
    padding: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(193, 199, 206, 0.2)',
  },
  shieldIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#b2f2bb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shieldText: {
    fontSize: 16,
  },
  securityTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#41484d',
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  securitySubtext: {
    fontSize: 11,
    color: '#71787e',
  }
});