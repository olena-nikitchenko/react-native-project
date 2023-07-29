import { View, StyleSheet, FlatList } from 'react-native';
import User from '../Components/User';

const PostsScreen = () => {
	return (
		<View style={styles.container}>
			<User/>
			<FlatList
					showsVerticalScrollIndicator={false}
			></FlatList>
		</View>
	);
};

export default PostsScreen;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		alignItems: 'flex-start',
		paddingHorizontal: 16,
		paddingVertical: 32,
		gap: 16,
		backgroundColor: '#FFFFFF',
	},
});
