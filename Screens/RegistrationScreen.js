import{ useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";


const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen=()=> {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);


  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;

      setDimensions(width);
    };
    const listener = Dimensions.addEventListener("change", onChange);
    return () => {
      listener.remove();
    };
  }, []);

  const hanldeSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsShowKeyboard(true);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
    setIsShowKeyboard(true);
  };

  const handleFocus3 = () => {
    setIsFocused3(true);
    setIsShowKeyboard(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsShowKeyboard(false);
  };
  const handleBlur2 = () => {
    setIsFocused2(false);
    setIsShowKeyboard(false);
  };
  const handleBlur3 = () => {
    setIsFocused3(false);
    setIsShowKeyboard(false);
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
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -170 : 0,
                width: dimensions,
              }}
            >
              <View style={styles.avatarWrapper}>
                <Image
                  source={require("../assets/images/avatar0.png")}
                  style={styles.avatarImage}
                ></Image>
                <TouchableOpacity activeOpacity={0.4}>
                  <Image
                    source={require("../assets/images/addButton.png")}
                    style={styles.addAvatarBtn}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.formTitle}>Реєстрація</Text>
              </View>

              <View>
                <TextInput
                  placeholder="Логін"
                  style={[styles.input, isFocused && styles.focusedInput]}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  style={[styles.input, isFocused2 && styles.focusedInput]}
                  onFocus={handleFocus2}
                  onBlur={handleBlur2}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Пароль"
                  style={[styles.input, isFocused3 && styles.focusedInput]}
                  secureTextEntry={hidePassword}
                  onFocus={handleFocus3}
                  onBlur={handleBlur3}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {hidePassword ? (
                    <Text style={styles.hideBtn}>Показати</Text>
                  ) : (
                    <Text style={styles.hideBtn}>Приховати</Text>
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.btn}
                onPress={hanldeSubmit}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.textBottom}>
                  Вже є акаунт?{" "}
                  <Text onPress={() => navigation.navigate("Login")}>
                    Увійти
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatarImage: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addAvatarBtn: {
    position: "absolute",
    width: 25,
    height: 25,
    left: 45,
    top: 20,
  },
  form: {
    width: "100%",
    height: 549,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
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
  formTitle: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
    marginBottom: 32,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 27,
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
});

export default RegistrationScreen;



