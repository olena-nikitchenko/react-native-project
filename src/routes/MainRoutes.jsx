import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import CommentsScreen from '../Screens/CommentsScreen';
import HomeRoutes from './HomeRoutes';
import MapScreen from '../Screens/MapScreen';
import CreateHeader from '../Components/CreateHeader';

const MainStack = createStackNavigator();

const MainRoutes = () => (
    <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Home" component={HomeRoutes} />
        <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{ title: 'Коментарі', ...CommentsScreenHeaderOption }}
        />
        <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={{ title: 'Мапа', ...mapScreenHeaderOption }}
        />
    </MainStack.Navigator>
);

const CommentsScreenHeaderOption = {
    headerShown: true,
    header: ({ navigation, route, options }) => (
        <CreateHeader navigation={navigation} route={route} options={options} to={'User'} />
    ),
};

const mapScreenHeaderOption = {
    headerShown: true,
    header: ({ navigation, route, options }) => (
        <CreateHeader navigation={navigation} route={route} options={options} to={'User'} />
    ),
};

export default MainRoutes;
