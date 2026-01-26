// // src/pages/AckitManagement/page.jsx
// import "../../styles/pages/management-pages.css";
// import AddAckit from "./AddAckit";
// import AckitList from "./AckitList";
// import { useInstallation } from "../../contexts/InstallationContext";

// const AckitManagement = () => {

//     const {
//     selectedAcKit,
//     setSelectedAcKit,
//   } = useInstallation();

//   const handleAckitSelect = (ackit) => {
//     setSelectedAcKit(ackit);
//   };

//   const handleOutsideClick = () => {
//     setSelectedAcKit(null);
//   };


//   return (
//     <div className="organization-management-container flex bg-white rounded-[20px] w-full h-full" 
//     onClick={handleOutsideClick}
//     >
//       <div className="flex flex-col lg:flex-row h-full w-full">
//         <AckitList 
//         selectedAcKit={selectedAcKit}
//           onAckitSelect={handleAckitSelect}/>
//         <div className="hidden lg:block bg-[#E5E7EB]" />
//         <AddAckit />
//       </div>
//     </div>
//   );
// };

// export default AckitManagement;




// Adding UI Fixes and Updating List

// src/pages/AckitManagement/page.jsx
import "../../styles/pages/management-pages.css";
import AddAckit from "./AddAckit";
import AckitList from "./AckitList";
import { useInstallation } from "../../contexts/InstallationContext";

const AckitManagement = ({ onNext, onBack }) => {
  const { selectedAcKit, setSelectedAcKit } = useInstallation();

  const handleAckitSelect = (ackit) => {
    setSelectedAcKit(ackit);
  };

  const handleOutsideClick = () => {
    setSelectedAcKit(null);
  };

  return (
    <div
      className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">
        <AckitList selectedAcKit={selectedAcKit} onAckitSelect={handleAckitSelect} />

        <div className="hidden lg:block bg-[#E5E7EB]" />

        {/* forward navigation handlers to the Add form */}
        <AddAckit onNext={onNext} onBack={onBack} />
      </div>
    </div>
  );
};

export default AckitManagement;
