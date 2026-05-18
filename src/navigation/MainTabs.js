import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
// DOSYA YOLU SENİN KLASÖRÜNE GÖRE DÜZELTİLDİ 👇
import AppointmentList from '../screens/appointments/AppointmentList'; 
import PharmacyTab from '../screens/pharmacies/PharmacyTab';
import ProfileTab from '../screens/profile/ProfileTab';

const Tab = createBottomTabNavigator();

export default function MainTabs({ user }) {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#2e6385' }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Ana Sayfa', headerShown: false, tabBarIcon: ({color}) => <Ionicons name="medical" size={20} color={color}/> }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentList} // <-- BURASI GÜNCELLENDİ
        options={{ title: 'Randevular', headerShown: false, tabBarIcon: ({color}) => <Ionicons name="calendar" size={20} color={color}/> }}
      />
      <Tab.Screen
        name="Pharmacies"
        component={PharmacyTab}
        options={{ title: 'Eczaneler', headerShown: false, tabBarIcon: ({color}) => <Ionicons name="flask" size={20} color={color}/> }}
      />
      <Tab.Screen
        name="Profile"
        options={{ title: 'Profil', headerShown: false, tabBarIcon: ({color}) => <Ionicons name="person" size={20} color={color}/> }}
      >
        {(props) => <ProfileTab {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}