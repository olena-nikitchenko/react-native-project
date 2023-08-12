import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
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
    const [isRegistered, setIsRegistered] = useState(false);

    const navigation = useNavigation();

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
        if (inputName === 'password') {
            setState(prevState => ({
                ...prevState,
                [inputName]: value.toLowerCase(),
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                [inputName]: value,
            }));
        }
        if (value.trim() === '') {
            setIsRegistered(false);
        } else {
            setIsRegistered(true);
        }
    };

    const handleSubmit = () => {
        console.log('Registration Form Data:', state);
        Keyboard.dismiss();
        setState(initialState);
        setIsRegistered(false);
        navigation.replace('Home');
    };
    const [isButtonsVisible, setIsButtonsVisible] = useState(true);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsButtonsVisible(false);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsButtonsVisible(true);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            keyboardVerticalOffset={-290}
        >
            <ImageBackground
                style={styles.image}
                source={require('../assets/images/background.jpg')}
            >
                <TouchableWithoutFeedback onPress={onBlurInput}>
                    <View style={styles.form}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={
                                    isRegistered
                                        ? require('../assets/images/avatar.png')
                                        : require('../assets/images/avatar0.png')
                                }
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

                        <View style={styles.boxInput}>
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
                        <View style={styles.boxInput}>
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
                        <View style={styles.boxInput}>
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
                            <TouchableOpacity>
                                <Text onPress={togglePasswordVisibility} style={styles.hideBtn}>
                                    {hidePassword ? 'Показати' : 'Приховати'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {isButtonsVisible && (
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    style={styles.btn}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.btnTitle}>Зареєструватися</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text style={styles.textBottom}>
                                        Вже є акаунт? <Text>Увійти</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
    },
    boxInput: {
        width: '100%',
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
        top: -52,
        left: 83,
        marginLeft: 160,
        width: 100,
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
    btnContainer: {
        width: '100%',
    },
    btn: {
        backgroundColor: '#FF6C00',
        height: 51,
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
