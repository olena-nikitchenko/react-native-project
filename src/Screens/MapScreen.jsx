import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

const MapScreen = ({ route }) => {
    const [mapType, setMapStyle] = useState('standard');
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (route.params) {
            setLocation(route.params.location);
        }
    }, []);

    const coordinate = location ? location : { latitude: 0, longitude: 0 };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={{
                    ...location,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
                mapType={mapType}
                provider="google"
                minZoomLevel={1}
            >
                {location && (
                    <Marker title="Я зараз тут" coordinate={coordinate} description="Привіт" />
                )}
            </MapView>
            <TouchableOpacity
                style={styles.mapType}
                onPress={() => setMapStyle(prev => (prev === 'hybrid' ? 'standard' : 'hybrid'))}
            >
                <Text style={styles.mapTypeText}>Змінити тип карти</Text>
                <MaterialIcons name="satellite" size={35} style={styles.mapIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
    },
    mapType: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        justifyContent: 'flex-start',
    },
    mapTypeText: {
        textDecorationLine: 'underline',
    },
    mapIcon: {
        color: '#BDBDBD',
    },
});

export default MapScreen;
