import React, { memo } from 'react';
// import Button from '../components/Button';
import { Navigation } from '../types';
// import { Button } from 'react-native-paper';
import { Text, StyleSheet, View, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../core/theme';

type Props = {
    navigation: Navigation;
    route: any;
};

const LogoHeader = () => (
    <Image source={require('../assets/logo_blanc.png')} style={[styles.image, { marginBottom: 12, marginLeft: 15 }]} />
);
const InstaLogo = () => <Image source={require('../assets/instagram_logo.png')} style={styles.image} />;
const TiktokLogo = () => <Image source={require('../assets/tikTok_logo.png')} style={styles.image} />;
const YoutubeLogo = () => (
    <Image source={require('../assets/youtube_logo.png')} style={[styles.image, { borderRadius: 10 }]} />
);

const Details: React.FC<Props> = ({ route, navigation }: Props) => {
    const { itemName } = route.params;

    console.log(itemName);

    return (
        <ScrollView style={{ backgroundColor: theme.colors.surface, flex: 1, width: '100%' }}>
            <View style={styles.header}>
                <LogoHeader />
                <Text style={styles.stat}>{itemName}</Text>
                <Pressable style={styles.headerButtonOne} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name={'ios-home-outline'} size={25} />
                </Pressable>
                <Pressable style={styles.headerButtonTwo} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name={'ios-settings-outline'} size={25} />
                </Pressable>
            </View>
            <View style={styles.infosBox}>
                <View>
                    <Text style={styles.textStat}>Statistics:</Text>
                    <Text>30 liked posts</Text>
                    <Text>12 account followed</Text>
                    <Text>21 hashtags liked</Text>
                </View>
                <View style={[{ marginLeft: 160 }]}>
                    <InstaLogo />
                    <TiktokLogo />
                    <YoutubeLogo />
                </View>
            </View>
            <View style={[styles.line, { marginTop: 350 }]} />
            {/* <ScrollView horizontal={true} style={[{ marginTop: 100}]}> */}
            <View style={[{ marginTop: 70, alignSelf: 'center' }]}>
                <View style={[{ flexDirection: 'row', margin: 5 }]}>
                    <View style={[styles.hashtagsButton, { width: '47%' }]}>
                        <Text style={styles.textStat}>#PECHE</Text>
                    </View>
                    <View style={[styles.hashtagsButton, { width: '47%' }]}>
                        <Text style={styles.textStat}>#TENNIS</Text>
                    </View>
                </View>
                <View style={[{ flexDirection: 'row', margin: 5 }]}>
                    <View style={[styles.hashtagsButton, { width: '47%' }]}>
                        <Text style={styles.textStat}>#FOOTBALL</Text>
                    </View>
                    <View style={[styles.hashtagsButton, { width: '47%' }]}>
                        <Text style={styles.textStat}>#GOLF</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.line, { marginTop: 570 }]} />
            <Text style={styles.actualityText}>CATEGORIES: </Text>
            <ScrollView style={[{ alignSelf: 'center' }]}>
                <View style={[{ flexDirection: 'row', margin: 5 }]}>
                    <View style={[styles.categorieButton, { width: '30%' }]}>
                        <Image style={styles.tinyLogo} source={require('../assets/tennis.jpeg')} />

                        <Text style={styles.textStat}>#TENNIS</Text>
                    </View>
                    <View style={[styles.categorieButton, { width: '30%' }]}>
                        <Image style={styles.tinyLogo} source={require('../assets/golf.jpeg')} />

                        <Text style={styles.textStat}>#GOLF</Text>
                    </View>
                    <View style={[styles.categorieButton, { width: '30%' }]}>
                        <Image style={styles.tinyLogo} source={require('../assets/fishing.jpeg')} />
                        <Text style={styles.textStat}>#PECHE</Text>
                    </View>
                </View>
                <View style={[{ flexDirection: 'row' }]}>
                    <View style={[styles.categorieButton, { width: '30%' }]}>
                        <Image style={styles.tinyLogo} source={require('../assets/foot.jpeg')} />
                        <Text style={styles.textStat}>#FOOT</Text>
                    </View>
                    <View style={[styles.categorieButton, { width: '30%' }]}>
                        <Image style={styles.tinyLogo} source={require('../assets/hockey.jpeg')} />
                        <Text style={styles.textStat}>#HOCKEY</Text>
                    </View>
                    <View style={[styles.categorieButton, { width: '30%' }]}>
                        <Image style={styles.tinyLogo} source={require('../assets/rugby.jpeg')} />
                        <Text style={styles.textStat}>#RUGBY</Text>
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textHashtags: {},
    tinyLogo: {
        // height: 300,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // borderBottomLeftRadius: 0,
        width: '100%',
    },
    hashtagsButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 70,
        margin: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categorieButton: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 120,
        margin: 5,
        // padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infosBox: {
        backgroundColor: 'white',
        height: 150,
        width: 350,
        marginTop: 150,
        borderRadius: 15,
        alignSelf: 'center',
        padding: 10,
        flexDirection: 'row',
    },
    textStat: {
        fontSize: 18,
        lineHeight: 30,
        fontWeight: '700',
        color: '#343DD0',
    },
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
    actualityText: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        marginTop: 40,
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
        // marginTop: 400,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // marginTop: 20,
    },
});

export default memo(Details);
