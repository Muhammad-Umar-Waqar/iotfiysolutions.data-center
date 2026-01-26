// import { useInstallation } from "../../contexts/InstallationContext";

// const HubStep = ({ onBack }) => {
//   const { selectedDataCenter } = useInstallation();

//   return (
//     <div className="h-full flex flex-col">

//       <div className="p-4">
//         <h2 className="text-xl font-semibold">Hub Setup</h2>

//         {!selectedDataCenter && (
//           <div className="mt-4 p-3 bg-yellow-100 rounded">
//             Please select a Data Center first
//           </div>
//         )}

//         {selectedDataCenter && (
//           <div className="mt-4">
//             Selected Data Center:
//             <strong> {selectedDataCenter.name}</strong>
//           </div>
//         )}
//       </div>

//       <div className="mt-auto p-4 border-t flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-4 py-2 rounded bg-gray-300"
//         >
//           ← Back
//         </button>

//         <button
//           disabled
//           className="px-4 py-2 rounded bg-gray-400 text-white"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HubStep;









// // /HubStep.jsx
// import { useInstallation } from "../../contexts/InstallationContext";
// import HubManagement from "../HubManagement/page";

// const HubStep = ({ onNext, onBack }) => {
//   const { selectedDataCenter, selectedHub } = useInstallation();

//   const canProceed = selectedDataCenter && selectedHub;

//   return (
//     <div className="h-full flex flex-col">

//       <div className="flex-1">
//         <HubManagement />
//       </div>

//       <div className="p-4 border-t flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-6 py-2 rounded-md bg-gray-200"
//         >
//           ← Back
//         </button>

//         <button
//           onClick={onNext}
//           disabled={!canProceed}
//           className={`px-6 py-2 rounded-md text-white ${
//             canProceed ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Next → Racks
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HubStep;






// // /HubStep.jsx
// import { useInstallation } from "../../contexts/InstallationContext";
// import HubManagement from "../HubManagement/page";

// const HubStep = ({ onNext, onBack }) => {
//   const { selectedDataCenter, selectedHub } = useInstallation();

//   const canProceed = selectedDataCenter && selectedHub;

//   return (
//     <div className="h-full flex flex-col">

//       <div className="flex-1">
//         <HubManagement />
//       </div>

//       <div className="p-4 border-t flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-6 py-2 rounded-md bg-gray-200"
//         >
//           ← Back
//         </button>

//         <button
//           onClick={onNext}
//           disabled={!canProceed}
//           className={`px-6 py-2 rounded-md text-white ${
//             canProceed ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Next → Racks
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HubStep;



// Adding Same Funcaiontlity for HubStep for Next and Back inside FOrm and FIx the List and FOrm Issue in Selecting 

// src/pages/Installation/HubStep.jsx
// import HubManagement from "../HubManagement/page";

// const HubStep = ({ onNext, onBack }) => {
//   return (
//     <div className="h-full flex flex-col">
//       <div className="flex-1">
//         {/* HubManagement will render the list + add form and AddHub contains Next/Back */}
//         <HubManagement onNext={onNext} onBack={onBack} />
//       </div>
//     </div>
//   );
// };

// export default HubStep;





import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";

import HubList from "../../pages/HubManagement/HubList"
import AddHub from "../../pages/HubManagement/AddHub"
const HubStep = ({ onNext, onBack }) => {
  return (
    <ManagementSplitLayout
      ListComponent={<HubList />}
      FormComponent={<AddHub onNext={onNext} onBack={onBack} />}
    />
  );
};

export default HubStep;
