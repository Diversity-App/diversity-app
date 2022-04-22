import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';
import { passwordValidator, nameValidator } from '../core/utils';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import axios from 'axios';

type Props = {
    navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
    const [name, setName] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [cont, setCont] = useState('');
    const CELL_COUNT = 4;
    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value: password.value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: password.value,
        setValue: setValue,
    });
    const [error, setError] = useState('');

    const _onSignUpPressed = () => {
        console.log(password.value, ' => ', name.value);
        const nameError = nameValidator(name.value);
        const passwordError = passwordValidator(password.value);

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

        // var axios = require('axios');
        const data = {
            username: name.value,
            password: password.value,
        };

        console.log(name.value);
        console.log(password.value);

        const config = {
            method: 'post',
            url: 'http://192.168.43.131:8080/auth/register',
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                navigation.navigate('Dashboard');
            })
            .catch(function (error) {
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
                placeholder="Username"
                inputStyle={{ color: 'white' }}
                onChangeText={(text) => setName({ value: text, error: 'NameError' })}
            />

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

            <Button color={'#0386D0'} mode="contained" style={{ margin: 10 }} onPress={toggleMask}>
                {enableMask ? 'View Code' : 'Hide code'}
            </Button>

            <Button color={'#0386D0'} mode="contained" onPress={_onSignUpPressed}>
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

export default memo(RegisterScreen);
