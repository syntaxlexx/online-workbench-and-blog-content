"use client";

import { FC, useEffect } from "react";

interface Props {}

const UserCurrentLocation: FC<Props> = ({}) => {
  useEffect(() => {
    const fetchUserLocation = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("pos", pos);
      });
    };

    fetchUserLocation();
  }, []);

  return <div></div>;
};

export default UserCurrentLocation;
