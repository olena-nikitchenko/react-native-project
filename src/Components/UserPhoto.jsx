import { View, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PlusStyledButton from './PlusStyledButton';
import { useState } from 'react';

const UserPhoto = () => {
    const defaultPhoto = require('../assets/images/user.jpg');

    const [photo, setPhoto] = useState(defaultPhoto);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setPhoto({ uri: result.assets[0].uri });
        }
    };

    const handlePressStyledButton = () => {
        pickImage();
    };

    return (
        <View style={styles.userPhoto}>
            <ImageBackground source={photo} style={styles.photo} />
            <PlusStyledButton onPress={handlePressStyledButton} />
        </View>
    );
};

export default UserPhoto;

const styles = StyleSheet.create({
    userPhoto: {
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
        position: 'relative',
        top: -64,
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
