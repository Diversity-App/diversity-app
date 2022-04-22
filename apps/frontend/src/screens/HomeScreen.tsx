import React, { memo } from 'react';
import Background from '../components/Background';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Button from '../components/Button';
// import {FloatingLabelInput} from 'react-native-floating-label-input';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';

type Props = {
    navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
    <Background>
        <Logo />
        <Header>Diversity</Header>

        <Paragraph>Ouvrez vous a de nouveaux horizons médiatiques.</Paragraph>
        <Button
            style={{ margin: 10 }}
            mode="contained"
            color={'#0386D0'}
            onPress={() => navigation.navigate('LoginScreen')}>
            Log In
        </Button>
        <Button mode="contained" color={'#0386D0'} onPress={() => navigation.navigate('RegisterScreen')}>
            Sign Up
        </Button>
    </Background>
);

export default memo(HomeScreen);
