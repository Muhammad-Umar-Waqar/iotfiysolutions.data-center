// // /DataCenterStep.jsx
// import { useInstallation } from "../../contexts/InstallationContext";
// import AckitManagement from "../AckitManagement/page";


// const AcKitSteps = ({ onNext, onBack }) => {  

//   const { selectedAcKit } = useInstallation();

//   const canProceed = Boolean(selectedAcKit);

//   return (
//     <div className="h-full flex flex-col">

//       {/* Your existing page */}
//       <div className="flex-1">
//         <AckitManagement onNext={onNext} onBack={onBack}  />
//       </div>

//       {/* Footer */}
//       {/* <div className="p-4 border-t flex justify-end">
//         <button
//           onClick={onNext}
//           disabled={!selectedDataCenter}
//           className={`px-6 py-2 rounded-md text-white ${
//             selectedDataCenter
//               ? "bg-blue-600"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Next → Rag Clusters
//         </button>
//       </div> */}

//       {/* <div className="p-4 border-t flex justify-between">
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
//             canProceed
//               ? "bg-blue-600"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Next → Rack Cluster
//         </button>
//       </div> */}


//     </div>
//   );
// };

// export default AcKitSteps;






import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
import AddAcKit from "../../pages/AckitManagement/AddAckit"
import AckitList from "../../pages/AckitManagement/AckitList"

const AcKitSteps = ({ onNext, onBack }) => {
  return (
   <ManagementSplitLayout
  ListComponent={<AckitList />}
  FormComponent={<AddAcKit onNext={onNext} onBack={onBack} />}
/>
  );
};

export default AcKitSteps;

