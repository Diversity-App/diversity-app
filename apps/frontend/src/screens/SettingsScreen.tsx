import React, { memo, useState } from 'react';
import { Navigation } from '../types';
import { TextInput, ScrollView } from 'react-native';
import { theme } from '../core/theme';
import { Switch } from 'react-native-paper';
import BackButton from '../components/BackButton';
import RNPickerSelect from 'react-native-picker-select';

import CountryPicker from '@volkenomakers/react-native-country-picker';

type Props = {
    navigation: Navigation;
};

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Settings: React.FC<Props> = ({ navigation }: Props) => {
    const [switchOn, setSwitchOn] = useState(false);
    const [switchOn_two, setSwitchOn_two] = useState(false);
    const [switchOn_three, setSwitchOn_three] = useState(false);
    const [switchOn_four, setSwitchOn_four] = useState(false);

    const YO = ' years old';
    return (
        <ScrollView>
            <View style={styles.header}></View>
            <BackButton goBack={() => navigation.navigate('Dashboard', {})} />

            <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
            <View style={styles.body}>
                <View>
                    <View style={styles.container_info}>
                        <Text style={styles.first_text}>UserName: </Text>
                        <TextInput placeholder={'Name'} style={styles.first_input} />
                    </View>
                    <View style={styles.container_info}>
                        <Text style={styles.text}>Age: </Text>
                        <View style={styles.picker}>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: '10' + YO, value: '10' },
                                    { label: '11' + YO, value: '11' },
                                    { label: '12' + YO, value: '12' },
                                    { label: '13' + YO, value: '13' },
                                    { label: '14' + YO, value: '14' },
                                    { label: '15' + YO, value: '15' },
                                    { label: '16' + YO, value: '16' },
                                    { label: '17' + YO, value: '17' },
                                    { label: '18' + YO, value: '18' },
                                    { label: '19' + YO, value: '19' },
                                    { label: '20' + YO, value: '20' },
                                    { label: '21' + YO, value: '21' },
                                    { label: '22' + YO, value: '22' },
                                    { label: '23' + YO, value: '23' },
                                    { label: '24' + YO, value: '24' },
                                    { label: '25' + YO, value: '25' },
                                    { label: '25' + YO, value: '25' },
                                    { label: '26' + YO, value: '26' },
                                    { label: '27' + YO, value: '27' },
                                    { label: '28' + YO, value: '28' },
                                    { label: '29' + YO, value: '29' },
                                    { label: '30' + YO, value: '30' },
                                    { label: '31' + YO, value: '31' },
                                    { label: '32' + YO, value: '32' },
                                ]}
                            />
                        </View>
                        <View></View>
                    </View>
                    <Text style={styles.text}>Select A Country: </Text>
                    <View style={{ marginVertical: 5, marginBottom: 15, borderBottomWidth: 1 }}>
                        <CountryPicker
                            onSelect={(country) => {
                                console.log('name', country.name);
                            }}
                            subRegion={''}
                        />
                    </View>
                </View>
                <View style={styles.container_toggle}>
                    <View style={styles.container}>
                        <Text style={styles.txt_toggle}>Notifications</Text>
                        <Switch
                            style={styles.switch}
                            value={switchOn}
                            onValueChange={() => {
                                setSwitchOn(!switchOn);
                            }}></Switch>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.txt_toggle_two}>Dark Mode </Text>
                        <Switch
                            style={styles.switch}
                            value={switchOn_two}
                            onValueChange={() => {
                                setSwitchOn_two(!switchOn_two);
                            }}></Switch>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.txt_toggle_three}>Face ID </Text>
                        <Switch
                            style={styles.switch}
                            value={switchOn_three}
                            onValueChange={() => {
                                setSwitchOn_three(!switchOn_three);
                            }}></Switch>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.txt_toggle_four}>Passcode </Text>
                        <Switch
                            style={styles.switch_last}
                            value={switchOn_four}
                            onValueChange={() => {
                                setSwitchOn_four(!switchOn_four);
                            }}></Switch>
                    </View>
                </View>
                <Text style={styles.txt_social}>Social Media: </Text>

                <View style={styles.container_logo}>
                    <Image style={styles.logo} source={require('../assets/instagram_logo_1.png')} />
                    <Image style={styles.logo} source={require('../assets/tiktok_logo_1.png')} />
                    <Image style={styles.logo_ytb} source={require('../assets/youtube_logo_1.png')} />
                </View>
                <View style={styles.container_info}>
                    <Text style={styles.text}>Date of Birthday: </Text>
                    <View style={styles.container_date}>
                        <TextInput placeholder={'DD'} style={styles.date} />
                        <Text style={styles.text}>/</Text>

                        <TextInput placeholder={'MM'} style={styles.date} />
                        <Text style={styles.text}>/</Text>
                        <TextInput placeholder={'YYYY'} style={styles.years} />
                    </View>
                </View>
                <Text style={styles.text}>Gender: </Text>

                <View style={styles.picker}>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                            { label: 'Not Willing', value: 'Not' },
                        ]}
                    />
                </View>
                <View style={styles.container_logout}>
                    <Text style={styles.logout_txt}>Log Out: </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LandingScreen', {})}>
                        <Image style={styles.logout} source={require('../assets/logout.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container_logout}>
                    <Text style={styles.logout_txt}>Delete Account: </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LandingScreen', {})}>
                        <Image style={styles.delete} source={require('../assets/delete.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{ alignSelf: 'center', marginRight: 30 }}
                    onPress={() => navigation.navigate('Dashboard', {})}>
                    <Image style={styles.save} source={require('../assets/Save.png')} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    picker_text: {
        marginTop: 100,
    },
    container_toggle: {
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    logout_txt: {
        marginTop: 35,
        marginLeft: 15,
        marginBottom: 10,
        fontFamily: 'SourceCodePro_400Regular',
        fontWeight: '900',
        fontSize: 24,
    },
    save: {
        width: 160,
        height: 60,
        marginLeft: 36,
        marginTop: 20,
        marginBottom: 20,
    },
    delete: {
        width: 60,
        height: 70,
        marginLeft: 36,
        marginTop: 15,
    },
    logout: {
        width: 70,
        height: 70,
        marginLeft: 130,
        marginTop: 15,
    },
    container_logout: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 15,
        borderTopWidth: 1,
    },
    container_date: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    years: {
        width: 60,
        height: 44,
        padding: 10,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 0,
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 0,
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'SourceCodePro_400Regular',
    },
    date: {
        width: 38,
        height: 44,
        padding: 10,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 0,
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 0,
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'SourceCodePro_400Regular',
    },
    txt_social: {
        marginTop: 10,
        marginRight: 110,
        marginLeft: 15,
        marginBottom: 10,
        fontFamily: 'SourceCodePro_400Regular',
        fontWeight: '900',
        fontSize: 24,
    },
    container_logo: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    logo: {
        width: 60,
        height: 60,
        marginLeft: 50,
        marginBottom: 15,
    },
    logo_ytb: {
        width: 70,
        height: 50,
        marginLeft: 50,
        marginTop: 6,
    },
    txt_toggle: {
        marginTop: 10,
        marginRight: 110,
        marginLeft: 15,
        fontFamily: 'SourceCodePro_400Regular',
        fontWeight: '900',
        fontSize: 24,
    },
    txt_toggle_two: {
        marginTop: 10,
        marginRight: 153,
        marginLeft: 15,
        fontFamily: 'SourceCodePro_400Regular',
        fontWeight: '900',
        fontSize: 24,
    },
    txt_toggle_three: {
        marginTop: 10,
        marginRight: 182,
        marginLeft: 15,
        fontFamily: 'SourceCodePro_400Regular',
        fontWeight: '900',
        fontSize: 24,
    },
    txt_toggle_four: {
        marginTop: 10,
        marginRight: 167,
        marginLeft: 15,
        fontFamily: 'SourceCodePro_400Regular',
        fontWeight: '900',
        fontSize: 24,
        marginBottom: 15,
    },
    picker: {
        height: 30,
        borderWidth: 0,
        borderRadius: 20,
        marginStart: 15,
        marginEnd: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    container_info: {
        flexDirection: 'column',
        marginTop: 10,
        borderBottomWidth: 1,
    },
    first_text: {
        marginLeft: 15,
        marginTop: 90,
        fontWeight: '900',
        fontFamily: 'SourceCodePro_400Regular',
        fontSize: 24,
        marginBottom: 5,
    },
    text: {
        marginLeft: 15,
        marginRight: 5,
        marginBottom: 0,
        marginTop: 15,
        fontWeight: '900',
        fontFamily: 'SourceCodePro_400Regular',
        fontSize: 24,
    },
    switch: {
        alignSelf: 'flex-end',
    },
    switch_last: {
        alignSelf: 'flex-end',
        marginBottom: 15,
    },
    textInput: {},
    first_input: {
        width: 'auto',
        height: 44,
        padding: 10,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 0,
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'SourceCodePro_400Regular',
    },
    input: {
        width: 'auto',
        height: 44,
        padding: 10,
        marginTop: 0,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 0,
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'SourceCodePro_400Regular',
    },
    action: {
        flexDirection: 'row',
        marginTop: 100,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 5,
    },
    header: {
        backgroundColor: theme.colors.surface,
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130,
    },
    name: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    body: { zIndex: -1 },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    info: {
        fontSize: 16,
        color: '#00BFFF',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: '#696969',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: 'theme.colors.surface',
    },
    container: { flexDirection: 'row' },
});
export default memo(Settings);
