

import {
    StyleSheet,
    Image,
    View,
    FlatList,
    Text,
    Pressable,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";


export const PostsScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: user.avatar }}
                    style={{ width: 60, height: 60, borderRadius: 16, marginRight: 8 }}
                />
                <View>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                </View>
            </View>

            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <View
                        style={{
                            marginBottom: 32,
                        }}
                    >
                        <Image
                            style={{ width: 343, height: 240, borderRadius: 8 }}
                        />
                        <Text style={styles.textTitle}>{item.title}</Text>

                        <View style={styles.userCard}>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("Comments")
                                }
                                style={styles.commentInfo}
                            >
                                <EvilIcons
                                    name="comment"
                                    size={32}
                                    style={{
                                        color: commentsNum[item.postId] ? "#FF6C00" : "#BDBDBD",
                                    }}
                                />
                                <Text
                                    style={{
                                        color: commentsNum[item.postId] ? "#212121" : "#BDBDBD",
                                    }}
                                >
                                    {commentsNum[item.postId] || 0}
                                </Text>
                            </Pressable>
                            <Feather
                                name="map-pin"
                                size={24}
                                color="#BDBDBD"
                                style={{ marginRight: 3 }}
                            />
                            <Text
                                style={styles.textLocation}
                                onPress={() =>
                                    navigation.navigate("Map")
                                }
                            >                                
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16,
        backgroundColor: "#ffffff",
    },
    userInfo: {
        marginTop: 32,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32,
    },
    userCard: {
        flexDirection: "row",
        marginTop: 8,
        alignItems: "center",
    },
    commentInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 49,
    },
    textLocation: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "right",
        textDecorationLine: "underline",
        color: "#212121",
    },
    textTitle: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "left",
        color: "#212121",
        marginTop: 8,
    },
});
