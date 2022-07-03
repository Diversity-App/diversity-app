import React, { memo } from 'react';
import { Navigation } from '../types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, StyleSheet, View, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
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
    } else {
        return (
            // <Background>
            <ScrollView style={{ backgroundColor: theme.colors.surface, flex: 1, width: '100%' }}>
                <View style={styles.header}>
                    <LogoHeader />
                    <Text style={styles.stat}>Statistics</Text>
                    <Pressable style={styles.headerButtonOne} onPress={() => navigation.navigate('Home', {})}>
                        <Ionicons name={'ios-home-outline'} size={25} />
                    </Pressable>
                    <Pressable style={styles.headerButtonTwo} onPress={() => navigation.navigate('Settings', {})}>
                        {/* <Text>ok</Text> */}
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
                                        /* 1. Navigate to the Details route with params */
                                        navigation.navigate('DetailsScreen', {
                                            itemId: item.id,
                                            itemName: item.title,
                                        });
                                    }}>
                                    <Ionicons name={item.icon as any} size={30} />
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
                                <Ionicons name={item.icon as any} size={60} />
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
            // </Background>
        );
    }
};

const styles = StyleSheet.create({
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
});

export default memo(Dashboard);
