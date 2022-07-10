import React, { memo } from 'react';
import { Navigation } from '../types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, StyleSheet, View, Image, Pressable, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../core/theme';
import Background from '../components/Background';
import { useFonts, SourceCodePro_400Regular } from '@expo-google-fonts/dev';

type Props = {
    navigation: Navigation;
};
const LogoHeader = () => <Image source={require('../assets/logo_blanc.png')} style={styles.image} />;

const Dashboard: React.FC<Props> = ({ navigation }: Props) => {
    let [fontsLoaded] = useFonts({
        SourceCodePro_400Regular,
    });

    const [modalVisible, setModalVisible] = React.useState(true);

    const dataArray: {
        id: number;
        title: string;
        icon: string;
        percentage: string;
    }[] = [
        {
            id: 1,
            title: 'Sport',
            icon: 'ios-football',
            percentage: '50%',
        },
        {
            id: 2,
            title: 'Culture',
            icon: 'ios-musical-notes',
            percentage: '50%',
        },
        {
            id: 3,
            title: 'Politique',
            icon: 'ios-flag',
            percentage: '50%',
        },
        {
            id: 4,
            title: 'Economie',
            icon: 'ios-cash',
            percentage: '50%',
        },
        {
            id: 5,
            title: 'Sport',
            icon: 'ios-football',
            percentage: '50%',
        },
        {
            id: 6,
            title: 'Culture',
            icon: 'ios-musical-notes',
            percentage: '50%',
        },
        {
            id: 7,
            title: 'Politique',
            icon: 'ios-flag',
            percentage: '50%',
        },
        {
            id: 8,
            title: 'Economie',
            icon: 'ios-cash',
            percentage: '50%',
        },
        {
            id: 9,
            title: 'Sport',
            icon: 'ios-football',
            percentage: '50%',
        },
        {
            id: 10,
            title: 'Culture',
            icon: 'ios-musical-notes',
            percentage: '50%',
        },
        {
            id: 11,
            title: 'Politique',
            icon: 'ios-flag',
            percentage: '50%',
        },
        {
            id: 12,
            title: 'Economie',
            icon: 'ios-cash',
            percentage: '50%',
        },
    ];

    if (!fontsLoaded) {
        return (
            <Background>
                <ActivityIndicator size="large" />
            </Background>
        );
    }
    if (modalVisible === true) {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Image source={require('../assets/popUp_vpn.png')} style={[{ width: 300, height: 130 }]} />
                            <Text style={styles.title_vpn_popUp}>VPN ALERT</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text_pop_up_vpn}>
                                    {'\u2022'} Diversity use a VPN to collect your data.
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text_pop_up_vpn}>
                                    {'\u2022'} Nothing is stored, the data just goes through our algorithm to give you
                                    statistics.
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Text style={styles.text_pop_up_vpn}>
                                    learn more about the data we collect and how we use it.
                                </Text>
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    } else {
        return (
            // <>
            <ScrollView style={{ backgroundColor: theme.colors.surface, flex: 1, width: '100%' }}>
                <View style={styles.header}>
                    <LogoHeader />
                    <Text style={styles.stat}>Statistics</Text>
                    <Pressable style={styles.headerButtonOne} onPress={() => navigation.navigate('Home', {})}>
                        <Ionicons name={'ios-home-outline'} size={25} />
                    </Pressable>
                    <Pressable style={styles.headerButtonTwo} onPress={() => navigation.navigate('Settings', {})}>
                        <Ionicons name={'ios-settings-outline'} size={25} />
                    </Pressable>
                </View>
                <View>
                    <AnimatedCircularProgress
                        size={250}
                        width={20}
                        fill={75}
                        tintColor="#00e0ff"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875"
                        rotation={0}
                        lineCap="round"
                        style={styles.progress}
                    />
                    <Text style={styles.scoreValue}>75%</Text>
                    <View style={styles.line} />
                    <Text style={styles.actualityTexte}>Actuality :</Text>
                    <ScrollView horizontal={true} style={styles.actuality}>
                        {dataArray.map((item) => (
                            <View key={item.id}>
                                <Pressable
                                    style={styles.actualityButton}
                                    onPress={() => {
                                        navigation.navigate('DetailsScreen', {
                                            itemId: item.id,
                                            itemName: item.title,
                                        });
                                    }}>
                                    <Ionicons name={item.icon as unknown as undefined} size={30} />
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                    <ScrollView horizontal={true} style={{ alignSelf: 'center', marginTop: 30 }}>
                        {dataArray.map((item) => (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('DetailsScreen', {
                                        itemId: item.id,
                                        itemName: item.title,
                                    });
                                }}
                                key={item.id}
                                style={{
                                    marginLeft: 25,
                                    borderRadius: 7,
                                    backgroundColor: '#fff',
                                    width: 240,
                                    height: 240,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 35,
                                        fontWeight: '700',
                                        fontFamily: 'SourceCodePro_400Regular',
                                    }}>
                                    {item.title}
                                </Text>
                                <Ionicons name={item.icon as unknown as undefined} size={60} />
                                <Text
                                    style={{
                                        fontSize: 35,
                                        fontWeight: '700',
                                        fontFamily: 'SourceCodePro_400Regular',
                                    }}>
                                    {item.percentage}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
            // </>
        );
    }
};

const styles = StyleSheet.create({
    text_pop_up_vpn: {
        flex: 1,
        paddingLeft: 5,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
        backgroundColor: theme.colors.surface,
        width: '100%',
        height: '100%',
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        // elevation: 2,
        width: 100,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#D9D9D9',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
    actualityTexte: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        marginTop: 130,
        marginLeft: 10,
        lineHeight: 45,
        fontFamily: 'SourceCodePro_400Regular',
    },
    actuality: {
        marginTop: 10,
        alignSelf: 'center',
    },
    backGround: {
        backgroundColor: theme.colors.surface,
    },
    scoreValue: {
        fontWeight: '700',
        fontSize: 40,
        color: 'white',
        lineHeight: 45,
        marginTop: -150,
        alignSelf: 'center',
        fontFamily: 'SourceCodePro_400Regular',
    },
    header: {
        position: 'absolute',
        left: 0,
        top: 50,
        flexDirection: 'row',
    },
    stat: {
        fontFamily: 'SourceCodePro_400Regular',
        fontWeight: '700',
        fontSize: 30,
        color: 'white',
        marginLeft: 15,
        marginTop: 5,
    },
    image: {
        width: 38,
        height: 42,
        marginBottom: 12,
        marginLeft: 15,
    },
    headerButtonOne: {
        backgroundColor: 'white',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
    },
    headerButtonTwo: {
        backgroundColor: 'white',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    progress: {
        marginTop: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        position: 'absolute',
        height: 1,
        backgroundColor: '#eaeaea',
        width: '90%',
        marginTop: 400,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    title_vpn_popUp: {
        fontFamily: 'SourceCodePro_400Regular',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
});

export default memo(Dashboard);
