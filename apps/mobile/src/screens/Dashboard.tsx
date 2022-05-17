import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
// import Button from '../components/Button';
import { Navigation } from '../types';
import { Button } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type Props = {
    navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
    const connectSpotify = () => {
        console.log('linking spotify');
    };

    return (
        <Background>
            <Logo />
            <Header>Here is your score</Header>
            <AnimatedCircularProgress
                size={120}
                width={15}
                fill={49}
                tintColor="#00e0ff"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875"
            />
            <Button color={'#0386D0'} mode="contained" onPress={() => connectSpotify()}>
                Connect to Youtube
            </Button>
            <Button color={'#0386D0'} mode="contained" onPress={() => navigation.navigate('HomeScreen')}>
                Logout
            </Button>
        </Background>
    );
};

export default memo(Dashboard);
