import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CommentsScreen = () => {
    const commentsData = [
        {
            id: '1',
            userImage: require('../assets/images/userPhotoComment.jpg'),
            commentText:
                ' Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!.',
            commentDate: '09 червня, 2020 | 08:40',
        },
        {
            id: '2',
            userImage: require('../assets/images/userPhotoComment2.jpg'),
            commentText:
                ' A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
            commentDate: '09 червня, 2020 | 09:14',
        },
        {
            id: '3',
            userImage: require('../assets/images/userPhotoComment.jpg'),
            commentText: 'Thank you! That was very helpful!',
            commentDate: '09 червня, 2020 | 09:20',
        },
    ];

    const renderCommentItem = ({ item }) => (
        <View style={styles.userComment}>
            <Image style={styles.userImage} source={item.userImage} />
            <View
                style={[
                    styles.commentContent,
                    item.id === '2' ? styles.commentContentAnswer : null,
                ]}
            >
                <Text style={styles.commentText}>{item.commentText}</Text>
                <Text style={styles.commentDate}>{item.commentDate}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <View>
                    <Image style={styles.image} source={require('../assets/images/sea.jpg')} />
                </View>
                <FlatList
                    data={commentsData}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.commentsWrapper}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Коментувати..." style={styles.input} />
                    <TouchableOpacity activeOpacity={0.6} style={styles.btnComment}>
                        <Ionicons name="md-arrow-up-circle-sharp" size={34} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 240,
    },
    userImage: {
        width: 28,
        height: 28,
    },

    commentsWrapper: {
        alignItems: 'center',
        marginTop: 32,
    },
    userComment: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    commentContent: {
        backgroundColor: '#E8E8E8',
        marginLeft: 16,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        width: 299,
    },
    commentContentAnswer: {
        marginLeft: 0,
        marginRight: 16,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 0,
    },

    commentText: {
        fontSize: 13,
        lineHeight: 18,
        color: '#212121',
        fontFamily: 'Roboto-Regular',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    commentDate: {
        fontFamily: 'Roboto-Regular',
        color: '#BDBDBD',
        lineHeight: 12,
        fontSize: 10,
        textAlign: 'right',
        marginRight: 16,
        marginBottom: 16,
    },
    inputContainer: {
        position: 'relative',
        paddingHorizontal: 16,
        marginBottom: 8,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        borderRadius: 100,
        height: 50,
        paddingLeft: 16,
        fontSize: 16,
        lineHeight: 19,
        color: '#BDBDBD',
        fontFamily: 'Roboto-Medium',
    },
    btnComment: {
        position: 'absolute',
        right: 30,
    },
    icon: {
        color: '#FF6C00',
    },
});

export default CommentsScreen;
