import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default () => {
  const [location, setLocation] = useState();
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.log("Location permission not granted!");
        return;
      }

      const lastKnownPosition = await Location.getLastKnownPositionAsync();
      if (!lastKnownPosition) {
        return;
      }

      const { latitude, longitude } = lastKnownPosition.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
