import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const StoryCard = ({ image, title, comments, likes, location }) => {
    const navigation = useNavigation();
    const getImageSource = imageName => {
        switch (imageName) {
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
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Comments')}>
            <View>
                <Image source={getImageSource(image)} style={styles.photo} />
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.leftSideIcons}>
                    <View style={styles.barLeft}>
                        <Feather name="message-circle" size={24} style={styles.messageIcon} />
                        <Text style={styles.barLeftText}>{comments}</Text>
                    </View>
                    <View style={styles.barLeft}>
                        <Feather name="thumbs-up" size={24} style={styles.thumbUpIcon} />
                        <Text style={styles.barLeftText}>{likes}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.barRight}
                    onPress={() => navigation.navigate('Map')}
                >
                    <Feather name="map-pin" size={24} style={styles.pinIcon} />
                    <Text style={styles.barRightText}>{location}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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

export default StoryCard;
