import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { HTTPRequest, Navigation, StringError, User } from '../types';
import { nameValidator, passwordValidator } from '../core/utils';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { ApiClient } from '../../../../shared/services';

type Props = {
    navigation: Navigation;
};

const RegisterScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [name, setName] = useState<StringError>({ value: '', error: '' });
    const [password, setPassword] = useState<StringError>({ value: '', error: '' });
    const CELL_COUNT: number = 4;
    const [enableMask, setEnableMask] = useState<boolean>(true);
    const [$value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({ value: password.value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: password.value,
        setValue: setValue,
    });
    const [generatedUserName, setGeneratedUserName] = useState<string>('');
    const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
    const apiClient = new ApiClient();
    const [loading, setLoading] = useState<boolean>(false);

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
            console.log('passwordError');
            console.log('passWord');
        }

        if (passwordError || nameError) {
            setName({ ...name, error: nameError });
            setPassword({ ...password, error: passwordError });
            return;
        } else {
            setLoading(true);
        }

        const value: User = {
            username: name.value,
            password: password.value,
        };

        console.log(name.value);
        console.log(password.value);

        const $config: HTTPRequest = {
            url: 'http://localhost:8080/auth/register',
            data: value,
        };

        apiClient.auth
            .postAuthRegister({
                ...value,
            })
            .then((response) => {
                console.log(response);
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
    const toggleMask = () => setEnableMask((f) => !f);

    if (loading) {
        return (
            <Background>
                <ActivityIndicator size="large" />
            </Background>
        );
    } else {
        return (
            <Background>
                <BackButton goBack={() => navigation.navigate('LandingScreen')} />
                <Logo />
                <Header>Create Account.</Header>
                <Input
                    placeholder="Generate a Username"
                    inputStyle={{ color: 'white' }}
                    value={generatedUserName}
                    disabled={true}
                    autoCompleteType={undefined}
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
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
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
                {password.error ? <Text style={{ color: 'red' }}>{password.error}</Text> : null}
                <View style={styles.row}>
                    <Text style={styles.label}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
    }
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
