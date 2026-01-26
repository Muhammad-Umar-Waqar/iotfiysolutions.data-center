

// // /RackStep.jsx
// import { useInstallation } from "../../contexts/InstallationContext";
// import RackManagement from "../RackManagement/page";

// const RackStep = ({ onNext, onBack }) => {
//   const { selectedDataCenter, selectedHub, selectedRack  } = useInstallation();

//   const canProceed = selectedDataCenter && selectedHub && selectedRack ;

//   return (
//     <div className="h-full flex flex-col">

//       <div className="flex-1">
//         <RackManagement />
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
//           Next → AC Kits
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RackStep;



// Fixig UI and ANExt BacK problems
// /RackStep.jsx
// import { useInstallation } from "../../contexts/InstallationContext";
// import RackManagement from "../RackManagement/page";

// const RackStep = ({ onNext, onBack }) => {
//   const { selectedDataCenter, selectedHub, selectedRack  } = useInstallation();

//   const canProceed = selectedDataCenter && selectedHub && selectedRack ;

//   return (
//     <div className="h-full flex flex-col">

//       <div className="flex-1">
//         <RackManagement onNext={onNext} onBack={onBack} />
//       </div>
//     </div>
//   );
// };

// export default RackStep;



import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
import RackList from "../../pages/RackManagement/RackList";
import AddRack from "../../pages/RackManagement/AddRack";

const RackStep = ({ onNext, onBack }) => {
  return (
    <ManagementSplitLayout
      ListComponent={<RackList />}
      FormComponent={<AddRack onNext={onNext} onBack={onBack} />}
    />
  );
};

export default RackStep;



