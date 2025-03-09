import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Region, Marker } from 'react-native-maps';
import { StorageKeys, StorageUtility } from '~/utils/asyncStorageUtil';

export type MapProps = {
  query: string;
};

const Map = (props: MapProps) => {
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerLocation, setMarkerLocation] = useState<{
    latitude: number;
    longitude: number;
    title: string;
    description: string;
  } | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    // Get user's current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(userRegion);
      // Initially set marker to user's location
      setMarkerLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        title: 'Current Location',
        description: 'Your current location',
      });
    })();
  }, []);

  useEffect(() => {
    if (props.query) {
      // Search for the location using query
      searchLocation(props.query);
    }
  }, [props.query]);

  const searchLocation = async (locationQuery: string) => {
    try {
      const geocodeResult = await Location.geocodeAsync(locationQuery);

      if (geocodeResult.length > 0) {
        const { latitude, longitude } = geocodeResult[0];

        // Update the region
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        setRegion(newRegion);

        // Update marker position
        setMarkerLocation({
          latitude,
          longitude,
          title: locationQuery,
          description: `Search result for: ${locationQuery}`,
        });

        // Animate to the new region
        mapRef.current?.animateToRegion(newRegion, 1000);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleMapPress = (event: { nativeEvent: { coordinate: any } }) => {
    const { coordinate } = event.nativeEvent;

    // Update marker position on map press
    setMarkerLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      title: 'Selected Location',
      description: `Lat: ${coordinate.latitude.toFixed(4)}, Lng: ${coordinate.longitude.toFixed(4)}`,
    });

    // Optionally, perform reverse geocoding to get location name
    reverseGeocode(coordinate.latitude, coordinate.longitude);
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const addressResult = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResult && addressResult.length > 0) {
        const location = addressResult[0];
        const addressParts = [];

        if (location.street) addressParts.push(location.street);
        if (location.city) addressParts.push(location.city);
        if (location.region) addressParts.push(location.region);
        if (location.country) addressParts.push(location.country);

        const address = addressParts.join(', ');

        setMarkerLocation((prev) =>
          prev
            ? {
                ...prev,
                title: address || 'Selected Location',
                description: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
              }
            : null
        );
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ ...StyleSheet.absoluteFillObject }}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={handleMapPress}>
        {markerLocation && (
          <Marker
            coordinate={{
              latitude: markerLocation.latitude,
              longitude: markerLocation.longitude,
            }}
            title={markerLocation.title}
            description={markerLocation.description}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
