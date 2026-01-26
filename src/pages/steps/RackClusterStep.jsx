// // /DataCenterStep.jsx
// import { useInstallation } from "../../contexts/InstallationContext";
// import AckitManagement from "../AckitManagement/page";
// import RackClusterManagement from "../RackClusterManagement/page";


// const RackClusterStep = ({ onBack }) => {
//   const { selectedDataCenter } = useInstallation();

//   return (
//     <div className="h-full flex flex-col">

//       {/* Your existing page */}
//       <div className="flex-1">
//         <RackClusterManagement />
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t flex justify-end">
//         <button
//           onClick={onBack}
//           disabled={!selectedDataCenter}
//           className={`px-6 py-2 rounded-md text-white ${
//             selectedDataCenter
//               ? "bg-blue-600"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Back ← Nothing Next (Alhamdulillah!)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RackClusterStep;






// // src/pages/steps/RackClusterStep.jsx
// import RackClusterManagement from "../RackClusterManagement/page";

// const RackClusterStep = ({ onBack }) => {
//   return (
//     <div className="h-full flex flex-col">
//       <div className="flex-1">
//         <RackClusterManagement />
//       </div>

//       <div className="p-4 border-t flex justify-start">
//         <button
//           onClick={onBack}
//           className="px-6 py-2 rounded-md bg-gray-200"
//         >
//           ← Back (Done 🎉)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RackClusterStep;







// import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
// import AddAcKit from "../../pages/AckitManagement/AddAckit"
// import AckitList from "../../pages/AckitManagement/AckitList"


// Fixing the UI and coding
import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
import AddRackCluster from "../RackClusterManagement/AddRackCluster";
import RackClusterList from "../RackClusterManagement/RackClusterList";

const RackClusterStep = ({ onBack, onNext,  onFinish }) => {
  return (
    <ManagementSplitLayout
  ListComponent={<RackClusterList />}
  FormComponent={<AddRackCluster onNext={onNext} onBack={onBack} onFinish={onFinish}  />}
/>
  );
};

export default RackClusterStep;





