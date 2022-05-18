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

const Dashboard: React.FC<Props> = ({ navigation }: Props) => {
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
            <Button
                color={'black'}
                style={{
                    margin: 10,
                    borderRadius: 25,
                    width: 150,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('Settings')}>
                Settings
            </Button>
        </Background>
    );
    // }
};

export default memo(Dashboard);
