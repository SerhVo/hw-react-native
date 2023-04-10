import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route, navigation }) => {
    const [location, setLocation] = useState({});

    useEffect(() => {
        if (route.params) {
            setLocation({
                latitude: route.params.latitude,
                longitude: route.params.longitude,
            });
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            {location && (
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                >
                    <Marker
                        title="You are here"
                        coordinate={location}
                        description="Your current location"
                    />
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
