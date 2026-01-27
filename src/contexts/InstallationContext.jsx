// import { createContext, useContext, useState } from "react";

// const InstallationContext = createContext();

// export const InstallationProvider = ({ children }) => {
//   const [selectedDataCenter, setSelectedDataCenter] = useState(null);
//   const [selectedHub, setSelectedHub] = useState(null);
//   const [selectedRack, setSelectedRack] = useState(null);
//   const [selectedAcKit, setSelectedAcKit] = useState(null);
//   const [selectedRackCluster, setSelectedRackCluster] = useState(null);

//   console.log(selectedDataCenter," + " , selectedHub," + ", selectedRack ," + ",selectedAcKit, " + ",   " + ", selectedRackCluster)

//   return (
//     <InstallationContext.Provider
//       value={{
//         selectedDataCenter,
//         setSelectedDataCenter,
//         selectedHub,
//         setSelectedHub,
//         selectedRack,
//         setSelectedRack,
//         selectedAcKit,
//         setSelectedAcKit,
//         selectedRackCluster,
//         setSelectedRackCluster,
//       }}
//     >
//       {children}
//     </InstallationContext.Provider>
//   );
// };

// export const useInstallation = () => useContext(InstallationContext);







// // src/contexts/InstallationContext.jsx
// import React, { createContext, useState, useContext } from "react";

// const InstallationContext = createContext();

// export const InstallationProvider = ({ children }) => {
//   const [selectedDataCenter, setSelectedDataCenter] = useState(null);
//   const [selectedHub, setSelectedHub] = useState(null);
//   const [selectedRack, setSelectedRack] = useState(null);
//   const [selectedAckit, setSelectedAckit] = useState(null);
//   const [selectedRackCluster, setSelectedRackCluster] = useState(null);

//   const resetInstallation = () => {
//     setSelectedDataCenter(null);
//     setSelectedHub(null);
//     setSelectedRack(null);
//     setSelectedAckit(null);
//     setSelectedRackCluster(null);
//   };

//   const value = {
//     selectedDataCenter, setSelectedDataCenter,
//     selectedHub, setSelectedHub,
//     selectedRack, setSelectedRack,
//     selectedAckit, setSelectedAckit,
//     selectedRackCluster, setSelectedRackCluster,
//     resetInstallation,
    
//   };

//   return (
//     <InstallationContext.Provider value={value}>
//       {children}
//     </InstallationContext.Provider>
//   )
// };

// export const useInstallation = () => {
//   const ctx = useContext(InstallationContext);
//   if (!ctx) throw new Error("useInstallation must be used inside InstallationProvider");
//   return ctx;
// };







// src/contexts/InstallationContext.jsx
import React, { createContext, useContext, useState } from "react";

const InstallationContext = createContext();

export const InstallationProvider = ({ children }) => {
  const [selectedDataCenter, setSelectedDataCenter] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedRack, setSelectedRack] = useState(null);

  // ✅ FIXED NAMING (MATCH YOUR APP)
  const [selectedAcKit, setSelectedAcKit] = useState(null);

  const [selectedRackCluster, setSelectedRackCluster] = useState(null);

  const resetInstallation = () => {
    setSelectedDataCenter(null);
    setSelectedHub(null);
    setSelectedRack(null);
    setSelectedAcKit(null);
    setSelectedRackCluster(null);
  };

  return (
    <InstallationContext.Provider
      value={{
        selectedDataCenter,
        setSelectedDataCenter,

        selectedHub,
        setSelectedHub,

        selectedRack,
        setSelectedRack,

        // ✅ EXPOSE THESE
        selectedAcKit,
        setSelectedAcKit,

        selectedRackCluster,
        setSelectedRackCluster,

        resetInstallation,
      }}
    >
      {children}
    </InstallationContext.Provider>
  );
};

export const useInstallation = () => {
  const ctx = useContext(InstallationContext);
  if (!ctx) {
    throw new Error(
      "useInstallation must be used within InstallationProvider"
    );
  }
  return ctx;
};
