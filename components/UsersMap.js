import React from 'react';
import { View, StyleSheet } from 'react-native';


import MapView from 'react-native-maps';

const usersMap = props => {
    return (
        <View>
        <MapView
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        />
        </View>
    );
}

export default usersMap;