import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import { selectIsCurrentUser, selectIsLoading } from '../redux/auth/selectors';
import { authStateChangeUser } from '../redux/auth/authOperations';
import MainRoutes from '../routes/MainRoutes';
import AuthNav from '../routes/AuthNav';
import Loader from '../Components/Loader';

export default function Main() {
    const isCurrentUser = useSelector(selectIsCurrentUser);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isCurrentUser) return;
        dispatch(authStateChangeUser());
    }, []);

    const [fontsLoaded] = useFonts({
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            {isLoading && <Loader iconSize={120} />}
            {isCurrentUser ? <MainRoutes /> : <AuthNav />}
        </NavigationContainer>
    );
}
