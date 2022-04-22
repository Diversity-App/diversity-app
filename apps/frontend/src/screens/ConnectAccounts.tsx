import React from "react";
import { Navigation } from "../types";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { Button } from "react-native-paper";
import { makeRedirectUri, Prompt, startAsync } from "expo-auth-session";
// import Button from '../components/Button';
import localStorage from "../utils/localStorage";
import axios from "axios";

type Props = {
  navigation: Navigation & any;
  apiToken: string;
};


const ConnectAccounts = ({ navigation, apiToken }: Props) => {
  const [loading, setLoading] = React.useState(false);

   const connectYoutube = async () => {
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

    if (type !== "success") {
      return;
    }

    const { code } = params;

    await axios.get("http://10.134.199.135:8080/api/auth/sso/google/callback", {
      params: {
        code: code
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiToken
      }
    });

    localStorage.setItem("YoutubeConnexion", "true");
  }

  const isConnected = localStorage.getItem("YoutubeConnexion");

  if (isConnected === "true") {
    navigation.navigate("Dashboard");
  }

  return (
    <Background>
      <Logo />
      <Button color={"#0386D0"} mode="contained" onPress={() => {connectYoutube();}}>
        Connect to Youtube
      </Button>
      <Button color={"#0386D0"} mode="contained" onPress={() => navigation.navigate("HomeScreen")}>
        Logout
      </Button>
    </Background>
  );
};


export default ConnectAccounts;
