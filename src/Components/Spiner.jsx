import { StyleSheet, View, Image } from 'react-native';
import image from '../assets/images/spinner-circular.gif';

const Spinner = () => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.icon} />
        </View>
    );
};

export default Spinner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        tintColor: '#FF6C00',
        objectFit: 'contain',
        width: 50,
        height: 50,
    },
});
