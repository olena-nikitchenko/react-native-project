import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Platform,
    ImageBackground,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import image from '../assets/images/background.jpg';
import PlusStyledButton from '../Components/PlusStyledButton';
import { authSignUpUser } from '../redux/auth/authOperations';

const initialState = {
    name: '',
    email: '',
    password: '',
    avatar: null,
};

const RegistrationScreen = () => {
    const navigation = useNavigation();
    const [state, setState] = useState(initialState);
    const [isShownPasword, setIsShownPasword] = useState(true);
    const [isFocused, setIsFocused] = useState(null);
    const [isBtnActive, setIsBtnActive] = useState(false);

    const dispatch = useDispatch();

    const handleSetState = (type, value) => {
        if (type === 'password') {
            value = value.charAt(0).toLowerCase() + value.slice(1);
        }
        setState(prevState => ({ ...prevState, [type]: value }));
    };

    useEffect(() => {
        if (state.avatar) setIsBtnActive(true);
        else setIsBtnActive(false);
    }, [state.avatar]);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                handleSetState('avatar', result.assets[0].uri);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePressStyledButton = () => {
        state.avatar ? handleSetState('avatar', null) : pickImage();
    };

    const showPassword = () => {
        setIsShownPasword(prev => !prev);
    };

    const onRegistration = () => {
        const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidPassword = password => password.length >= 8;
        if (!isValidEmail(state.email)) {
            Alert.alert('Помилка', 'Введіть коректний email');
            return;
        }

        if (!isValidPassword(state.password)) {
            Alert.alert('Помилка', 'Пароль повинен містити принаймні 8 символів');
            return;
        }

        dispatch(authSignUpUser(state));
        setState(initialState);
    };

    return (
        <ImageBackground source={image} style={styles.image}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.box}>
                    <View style={styles.view}>
                        <KeyboardAvoidingView
                            style={styles.keyView}
                            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={0}
                        >
                            <View style={styles.userPhoto}>
                                {state.avatar && (
                                    <Image source={{ uri: state.avatar }} style={styles.photo} />
                                )}
                                <PlusStyledButton
                                    isActive={isBtnActive}
                                    onPress={handlePressStyledButton}
                                />
                            </View>
                            <Text style={styles.title}>Реєстрація</Text>
                            <TextInput
                                onFocus={() => setIsFocused('login')}
                                onBlur={() => setIsFocused(null)}
                                style={[styles.input, isFocused === 'login' && styles.active]}
                                placeholder="Логін"
                                onChangeText={value => handleSetState('name', value)}
                                value={state.name}
                                inputMode="text"
                                placeholderTextColor="#BDBDBD"
                            />
                            <TextInput
                                onFocus={() => setIsFocused('email')}
                                onBlur={() => setIsFocused(null)}
                                placeholder="Адреса електронної пошти"
                                style={[styles.input, isFocused === 'email' && styles.active]}
                                onChangeText={value => handleSetState('email', value)}
                                value={state.email}
                                inputMode="email"
                                autoCapitalize="none"
                                placeholderTextColor="#BDBDBD"
                            />
                            <View style={styles.inputPassword}>
                                <TextInput
                                    onFocus={() => setIsFocused('password')}
                                    onBlur={() => setIsFocused(null)}
                                    placeholder="Пароль"
                                    style={[
                                        styles.input,
                                        isFocused === 'password' && styles.active,
                                    ]}
                                    onChangeText={value => handleSetState('password', value)}
                                    value={state.password}
                                    textContentType="password"
                                    autoCapitalize="none"
                                    placeholderTextColor="#BDBDBD"
                                    secureTextEntry={isShownPasword}
                                />
                                <TouchableOpacity
                                    onPress={showPassword}
                                    style={styles.passwordInputBtn}
                                >
                                    <Text style={styles.showPassText}>
                                        {isShownPasword ? 'Показати' : 'Приховати'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.btn}
                            onPress={onRegistration}
                        >
                            <Text style={styles.btnText}>Зареєстуватися</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bottomTextContainer}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.bottomText}>Вже є акаунт? Увійти</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
    base: {
        width: '100%',
    },
    image: {
        resizeMode: 'cover',
        flex: 1,
    },

    box: {
        height: '100%',
        justifyContent: 'flex-end',
        textAlign: 'center',
        position: 'relative',
        flexDirection: 'column',
    },
    view: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 92,
        paddingHorizontal: 16,
        paddingBottom: 78,
    },
    keyView: {
        alignItems: 'center',
    },
    userPhoto: {
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
        position: 'absolute',
        top: -152,
    },
    photo: {
        resizeMode: 'contain',
        width: 120,
        height: 120,
        borderRadius: 16,
    },
    takePhotoOut: {
        position: 'absolute',
        width: 25,
        height: 25,
        right: -11,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FF6C00',
        top: 81,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BtnIcon: {
        color: '#FF6C00',
    },

    input: {
        width: '100%',
        height: 50,
        marginTop: 16,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderStyle: 'solid',
        borderRadius: 8,
        position: 'relative',
        fontWeight: '400',
    },
    active: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FF6C00',
        color: '#212121',
    },

    inputPassword: { width: '100%' },

    title: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 0.01,
        color: '#212121',
        marginBottom: 16,
        fontFamily: 'Roboto',
    },

    btn: {
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        paddingVertical: 16,
        paddingHorizontal: 32,
        marginTop: 43,
        alignItems: 'center',
    },
    btnText: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: '#FFFFFF',
    },

    bottomText: {
        paddingTop: 16,
        color: '#1B4371',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    showPassText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#1B4371',
    },
    passwordInputBtn: {
        height: 50,
        width: 100,
        position: 'absolute',
        top: 16,
        right: 8,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
