"use client";

import { Business } from "@/types";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type SelectedBusinessContextType = {
  selectedBusiness: Business | null;
  setSelectedBusiness: Dispatch<SetStateAction<Business | null>> | null;
};

export const SelectedBusinessContext =
  createContext<SelectedBusinessContextType>({
    selectedBusiness: null,
    setSelectedBusiness: null,
  });

interface Props {
  children: ReactNode;
}

const SelectedBusinessProvider: FC<Props> = ({ children }) => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );

  return (
    <SelectedBusinessContext.Provider
      value={{
        selectedBusiness,
        setSelectedBusiness,
      }}
    >
      {children}{" "}
    </SelectedBusinessContext.Provider>
  );
};

export default SelectedBusinessProvider;
