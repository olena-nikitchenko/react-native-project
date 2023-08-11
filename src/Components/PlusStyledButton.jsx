import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PlusStyledButton = ({ onPress, isActive = false }) => {
    return (
        <TouchableOpacity
            style={[styles.btnFrame, isActive && styles.btnFrameActive]}
            onPress={onPress}
        >
            <AntDesign
                name="plus"
                size={19}
                style={[styles.BtnIcon, isActive && styles.BtnIconActive]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnFrame: {
        position: 'absolute',
        width: 25,
        height: 25,
        right: -11,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FF6C00',
        top: 81,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnFrameActive: {
        borderColor: '#E8E8E8',
        backgroundColor: '#FFFFFF',
    },
    BtnIcon: {
        color: '#FF6C00',
    },
    BtnIconActive: { transform: [{ rotate: '45deg' }], color: '#E8E8E8' },
});

export default PlusStyledButton;
