import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const MapScreen = () => {
    const [mapType, setMapStyle] = useState('standard');
    const params = useRoute();
    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={{
                    latitude: 48.9056841,
                    longitude: 24.7141352,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
                mapType={mapType}
                provider="google"
                minZoomLevel={1}
                onMapReady={() => console.log('Карта готова')}
                onRegionChange={() => console.log('Зміна регіону')}
            >
                <Marker
                    title="Ліс у Івано-Франківську"
                    coordinate={{ latitude: 48.9056841, longitude: 24.7141352 }}
                    description="Гарний ліс в Івано-Франківську"
                />
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
