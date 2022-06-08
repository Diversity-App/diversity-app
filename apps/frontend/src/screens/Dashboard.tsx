import React, { memo } from 'react';
// import Button from '../components/Button';
import { Navigation } from '../types';
// import { Button } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, StyleSheet, View, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../core/theme';

type Props = {
    navigation: Navigation;
};

const LogoHeader = () => <Image source={require('../assets/logo_blanc.png')} style={styles.image} />;

const Dashboard: React.FC<Props> = ({ navigation }: Props) => {
    const dataArray = [
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

    return (
        // <Background>
        <ScrollView style={{ backgroundColor: theme.colors.surface, flex: 1, width: '100%' }}>
            <View style={styles.header}>
                <LogoHeader />
                <Text style={styles.stat}>Statistics</Text>
                <Pressable style={styles.headerButtonOne} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name={'ios-home-outline'} size={25} />
                </Pressable>
                <Pressable style={styles.headerButtonTwo} onPress={() => navigation.navigate('Settings')}>
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
                            <Pressable style={styles.actualityButton} onPress={() => navigation.navigate('Home')}>
                                <Ionicons name={item.icon} size={30} />
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
                <ScrollView horizontal={true} style={{ alignSelf: 'center', marginTop: 30 }}>
                    {dataArray.map((item) => (
                        <View
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
                                }}>
                                {item.title}
                            </Text>
                            <Ionicons name={item.icon} size={60} />
                            <Text
                                style={{
                                    fontSize: 35,
                                    fontWeight: '700',
                                }}>
                                {item.percentage}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
        // </Background>
    );
    // }
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
        // marginLeft: 15,
    },
    actualityTexte: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        marginTop: 130,
        marginLeft: 10,
        lineHeight: 45,
    },
    actuality: {
        // position: 'absolute',
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
    },
    header: {
        position: 'absolute',
        left: 0,
        top: 50,
        flexDirection: 'row',
    },
    stat: {
        // fontFamily: 'Source Code Pro',
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
        marginLeft: 70,
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
        // marginBottom: 300,
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
        // marginTop: 20,
    },
});

export default memo(Dashboard);
