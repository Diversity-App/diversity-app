import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Dashboard from './src/screens/Dashboard';
import Settings from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LandingScreen" options={{ headerShown: false }} component={LandingScreen} />
                    <Stack.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
                    <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
