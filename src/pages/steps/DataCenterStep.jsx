// // /DataCenterStep.jsx



// import { useInstallation } from "../../contexts/InstallationContext";
// import DataCenterManagement from "../OrganizationManagement/page";

// const DataCenterStep = ({ onNext }) => {
//   const { selectedDataCenter } = useInstallation();

//   return (
//     <div className="h-full flex flex-col">

//       {/* Your existing page */}
//       <div className="flex-1">
//         <DataCenterManagement />
//       </div>

//       {/* Footer */}
//       <div className="mt-1 flex justify-end">
//         <button
//           onClick={onNext}
//           disabled={!selectedDataCenter}
//           className={`px-6 py-2 rounded-md text-white ${
//             selectedDataCenter
//               ? "bg-blue-600"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Next → Hubs
//         </button>
//       </div>
//    </div>
//   );
// };

// export default DataCenterStep;





// Trying to Add Move on Next when CLicking on next
// src/pages/Installation/DataCenterStep.jsx
// import React from "react"
// import DataCenterList from "../OrganizationManagement/DataCenterList";
// import { useInstallation } from "../../contexts/InstallationContext";
// import AddDataCenter from "../OrganizationManagement/AddDataCenter";

// /**
//  * DataCenterStep — shows list + add form and uses AddDataCenter's internal Next/Back buttons
//  * Props:
//  *  - onNext: function() -> go to next step
//  *  - onBack: function() -> go to previous step (usually not used on first step)
//  */
// const DataCenterStep = ({ onNext, onBack }) => {
//   // keep reference to selectedDataCenter from context
//   const { selectedDataCenter } = useInstallation();

//   return (
//     <div className="h-auto lg:h-full flex flex-col gap-4 ">
//       <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full ">
//         {/* Left: List */}
//         <div className="w-full h-full">
//           <DataCenterList />
//         </div>

//         {/* Right: Add / Edit form (contains Next/Back) */}
//         <div className="w-full h-full">
//           <AddDataCenter onNext={onNext} onBack={onBack} />
//         </div>
//       </div>

//       {/* compact mobile hint below (optional) */}
//       {/* <div className="md:hidden text-center text-sm text-gray-500"> */}
//         {/* {selectedDataCenter ? `Selected: ${selectedDataCenter.name}` : "Select or add a Data Center to proceed."} */}
//       {/* </div> */}
//     </div>
//   );
// };

// export default DataCenterStep;




import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
import DataCenterList from "../OrganizationManagement/DataCenterList";
import AddDataCenter from "../OrganizationManagement/AddDataCenter";

const DataCenterStep = ({ onNext, onBack }) => {
  return (
    <ManagementSplitLayout
      ListComponent={<DataCenterList />}
      FormComponent={<AddDataCenter onNext={onNext} onBack={onBack} />}
    />
  );
};

export default DataCenterStep;
