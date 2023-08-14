import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

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
    console.log(location);

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    const searchLocation = async () => {
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
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets.length > 0) {
            handlePostData('photo', result.assets[0].uri);
        }
    };

    const handlePostData = (type, value) => {
        setPostData(prevState => ({ ...prevState, [type]: value }));
    };

    const sendPost = () => {
        searchLocation();
        const newPost = { ...postData, location };
        console.log('postData:', newPost);
        navigation.replace('Home', { newPost });
    };
    const handleReset = () => {
        setPostData(initialPostData);
    };

    const isPublishDisabled = !postData.photo || !postData.description || !postData.place;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <Camera style={styles.camera} type={type} ref={ref => setCameraRef(ref)}>
                        <ImageBackground source={{ uri: postData.photo }} style={styles.photoView}>
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
                                    style={styles.photoButton}
                                    onPress={async () => {
                                        if (cameraRef) {
                                            const { uri } = await cameraRef.takePictureAsync();
                                            const asset = await MediaLibrary.createAssetAsync(uri);
                                            handlePostData('photo', asset.uri);
                                        }
                                    }}
                                >
                                    <Ionicons name="camera" size={24} style={styles.photoIcon} />
                                </TouchableOpacity>
                            )}
                        </ImageBackground>
                    </Camera>
                </View>
                <View style={styles.pickImgBox}>
                    <TouchableWithoutFeedback onPress={pickImage}>
                        <Text style={styles.pickImgText}>Редагувати фото</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.form}>
                    <View>
                        <TextInput
                            placeholder="Назва..."
                            style={[styles.inputName, isFocused === 'name' && styles.activeField]}
                            value={postData.description}
                            onChangeText={value => handlePostData('description', value)}
                            onFocus={() => setIsFocused('name')}
                            onBlur={() => setIsFocused(null)}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Місцевість..."
                            style={[
                                styles.inputName,
                                styles.inputLoc,
                                isFocused === 'place' && styles.activeField,
                            ]}
                            value={postData.place}
                            onChangeText={value => handlePostData('place', value)}
                            onFocus={() => setIsFocused('place')}
                            onBlur={() => setIsFocused(null)}
                        />
                        <Image
                            source={require('../assets/images/mapPin.png')}
                            style={styles.mapPin}
                        />
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[
                            styles.btnPublish,
                            { backgroundColor: isPublishDisabled ? '#F6F6F6' : '#FF6C00' },
                        ]}
                        onPress={sendPost}
                        disabled={isPublishDisabled}
                    >
                        <Text
                            style={[
                                styles.btnPublishText,
                                { color: isPublishDisabled ? '#BDBDBD' : '#ffffff' },
                            ]}
                        >
                            Опубліковати
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.btnDelete}
                            onPress={handleReset}
                        >
                            <Feather name="trash" size={24} style={styles.trashIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopColor: '#808080',
        borderTopWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        lineHeight: 19,
        color: '#BDBDBD',
    },
    cameraContainer: {
        height: 240,
        width: '100%',
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
    photoView: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 80,
        padding: 16,
    },
    flipContainer: {
        alignSelf: 'flex-end',
    },
    photoButton: {
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 50,
        alignSelf: 'center',
    },
    photoIcon: {
        color: '#BDBDBD',
    },
    pickImgText: {
        paddingVertical: 8,
        marginBottom: 16,
        color: 'rgba(189, 189, 189, 1)',
        fontSize: 16,
        alignSelf: 'flex-start',
        width: '100%',
    },
    form: {
        flex: 1,
        width: '100%',
        height: 'auto',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 32,
    },
    inputName: {
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
        height: 50,
        marginBottom: 16,
        textAlign: 'left',
    },
    inputLoc: { paddingLeft: 26 },
    mapPin: {
        position: 'absolute',
        bottom: 28,
        left: 0,
        width: 24,
        height: 24,
    },
    activeField: {
        borderBottomColor: '#000000',
    },
    btnPublish: {
        height: 50,
        borderRadius: 100,
        marginTop: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnPublishText: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '500',
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    btnDelete: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        backgroundColor: '#F6F6F6',
        borderRadius: 80,
        alignSelf: 'center',
    },
    trashIcon: {
        color: '#BDBDBD',
    },
});

export default CreatePostsScreen;
