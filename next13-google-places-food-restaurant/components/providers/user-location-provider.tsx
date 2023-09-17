"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface UserLocation {
  lng: number;
  lat: number;
}

export const UserLocationContext = createContext<{
  location: UserLocation | null;
  setLocation: Dispatch<SetStateAction<UserLocation | null>> | null;
}>({ location: null, setLocation: null });

interface Props {
  children: ReactNode;
}

const UserLocationProvider: FC<Props> = ({ children }) => {
  const [location, setLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    const fetchUserLocation = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
        });
      });
    };

    fetchUserLocation();
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationProvider;
