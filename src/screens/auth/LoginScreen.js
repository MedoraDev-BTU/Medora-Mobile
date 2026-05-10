import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const [eposta, setEposta] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // This is the "onLoginSuccess" part.
    // When you click the button, it sends this mock data to App.js.
    // App.js sees the 'user' state is no longer null and flips to the Tabs.
    onLoginSuccess({
      ad_soyad: 'Leman Şayir',
      eposta: eposta,
      kullanici_id: '123-abc' // Matching your schema's ID format[cite: 1]
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Medora</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={eposta}
        onChangeText={setEposta}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Hesabınız yok mu? Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#2D9CDB', textAlign: 'center', marginBottom: 40 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#2D9CDB', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { color: '#2D9CDB', textAlign: 'center', marginTop: 20 }
});