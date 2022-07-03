import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { Navigation } from '../types';
import { TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';

type Props = {
    navigation: Navigation;
};

const LandingScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [Email, setEmail] = useState('');
    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('LoginScreen', {})} />

            <Logo />
            <Header>Reset Your Password</Header>
            <Text style={styles.text}>Enter your email adress</Text>
            <TextInput
                value={Email}
                onChangeText={(Email) => setEmail(Email)}
                placeholder={'Email'}
                style={styles.input}
            />
            <TouchableOpacity>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
        </Background>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'SourceCodePro_400Regular',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        borderRadius: 100,
        borderWidth: 1,
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'SourceCodePro_400Regular',
    },
    actualityButton: {
        backgroundColor: 'white',
        borderRadius: 40,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    submit: {
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'SourceCodePro_400Regular',
        color: 'white',
    },
});

export default memo(LandingScreen);
