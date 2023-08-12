import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CreatePostsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.ImageWrapper}>
                <TouchableOpacity activeOpacity={0.4}>
                    <Image
                        style={styles.ImageContent}
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
                <View style={styles.btnContainer}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.btnDelete}>
                        <Feather name="trash" size={24} style={styles.trashIcon} />
                    </TouchableOpacity>
                </View>
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
        color: '#BDBDBD',
    },
    ImageWrapper: {
        marginTop: 32,
    },
    ImageContent: {
        width: 343,
        height: 240,
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
        flex: 1,
        width: '100%',
        height: 'auto',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
    btnPublish: {
        backgroundColor: '#F6F6F6',
        height: 51,
        borderRadius: 100,
        marginTop: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnPublishText: {
        color: '#BDBDBD',
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
