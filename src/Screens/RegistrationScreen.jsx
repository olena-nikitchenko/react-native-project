import { useState } from 'react';
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
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const initialState = {
    login: '',
    email: '',
    password: '',
};

const RegistrationScreen = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [hidePassword, setHidePassword] = useState(true);
    const [state, setState] = useState(initialState);

    const onFocusInput = inputName => {
        setFocusedInput(inputName);
    };

    const onBlurInput = () => {
        setFocusedInput(null);
        Keyboard.dismiss();
    };

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const handleChangeText = (inputName, value) => {
        setState(prevState => ({
            ...prevState,
            [inputName]: inputName === 'password' ? value : value.toLowerCase(),
        }));
    };

    return (
        <TouchableWithoutFeedback onPress={onBlurInput}>
            <View style={styles.container}>
                <ImageBackground
                    style={styles.image}
                    source={require('../assets/images/background.jpg')}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : ''}
                        keyboardVerticalOffset={-170}
                    >
                        <View style={styles.form}>
                            <View style={styles.avatarWrapper}>
                                <Image
                                    source={require('../assets/images/avatar0.png')}
                                    style={styles.avatarImage}
                                />
                                <TouchableOpacity activeOpacity={0.4}>
                                    <View style={styles.addAvatarBtn}>
                                        <EvilIcons name="plus" size={25} color="#FF6C00" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.formTitle}>Реєстрація</Text>
                            </View>

                            <View style={{ width: '100%' }}>
                                <TextInput
                                    placeholder="Логін"
                                    style={[
                                        styles.input,
                                        focusedInput === 'login' && styles.focusedInput,
                                    ]}
                                    onFocus={() => onFocusInput('login')}
                                    value={state.login}
                                    onChangeText={value => handleChangeText('login', value)}
                                />
                            </View>
                            <View style={{ width: '100%' }}>
                                <TextInput
                                    placeholder="Адреса електронної пошти"
                                    style={[
                                        styles.input,
                                        focusedInput === 'email' && styles.focusedInput,
                                    ]}
                                    onFocus={() => onFocusInput('email')}
                                    value={state.email}
                                    onChangeText={value => handleChangeText('email', value)}
                                />
                            </View>
                            <View style={{ width: '100%' }}>
                                <TextInput
                                    placeholder="Пароль"
                                    style={[
                                        styles.input,
                                        focusedInput === 'password' && styles.focusedInput,
                                    ]}
                                    secureTextEntry={hidePassword}
                                    onFocus={() => onFocusInput('password')}
                                    value={state.password}
                                    onChangeText={value => handleChangeText('password', value)}
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    <Text style={styles.hideBtn}>
                                        {hidePassword ? 'Показати' : 'Приховати'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.btn}
                                onPress={onBlurInput}
                            >
                                <Text style={styles.btnTitle}>Зареєструватися</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6}>
                                <Text style={styles.textBottom}>
                                    Вже є акаунт? <Text>Увійти</Text>
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
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    avatarWrapper: {
        position: 'relative',
        alignItems: 'center',
    },
    avatarImage: {
        position: 'absolute',
        top: -60,
        width: 120,
        height: 120,
        borderRadius: 16,
    },
    addAvatarBtn: {
        position: 'absolute',
        left: 47,
        top: 20,
    },
    form: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    hideBtn: {
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        color: '#1B4371',
        top: -62,
        left: 83,
        marginLeft: 145,
        width: 120,
        borderWidth: 1,
        borderColor: '#1B4371',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        height: 50,
        backgroundColor: '#F6F6F6',
        textAlign: 'left',
        marginBottom: 16,
        fontSize: 16,
        lineHeight: 19,
        paddingLeft: 16,
        marginBottom: 16,
        fontFamily: 'Roboto-Regular',
    },
    focusedInput: {
        borderColor: '#FF6C00',
        backgroundColor: '#FFFFFF',
        color: '#212121',
    },
    formTitle: {
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        lineHeight: 35,
        letterSpacing: 0.01,
        color: '#212121',
        marginTop: 80,
        marginBottom: 32,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#FF6C00',
        height: 51,
        width: '100%',
        borderRadius: 100,
        marginTop: 27,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderColor: '#FF6C00',
        borderWidth: 1,
    },
    btnTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'Roboto-Regular',
    },
    textBottom: {
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color: '#1B4371',
        fontFamily: 'Roboto-Regular',
        marginBottom: 80,
    },
});

export default RegistrationScreen;
