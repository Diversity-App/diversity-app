import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Dashboard from './src/screens/Dashboard';
import Settings from './src/screens/SettingsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Dashboard') {
                        return <Ionicons name={'ios-home-outline'} size={size} color={color} />;
                    } else if (route.name === 'Settings') {
                        return <Ionicons name={'ios-settings-outline'} size={size} color={color} />;
                    }
                },
            })}>
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
                    <Stack.Screen name="DetailsScreen" options={{ headerShown: false }} component={DetailsScreen} />
                    <Stack.Screen
                        name="ForgotPasswordScreen"
                        options={{ headerShown: false }}
                        component={ForgotPasswordScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
