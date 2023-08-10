import { useState, useEffect } from 'react';
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
} from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [fields, setFields] = useState({
        email: { value: '', focused: false },
        password: { value: '', focused: false },
    });

    const [hidePassword, setHidePassword] = useState(true);

    const handleFieldFocus = fieldName => {
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: { ...prevFields[fieldName], focused: true },
        }));
    };

    const handleFieldBlur = fieldName => {
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: { ...prevFields[fieldName], focused: false },
        }));
        Keyboard.dismiss();
    };

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const handleFieldChange = (fieldName, value) => {
        if (fieldName === 'password') {
            value = value.toLowerCase();
        }
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: { ...prevFields[fieldName], value },
        }));
    };

    const handleSubmit = () => {
        console.log('Login Form Data:', fields);
        Keyboard.dismiss();
        setFields({
            email: { value: '', focused: false },
            password: { value: '', focused: false },
        });
    };

    const keyboardHide = () => {
        Keyboard.dismiss();
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
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            keyboardVerticalOffset={-290}
        >
            <ImageBackground
                style={styles.image}
                source={require('../assets/images/background.jpg')}
            >
                <TouchableWithoutFeedback onPress={keyboardHide}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.formTitle}>Увійти</Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                placeholder="Адреса елетронної пошти"
                                style={[styles.input, fields.email.focused && styles.focusedInput]}
                                onFocus={() => handleFieldFocus('email')}
                                onBlur={() => handleFieldBlur('email')}
                                value={fields.email.value}
                                onChangeText={value => handleFieldChange('email', value)}
                            />
                        </View>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                placeholder="Пароль"
                                style={[
                                    styles.input,
                                    fields.password.focused && styles.focusedInput,
                                ]}
                                secureTextEntry={hidePassword}
                                onFocus={() => handleFieldFocus('password')}
                                onBlur={() => handleFieldBlur('password')}
                                value={fields.password.value}
                                onChangeText={value => handleFieldChange('password', value)}
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
                                    <Text style={styles.btnTitle}>Увійти</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.6}>
                                    <Text style={styles.textBottom}>
                                        Немає акаунту?{' '}
                                        <Text onPress={() => navigation.navigate('Registration')}>
                                            Зареєструватися
                                        </Text>
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
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
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
    formTitle: {
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        lineHeight: 35,
        letterSpacing: 0.01,
        color: '#212121',
        marginTop: 32,
        marginBottom: 33,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        height: 50,
        backgroundColor: '#F6F6F6',
        textAlign: 'left',
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
    btnContainer: {
        width: '100%',
    },
    btn: {
        backgroundColor: '#FF6C00',
        height: 51,
        borderRadius: 100,
        marginTop: 25,
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
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingTop: 300,
    },
});

export default LoginScreen;
