import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { collection, addDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { selectUserData } from '../redux/auth/selectors';

const CommentsScreen = ({ route }) => {
    const { postId, photo } = route.params;
    const { userId, name, avatar } = useSelector(selectUserData);
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    const createComment = () => {
        sendCommentToServer();
        setComment('');
    };

    const sendCommentToServer = async () => {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        try {
            const dbRef = doc(db, 'posts', postId);
            await updateDoc(dbRef, {
                comments: allComments.length + 1,
            });
            await addDoc(collection(dbRef, 'comments'), {
                comment,
                name,
                date,
                time,
                userId,
                avatar,
            });
        } catch (error) {
            console.log('error.message', error.message);
        }
    };

    const getAllComments = async () => {
        try {
            const dbRef = doc(db, 'posts', postId);
            onSnapshot(collection(dbRef, 'comments'), docSnap =>
                setAllComments(docSnap.docs.map(doc => ({ ...doc.data() })))
            );
        } catch (error) {
            console.log(`getAllComments`, error);
        }
    };

    useEffect(() => {
        getAllComments();
    }, []);

    const renderItem = ({ item }) => {
        const currentUser = userId === item.userId;

        return (
            <View
                style={{
                    marginTop: 32,
                    flexDirection: currentUser ? 'row' : 'row-reverse',
                }}
            >
                <Image
                    source={{
                        uri: item.avatar
                            ? item.avatar
                            : 'https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57',
                    }}
                    style={{
                        ...styles.avatarIcon,
                        marginLeft: currentUser ? 0 : 15,
                    }}
                />
                <View style={styles.comment}>
                    <Text
                        style={{
                            ...styles.commentAuthor,
                            textAlign: currentUser ? 'left' : 'right',
                        }}
                    >
                        {currentUser ? 'You' : item.name}
                    </Text>
                    <Text
                        style={{
                            ...styles.commentMessage,
                            textAlign: currentUser ? 'left' : 'right',
                        }}
                    >
                        {item.comment}
                    </Text>
                    <Text
                        style={{
                            ...styles.commentDate,
                            textAlign: currentUser ? 'left' : 'right',
                        }}
                    >
                        {item.date} | {item.time}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                        <ImageBackground source={{ uri: photo }} style={styles.imageBackground} />
                    }
                    data={allComments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
                <View>
                    <TextInput
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Коментувати..."
                        style={{
                            ...styles.submitBtn,
                            fontFamily: 'Roboto',
                        }}
                    />

                    <TouchableOpacity
                        style={styles.addCommentBtn}
                        activeOpacity={0.7}
                        onPress={createComment}
                    >
                        <AntDesign name="arrowup" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CommentsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 16,
    },
    imageBackground: {
        height: 240,
        borderRadius: 8,
        paddingRight: 10,
        overflow: 'hidden',
    },
    avatarIcon: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#808080',
    },
    comment: {
        marginLeft: 16,
        padding: 14,
        width: 272,
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
    commentMessage: {
        marginBottom: 5,
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#212121',
    },
    commentDate: {
        fontFamily: 'Roboto',
        fontSize: 10,
        color: '#BDBDBD',
    },
    submitBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        padding: 16,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'rgba(189, 189, 189, 1)',
        backgroundColor: '#E8E8E8',
    },
    addCommentBtn: {
        position: 'absolute',
        right: 6,
        bottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#FF6C00',
        borderRadius: 50,
    },
    commentAuthor: {
        marginBottom: 5,
        fontFamily: 'Roboto',
        fontSize: 11,
        color: '#656565',
    },
});
