import React from 'react';
import { View, StyleSheet } from 'react-native';


import MapView from 'react-native-maps';

const usersMap = props => {
    let userLocationMarker = null;

    if (props.userLocation) {
        this.userLocationMarker = 
        <MapView.Marker coordinate={props.userLocation}/>
    }

    const usersMarkers = props.usersPlaces.map(userPlace => (<MapView.Marker coordinate={userPlace} key={userPlace.id} />));
    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4124,
                    latitudeDelta: 0.1922,
                    longitudeDelta: 0.1421,
                }}
                region={props.userLocation}      
                style={styles.map}
            >
                {this.userLocationMarker}
                {usersMarkers}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 400,
        backgroundColor: '#fff'
    },
    map: {
        width: '90%',
        height: '70%',
  },
})

export default usersMap;