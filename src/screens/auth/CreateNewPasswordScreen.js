import React, { useState, useMemo } from 'react';
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

const strengthSegments = [0, 1, 2, 3];

// Tür belirtimi (: string) kaldırılarak saf JavaScript haline getirildi
const getPasswordStrength = (value) => {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(value) && /\d/.test(value)) score += 1;
  if (
    /[^A-Za-zÇĞİÖŞÜçğıöşü\d]/.test(value) ||
    (/[a-zçğıöşü]/.test(value) && /[A-ZÇĞİÖŞÜ]/.test(value))
  ) {
    score += 1;
  }

  const normalizedScore = Math.min(score, 3);

  if (normalizedScore <= 1) {
    return { score: normalizedScore, label: "Zayıf" };
  }
  if (normalizedScore === 2) {
    return { score: normalizedScore, label: "Orta" };
  }
  return { score: normalizedScore, label: "Güçlü" };
};

export default function CreateNewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password],
  );

  const isFormValid =
    password.length >= 8 &&
    /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(password) &&
    /\d/.test(password) &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSavePassword = () => {
    if (isFormValid) {
      console.log("Yeni şifre kaydediliyor:", password);
      navigation.navigate('ResetSuccess');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Üst Başlık Alanı */}
          <View style={styles.header}>
            <Text style={styles.title}>Yeni Şifre Oluştur</Text>
            <Text style={styles.subtitle}>
              Haydi, senin için yeni ve daha güvenli bir şifre{"\n"}oluşturalım.
            </Text>
          </View>

          {/* Form Alanı (Beyaz Kart) */}
          <View style={styles.card}>
            
            {/* Şifre Giriş Alanı */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <View style={styles.textInputContainer}>
                  <Text style={styles.inputLabel}>ŞİFRE</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#c1c7ce80"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    autoComplete="new-password"
                  />
                </View>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                  <Text style={styles.eyeIcon}>{showPassword ? "👁️" : "🙈"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Şifre Tekrar Giriş Alanı */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <View style={styles.textInputContainer}>
                  <Text style={styles.inputLabel}>ŞİFRE TEKRAR</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#c1c7ce80"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword} // <-- Hata buradaydı, setConfirmPassword olarak düzeltildi
                    autoComplete="new-password"
                  />
                </View>
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
                  <Text style={styles.eyeIcon}>{showConfirmPassword ? "👁️" : "🙈"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Şifre Kriter Bilgisi ve Şifre Gücü Çubuğu */}
            <View style={styles.strengthContainer}>
              <Text style={styles.strengthInfoText}>
                En az 8 karakterden oluşan, harf ve rakam içeren bir kombinasyon.
              </Text>
              
              {/* Dinamik Renkli Güç Çubuğu */}
              <View style={styles.progressBarWrapper}>
                {strengthSegments.map((segment) => {
                  const isActive = segment < passwordStrength.score;
                  return (
                    <View
                      key={segment}
                      style={[
                        styles.progressSegment,
                        isActive ? styles.segmentActive : styles.segmentInactive
                      ]}
                    />
                  );
                })}
              </View>

              {/* Güç Durumu Etiketi */}
              <View style={styles.labelContainer}>
                <Text style={styles.strengthLabelText}>{passwordStrength.label}</Text>
              </View>
            </View>

            {/* Devam Et Butonu */}
            <TouchableOpacity 
              style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]} 
              onPress={handleSavePassword}
              disabled={!isFormValid}
            >
              <Text style={styles.continueButtonText}>Devam Et</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Ekranın En Altındaki Çizgi Detayı */}
      <View style={styles.bottomBar} />
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
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d1c2f',
    letterSpacing: -0.60,
    marginBottom: 8,
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
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 65,
    borderWidth: 1,
    borderColor: '#c1c7ce4c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 10,
    color: '#c1c7ce',
    fontWeight: '600',
    letterSpacing: 0.24,
    marginBottom: 2,
  },
  input: {
    color: '#0d1c2f',
    fontSize: 16,
    padding: 0,
    height: 24,
  },
  eyeButton: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 18,
  },
  strengthContainer: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 2,
  },
  strengthInfoText: {
    fontSize: 11,
    color: '#41484d',
    lineHeight: 14,
    marginBottom: 8,
  },
  progressBarWrapper: {
    flexDirection: 'row',
    height: 4,
    backgroundColor: '#e6eeff',
    borderRadius: 10,
    overflow: 'hidden',
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: '100%',
  },
  segmentActive: {
    backgroundColor: '#2e6385',
  },
  segmentInactive: {
    backgroundColor: '#c1c7ce4c',
  },
  labelContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  strengthLabelText: {
    fontSize: 12,
    color: '#2e6385',
    fontWeight: '600',
    letterSpacing: 0.24,
  },
  continueButton: {
    backgroundColor: '#2e6385',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  continueButtonDisabled: {
    opacity: 0.4,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 8,
    width: 134,
    height: 5,
    backgroundColor: '#0d1c2f',
    borderRadius: 10,
    alignSelf: 'center',
  },
});