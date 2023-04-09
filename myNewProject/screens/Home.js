import { StyleSheet, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "@expo/vector-icons/Feather";
import { PostsScreen } from "./PostsScreen";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authoperations";


const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(logOut());
    };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerPressColor: "#FF6C00",
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerStyle: styles.headerBox,
        headerPressColor: "#FF6C00",
        headerTitleStyle: styles.headerTitle,
        tabBarItemStyle: {
          width: 70,
          height: 40,
          borderRadius: 20,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveBackgroundColor: "transparent",
        tabBarIconStyle: { strokeWidth: 1 },
        tabBarStyle: {
          height: 83,
          paddingTop: 10,
          paddingBottom: 20,
          paddingHorizontal: 80,
          height: 70,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid";
          } else if (route.name === "CreatePosts") {
            iconName = "plus";
            return <Feather name={iconName} size={13} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <Feather name={iconName} size={24} color={color} />;
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Posts",
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              <Icon name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Create Post",
          headerLeft: () => (
            <HeaderBackButton
              backImage={() => (
                <Icon name="arrow-left" size={24} color="#212121" />
              )}
              onPress={() => navigation.navigate("Posts")}
            />
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
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
