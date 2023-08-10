import React from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native';
// import RegistrationScreen from './src/Screens/RegistrationScreen';
// import LoginScreen from "./src/Screens/LoginScreen";
// import PostsScreen from "./src/Screens/PostsScreen";
import CreatePostsScreen from './src/Screens/CreatePostsScreen';
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    });

    const onLayoutRootView = React.useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            {/* <RegistrationScreen /> */}
            {/* <LoginScreen />  */}
            {/* <PostsScreen/>   */}
            <CreatePostsScreen />
        </SafeAreaView>
    );
}
