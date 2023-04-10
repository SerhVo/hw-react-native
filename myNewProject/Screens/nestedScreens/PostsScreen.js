import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getPosts } from "../../redux/dashboard/dbOperations";
import firebase from "firebase/compat/app";

export const PostsScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);
    const [commentsNum, setCommentsNum] = useState({});
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (setPosts) {
            dispatch(getPosts(setPosts));
        }
    }, [setPosts]);

    useEffect(() => {
        if (posts && posts.length > 0) {
            posts.forEach((post) => {
                firebase
                    .firestore()
                    .collection("posts")
                    .doc(post.postId)
                    .collection("comments")
                    .onSnapshot((snapshot) => {
                        const allComments = snapshot.docs.map((doc) => ({
                            ...doc.data(),
                            commentId: doc.id,
                        }));
                        setCommentsNum((prevState) => ({
                            ...prevState,
                            [post.postId]: allComments.length,
                        }));
                    });
            });
        }
    }, [posts]);

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                {user.avatar ? (
                    <Image
                        source={{ uri: user.avatar }}
                        style={{ width: 60, height: 60, borderRadius: 16, marginRight: 8 }}
                    />
                ) : <Text style={styles.avatarNo}>
                    No photo
                </Text>}


                <View>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                </View>
            </View>
            {posts && (
                <FlatList
                    data={posts}
                    keyExtractor={(item, indx) => indx.toString()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                marginBottom: 32,
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{  height: 240, borderRadius: 8 }}
                            />
                            <Text style={styles.textTitle}>{item.title}</Text>
                            <View style={styles.userCard}>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("Comments", {
                                            postId: item.postId,
                                            image: item.image,
                                        })
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
                                        navigation.navigate("Map", {
                                            latitude: item.location.latitude,
                                            longitude: item.location.longitude,
                                        })
                                    }
                                >
                                    {item.position}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            )}
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
    avatarNo: {
        borderRadius: 16,
        width: 60,
        height: 60,
        backgroundColor: "#BDBDBD",
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        color: "#000",
        textAlign: "center",
        marginRight: 8,
        paddingTop: 23,
    },
});
