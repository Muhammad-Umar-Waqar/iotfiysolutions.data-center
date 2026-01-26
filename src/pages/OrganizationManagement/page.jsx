// // export default DataCenterManagement;
// import { useState } from 'react';
// import "../../styles/pages/management-pages.css"
// import AddDataCenter from './AddDataCenter';
// import DataCenterList from './DataCenterList';

// const DataCenterManagement = () => {
//   // const [selectedOrganization, setSelectedOrganization] = useState(null);
//   const [selectedDataCenter, setSelectedDataCenter] = useState(null);

//   const handleDataCenterSelect = (organization) => {
//     setSelectedDataCenter(organization);
//   };

//   const handleOutsideClick = () => {
//     setSelectedDataCenter(null);
//   };

//   return (
//     <div 
//       className="MobileBackgroundChange organization-management-container md:h-full flex bg-white rounded-[20px] w-full h-full"
//       onClick={handleOutsideClick}
//     >
//       <div className="md:p-none p-[1rem]  flex flex-col lg:flex-row gap-2 lg:gap-0 h-full w-full rounded-[20px]  ">
//         <DataCenterList className="ListPage organization-list-section"
//           onDataCenterSelect={handleDataCenterSelect} 
//           selectedDataCenter={selectedDataCenter} 
//         />
//         {/* Center Divider */}
//         <div className="hidden lg:block  bg-[#E5E7EB]"></div>
        
//         {/* <AddOrganization className="AddPage organization-add-section" /> */}
//         <AddDataCenter className="AddPage organization-add-section"  />
//       </div>
//     </div>
//   );
// };

// export default DataCenterManagement;




// import { useState } from 'react';
// import "../../styles/pages/management-pages.css"
// import AddDataCenter from './AddDataCenter';
// import DataCenterList from './DataCenterList';

// const DataCenterManagement = () => {

//   const [selectedDataCenter, setSelectedDataCenter] = useState(null);

//   const handleDataCenterSelect = (organization) => {
//     setSelectedDataCenter(organization);
//   };

//   const handleOutsideClick = () => {
//     setSelectedDataCenter(null);
//   };

//   return (
//     <div 
//       className="MobileBackgroundChange organization-management-container md:h-full flex bg-white rounded-[20px] w-full h-full"
//       onClick={handleOutsideClick}
//     >
//       <div className="md:p-none p-[1rem]  flex flex-col lg:flex-row gap-2 lg:gap-0 h-full w-full rounded-[20px]  ">
//         <DataCenterList className="ListPage organization-list-section"
//           onDataCenterSelect={handleDataCenterSelect} 
//           selectedDataCenter={selectedDataCenter} 
//         />

//         <div className="hidden lg:block  bg-[#E5E7EB]"></div>
        
        
//         <AddDataCenter className="AddPage organization-add-section"  />
//       </div>
//     </div>
//   );
// };

// export default DataCenterManagement;







// import "../../styles/pages/management-pages.css";
// import AddDataCenter from "./AddDataCenter";
// import DataCenterList from "./DataCenterList";
// import { useInstallation } from "../../contexts/InstallationContext";


// const DataCenterManagement = () => {
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();

//   const handleDataCenterSelect = (dc) => {
//     setSelectedDataCenter(dc);
//   };

//   const handleOutsideClick = () => {
//     setSelectedDataCenter(null);
//   };

//   return (
//     <div
//       className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
//       onClick={handleOutsideClick}
//     >
//       <div className="flex flex-col lg:flex-row w-full h-full">

//         <DataCenterList
//           onDataCenterSelect={handleDataCenterSelect}
//           selectedDataCenter={selectedDataCenter}
//         />

//         <div className="hidden lg:block bg-[#E5E7EB]" />

//         <AddDataCenter />

//       </div>
//     </div>
//   );
// };

// export default DataCenterManagement;




// // Working on UI
// import "../../styles/pages/management-pages.css";
// import AddDataCenter from "./AddDataCenter";
// import DataCenterList from "./DataCenterList";
// import { useInstallation } from "../../contexts/InstallationContext";


// const DataCenterManagement = () => {
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();

//   const handleDataCenterSelect = (dc) => {
//     setSelectedDataCenter(dc);
//   };

//   const handleOutsideClick = () => {
//     setSelectedDataCenter(null);
//   };

//   return (
//     <div
//       className="flex bg-white rounded-[20px] w-full h-[65vh] md:h-[75vh] "
//       onClick={handleOutsideClick}
//     >
//       <div className="flex flex-col lg:flex-row w-full h-full">

//         <DataCenterList
//           onDataCenterSelect={handleDataCenterSelect}
//           selectedDataCenter={selectedDataCenter}
//         />

//         <div className="hidden lg:block bg-[#E5E7EB]" />

//         <AddDataCenter />

//       </div>
//     </div>
//   );
// };

// export default DataCenterManagement;


// Working on FIx UI Layout for scrolling lIsts
// Working on UI
import "../../styles/pages/management-pages.css";
import AddDataCenter from "./AddDataCenter";
import DataCenterList from "./DataCenterList";
import { useInstallation } from "../../contexts/InstallationContext";


const DataCenterManagement = () => {
  const { selectedDataCenter, setSelectedDataCenter } = useInstallation();

  const handleDataCenterSelect = (dc) => {
    setSelectedDataCenter(dc);
  };

  const handleOutsideClick = () => {
    setSelectedDataCenter(null);
  };

  return (
   // container
<div className="h-full flex flex-col gap-4">
  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 ">
    {/* Left: list column - ensure min-h-0 so inner overflow works */}
    <div className="w-full h-full min-h-0">
      <DataCenterList />
    </div>

    {/* Right: form column */}
    <div className="w-full h-full min-h-0">
      <AddDataCenter onNext={onNext} onBack={onBack} />
    </div>
  </div>
</div>

  );
};

export default DataCenterManagement;
