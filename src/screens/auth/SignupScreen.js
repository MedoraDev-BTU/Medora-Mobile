import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    ad_soyad: '',
    eposta: '',
    telefon: '',
    password: '',
  });

  const handleSignup = () => {
    // This will eventually hit your 'kullanicilar' table via API
    console.log("Registering user:", formData);
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Yeni Hesap Oluştur</Text>

      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        onChangeText={(val) => setFormData({...formData, ad_soyad: val})}
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        autoCapitalize="none"
        onChangeText={(val) => setFormData({...formData, eposta: val})}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        keyboardType="phone-pad"
        onChangeText={(val) => setFormData({...formData, telefon: val})}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        onChangeText={(val) => setFormData({...formData, password: val})}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Zaten hesabınız var mı? Giriş Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2D9CDB', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#2D9CDB', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { color: '#2D9CDB', textAlign: 'center', marginTop: 20 }
});