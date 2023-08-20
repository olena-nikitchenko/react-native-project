import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { Alert } from 'react-native';
import { auth } from '../../firebase/config';
import { authSlice } from './authSlice';
const { updateUserProfile, authStateChange, authSignOut, updateIsLoading } = authSlice.actions;

export const authSignUpUser =
    ({ name, email, password, avatar }) =>
    async dispatch => {
        try {
            dispatch(updateIsLoading({ isLoading: true }));
            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: avatar,
            });

            const { uid, displayName, photoURL } = await auth.currentUser;

            dispatch(
                updateUserProfile({
                    userId: uid,
                    name: displayName,
                    email,
                    avatar: photoURL,
                    isCurrentUser: true,
                })
            );
            Alert.alert(`Welcome to app "${displayName}"`);
            dispatch(updateIsLoading({ isLoading: false }));
        } catch (error) {
            dispatch(updateIsLoading({ isLoading: false }));
            Alert.alert(error.message);
            console.log('error.message', error.message);
        }
    };

export const authSignInUser =
    ({ email, password }) =>
    async dispatch => {
        try {
            dispatch(updateIsLoading({ isLoading: true }));
            const { user } = await signInWithEmailAndPassword(auth, email, password);

            const { displayName, photoURL, uid } = user;

            dispatch(
                updateUserProfile({
                    userId: uid,
                    name: displayName,
                    email,
                    avatar: photoURL,
                    isCurrentUser: true,
                })
            );
            Alert.alert(`Welcome to app "${displayName}"`);
            dispatch(updateIsLoading({ isLoading: false }));
        } catch (error) {
            dispatch(updateIsLoading({ isLoading: false }));
            Alert.alert(`Invalid email or password`);
            console.log('error.message', error.message);
        }
    };

export const authSignOutUser = () => async dispatch => {
    try {
        dispatch(updateIsLoading({ isLoading: true }));
        await signOut(auth);
        dispatch(authSignOut());
        dispatch(updateIsLoading({ isLoading: false }));
        Alert.alert(`Sign-out successful`);
    } catch (error) {
        dispatch(updateIsLoading({ isLoading: false }));
        Alert.alert(error.message);
        console.log('error', error.message);
    }
};

export const authStateChangeUser = () => async dispatch => {
    onAuthStateChanged(auth, user => {
        dispatch(updateIsLoading({ isLoading: true }));
        if (user) {
            const { uid, displayName, email, photoURL } = user;
            dispatch(
                updateUserProfile({
                    userId: uid,
                    name: displayName,
                    email: email,
                    avatar: photoURL,
                    isCurrentUser: true,
                })
            );
            dispatch(authStateChange({ stateChange: true }));
        }
        dispatch(updateIsLoading({ isLoading: false }));
    });
};
