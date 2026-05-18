import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Senin klasör yapına göre doğru import yolları
import HomeScreen from '../screens/home/HomeScreen';
import AramaSonuclariScreen from '../screens/home/AramaSonuclariScreen';
import DoctorDetailScreen from '../screens/home/DoctorDetailScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AramaSonuclari" 
        component={AramaSonuclariScreen} 
        options={{ title: 'Arama Sonuçları', headerShown: false }} 
      />
      <Stack.Screen 
        name="DoctorDetail" 
        component={DoctorDetailScreen} 
        options={{ title: 'Doktor Seçimi', headerShown: false }} 
      />
    </Stack.Navigator>
  );
}