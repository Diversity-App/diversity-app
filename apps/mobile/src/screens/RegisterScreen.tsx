import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';
import { nameValidator, passwordValidator } from '../core/utils';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import axios, { AxiosError, AxiosResponse } from 'axios';

type Props = {
    navigation: Navigation;
};

type User = {
    username: string;
    password: string;
};

type HTTPRequest = {
    url: string;
    data: User;
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 60,
        height: 60,
        lineHeight: 55,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#eee',
        margin: 5,
        textAlign: 'center',
        borderRadius: 5,
    },
    focusCell: {
        borderColor: '#000',
    },
});

const RegisterScreen = ({ navigation }: Props) => {
    const [name, setName] = useState<{ value: string; error: string }>({ value: '', error: '' });
    const [password, setPassword] = useState<{ value: string; error: string }>({ value: '', error: '' });
    const CELL_COUNT: number = 4;
    const [enableMask, setEnableMask] = useState<boolean>(true);
    const [$value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({ value: password.value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: password.value,
        setValue: setValue,
    });
    const [error, setError] = useState<string>('');
    const [generatedUserName, setGeneratedUserName] = useState<string>('');
    const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

    const userNameGenerator = () => {
        const newGeneratedUsername: string = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors],
            length: 2,
        });
        setName({ value: newGeneratedUsername, error: 'NameError' });
        setGeneratedUserName(newGeneratedUsername);
    };

    const _onSignUpPressed = () => {
        console.log(password.value, ' => ', name.value);
        const nameError: string = nameValidator(name.value);
        const passwordError: string = passwordValidator(password.value);

        if (nameError) {
            console.log('nameError');
        } else if (passwordError) {
            console.log('passWord');
        }

        if (passwordError || nameError) {
            setName({ ...name, error: nameError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        const value: User = {
            username: name.value,
            password: password.value,
        };

        console.log(name.value);
        console.log(password.value);

        const config: HTTPRequest = {
            url: 'http://localhost:8080/auth/register',
            data: value,
        };

        axios
            .post(config.url, config.data)
            .then((response: AxiosResponse) => {
                console.log(JSON.stringify(response.data));
                navigation.navigate('Dashboard');
            })
            .catch((error: AxiosError) => {
                setError('Register Error');
                console.log(error);
            });
    };
    const toggleMask = () => setEnableMask((f) => !f);

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('HomeScreen')} />
            <Logo />
            <Header>Create Account.</Header>
            <Input
                placeholder="Generate a Username"
                inputStyle={{ color: 'white' }}
                value={generatedUserName}
                disabled={true}
            />
            <Button
                color={'black'}
                style={{
                    margin: 10,
                    borderRadius: 10,
                    width: 250,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                }}
                onPress={userNameGenerator}>
                Generate my username
            </Button>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: 'NameError' })}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => {
                    let textChild = null;

                    if (symbol) textChild = enableMask ? '\u2B24' : symbol;

                    return (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {textChild}
                        </Text>
                    );
                }}
            />
            <Button
                color={'black'}
                style={{
                    margin: 20,
                    borderRadius: 25,
                    width: 150,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                }}
                onPress={toggleMask}>
                {enableMask ? 'View Code' : 'Hide code'}
            </Button>

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
                onPress={_onSignUpPressed}>
                Sign Up
            </Button>
            <Text>{error}</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
};

export default memo(RegisterScreen);
