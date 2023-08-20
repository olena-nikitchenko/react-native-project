import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const PostItem = ({ description, place, location, photo, postId, commentsLength }) => {
    const navigation = useNavigation();

    const [likes, setLikes] = useState(null);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const postRef = doc(db, 'posts', postId);
                const postDoc = await postRef.get();
                setLikes(postDoc.data().likes);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLikes();
    }, [postId]);

    const handleLike = async () => {
        try {
            const postRef = doc(db, 'posts', postId);
            await updateDoc(postRef, {
                likes: likes ? likes - 1 : 1,
            });
            setLikes(likes ? null : 1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: photo }} style={styles.photo} />
                <Text style={styles.title}>{description}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.leftSideIcons}>
                    <TouchableOpacity
                        style={styles.barLeft}
                        onPress={() =>
                            navigation.navigate('Comments', {
                                postId: postId,
                                photo: photo,
                            })
                        }
                    >
                        <Feather
                            name="message-circle"
                            size={24}
                            style={{
                                ...styles.messageIcon,
                                color: commentsLength ? '#FF6C00' : '#BDBDBD',
                            }}
                        />
                        <Text style={styles.barLeftText}>{commentsLength || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.barLeft} onPress={handleLike}>
                        <Feather
                            name="thumbs-up"
                            size={24}
                            style={{
                                ...styles.thumbUpIcon,
                                color: likes ? '#FF6C00' : '#BDBDBD',
                            }}
                        />
                        <Text style={styles.barLeftText}>{likes || 0}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.barRight}
                    onPress={() => navigation.navigate('Map', { location: location })}
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
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 24,
    },

    bottomContainer: {
        marginTop: 8,
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
        transform: [{ rotateY: '-180deg' }],
    },
    thumbUpIcon: {
        marginRight: 6,
    },
    pinIcon: {
        marginRight: 6,
        color: '#BDBDBD',
    },
});

export default PostItem;
