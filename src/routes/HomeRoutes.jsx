import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePostsScreen from '../Screens/CreatePostsScreen';
import PostsScreen from '../Screens/PostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CreateHeader from '../Components/CreateHeader';
import PublicationsHeader from '../Components/PublicationsHeader';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import data from '../data/StoryData.json';

const Tabs = createBottomTabNavigator();

const HomeRoutes = () => (
    <Tabs.Navigator screenOptions={homeScreenOptions}>
        <Tabs.Screen
            name="Publications"
            component={PostsScreen}
            options={{ title: 'Публікації', ...PublicationsHeaderOption }}
        />
        <Tabs.Screen
            name="Create"
            component={CreatePostsScreen}
            options={{
                title: 'Створити публікацію',
                ...CreateHeaderOption,
                tabBarStyle: styles.tabBarHidden,
                unmountOnBlur: true,
            }}
        />
        <Tabs.Screen
            name="User"
            component={ProfileScreen}
            initialParams={{ data }}
            options={{ title: 'Користувачі', headerShown: false }}
        />
    </Tabs.Navigator>
);

const CreateHeaderOption = {
    headerShown: true,
    header: ({ navigation, route, options }) => (
        <CreateHeader navigation={navigation} route={route} options={options} />
    ),
};

const PublicationsHeaderOption = {
    headerShown: true,
    header: ({ navigation, route, options }) => (
        <PublicationsHeader navigation={navigation} route={route} options={options} />
    ),
};

const homeScreenOptions = ({ route }) => ({
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBarHomeScreen,

    tabBarIcon: ({ focused }) => {
        if (route.name === 'Create') {
            return (
                <View style={[styles.overlay, focused && styles.focusedIcon]}>
                    <Feather
                        name="plus"
                        size={24}
                        style={[styles.plusIcon, focused && styles.focusedPlusIcon]}
                    />
                </View>
            );
        } else if (route.name === 'User') {
            return (
                <Feather
                    name="user"
                    size={24}
                    style={[styles.icon, focused && styles.focusedIcon]}
                />
            );
        } else if (route.name === 'Publications') {
            return (
                <MaterialIcons
                    name="grid-view"
                    size={24}
                    style={[styles.icon, focused && styles.focusedIcon]}
                />
            );
        }
    },
});

const styles = StyleSheet.create({
    overlay: {
        width: 70,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
    },
    focusedOverlay: {
        backgroundColor: '#FF6C00',
    },
    plusIcon: {
        color: '#212121cc',
    },
    focusedPlusIcon: {
        color: 'white',
    },

    icon: { color: '#212121cc' },
    focusedIcon: {
        color: '#FF6C00',
    },
    tabBarHidden: {
        display: 'none',
    },
    tabBarHomeScreen: {
        paddingHorizontal: 82,
    },
});

export default HomeRoutes;
