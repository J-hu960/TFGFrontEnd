import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './screens/Sign/SignUp';
import Auth from './screens/Auth';
import AuthProvider from './context/AuthContext';
import useAuthContext from './hooks/useAuthContext';
import Home from './screens/Home';
import Profile from './screens/Profile';
import NewPost from './screens/NewPost';
import ForgotPassword from './screens/Sign/ForgotPassword';
import ResetPassword from './screens/Sign/ResetPassword';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="RessetPassword" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={{headerShown:false}} component={Home} />
      <Tab.Screen name="Profile"  component={Profile} />
      <Tab.Screen name="NewPost" component={NewPost} />
    </Tab.Navigator>
  );
}
