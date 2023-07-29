import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setState({ email: "", password: "" });
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const handleFocus = (input) => {
    if (input === "email") setIsFocused(true);
    else if (input === "password") setIsFocused2(true);
  };

  const handleBlur = (input) => {
    if (input === "email") setIsFocused(false);
    else if (input === "password") setIsFocused2(false);
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/background.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
            keyboardVerticalOffset={100}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: dimensions < 500 ? (isFocused || isFocused2 ? -240 : 0) : 0,
                width: dimensions,
              }}
            >
              <View>
                <Text style={styles.formTitle}>Увійти</Text>
              </View>
              <View>
                <TextInput
                  placeholder="Адреса елетронної пошти"
                  style={[styles.input, isFocused && styles.focusedInput]}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Пароль"
                  style={[styles.input, isFocused2 && styles.focusedInput]}
                  secureTextEntry={hidePassword}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Text style={styles.hideBtn}>
                    {hidePassword ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.textBottom}>
                Немає акаунту?{" "}
                  <Text onPress={() => navigation.navigate("Registration")}>
                   Зареєструватися
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  form: {
    width: "100%",
    height: 489,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  formTitle: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 32,
    marginBottom: 33,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    marginHorizontal: 32,
    backgroundColor: "#F6F6F6",
    textAlign: "left",
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
  },
  focusedInput: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    color: "#212121",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 7,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginBottom: 16,
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  textBottom: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  hideBtn: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    top: -50,
    left: 83,
    marginLeft: 145,
    width: 120,
  },
});


export default LoginScreen;