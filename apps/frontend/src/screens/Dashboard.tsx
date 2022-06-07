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
    return (
        // <Background>
        <View style={{ backgroundColor: theme.colors.surface, flex: 1, width: '100%' }}>
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
                    <Text>teeeeeeeeeeeeeeeeest </Text>
                    <Text>teeeeeeeeeeeeeeeeest </Text>
                </ScrollView>
                <ScrollView horizontal={true} style={{ position: 'absolute', marginTop: 600, alignSelf: 'center' }}>
                    <Text>teeeeeeeeeeeeeeeeest </Text>
                    <Text>teeeeeeeeeeeeeeeeest </Text>
                </ScrollView>
            </View>
        </View>
        // </Background>
    );
    // }
};

const styles = StyleSheet.create({
    actualityTexte: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        marginTop: 105,
        marginLeft: 10,
        lineHeight: 45,
    },
    actuality: {
        position: 'absolute',
        marginTop: 500,
        alignSelf: 'center',
    },
    backGround: {
        backgroundColor: theme.colors.surface,
    },
    scoreValue: {
        // position: 'absolute',
        fontWeight: '700',
        fontSize: 40,
        color: 'white',
        lineHeight: 45,
        // marginBottom: 200,
        // top: -380,
        marginTop: -125,
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
