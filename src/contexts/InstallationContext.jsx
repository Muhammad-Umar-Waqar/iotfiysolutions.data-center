import { createContext, useContext, useState } from "react";

const InstallationContext = createContext();

export const InstallationProvider = ({ children }) => {
  const [selectedDataCenter, setSelectedDataCenter] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedRack, setSelectedRack] = useState(null);
  const [selectedAcKit, setSelectedAcKit] = useState(null);
  const [selectedRackCluster, setSelectedRackCluster] = useState(null);

  console.log(selectedDataCenter," + " , selectedHub," + ", selectedRack ," + ",selectedAcKit, " + ",   " + ", selectedRackCluster)

  return (
    <InstallationContext.Provider
      value={{
        selectedDataCenter,
        setSelectedDataCenter,
        selectedHub,
        setSelectedHub,
        selectedRack,
        setSelectedRack,
        selectedAcKit,
        setSelectedAcKit,
        selectedRackCluster,
        setSelectedRackCluster,
      }}
    >
      {children}
    </InstallationContext.Provider>
  );
};

export const useInstallation = () => useContext(InstallationContext);
