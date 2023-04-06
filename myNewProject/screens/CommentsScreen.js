import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,

    TextInput,
    Pressable,
    Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";


export const CommentsScreen = ({ route }) => {

    setText("");
    handleKeyboard();
};

const handleKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
};



const textHandler = (text) => {
    setText(text);
};

return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
        <View style={{ ...styles.container }}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <View style={styles.imageWrapper}>
                    <Image style={styles.postImage} source={{ uri: image }} />
                </View>
                <View
                    style={{
                        ...styles.postsList,
                        marginBottom: isShowKeyboard ? -250 : 0,
                    }}
                >
                    <FlatList
                        data={comments}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    ...styles.commentBox,
                                    flexDirection:
                                        item.userId === userId ? "row" : "row-reverse",
                                }}
                            >
                                <View style={styles.commentTextWrapper}>
                                    <Text style={styles.commentText}>{item.text}</Text>
                                    <Text style={styles.commentDate}>
                                        {item.date} | {item.time}
                                    </Text>
                                </View>
                                <View style={styles.commentAvatar}>
                                    {image ? (
                                        <Image
                                            style={styles.commentAvatar}

                                        />
                                    ) : null}
                                </View>
                            </View>
                        )}

                    />
                    <View
                        style={{
                            ...styles.commentInputWrapper,
                        }}
                    >
                        <TextInput
                            style={
                                text
                                    ? { ...styles.commentInput, color: "#212121" }
                                    : styles.commentInput
                            }
                            value={text}
                            multiline
                            autoFocus={false}
                            selectionColor="#FF6C00"
                            blurOnSubmit={true}
                            placeholderTextColor="#BDBDBD"
                            onChangeText={textHandler}
                            onFocus={() => {
                                setIsShowKeyboard(true);
                            }}
                            onBlur={() => {
                                setIsShowKeyboard(false);
                            }}
                            placeholder="Comment..."
                        ></TextInput>
                        <Pressable
                            style={{
                                ...styles.addCommentBtn,
                                opacity: disabled ? 0.5 : 1,
                            }}
                            onPress={addComment}
                            disabled={disabled}
                        >
                            <AntDesign name="arrowup" size={20} color="#ffffff" />
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    </TouchableWithoutFeedback>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 16,
        alignItems: "center",
    },
    imageWrapper: {
        alignItems: "center",
    },
    postImage: {
        width: 343,
        height: 240,
        borderRadius: 8,
    },
    postsList: {
        marginTop: 24,
        maxHeight: "60%",
        minHeight: "60%",
        width: "100%",
    },
    commentBox: {
        marginBottom: 24,
        justifyContent: "center",
        gap: 16,
        width: 343,
    },
    commentTextWrapper: {
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderRadius: 6,
        padding: 16,
        width: 290,
    },
    commentText: {
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        color: "#212121",
        lineHeight: 18,
    },
    commentDate: {
        fontFamily: "Roboto-Regular",
        fontSize: 10,
        color: "#BDBDBD",
        lineHeight: 12,
        textAlign: "right",
    },
    commentAvatar: {
        borderRadius: 50,
        width: 28,
        height: 28,
        backgroundColor: "#BDBDBD",
    },
    commentInputWrapper: {
        position: "relative",
        width: 349,
        marginTop: 16,
    },
    commentInput: {
        width: "100%",
        paddingLeft: 16,
        paddingRight: 50,
        height: 50,
        backgroundColor: "#F6F6F6",
        borderRadius: 100,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: "#BDBDBD",
        lineHeight: 19,
        textAlignVertical: "center",
        borderWidth: 1,
        borderColor: "#E8E8E8",
    },
    addCommentBtn: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 34,
        height: 34,
        borderRadius: 50,
        backgroundColor: "#FF6C00",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    emptyMessageBox: {
        marginTop: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    emptyMessageStyle: {
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: "#212121",
        lineHeight: 19,
        textAlign: "center",
    },
});
