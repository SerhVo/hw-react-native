import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Alert,
} from "react-native";
import { logIn } from "../redux/auth/authoperations";

const initialState = {
  email: "",
  password: "",
};

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState("");
  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleBlur = () => {
    setIsFocused("");
    setIsShowKeyboard(false);
  };

  const handleFocus = (value) => {
    setIsShowKeyboard(true);
    setIsFocused(value);
  };

  const onSubmitForm = () => {
    if (!state.email || !state.password) {
      return Alert.alert("Fill in all the fields!");
    }

    dispatch(logIn(state));
    setIsShowKeyboard(false);
    setState(initialState);
  };
  
  return (
    <>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/BG_main.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.container,
                marginBottom: isShowKeyboard ? -220 : 0,
              }}
            >
              <View style={styles.form}>
                <Text style={styles.formTitle}>Войти</Text>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isFocused === "email" ? "#FF6C00" : "#E8E8E8",
                    }}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("email")}
                    value={state.email}
                    placeholder="E-mail"
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isFocused === "password" ? "#FF6C00" : "#E8E8E8",
                    }}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("password")}
                    value={state.password}
                    placeholder="Password"
                    secureTextEntry={showPassword}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Pressable
                    style={styles.passwordIndicator}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text
                      style={{
                        ...styles.passwordIndicatorText,
                        opacity: !state.password ? 0.5 : 1,
                      }}
                    >
                      Show
                    </Text>
                  </Pressable>
                </View>

                <Pressable style={styles.formBtn} onPress={onSubmitForm}>
                  <Text style={styles.formBtnText}>Log in</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Registration")}>
                  <Text style={styles.formText}>
                    Don't have an account? Sign up
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "auto",
    paddingBottom: 111,
  },
  form: {},
  formTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginTop: 32,
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
  },
  formBtn: {
    backgroundColor: "#FF6C00",
    padding: 16,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
  },
  formBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  formText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  passwordIndicator: {
    position: "absolute",
    top: 15,
    right: 16,
  },
  passwordIndicatorText: {
    color: "#1B4371",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: "flex-end",
  },
});
export default LoginScreen;
