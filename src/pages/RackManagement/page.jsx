// // src/pages/RackManagement/page.jsx
// import "../../styles/pages/management-pages.css";
// import AddRack from "./AddRack";
// import RackList from "./RackList";
// import { useInstallation } from "../../contexts/InstallationContext";

// const RackManagement = () => {
//   const { selectedRack, setSelectedRack, selectedDataCenter, selectedHub } = useInstallation();

//   const handleRackSelect = (rack) => {
//     setSelectedRack(rack); // optional: track selected rack for future editing
//   };

//   const handleOutsideClick = () => {
//     setSelectedRack(null);
//   };

//   return (
//     <div
//       className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
//       onClick={handleOutsideClick}
//     >
//       <div className="flex flex-col lg:flex-row h-full w-full">

//         {/* Rack List */}
//         <RackList
//           selectedRack={selectedRack}
//           onRackSelect={handleRackSelect}
//         />

//         <div className="hidden lg:block bg-[#E5E7EB]" />

//         {/* Add Rack Form */}
//         <AddRack
//           disabled={!selectedDataCenter || !selectedHub}
//         />

//       </div>
//     </div>
//   );
// };





// export default RackManagement;


// Adding UI Fixes and Updating List
// src/pages/RackManagement/page.jsx
import "../../styles/pages/management-pages.css";
import AddRack from "./AddRack";
import RackList from "./RackList";
import { useInstallation } from "../../contexts/InstallationContext";

const RackManagement = ({ onNext, onBack }) => {
  const { selectedRack, setSelectedRack, selectedDataCenter, selectedHub } = useInstallation();

  const handleRackSelect = (rack) => {
    setSelectedRack(rack); // installation selection
  };

  // const handleOutsideClick = () => {
  //   setSelectedRack(null);
  // };


  const handleOutsideClick = (e) => {
  // do not clear selection when clicking inside children
  if (e && e.target !== e.currentTarget) return;
  setSelectedRack(null);
};


  return (
    <div
      className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">
        {/* Rack List */}
        <RackList
          selectedRack={selectedRack}
          onRackSelect={handleRackSelect}
        />

        <div className="hidden lg:block bg-[#E5E7EB]" />

        {/* Add Rack Form — forward the navigation handlers */}
        <AddRack disabled={!selectedDataCenter || !selectedHub} onNext={onNext} onBack={onBack} />
      </div>
    </div>
  );
};

export default RackManagement;
