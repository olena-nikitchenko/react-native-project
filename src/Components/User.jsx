import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { selectStateLogin, selectStateAvatar, selectStateEmail } from '../redux/auth/selectors';
const User = () => {
    const login = useSelector(selectStateLogin);
    const avatar = useSelector(selectStateAvatar);
    const email = useSelector(selectStateEmail);

    const avatarUser = avatar;

    return (
        <TouchableOpacity style={styles.container} disabled={true}>
            <Image src={avatarUser} style={styles.photo} />
            <View>
                <Text style={styles.title}>{login}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    photo: {
        width: 60,
        height: 60,
        borderRadius: 16,
    },
    title: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 13,
        lineHeight: 15,
    },
    email: {
        marginTop: -4,
        color: '#212121cc',
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 13,
    },
});

export default User;
