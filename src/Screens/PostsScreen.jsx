import { View, StyleSheet, FlatList } from 'react-native';
import User from '../Components/User';
import data from '../data/PostData.json';
import PostItem from '../Components/PostItem';

const PostsScreen = () => {
    const renderItem = ({ item }) => (
        <PostItem
            photo={item.photoName}
            description={item.description}
            comments={item.comments}
            place={item.place}
        />
    );
    return (
        <View style={styles.container}>
            <User style={styles.user} />
            <FlatList
                data={data}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            ></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 32,
        gap: 16,
        backgroundColor: '#FFFFFF',
    },
    user: {
        alignItems: 'flex-start',
    },
});

export default PostsScreen;
