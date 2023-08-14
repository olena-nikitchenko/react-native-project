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
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CommentsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.image} source={require('../assets/images/sea.jpg')} />
                </View>
                <View style={styles.commentsWrapper}>
                    <View style={styles.userComment}>
                        <Image
                            style={styles.userImage}
                            source={require('../assets/images/userPhotoComment.jpg')}
                        />
                        <View style={styles.commentContent}>
                            <Text style={styles.commentText}>
                                Really love your most recent photo. I’ve been trying to capture the
                                same thing for a few months and would love some tips!.
                            </Text>
                            <Text style={styles.commentDate}>09 червня, 2020 | 08:40</Text>
                        </View>
                    </View>
                    <View style={styles.userComment}>
                        <View style={[styles.commentContent, styles.commentContentAnswer]}>
                            <Text style={styles.commentText}>
                                A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                                primes as they tend to get a bit sharper images.
                            </Text>
                            <Text style={styles.commentDate}>09 червня, 2020 | 09:14</Text>
                        </View>
                        <Image
                            style={styles.userImage}
                            source={require('../assets/images/userPhotoComment2.jpg')}
                        />
                    </View>
                    <View style={styles.userComment}>
                        <Image
                            style={styles.userImage}
                            source={require('../assets/images/userPhotoComment.jpg')}
                        />
                        <View style={styles.commentContent}>
                            <Text style={styles.commentText}>
                                Thank you! That was very helpful!
                            </Text>
                            <Text style={styles.commentDate}>09 червня, 2020 | 09:20</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TextInput placeholder="Коментувати..." style={styles.input} />
                </View>
                <TouchableOpacity activeOpacity={0.6} style={styles.btnComment}>
                    <Ionicons name="md-arrow-up-circle-sharp" size={34} color="#FF6C00" />
                </TouchableOpacity>
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
        marginHorizontal: 38,
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
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        borderRadius: 100,
        height: 50,
        marginHorizontal: 24,
        marginTop: 7,
        paddingLeft: 16,
        textAlign: 'left',
        fontSize: 16,
        lineHeight: 19,
        color: '#BDBDBD',
        fontFamily: 'Roboto-Medium',
    },
    btnComment: {
        position: 'absolute',
        bottom: 2,
        right: 30,
    },
});

export default CommentsScreen;
