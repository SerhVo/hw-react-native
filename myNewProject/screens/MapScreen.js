import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ navigation }) => {

    <View style={styles.container}>
                 <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
            >
            </MapView>
           </View> 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
