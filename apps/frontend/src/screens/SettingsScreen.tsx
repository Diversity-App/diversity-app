import React, { memo } from 'react';
import Background from '../components/Background';
import { Navigation } from '../types';
import Paragraph from '../components/Paragraph';
import { Button } from 'react-native-paper';

type Props = {
    navigation: Navigation;
};

const Settings: React.FC<Props> = ({ navigation }: Props) => {
    return (
        <Background>
            <Paragraph>Settings screen</Paragraph>
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
                onPress={() => navigation.navigate('Dashboard')}>
                DashBoard
            </Button>
        </Background>
    );
};

export default memo(Settings);
