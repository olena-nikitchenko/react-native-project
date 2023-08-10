import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const CreatePostsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.ImageWrapper}>
                <TouchableOpacity activeOpacity={0.4}>
                    <Image
                        style={{ width: 343, height: 240 }}
                        source={require('../assets/images/contentBlock.png')}
                    />
                    <Image
                        source={require('../assets/images/addImage.png')}
                        style={styles.addImage}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={styles.textAddPhoto}>Завантажити фото</Text>
                </View>
            </View>
            <View style={styles.form}>
                <View>
                    <TextInput placeholder="Назва..." style={styles.inputName} />
                </View>
                <View>
                    <TextInput
                        placeholder="Місцевість..."
                        style={[styles.inputName, styles.inputLoc]}
                    />
                    <Image source={require('../assets/images/mapPin.png')} style={styles.mapPin} />
                </View>
                <TouchableOpacity activeOpacity={0.6} style={styles.btnPublish}>
                    <Text style={styles.btnPublishText}>Опубліковати</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.btnDelete}>
                    <Image
                        source={require('../assets/images/trash.png')}
                        style={{ width: 70, height: 40 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopColor: '#808080',
        borderTopWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        lineHeight: 19,
        color: 'BDBDBD',
    },
    ImageWrapper: {
        marginTop: 32,
    },
    addImage: {
        position: 'absolute',
        top: 90,
        left: 140,
    },
    textAddPhoto: {
        marginTop: 8,
        marginBottom: 32,
        color: '#BDBDBD',
    },
    form: {
        width: '100%',
        height: 'auto',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
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
        size: 24,
    },
    btnPublish: {
        backgroundColor: '#F6F6F6',
        height: 51,
        borderRadius: 100,
        marginTop: 27,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 180,
    },
    btnPublishText: {
        color: '#BDBDBD',
    },
    btnDelete: {
        alignItems: 'center',
    },
});

export default CreatePostsScreen;
