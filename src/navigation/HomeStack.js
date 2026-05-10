import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/home/HomeScreen';
import AppointmentList from '../screens/home/AppointmentList';
import FinalizeBooking from '../screens/home/FinalizeBooking';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={HomeScreen} options={{ title: 'Randevu ara' }} />
      <Stack.Screen name="AppointmentList" component={AppointmentList} options={{ title: 'Doktor Seçimi' }} />
      <Stack.Screen name="FinalizeBooking" component={FinalizeBooking} options={{ title: 'Saat Seçimi' }} />
    </Stack.Navigator>
  );
}