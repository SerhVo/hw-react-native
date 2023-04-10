import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/authSreens/RegistrationScreen";
import LoginScreen from "./Screens/authSreens/LoginScreen";
import { Home } from "./Screens/mainScreen/Home";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { currentUser } from "./redux/auth/authoperations";
import { CommentsScreen } from "./Screens/nestedScreens/CommentsScreen";
import { MapScreen } from "./Screens/nestedScreens/MapScreen";
import { StyleSheet } from "react-native";

const customFonts = {
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
};

const Stack = createStackNavigator();

export default () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFontsAsync() {
            await Font.loadAsync(customFonts);
            setFontsLoaded(true);
        }

        loadFontsAsync();
    }, []);
    if (!fontsLoaded) {
        return null;
    }
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};



const App = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(currentUser());
    }, [isLoggedIn]);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Registration">
                    {!isLoggedIn ? (
                        <>
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
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
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
