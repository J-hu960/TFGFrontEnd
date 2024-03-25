import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View,Text} from 'react-native'
import SignUp from './screens/Sign/SignUp';
import Auth from './screens/Auth';
import AuthProvider from './context/AuthContext';
import useAuthContext from './hooks/useAuthContext';
const Tab = createBottomTabNavigator();



function SettingsScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Group screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Auth"  component={Auth} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Group>
      </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
