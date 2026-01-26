// // src/pages/DataCenter/AddDataCenter.jsx
// import { Box } from "lucide-react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import InputField from "../../components/Inputs/InputField";
// import Swal from "sweetalert2";
// import { createDataCenter, fetchAllDataCenters } from "../../slices/DataCenterSlice";
// import "../../styles/pages/management-pages.css";

// const AddDataCenter = () => {

//   const [formData, setFormData] = useState({
//     data_center_name: ""
//   });

//   const dispatch = useDispatch();
//   const [loadingformSubmit, setLoadingformSubmit] = useState(false); 

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const name = (formData.data_center_name || "").trim();
//     if (!name) {
//       Swal.fire({ 
//         icon: "warning", 
//         title: "Missing field", 
//         text: "Data Center name is required." 
//       });
//       return;
//     }

//     setLoadingformSubmit(true);

//     try {
//       const created = await dispatch(createDataCenter(name)).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Data Center created",
//         text: `Data Center "${created?.name || name}" added successfully.`,
//       });

//       setFormData({ data_center_name: "" });
//       dispatch(fetchAllDataCenters());

//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Create failed",
//         text: err || "Unable to create Data Center.",
//       });
//       console.error("create data center error:", err);
//     } finally {
//       setLoadingformSubmit(false);
//     }
//   };

//   return (
//     <div className="AddingPage data-center-add-container rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

//       <h2 className="data-center-add-title font-semibold mb-1 text-center">
//         Add Data Center
//       </h2>

//       <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
//         Welcome back! Select method to add Data Center
//       </p>

//       <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
//         <InputField
//           id="data_center_name"
//           name="data_center_name"
//           label="Data Center Name"
//           type="text"
//           value={formData.data_center_name}
//           onchange={onchange}
//           placeholder="Data Center Name"
//           icon={<Box size={20} />}
//         />

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={loadingformSubmit}
//           className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
//             loadingformSubmit ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {loadingformSubmit ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// };




// Fixing UI

// export default AddDataCenter;
// src/pages/DataCenter/AddDataCenter.jsx
// import { Box } from "lucide-react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import InputField from "../../components/Inputs/InputField";
// import Swal from "sweetalert2";
// import { createDataCenter, fetchAllDataCenters } from "../../slices/DataCenterSlice";
// import "../../styles/pages/management-pages.css";

// const AddDataCenter = () => {

//   const [formData, setFormData] = useState({
//     data_center_name: ""
//   });

//   const dispatch = useDispatch();
//   const [loadingformSubmit, setLoadingformSubmit] = useState(false); 

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const name = (formData.data_center_name || "").trim();
//     if (!name) {
//       Swal.fire({ 
//         icon: "warning", 
//         title: "Missing field", 
//         text: "Data Center name is required." 
//       });
//       return;
//     }

//     setLoadingformSubmit(true);

//     try {
//       const created = await dispatch(createDataCenter(name)).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Data Center created",
//         text: `Data Center "${created?.name || name}" added successfully.`,
//       });

//       setFormData({ data_center_name: "" });
//       dispatch(fetchAllDataCenters());

//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Create failed",
//         text: err || "Unable to create Data Center.",
//       });
//       console.error("create data center error:", err);
//     } finally {
//       setLoadingformSubmit(false);
//     }
//   };

//   return (
//     // <div className="rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//     // <div className="min-h-[60%] sm:min-h-auto  p-5 rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//     <div className="h-full p-5 rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

//       <h2 className="data-center-add-title font-semibold mb-1 text-center">
//         Add Data Center
//       </h2>

//       <p className="text-gray-500 mb-6 text-center">
//         Welcome back! Select method to add Data Center
//       </p>

//       <div className="space-y-4 max-w-sm mx-auto w-full">
//         <InputField
//           id="data_center_name"
//           name="data_center_name"
//           label="Data Center Name"
//           type="text"
//           value={formData.data_center_name}
//           onchange={onchange}
//           placeholder="Data Center Name"
//           icon={<Box size={20} />}
//         />

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={loadingformSubmit}
//           className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
//             loadingformSubmit ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {loadingformSubmit ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// };


// Fixing UI + Trying to add Move Next on Save
// export default AddDataCenter;
// src/pages/DataCenter/AddDataCenter.jsx
// src/pages/DataCenter/AddDataCenter.jsx
// src/pages/DataCenter/AddDataCenter.jsx
import { Box } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useInstallation } from "../../contexts/InstallationContext";
import InputField from "../../components/Inputs/InputField";
import Swal from "sweetalert2";
import {
  createDataCenter,
  fetchAllDataCenters,
} from "../../slices/DataCenterSlice";
import "../../styles/pages/management-pages.css";

