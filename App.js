import React from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Main from './src/routes/Main';

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <Provider store={store}>
                    <Main />
                </Provider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
