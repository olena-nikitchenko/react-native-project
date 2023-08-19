import { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { collection, where, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { authSignOutUser } from '../redux/auth/authOperations';
import image from '../assets/images/background.jpg';
import UserPhoto from '../Components/UserPhoto';
import { selectUserData } from '../redux/auth/selectors';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { userId, name } = useSelector(selectUserData);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUserPost();
    }, []);

    const getUserPost = async () => {
        const postRef = collection(db, 'posts');
        const q = query(postRef, where('userId', '==', userId));
        onSnapshot(q, docSnap =>
            setPosts(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        );
    };

    const deletePost = async postId => {
        await deleteDoc(doc(db, 'posts', postId));
    };

    return (
        <SafeAreaView>
            <ImageBackground source={image} style={styles.image}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.view}>
                        <View>
                            <View style={styles.viewUserPhoto}>
                                <UserPhoto />
                            </View>
                            <ExitBtn />
                            <Text style={styles.Name}>{name}</Text>
                        </View>

                        {posts.length === 0 && (
                            <View
                                style={{
                                    paddingHorizontal: 40,
                                }}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    Зараз у тебе немає публікацій, але ти можеш їх створити - тисни
                                    на цю кнопку
                                </Text>
                                <TouchableOpacity
                                    style={styles.buttonCapture}
                                    onPress={() => navigation.navigate('Create')}
                                >
                                    <MaterialIcons name="add" size={24} color={'#FFFFFF'} />
                                </TouchableOpacity>
                            </View>
                        )}

                        {posts.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                style={{ width: '100%' }}
                                disabled={true}
                            >
                                <View>
                                    <TouchableOpacity
                                        style={styles.deletePostBtn}
                                        onPress={() => deletePost(item.id)}
                                    >
                                        <MaterialIcons name="close" size={26} color="#212121" />
                                    </TouchableOpacity>
                                    <Image src={item.photo.uri} style={styles.photo} />
                                    <Text style={styles.title}>{item.description}</Text>
                                </View>

                                <View style={styles.bottomContainer}>
                                    <View style={styles.leftSideIcons}>
                                        <TouchableOpacity
                                            style={styles.barLeft}
                                            onPress={() =>
                                                navigation.navigate('Comments', {
                                                    postId: item.id,
                                                    photo: item.photo.uri,
                                                })
                                            }
                                        >
                                            <Feather
                                                name="message-circle"
                                                size={24}
                                                style={{
                                                    color: item.comments ? '#FF6C00' : '#BDBDBD',
                                                }}
                                            />
                                            <Text style={styles.barLeftText}>
                                                {item.comments || 0}
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={styles.barLeft}>
                                            <Feather
                                                name="thumbs-up"
                                                size={24}
                                                style={{
                                                    ...styles.thumbUpIcon,
                                                    color: item.likes ? '#FF6C00' : '#BDBDBD',
                                                }}
                                            />
                                            <Text style={styles.barLeftText}>{item.likes}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.barRight}
                                        onPress={() =>
                                            navigation.navigate('Map', { location: item.location })
                                        }
                                    >
                                        <Feather name="map-pin" size={24} style={styles.pinIcon} />
                                        <Text style={styles.barRightText}>{item.place}</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

function ExitBtn() {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOutUser());
    };

    return (
        <TouchableOpacity>
            <Feather name="log-out" size={24} style={styles.exitBtn} onPress={signOut} />
        </TouchableOpacity>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
        height: '100%',
    },
    Name: {
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 0.01,
        color: '#212121',
        marginTop: -32,
    },
    view: {
        marginTop: 163,
        minHeight: 600,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
        paddingBottom: 34,
        gap: 32,
    },
    buttonCapture: {
        marginTop: 30,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#FF6C00',
    },
    viewUserPhoto: { alignItems: 'center' },
    exitBtn: {
        position: 'absolute',
        right: 0,
        top: -100,
        color: '#BDBDBD',
    },
    deletePostBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 50,
        opacity: 0.4,
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
    bottomContainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftSideIcons: {
        disply: 'flex',
        flexDirection: 'row',
        gap: 24,
    },
    barLeft: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    thumbUpIcon: {
        marginRight: 6,
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
    pinIcon: {
        marginRight: 6,
        color: '#BDBDBD',
    },
    barRightText: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        textDecorationLine: 'underline',
    },
});
