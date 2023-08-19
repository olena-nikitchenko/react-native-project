import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { Ionicons, Octicons, Feather } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    ImageBackground,
} from 'react-native';
import Spinner from '../Components/Spiner';
import { selectUserData } from '../redux/auth/selectors';

const initialPostData = {
    description: '',
    place: '',
    photo: null,
};

const CreatePostsScreen = () => {
    const navigation = useNavigation();
    const [postData, setPostData] = useState(initialPostData);
    const [isFocused, setIsFocused] = useState(null);
    const [location, setLocation] = useState(null);
    const [photoTaken, setPhotoTaken] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isLoading, setIsLoading] = useState('idle');
    const [isDisabled, setDisabled] = useState(false);

    const { userId, name, email, avatar } = useSelector(selectUserData);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Відмовлено у доступі до місцезнаходження');
                }

                let location = await Location.getCurrentPositionAsync({});
                const coords = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };
                setLocation(coords);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Camera.requestCameraPermissionsAsync();
                await MediaLibrary.requestPermissionsAsync();

                setHasPermission(status === 'granted');
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                handlePostData('photo', result.assets[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePostData = (type, value) => {
        setPostData(prevState => ({ ...prevState, [type]: value }));
    };

    const uploadPostToServer = async () => {
        try {
            const setUserPost = await addDoc(collection(db, 'posts'), {
                photo: postData.photo,
                description: postData.description,
                place: postData.place,
                location,
                userId,
                name,
                email,
                avatar,
                likes: 0,
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const sendPost = () => {
        uploadPostToServer();
        navigation.navigate('Publications');
        setPostData(initialPostData);
        setLocation(null);
    };

    const handleReset = () => {
        setPostData(initialPostData);
        setLocation(null);
        setPhotoTaken(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View>
                    <View style={styles.cameraContainer}>
                        <Camera style={styles.camera} type={type} ref={setCameraRef}>
                            <ImageBackground source={postData.photo} style={styles.photoView}>
                                {!hasPermission && !postData.photo && (
                                    <Text
                                        style={{
                                            color: '#ffffff',
                                        }}
                                    >
                                        Завантажте фото
                                    </Text>
                                )}
                                <TouchableOpacity
                                    style={styles.flipContainer}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}
                                >
                                    {hasPermission && (
                                        <Feather name="repeat" size={20} color="#BDBDBD" />
                                    )}
                                </TouchableOpacity>
                                {hasPermission && (
                                    <TouchableOpacity
                                        disabled={isDisabled}
                                        style={styles.photoButton}
                                        onPress={async () => {
                                            try {
                                                setDisabled(true);
                                                setIsLoading('pending');
                                                if (cameraRef) {
                                                    if (photoTaken) {
                                                        handlePostData('photo', null);
                                                        setPhotoTaken(false);
                                                    } else {
                                                        const { uri } =
                                                            await cameraRef.takePictureAsync();
                                                        const asset =
                                                            await MediaLibrary.createAssetAsync(
                                                                uri
                                                            );
                                                        handlePostData('photo', asset);
                                                        setPhotoTaken(true);
                                                    }
                                                }
                                                setIsLoading('fullfield');
                                                setDisabled(false);
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }}
                                    >
                                        {isLoading === 'idle' && (
                                            <Ionicons
                                                name="camera"
                                                size={24}
                                                style={styles.photoIcon}
                                            />
                                        )}
                                        {isLoading === 'pending' && <Spinner />}
                                        {isLoading === 'fullfield' && (
                                            <Ionicons
                                                name="camera"
                                                size={24}
                                                style={styles.photoIcon}
                                            />
                                        )}
                                    </TouchableOpacity>
                                )}
                            </ImageBackground>
                        </Camera>
                    </View>
                    <View
                        style={{
                            justifyContent: 'flex-end',
                        }}
                    >
                        <View style={styles.pickImgBox}>
                            <TouchableWithoutFeedback onPress={pickImage}>
                                <Text style={styles.pickImgText}>Редагувати фото</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[
                                    styles.inputName,
                                    isFocused === 'name' && styles.activeField,
                                ]}
                                placeholder="Назва..."
                                value={postData.description}
                                onChangeText={value => handlePostData('description', value)}
                                onFocus={() => setIsFocused('name')}
                                onBlur={() => setIsFocused(null)}
                            />
                            <TextInput
                                style={[
                                    styles.inputPlace,
                                    isFocused === 'place' && styles.activeField,
                                ]}
                                placeholder="Місцевість..."
                                value={postData.place}
                                onChangeText={value => handlePostData('place', value)}
                                onFocus={() => setIsFocused('place')}
                                onBlur={() => setIsFocused(null)}
                            />
                            <Octicons
                                name="location"
                                size={24}
                                style={{
                                    position: 'absolute',
                                    top: 71,
                                    color: '#CECDCD',
                                }}
                            />
                        </View>

                        <View>
                            <TouchableOpacity
                                style={{
                                    ...styles.sendBtn,
                                    backgroundColor: postData.photo ? '#FF6C00' : '#F6F6F6',
                                }}
                                activeOpacity={0.7}
                                onPress={sendPost}
                                disabled={!postData.photo}
                            >
                                <Text
                                    style={{
                                        ...styles.btnTitle,
                                        color: postData.photo ? '#fff' : '#BDBDBD',
                                    }}
                                >
                                    Опублікувати
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={styles.removeButton} onPress={handleReset}>
                        <Feather
                            name="trash"
                            size={24}
                            style={{
                                color:
                                    postData.photo || postData.description || postData.place
                                        ? '#FF6C00'
                                        : '#DADADA',
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
    },
    cameraContainer: {
        height: 240,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: '#f6f6f6',
        marginBottom: 8,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
    inputWrapper: {
        marginTop: 22,
    },
    inputName: {
        marginBottom: 16,
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#212121',
    },
    inputPlace: {
        paddingLeft: 28,
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#212121',
    },
    pickImgBtn: {
        marginTop: 18,
        padding: 10,
        backgroundColor: '#BDBDBD',
        alignItems: 'center',
        borderRadius: 100,
    },
    sendBtn: {
        fontFamily: 'Roboto',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 32,
        borderRadius: 100,
    },
    btnTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    photoButton: {
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff55',
    },
    photoIcon: { color: '#ffffff' },
    photoView: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipContainer: {
        top: -60,
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    removeButton: {
        width: 70,
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#F6F6F6',
    },
    activeField: {
        borderBottomColor: '#FF6C00',
    },
    pickImgText: {
        paddingVertical: 8,
        marginBottom: 16,
        color: 'rgba(189, 189, 189, 1)',
        fontSize: 16,
        alignSelf: 'flex-start',
        width: '100%',
    },
});
