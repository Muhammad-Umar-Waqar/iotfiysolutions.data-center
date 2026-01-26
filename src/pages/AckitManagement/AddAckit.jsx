// // AckitManagement/AddAckit.jsx


// // src/pages/AckitManagement/AddAckit.jsx
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import InputField from "../../components/Inputs/InputField";
// import { createAckit, fetchAllAckits } from "../../slices/ackitSlice";
// import "../../styles/pages/management-pages.css";

// const DEFAULT_CONDITION = { type: "temp", operator: ">", value: 0 };

// export default function AddAckit() {
//   const dispatch = useDispatch();
//   const { loading = {} } = useSelector((s) => s.ackit || {});
//   const [name, setName] = useState("");
//   const [condition, setCondition] = useState(DEFAULT_CONDITION);
//   const [submitting, setSubmitting] = useState(false);

//   const onSubmit = async (e) => {
//     e?.preventDefault?.();

//     if (!name.trim()) return Swal.fire("Warning", "Name is required", "warning");
//     if (!condition || condition.value === "" || condition.value === null) {
//       return Swal.fire("Warning", "Condition value is required", "warning");
//     }

//     setSubmitting(true);
//     try {
//       await dispatch(createAckit({ name: name.trim(), condition })).unwrap();

//       Swal.fire("Success", "AC Kit created", "success");

//       setName("");
//       setCondition(DEFAULT_CONDITION);
//       dispatch(fetchAllAckits());
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to create AC Kit", "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//       <h2 className="data-center-add-title font-semibold mb-1 text-center">Add AC Kit</h2>
//       <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
//         Create a new AC Kit (condition-based action)
//       </p>

//       <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
//         <InputField
//           id="ackit_name"
//           name="ackit_name"
//           label="Name"
//           type="text"
//           value={name}
//           onchange={(e) => setName(e.target.value)}
//           placeholder="AC Kit name"
//         />

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Condition</label>

//           <div className="flex items-center gap-2">
//             <select
//               value={condition.type}
//               onChange={(e) => setCondition((p) => ({ ...p, type: e.target.value }))}
//               className="border border-gray-300 rounded-md px-2 py-1"
//             >
//               <option value="temp">Temperature</option>
//               <option value="humidity">Humidity</option>
//             </select>

//             <select
//               value={condition.operator}
//               onChange={(e) => setCondition((p) => ({ ...p, operator: e.target.value }))}
//               className="border border-gray-300 rounded-md px-2 py-1"
//             >
//               <option value=">">&gt;</option>
//               <option value="<">&lt;</option>
//             </select>

//             <input
//               type="number"
//               value={condition.value}
//               onChange={(e) => setCondition((p) => ({ ...p, value: Number(e.target.value) }))}
//               className="border border-gray-300 rounded-md px-2 py-1 w-28"
//               placeholder="Value"
//             />
//           </div>
//         </div>

//         <button
//           onClick={onSubmit}
//           disabled={submitting || loading?.submit}
//           className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md ${
//             submitting || loading?.submit ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {submitting || loading?.submit ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// }






// // src/pages/AckitManagement/AddAckit.jsx
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import InputField from "../../components/Inputs/InputField";
// import { createAckit, fetchAllAckits } from "../../slices/ackitSlice";
// import "../../styles/pages/management-pages.css";

// const DEFAULT_CONDITION = { type: "temp", operator: ">", value: 0 };

// export default function AddAckit() {
//   const dispatch = useDispatch();
//   const { loading = {} } = useSelector((s) => s.ackit || {});
//   const [name, setName] = useState("");
//   const [condition, setCondition] = useState(DEFAULT_CONDITION);
//   const [submitting, setSubmitting] = useState(false);

//   const onSubmit = async (e) => {
//     e?.preventDefault?.();

//     if (!name.trim())
//       return Swal.fire("Warning", "Name is required", "warning");

//     if (condition.value === "" || condition.value === null)
//       return Swal.fire(
//         "Warning",
//         "Temperature value is required",
//         "warning"
//       );

//     setSubmitting(true);
//     try {
//       await dispatch(
//         createAckit({ name: name.trim(), condition })
//       ).unwrap();

