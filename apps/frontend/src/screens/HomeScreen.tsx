import React, { memo } from 'react';
import Background from '../components/Background';
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

        <Paragraph>Open yourself to new media horizons.</Paragraph>
        <Button
            style={{
                margin: 10,
                borderRadius: 25,
                width: 150,
                height: 50,
                backgroundColor: 'white',
                justifyContent: 'center',
            }}
            color={'black'}
            onPress={() => navigation.navigate('LoginScreen')}>
            Log In
        </Button>
        <Button
            style={{
                margin: 10,
                borderRadius: 25,
                width: 150,
                height: 50,
                backgroundColor: 'white',
                justifyContent: 'center',
            }}
            color={'black'}
            onPress={() => navigation.navigate('RegisterScreen')}>
            Sign Up
        </Button>
    </Background>
);

export default memo(HomeScreen);
