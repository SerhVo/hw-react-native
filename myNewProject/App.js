import React, { useState, useEffect } from 'react';
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import { Home } from "./screens/Home";
import { CommentsScreen } from "./screens/CommentsScreen";
import { MapScreen } from "./screens/MapScreen";
import { StyleSheet } from "react-native";
import { AppLoading } from 'expo';



const customFonts = async () => {
    await Font.loadAsync({
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    });
};

const Stack = createStackNavigator();

export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        customFonts().then(() => setIsReady(true));
    }, []);

    if (!isReady) {
        return <AppLoading />;
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Comments"
                    component={CommentsScreen}
                    options={{
                        headerStyle: styles.headerBox,
                        headerPressColor: "#FF6C00",
                        headerTitleStyle: styles.headerTitle,
                        headerTitleAlign: "center",
                        title: "Comments",
                    }}
                />
                <Stack.Screen
                    name="Map"
                    component={MapScreen}
                    options={{
                        headerStyle: styles.headerBox,
                        headerPressColor: "#FF6C00",
                        headerTitleStyle: styles.headerTitle,
                        headerTitleAlign: "center",
                        title: "Map",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: "Roboto-Medium",
        fontWeight: 500,
        fontSize: 17,
        color: "#212121",
        letterSpacing: -0.408,
    },
    headerBox: {
        borderBottomWidth: 1,
        borderBottomColor: "#BDBDBD",
    },
});
