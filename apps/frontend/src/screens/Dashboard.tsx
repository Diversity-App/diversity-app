import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
// import Button from '../components/Button';
import { Navigation } from '../types';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { makeRedirectUri, startAsync } from "expo-auth-session";

type Props = {
    navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
    const connectSpotify = () => {
        console.log('linking spotify');
    };

    const youtubeOAuth = async () => {
        const redirectUrl = makeRedirectUri({ useProxy: true });
        console.log("redirectUrl", redirectUrl);
    
        const urlParams = {
          redirect_uri: redirectUrl,
          access_type: "offline",
          scope: "https://www.googleapis.com/auth/youtube",
          response_type: "code",
          client_id:
            "1048252460044-u5mgq9q1mljgvko596b4cla3tvu3fkva.apps.googleusercontent.com",
          prompt: "consent",
        };
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
          urlParams
        ).toString()}`;
        // @ts-ignore
        const { type, params } = await startAsync({ authUrl });
        console.log(type);
        switch(type) {
            case 'success':
                console.log(params.code)
        }
      };

    return (
        <Background>
            <Logo />
            <Header>Here is your score</Header>
            <AnimatedCircularProgress
                size={120}
                width={15}
                fill={49}
                tintColor="#00e0ff"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875"
            />
            <Button color={'#0386D0'} mode="contained" onPress={() => youtubeOAuth()}>
                Connect to Youtube
            </Button>
            <Button color={'#0386D0'} mode="contained" onPress={() => navigation.navigate('HomeScreen')}>
                Logout
            </Button>
        </Background>
    );
};

export default memo(Dashboard);
