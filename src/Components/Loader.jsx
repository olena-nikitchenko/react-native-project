import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { View, StyleSheet } from 'react-native';

export default function Loader() {
    return (
        <View style={styles.loaderWrap}>
            <Animatable.View animation="rubberBand" iterationCount="infinite" duration={1500}>
                <FontAwesome name="spinner" size={100} color="#FF6C00" />
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    loaderWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
