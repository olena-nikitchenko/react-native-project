import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const PostItem = ({ description, place, photo, comments }) => {
    const navigation = useNavigation();
    const getPhotoSource = photoName => {
        switch (photoName) {
            case 'forest.jpg':
                return require('../assets/images/forest.jpg');
            case 'sea.jpg':
                return require('../assets/images/sea.jpg');
            case 'house.jpg':
                return require('../assets/images/house.jpg');
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Image source={getPhotoSource(photo)} style={styles.photo} />
                <Text style={styles.title}>{description}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.leftSideIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                        <View style={styles.barLeft}>
                            <Feather name="message-circle" size={24} style={styles.messageIcon} />
                            <Text style={styles.barLeftText}>{comments}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.barRight}
                    onPress={() => navigation.navigate('Map')}
                >
                    <Feather name="map-pin" size={24} style={styles.pinIcon} />
                    <Text style={styles.barRightText}>{place}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    photo: {
        borderRadius: 8,
        width: '100%',
        height: 240,
    },
    title: {
        marginTop: 8,
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
    },
    leftSideIcons: {
        disply: 'flex',
        flexDirection: 'row',
        gap: 24,
    },

    bottomContainer: {
        marginTop: 8,
        marginBottom: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    barLeft: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    barLeftText: {
        color: '#BDBDBD',
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
    },
    barRight: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    barRightText: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        textDecorationLine: 'underline',
    },
    messageIcon: {
        marginRight: 4,
        color: '#FF6C00',
        transform: [{ rotateY: '-180deg' }],
    },
    thumbUpIcon: {
        marginRight: 6,
        color: '#FF6C00',
    },
    pinIcon: {
        marginRight: 6,
        color: '#BDBDBD',
    },
});

export default PostItem;
