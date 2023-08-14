import React from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UserPhoto from '../Components/UserPhoto';
import StoryCard from '../Components/StoryCard';
import data from '../data/StoryData.json';

const ProfileScreen = () => {
    const renderItem = ({ item }) => (
        <StoryCard
            image={item.imageName}
            title={item.title}
            comments={item.comments}
            likes={item.likes}
            location={item.location}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../assets/images/background.jpg')}
                style={styles.image}
            />
            <View style={styles.view}>
                <View>
                    <View style={styles.viewUserPhoto}>
                        <UserPhoto />
                    </View>
                    <ExitBtn />
                    <Text style={styles.name}>Natali Romanova</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

function ExitBtn() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Feather name="log-out" size={24} style={styles.exitBtn} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        resizeMode: 'cover',
        height: 900,
        flex: 1,
    },
    name: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 0.01,
        color: '#212121',
        marginTop: -32,
    },
    view: {
        marginTop: 163,
        minHeight: 450,
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 0,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 43,
        gap: 32,
    },
    viewUserPhoto: { alignItems: 'center' },
    exitBtn: {
        position: 'absolute',
        right: 0,
        top: -100,
        color: '#BDBDBD',
    },
    postsWrapper: {
        marginTop: 16,
    },
});

export default ProfileScreen;
