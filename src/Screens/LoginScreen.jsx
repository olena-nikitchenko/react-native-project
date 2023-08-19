import {
    View,
    StyleSheet,
    TextInput,
    Text,
    SafeAreaView,
    Platform,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { authSignInUser } from '../redux/auth/authOperations';
import image from '../assets/images/background.jpg';

const initialState = {
    email: '',
    password: '',
};

const LoginScreen = () => {
    const navigation = useNavigation();
    const [state, setState] = useState(initialState);
    const [isShownPasword, setIsShownPasword] = useState(true);
    const [isFocused, setIsFocused] = useState(null);
    const dispatch = useDispatch();

    const showPassword = () => {
        setIsShownPasword(prev => !prev);
    };

    const handleSetState = (type, value) => {
        if (type === 'password') {
            value = value.charAt(0).toLowerCase() + value.slice(1);
        }
        setState(prevState => ({ ...prevState, [type]: value }));
    };

    const onLogin = () => {
        dispatch(authSignInUser(state));
        setState(initialState);
    };

    return (
        <ImageBackground source={image} style={styles.image}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <View style={styles.box}>
                        <View style={styles.view}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                                keyboardVerticalOffset={0}
                            >
                                <Text style={styles.title}>Увійти</Text>
                                <TextInput
                                    onFocus={() => setIsFocused('email')}
                                    onBlur={() => setIsFocused(null)}
                                    placeholder="Адреса електронної пошти"
                                    style={[styles.input, isFocused === 'email' && styles.active]}
                                    onChangeText={value => handleSetState('email', value)}
                                    value={state.email}
                                    autoCapitalize="none"
                                    inputMode="email"
                                    placeholderTextColor="#BDBDBD"
                                />
                                <View>
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
                                onPress={onLogin}
                            >
                                <Text style={styles.btnText}>Увійти</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomTextContainer}>
                                <Text
                                    style={styles.bottomText}
                                    onPress={() => navigation.replace('Registration')}
                                >
                                    Немає акаунту?{' '}
                                    <Text style={styles.underlinedText}>Зареєструватися</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
        paddingTop: 32,
        paddingHorizontal: 16,
        paddingBottom: 144,
    },
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
    input: {
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
    underlinedText: {
        textDecorationLine: 'underline',
    },
});
