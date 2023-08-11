import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';

const CreateHeader = ({ navigation, route, options, to }) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <View style={styles.hedder}>
            <Feather
                name="arrow-left"
                size={24}
                style={styles.icon}
                onPress={() => onNavigate(navigation, to)}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

function onNavigate(navigation, to) {
    if (to === 'User') return navigation.navigate('User');
    else return navigation.navigate('Publications');
}

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
    icon: {
        marginLeft: 16,
        color: '#212121',
        position: 'absolute',
        left: 8,
        bottom: 12,
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
});

export default CreateHeader;
