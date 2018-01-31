/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  state = {
    userLocation: null,
    usersPlaces: [],
  }
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      });
      fetch('http://reactive-app-1517300228879.firebaseio.com/places.json', {
          method:'POST',
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude, 
          }),
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    
    }, error => { console.log(error) });
  };

  getUsersLocations = () => {
    fetch('http://reactive-app-1517300228879.firebaseio.com/places.json')
      .then(res => res.json()).then(parsedRes => {
        console.log(parsedRes);
        const placesArray = [];
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          })
        }
        this.setState({
          usersPlaces: placesArray
        });
        console.log(this.state.usersPlaces);
      })
    .catch(err => console.log(err));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button title="Get Users Places" onPress={this.getUsersLocations} />
        </View>
        <UsersMap userLocation={this.state.userLocation} usersPlaces={this.state.usersPlaces}/>  
        <FetchLocation onGetLocation={this.getUserLocationHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
  },
});