const AddDataCenter = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const { selectedDataCenter, setSelectedDataCenter } = useInstallation();

  const [formData, setFormData] = useState({
    data_center_name: "",
  });

  const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);

  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // If there's a typed name in form -> that should be used on Next.
  const hasFormValue = (formData.data_center_name || "").trim().length > 0;

  // enable Next if either there's a selected list item OR user typed a name
  const canProceed = !!selectedDataCenter || hasFormValue;

  // const handleSaveAndNext = async () => {
  //   // PRIORITY: if form has a value, save it and use it (override any selected item)
  //   if (hasFormValue) {
  //     const name = (formData.data_center_name || "").trim();
  //     if (!name) {
  //       return Swal.fire({
  //         icon: "warning",
  //         title: "Missing field",
  //         text: "Data Center name is required.",
  //       });
  //     }

  //     setLoadingFormSubmit(true);
  //     try {
  //       const created = await dispatch(createDataCenter(name)).unwrap();
  //       const createdDC = created?.data ?? created;

  //       // set created as selected in Installation context
  //       setSelectedDataCenter(createdDC);

  //       Swal.fire({
  //         icon: "success",
  //         title: "Data Center created",
  //         text: `Data Center "${createdDC?.name || name}" added successfully.`,
  //         timer: 1400,
  //         showConfirmButton: false,
  //       });

  //       setFormData({ data_center_name: "" });
  //       dispatch(fetchAllDataCenters());

  //       onNext?.();
  //       return;
  //     } catch (err) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Create failed",
  //         text: err || "Unable to create Data Center.",
  //       });
  //       console.error(err);
  //     } finally {
  //       setLoadingFormSubmit(false);
  //     }
  //   }

  //   // If form empty but something selected in the list -> just proceed
  //   if (selectedDataCenter) {
  //     onNext?.();
  //     return;
  //   }

  //   // Fallback (shouldn't happen because canProceed blocks button)
  //   Swal.fire({
  //     icon: "warning",
  //     title: "Missing data",
  //     text: "Please select a Data Center from the list or enter a name.",
  //   });
  // };


  const handleSaveAndNext = async () => {
  // If user typed a name, always try to create it
  if (hasFormValue) {
    const name = formData.data_center_name.trim();
    if (!name) {
      return Swal.fire({
        icon: "warning",
        title: "Missing field",
        text: "Data Center name is required.",
      });
    }

    setLoadingFormSubmit(true);
    try {
      const created = await dispatch(createDataCenter(name)).unwrap();
      const createdDC = created?.data ?? created;

      setSelectedDataCenter(createdDC);

      Swal.fire({
        icon: "success",
        title: "Data Center created",
        text: `Data Center "${createdDC?.name || name}" added successfully.`,
        timer: 1400,
        showConfirmButton: false,
      });

      setFormData({ data_center_name: "" });
      dispatch(fetchAllDataCenters());

      onNext?.();
      return;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: err || "Unable to create Data Center.",
      });
      console.error(err);
      return;
    } finally {
      setLoadingFormSubmit(false);
    }
  }

  // If no form value, but a Data Center is already selected, just proceed
  if (selectedDataCenter) {
    onNext?.();
    return;
  }

  // Fallback: nothing typed, nothing selected
  Swal.fire({
    icon: "warning",
    title: "Missing data",
    text: "Please select a Data Center from the list or enter a name.",
  });
};



  return (
    <div className="h-full  p-5 rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col bg-[#EEF3F9] border border-[#E5E7EB]">

      {/* ======= SAME OLD UI (UNCHANGED) ======= */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="data-center-add-title font-semibold mb-1 text-center">
          Add Data Center
        </h2>

        <p className="text-gray-500 mb-6 text-center">
          Welcome back! Select method to add Data Center
        </p>

        <div className="space-y-4 max-w-sm mx-auto w-full">
          <InputField
            id="data_center_name"
            name="data_center_name"
            label="Data Center Name"
            type="text"
            value={formData.data_center_name}
            onchange={onchange}
            placeholder="Data Center Name"
            icon={<Box size={20} />}
          />

          {/* Optional selected hint (very subtle) */}
          {selectedDataCenter && !hasFormValue && (
            <div className="text-xs text-green-700 text-center">
              Selected: {selectedDataCenter.name}
            </div>
          )}
          {/* When user typed a name, show it takes precedence */}
          {hasFormValue && (
            <div className="text-xs text-blue-700 text-center">
              Using form value: {formData.data_center_name.trim()}
            </div>
          )}
        </div>
      </div>

      {/* ======= NEW FOOTER (NEXT / BACK) ======= */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <button
          type="button"
          onClick={() => onBack?.()}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSaveAndNext}
          disabled={!canProceed || loadingFormSubmit}
          className={`px-6 py-2 rounded-md text-white font-semibold ${
            canProceed && !loadingFormSubmit
              ? "bg-[#1E64D9] hover:bg-[#1557C7]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loadingFormSubmit
            ? "Saving..."
            : hasFormValue
            ? "Save & Next → Hub"
            : "Next → Hub"}
        </button>
      </div>
    </div>
  );
};

export default AddDataCenter;
