import * as Location from 'expo-location';

export const getLocationAsync = () => {
  return new Promise((resolve, reject) => {
    Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, (loc) => {
      const { latitude, longitude, altitude } = loc.coords;
      resolve({ latitude, longitude, altitude });
    }) 
      .catch(error => reject(error)); 
  }); 
}




