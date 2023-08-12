import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';

const PublicationsHeader = ({ navigation, route, options }) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <View style={styles.hedder}>
            <Text style={styles.title}>{title}</Text>
            <Feather
                name="log-out"
                size={24}
                onPress={() => navigation.navigate('Login')}
                style={styles.exitBtn}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    hedder: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        position: 'relative',
        paddingTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#b3b3b3',
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: 22,
        textAlign: 'center',
        letterSpacing: -0.408,
        color: '#212121',
    },
    exitBtn: {
        marginLeft: 16,
        color: '#BDBDBD',
        position: 'absolute',
        right: 16,
        bottom: 12,
        color: '#BDBDBD',
    },
});

export default PublicationsHeader;
