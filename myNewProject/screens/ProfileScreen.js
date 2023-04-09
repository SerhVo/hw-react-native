import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ImageBackground,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { getPostsOwnPosts } from "../redux/dashboard/dbOperations";
import Icon from "@expo/vector-icons/Feather";
import { logOut } from "../redux/auth/authoperations";
import firebase from "firebase/compat/app";

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const uid = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();
  const [commentsNum, setCommentsNum] = useState({});

  const handleLogout = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (setPosts) {
      dispatch(getPostsOwnPosts({ uid, setPosts }));
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
    <View style={styles.containerMain}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../assets/images/BG_main.jpg")}
      >
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user.avatar }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
                marginRight: 8,
              }}
            />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Icon name="log-out" size={24} color="#BDBDBD" />
          </Pressable>
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
                    style={{ height: 240, width: 343, borderRadius: 8 }}
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
                          color: commentsNum[item.postId]
                            ? "#FF6C00"
                            : "#BDBDBD",
                        }}
                      />
                      <Text
                        style={{
                          color: commentsNum[item.postId]
                            ? "#212121"
                            : "#BDBDBD",
                        }}
                      >
                        {commentsNum[item.postId] || 0}
                      </Text>
                    </Pressable>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft:118,
                      }}
                    >
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
                        {item.position.split(",")[1]}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  container: {
    maxHeight: "85%",
    position: "relative",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 91,
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  userInfo: {
    position: "absolute",
    top: -60,
    left: "37%",
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 33,
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

  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 18,
  },
});