//       Swal.fire("Success", "AC Kit created", "success");

//       setName("");
//       setCondition(DEFAULT_CONDITION);
//       dispatch(fetchAllAckits());
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to create AC Kit", "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//       <h2 className="data-center-add-title font-semibold mb-1 text-center">
//         Add AC Kit
//       </h2>
//       <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
//         Create a new AC Kit (temperature-based action)
//       </p>

//       <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
//         <InputField
//           id="ackit_name"
//           name="ackit_name"
//           label="Name"
//           type="text"
//           value={name}
//           onchange={(e) => setName(e.target.value)}
//           placeholder="AC Kit name"
//         />

//         {/* Temperature Condition */}
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">
//             Temperature Condition
//           </label>

//           <div className="flex items-center gap-2">
//             <select
//               value={condition.operator}
//               onChange={(e) =>
//                 setCondition((p) => ({
//                   ...p,
//                   operator: e.target.value,
//                 }))
//               }
//               className="border border-gray-300 rounded-md px-2 py-1"
//             >
//               <option value=">">&gt;</option>
//               <option value="<">&lt;</option>
//             </select>

//             <input
//               type="number"
//               value={condition.value}
//               onChange={(e) =>
//                 setCondition((p) => ({
//                   ...p,
//                   value: Number(e.target.value),
//                 }))
//               }
//               className="border border-gray-300 rounded-md px-2 py-1 w-32"
//               placeholder="Temperature (°C)"
//             />
//           </div>
//         </div>

//         <button
//           onClick={onSubmit}
//           disabled={submitting || loading?.submit}
//           className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md ${
//             submitting || loading?.submit
//               ? "opacity-70 cursor-not-allowed"
//               : ""
//           }`}
//         >
//           {submitting || loading?.submit ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// }






// Adding UI Fixes and Updating List
// src/pages/AckitManagement/AddAckit.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import InputField from "../../components/Inputs/InputField";
import { createAckit, fetchAllAckits } from "../../slices/ackitSlice";
import { useInstallation } from "../../contexts/InstallationContext";
import "../../styles/pages/management-pages.css";

const DEFAULT_CONDITION = { type: "temp", operator: ">", value: null };

