import { View, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import PlusStyledButton from './PlusStyledButton';
import { selectStateAvatar } from '../redux/auth/selectors';

const UserPhoto = () => {
    const avatar = useSelector(selectStateAvatar);
    const [isBtnActive, setIsBtnActive] = useState(false);
    const [photo, setPhoto] = useState(avatar);

    useEffect(() => {
        if (photo) setIsBtnActive(true);
        else setIsBtnActive(false);
    }, [photo]);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setPhoto(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePressStyledButton = () => {
        photo ? setPhoto(null) : pickImage();
    };

    return (
        <View style={styles.userPhoto}>
            <ImageBackground source={{ uri: photo }} style={styles.photo} />
            <PlusStyledButton isActive={isBtnActive} onPress={handlePressStyledButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    userPhoto: {
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
        position: 'relative',
        top: -59,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        height: 120,
        width: 120,
        borderRadius: 16,
        overflow: 'hidden',
    },
});

export default UserPhoto;
