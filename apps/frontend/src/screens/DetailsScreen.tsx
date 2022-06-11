import React, { memo } from 'react';
import { Navigation } from '../types';
import { Text, StyleSheet, View, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../core/theme';
import { useFonts, SourceCodePro_400Regular } from '@expo-google-fonts/dev';
import Background from '../components/Background';

type Props = {
    navigation: Navigation;
    route: any;
};

const LogoHeader = () => (
    <Image source={require('../assets/logo_blanc.png')} style={[styles.image, { marginBottom: 12, marginLeft: 15 }]} />
);
const InstaLogo = () => (
    <Image source={require('../assets/instagram_logo_1.png')} style={[{ width: 37, height: 37 }]} />
);
const TiktokLogo = () => <Image source={require('../assets/tiktok_logo_1.png')} style={styles.image} />;
const YoutubeLogo = () => (
    <Image source={require('../assets/youtube_logo_1.png')} style={[{ borderRadius: 10, width: 40, height: 30 }]} />
);

const Details: React.FC<Props> = ({ route, navigation }: Props) => {
    const { itemName } = route.params;
    const [socialMediaSelected, setSocialMediaSelected] = React.useState('instagram');
    let [fontsLoaded] = useFonts({
        SourceCodePro_400Regular,
    });
    const valueArray = [
        {
            id: 'youtube',
            postsLiked: 32,
            hashtagsLiked: 8,
            comment: 9,
            share: 21,
            view: 81,
            followed: 3,
        },
        {
            id: 'tiktok',
            postsLiked: 43,
            hashtagsLiked: 6,
            comment: 4,
            share: 34,
            view: 213,
            followed: 22,
        },
        {
            id: 'instagram',
            postsLiked: 39,
            hashtagsLiked: 2,
            comment: 27,
            share: 14,
            view: 189,
            followed: 20,
        },
    ];

    const dataType = [
        {
            id: 'Foot',
            img: require('../assets/foot.jpeg'),
            title: 'Foot',
            description: 'Foot description',
        },
        {
            id: 'Rugby',
            img: require('../assets/rugby.jpeg'),
            title: 'Rugby',
            description: 'Rugby description',
        },
        {
            id: 'Golf',
            img: require('../assets/golf.jpeg'),
            title: 'Golf',
            description: 'Golf description',
        },
        {
            id: 'Tennis',
            img: require('../assets/tennis.jpeg'),
            title: 'Tennis',
            description: 'Tennis description',
        },
        {
            id: 'Hockey',
            img: require('../assets/hockey.jpeg'),
            title: 'Hockey',
            description: 'Hockey description',
        },
        {
            id: 'Fishing',
            img: require('../assets/fishing.jpeg'),
            title: 'Fishing',
            description: 'Fishing description',
        },
    ];

    const [dataTypeArray, dataTypeArray2] = React.useMemo(() => {
        const dataTypeArray = dataType.slice(0, Math.ceil(dataType.length / 2));
        const dataTypeArray2 = dataType.slice(Math.ceil(dataType.length / 2));
        return [dataTypeArray, dataTypeArray2];
    }, [dataType]);

    console.log(dataTypeArray, dataTypeArray2);

    if (!fontsLoaded) {
        return (
            <Background>
                <ActivityIndicator size="large" />
            </Background>
        );
    } else {
        return (
            <ScrollView style={{ backgroundColor: theme.colors.surface, flex: 1, width: '100%' }}>
                <View style={styles.header}>
                    <LogoHeader />
                    <Text style={styles.stat}>{itemName}</Text>
                    <View style={[{ flexDirection: 'row', marginLeft: '170%', position: 'absolute' }]}>
                        <Pressable style={[styles.headerButton]} onPress={() => navigation.navigate('Home')}>
                            <Ionicons name={'ios-home-outline'} size={25} />
                        </Pressable>
                        <Pressable
                            style={[styles.headerButton, { marginLeft: 15 }]}
                            onPress={() => navigation.navigate('Settings')}>
                            <Ionicons name={'ios-settings-outline'} size={25} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.infosBox}>
                    {valueArray.map((item: any) => {
                        if (item.id === socialMediaSelected) {
                            return (
                                <View key={item.id}>
                                    <Text style={styles.textStat}>Statistics:</Text>
                                    <Text style={styles.textHashtags}>
                                        <Text style={[{ fontWeight: 'bold', fontFamily: 'SourceCodePro_400Regular' }]}>
                                            {item.postsLiked}
                                        </Text>{' '}
                                        liked posts
                                    </Text>
                                    <Text style={styles.textHashtags}>
                                        <Text style={[{ fontWeight: 'bold', fontFamily: 'SourceCodePro_400Regular' }]}>
                                            {item.hashtagsLiked}
                                        </Text>{' '}
                                        hashtags liked
                                    </Text>
                                    <Text style={styles.textHashtags}>
                                        <Text style={[{ fontWeight: 'bold', fontFamily: 'SourceCodePro_400Regular' }]}>
                                            {item.comment}
                                        </Text>{' '}
                                        comments written
                                    </Text>
                                    <Text style={styles.textHashtags}>
                                        <Text style={[{ fontWeight: 'bold', fontFamily: 'SourceCodePro_400Regular' }]}>
                                            {item.share}
                                        </Text>{' '}
                                        posts shared
                                    </Text>
                                    <Text style={styles.textHashtags}>
                                        <Text style={[{ fontWeight: 'bold', fontFamily: 'SourceCodePro_400Regular' }]}>
                                            {item.followed}{' '}
                                        </Text>
                                        account followed
                                    </Text>
                                    <Text style={[styles.textHashtags, { justifyContent: 'space-between' }]}>
                                        A total of{' '}
                                        <Text style={[{ fontWeight: 'bold', fontFamily: 'SourceCodePro_400Regular' }]}>
                                            {item.view}
                                        </Text>{' '}
                                        posts seen
                                    </Text>
                                </View>
                            );
                        }
                    })}
                    <View
                        style={[
                            {
                                marginLeft: '85%',
                                position: 'absolute',
                                marginTop: 12,
                            },
                        ]}>
                        <Pressable
                            style={[
                                styles.logoSelected,
                                {
                                    backgroundColor: socialMediaSelected === 'instagram' ? 'lightgrey' : 'transparent',
                                },
                            ]}
                            onPress={() => setSocialMediaSelected('instagram')}>
                            <InstaLogo />
                        </Pressable>
                        <Pressable
                            style={[
                                styles.logoSelected,
                                {
                                    backgroundColor: socialMediaSelected === 'tiktok' ? 'lightgrey' : 'transparent',
                                },
                            ]}
                            onPress={() => setSocialMediaSelected('tiktok')}>
                            <TiktokLogo />
                        </Pressable>
                        <Pressable
                            style={[
                                styles.logoSelected,
                                {
                                    backgroundColor: socialMediaSelected === 'youtube' ? 'lightgrey' : 'transparent',
                                },
                            ]}
                            onPress={() => setSocialMediaSelected('youtube')}>
                            <YoutubeLogo />
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.line, { marginTop: 350 }]} />
                <ScrollView horizontal={true} style={[{ marginTop: 50, alignSelf: 'center', width: '100%' }]}>
                    {dataType.map((item: any) => {
                        return (
                            <View key={item.id}>
                                <View style={[{ flexDirection: 'row', margin: 5 }]}>
                                    <View style={[styles.hashtagsButton, { width: 180 }]}>
                                        <Text style={styles.textStat}>
                                            {'#'}
                                            {item.id}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row', margin: 5 }]}>
                                    <View style={[styles.hashtagsButton, { width: 180 }]}>
                                        <Text style={styles.textStat}>
                                            {'#'}
                                            {item.id}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={[styles.line, { marginTop: 570 }]} />
                <Text style={styles.actualityText}>CATEGORIES: </Text>
                <ScrollView horizontal={true} style={[{ alignSelf: 'center' }]}>
                    {dataType.map((item: any) => {
                        return (
                            <View key={item.id}>
                                <View style={[{ flexDirection: 'row', margin: 5 }]}>
                                    <View style={[styles.categorieButton, { width: 150 }]}>
                                        <Image style={styles.tinyLogo} source={item.img} />

                                        <Text style={styles.textStat}>{item.id}</Text>
                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row' }]}>
                                    <View style={[styles.categorieButton, { width: 150 }]}>
                                        <Image style={styles.tinyLogo} source={item.img} />
                                        <Text style={styles.textStat}>{item.id}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    textHashtags: {
        fontSize: 20,
        fontWeight: '400',
        color: '#343DD0',
    },
    tinyLogo: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    infosBox: {
        backgroundColor: 'white',
        height: 200,
        width: '90%',
        marginTop: 120,
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
        fontFamily: 'SourceCodePro_400Regular',
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
    actualityText: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        marginTop: 40,
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
    },
    header: {
        position: 'absolute',
        left: 0,
        top: 50,
        flexDirection: 'row',
    },
    stat: {
        fontWeight: '700',
        fontSize: 30,
        color: 'white',
        marginLeft: 15,
        marginTop: 5,
        fontFamily: 'SourceCodePro_400Regular',
    },
    image: {
        width: 38,
        height: 42,
    },
    headerButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoSelected: {
        borderRadius: 25,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export default memo(Details);
