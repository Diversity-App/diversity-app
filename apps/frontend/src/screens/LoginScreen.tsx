import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { nameValidator, passwordValidator } from '../core/utils';
import { HTTPRequest, Navigation, StringError, User } from '../types';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { ApiClient, ApiResponse } from '../../../../shared/services';

type Props = {
    navigation: Navigation;
};

const LoginScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [name, setName] = useState<StringError>({ value: '', error: '' });
    const [password, setPassword] = useState<StringError>({ value: '', error: '' });
    const [enableMask, setEnableMask] = useState<boolean>(true);
    const CELL_COUNT = 4;
    const toggleMask = () => setEnableMask((f) => !f);
    const [value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: password.value,
        setValue: setValue,
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const apiClient = new ApiClient();

    const _onLoginPressed = () => {
        // tmp code
        console.log(password.value, ' => ', name.value);
        const nameError: string = nameValidator(name.value);
        const passwordError: string = passwordValidator(password.value);

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

        const $config: HTTPRequest = {
            url: 'http://localhost:8080/auth/login',
            data: value,
        };

        apiClient.auth
            .postAuthLogin({
                ...value,
            })
            .then(({ message, data, status }) => {
                console.log(message, data, status);
                navigation.navigate('Home');
            })
            .catch(({ body: { status, message } }: ApiClient & { body: ApiResponse }) => {
                console.log(status, message);
                setLoading(false);
                setError(message);
            });
    };

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
                <Header>Welcome back.</Header>
                <Input
                    placeholder="Name"
                    inputStyle={{ color: 'white' }}
                    onChangeText={(text) => {
                        setName({ value: text, error: '' });
                        setError('');
                    }}
                    autoCompleteType={undefined}
                />
                {name.error ? <Text style={{ color: 'red' }}>{name.error}</Text> : null}
                <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={password.value}
                    onChangeText={(text) => {
                        setPassword({ value: text, error: '' });
                        setError('');
                    }}
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
                        margin: 10,
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
                    onPress={_onLoginPressed}>
                    Log In
                </Button>
                {password.error ? <Text style={{ color: 'red' }}>{password.error}</Text> : null}
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                <View style={styles.row}>
                    <Text style={styles.label}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
    }
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
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

export default memo(LoginScreen);