export default function AddAckit({ onNext, onBack }) {
  const dispatch = useDispatch();
  const { loading = {} } = useSelector((s) => s.ackit || {});
  const { selectedDataCenter, selectedAcKit, setSelectedAcKit } = useInstallation();

  const [name, setName] = useState("");
  const [condition, setCondition] = useState(DEFAULT_CONDITION);
  const [submitting, setSubmitting] = useState(false);

  // form has any typed values?
  const hasFormValue = Boolean(
    (name || "").trim() ||
    // operator always present, but check value
    condition?.value !== null && condition?.value !== ""
  );

  // required validation (exact fields required by schema)
  const formValid =
    (name || "").trim().length > 0 &&
    condition?.operator &&
    condition?.value !== "" &&
    condition?.value !== null &&
    selectedDataCenter?._id;

  // If there's an existing selectedAcKit, or the form is valid -> can proceed.
  // However if user typed in form, we will prefer to save that.
  const canProceed = Boolean(selectedAcKit || formValid);

  const onSubmitCreate = async () => {
    if (!selectedDataCenter?._id) {
      return Swal.fire({
        icon: "warning",
        title: "No Data Center selected",
        text: "Please select a Data Center before creating an AC Kit.",
      });
    }

    const trimmedName = (name || "").trim();
    if (!trimmedName) {
      return Swal.fire("Warning", "Name is required", "warning");
    }

    if (condition.value === "" || condition.value === null) {
      return Swal.fire("Warning", "Temperature value is required", "warning");
    }

    setSubmitting(true);
    try {
      const payload = {
        name: trimmedName,
        condition,
        dataCenterId: selectedDataCenter._id, // backend expects dataCenter object; adjust if your thunk needs different shape
      };

      const created = await dispatch(createAckit(payload)).unwrap();
      const createdAckit = created?.data ?? created;

      // Set as selected for installation flow
      setSelectedAcKit(createdAckit);

      Swal.fire({
        icon: "success",
        title: "AC Kit created",
        text: `AC Kit "${createdAckit?.name || trimmedName}" created.`,
        timer: 1200,
        showConfirmButton: false,
      });

      // reset form
      setName("");
      setCondition(DEFAULT_CONDITION);

      // refresh list
      dispatch(fetchAllAckits());

      // go next
      onNext?.();
    } catch (err) {
      console.error("create ackit error:", err);
      Swal.fire("Error","Unable to create AC Kit", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveAndNext = async () => {
  // ✅ 1. If user selected from list → JUST GO NEXT
  if (selectedAcKit && !hasFormValue) {
    onNext?.();
    return;
  }

  // ✅ 2. If user typed something → validate & save
  if (hasFormValue) {
    if (!formValid) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill required fields before proceeding.",
      });
      return;
    }

    await onSubmitCreate();
    return;
  }

  // ❌ 3. Nothing selected & nothing typed
  Swal.fire({
    icon: "warning",
    title: "No AC Kit selected",
    text: "Please select an AC Kit from the list or create a new one.",
  });
};


  // const handleSaveAndNext = async () => {
  //   // If there's any typed value, save it (form takes precedence)
  //   if (hasFormValue) {
  //     if (!formValid) {
  //       return Swal.fire({
  //         icon: "warning",
  //         title: "Missing fields",
  //         text: "Please fill required fields (name & temperature value) and ensure a Data Center is selected.",
  //       });
  //     }
  //     await onSubmitCreate();
  //     return;
  //   }

  //   // if form empty but an ackit is selected from list, proceed
  //   if (selectedAcKit) {
  //     onNext?.();
  //     return;
  //   }

  //   // fallback
  //   Swal.fire({
  //     icon: "warning",
  //     title: "Missing data",
  //     text: "Please select an AC Kit from the list or enter new AC Kit details.",
  //   });
  // };

  return (
    <div className="h-full AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-between bg-[#EEF3F9] border border-[#E5E7EB]">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="data-center-add-title font-semibold mb-1 text-center">Add AC Kit</h2>
        <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
          Create a new AC Kit (temperature-based action)
        </p>

        <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
          <InputField
            id="ackit_name"
            name="ackit_name"
            label="Name"
            type="text"
            value={name}
            onchange={(e) => setName(e.target.value)}
            placeholder="AC Kit name"
          />

          {/* Temperature Condition (type fixed to temp) */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Temperature Condition</label>

            <div className="flex items-center gap-2">
              <select
                value={condition.operator}
                onChange={(e) =>
                  setCondition((p) => ({ ...p, operator: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
              </select>

              <input
                type="number"
                value={condition.value}
                onChange={(e) =>
                  setCondition((p) => ({ ...p, value: Number(e.target.value) }))
                }
                className="border border-gray-300 rounded-md px-2 py-1 w-32"
                placeholder="Temperature"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Back / Save & Next (or Next) */}
      {/* <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center px-5">
        <button
          onClick={() => onBack?.()}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>

        <button
          onClick={handleSaveAndNext}
          disabled={!canProceed || submitting || loading?.submit}
          className={`px-6 py-2 rounded-md text-white font-semibold ${
            canProceed && !submitting ? "bg-[#1E64D9] hover:bg-[#1557C7]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {submitting || loading?.submit
            ? "Saving..."
            : hasFormValue
            ? "Save & Next → Rack Cluster"
            : "Next → Rack Cluster"}
        </button>
      </div> */}

         <div className="my-5 px-4 pt-4 border-t border-gray-200 flex justify-between items-center">
  <button
    type="button"
    onClick={() => onBack?.()}
    className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
  >
    ← Back
  </button>

  <button
    type="button"
    onClick={handleSaveAndNext}
    disabled={!canProceed || submitting || loading?.submit}
    className={`px-6 py-2 rounded-md text-white font-semibold ${
      canProceed && !submitting
        ? "bg-[#1E64D9] hover:bg-[#1557C7]"
        : "bg-gray-400 cursor-not-allowed"
    }`}
  >
    {submitting || loading?.submit
      ? "Saving..."
      : hasFormValue
      ? "Save & Next → Rack Cluster"
      : "Next → Rack Cluster"}
      
  </button>
</div>



    </div>
  );
}


