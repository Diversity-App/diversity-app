import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import Dashboard from "./src/screens/Dashboard";
import ConnectAccounts from "./src/screens/ConnectAccounts";

// const App = () => {
//   return (
//     <SafeAreaView>
//       <HomeScreen></HomeScreen>
//     </SafeAreaView>
//   );
// };

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    Dashboard,
    ConnectAccounts,

  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);

// export default App;
export default createAppContainer(Router);
