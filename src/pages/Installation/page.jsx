// // Installation/Installation.jsx

// import { useState } from "react";
// import DataCenterStep from "../steps/DataCenterStep";

// import { InstallationProvider } from "../../contexts/InstallationContext";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
// };

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

//   return (
//     <InstallationProvider>
//       <div className="h-full w-full p-4">

//         {/* Step content */}
//         {activeStep === STEPS.DATACENTER && (
//           <DataCenterStep
//            onNext={() => setActiveStep(STEPS.HUB)} 
//            onBack={() => setActiveStep(STEPS.DATACENTER)}
//            />
//         )}

//         {activeStep === STEPS.HUB && (
//           <HubStep 
//           onBack={() => setActiveStep(STEPS.DATACENTER)}
//            onNext={() => setActiveStep(STEPS.RACK)} 
//           />
//         )}
     
//         {activeStep === STEPS.RACK && (
//           <RackStep
//           onNext={() => setActiveStep(STEPS.ACKIT)} 
//           onBack={() => setActiveStep(STEPS.HUB)} />
//         )}
      
//         {activeStep === STEPS.ACKIT && (
//           <AcKitSteps
//           onNext={() => setActiveStep(STEPS.RACKCLUSTER)} 
//           onBack={() => setActiveStep(STEPS.RACK)} />
//         )}
        
//         {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep
//           onBack={() => setActiveStep(STEPS.ACKIT)} />
//         )}
        
//       </div>
//     </InstallationProvider>
//   );
// };

// export default Installation;






// // src/pages/Installation/Installation.jsx  (or wherever your Installation component is)
// import { useState } from "react";
// import InstallationStepper from "../../components/InstallationStepper"; // <-- import
// import DataCenterStep from "../steps/DataCenterStep";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";
// import { InstallationProvider } from "../../contexts/InstallationContext";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
// };

// const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

//   return (
//     <InstallationProvider>
//       <div className="h-[66vh] md:h-[88vh] w-full  p-4">
//         {/* Stepper */}
//         <InstallationStepper
//           steps={labels}
//           activeStep={activeStep}
//           onStepClick={(idx) => {
//             // allow going back only (prevent skipping ahead)
//             if (idx <= activeStep) setActiveStep(idx);
//           }}
//         />

//         {/* Step content */}
//         {activeStep === STEPS.DATACENTER && (
//           <DataCenterStep
//             onNext={() => setActiveStep(STEPS.HUB)}
//             onBack={() => setActiveStep(STEPS.DATACENTER)}
//           />
//         )}

//         {activeStep === STEPS.HUB && (
//           <HubStep
//             onBack={() => setActiveStep(STEPS.DATACENTER)}
//             onNext={() => setActiveStep(STEPS.RACK)}
//           />
//         )}

//         {activeStep === STEPS.RACK && (
//           <RackStep
//             onNext={() => setActiveStep(STEPS.ACKIT)}
//             onBack={() => setActiveStep(STEPS.HUB)}
//           />
//         )}

//         {activeStep === STEPS.ACKIT && (
//           <AcKitSteps
//             onNext={() => setActiveStep(STEPS.RACKCLUSTER)}
//             onBack={() => setActiveStep(STEPS.RACK)}
//           />
//         )}


//         {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep
//             onBack={() => setActiveStep(STEPS.ACKIT)}
//             onFinish={() => {
//               // final action after creating/selecting a rack cluster
//               // you might want to close the modal, redirect, or show a summary
//               console.log("Installation finished (rack cluster selected).");
//               // optional: reset installation context or navigate away
//             }} />
//         )}
//         {/* {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep onBack={() => setActiveStep(STEPS.ACKIT)} />
//         )} */}

        
//       </div>
//     </InstallationProvider>
//   );
// };

// export default Installation;



// // trying one more thing to acheive max height on list properly
// // src/pages/Installation/Installation.jsx  (or wherever your Installation component is)
// import { useState } from "react";
// import InstallationStepper from "../../components/InstallationStepper"; // <-- import
// import DataCenterStep from "../steps/DataCenterStep";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";
// import { InstallationProvider } from "../../contexts/InstallationContext";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
// };

// const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

//   return (
//     <InstallationProvider>
//       <div className=" w-full p-4 ">
//         {/* Stepper */}
//         <InstallationStepper
//           steps={labels}
//           activeStep={activeStep}
//           onStepClick={(idx) => {
//             // allow going back only (prevent skipping ahead)
//             if (idx <= activeStep) setActiveStep(idx);
//           }}
//         />
//         <div className="h-[60vh]">
        
    
//         {/* Step content */}
//         {activeStep === STEPS.DATACENTER && (
//           <DataCenterStep
//             onNext={() => setActiveStep(STEPS.HUB)}
//             onBack={() => setActiveStep(STEPS.DATACENTER)}
//           />
//         )}

//         {activeStep === STEPS.HUB && (
//           <HubStep
//             onBack={() => setActiveStep(STEPS.DATACENTER)}
//             onNext={() => setActiveStep(STEPS.RACK)}
//           />
//         )}

//         {activeStep === STEPS.RACK && (
//           <RackStep
//             onNext={() => setActiveStep(STEPS.ACKIT)}
//             onBack={() => setActiveStep(STEPS.HUB)}
//           />
//         )}

//         {activeStep === STEPS.ACKIT && (
//           <AcKitSteps
//             onNext={() => setActiveStep(STEPS.RACKCLUSTER)}
//             onBack={() => setActiveStep(STEPS.RACK)}
//           />
//         )}


//         {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep
//             onBack={() => setActiveStep(STEPS.ACKIT)}
//             onFinish={() => {
//               // final action after creating/selecting a rack cluster
//               // you might want to close the modal, redirect, or show a summary
//               console.log("Installation finished (rack cluster selected).");
//               // optional: reset installation context or navigate away
//             }} />
//         )}
//         {/* {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep onBack={() => setActiveStep(STEPS.ACKIT)} />
//         )} */}

//             </div>
//       </div>
//     </InstallationProvider>
//   );
// };

// export default Installation;






// // Trying to fix the height
// trying one more thing to acheive max height on list properly
// src/pages/Installation/Installation.jsx  (or wherever your Installation component is)
// import { useState } from "react";
// import InstallationStepper from "../../components/InstallationStepper"; // <-- import
// import DataCenterStep from "../steps/DataCenterStep";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";
// import { InstallationProvider } from "../../contexts/InstallationContext";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
//   COMPLETED_STATE: 5,
// };

// const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

//     const handleFinishInstallation = () => {
//     setActiveStep(STEPS.RACKCLUSTER + 1); // 👈 marks all steps completed
//   };

//   return (
//     <InstallationProvider>
//       {/* root container fills parent (App) */}
//       <div className=" h-[85vh] w-full p-4 flex flex-col h-full">
//         <InstallationStepper
//           steps={labels}
//           activeStep={activeStep}
//           onStepClick={(idx) => { if (idx <= activeStep) setActiveStep(idx); }}
//         />

//         {/* content area takes remaining height (100vh - 15vh) */}
//         {/* <div className="flex-1  overflow-hidden"> */}
//         <div className="flex-1  flex flex-col mt-2 min-h-0">
//           {/* make the active step a full-height flex column */}
//           <div className="h-full">
//             {activeStep === STEPS.DATACENTER && (
//               <DataCenterStep onNext={() => setActiveStep(STEPS.HUB)} onBack={() => setActiveStep(STEPS.DATACENTER)} />
//             )}
//             {activeStep === STEPS.HUB && (
//               <HubStep onBack={() => setActiveStep(STEPS.DATACENTER)} onNext={() => setActiveStep(STEPS.RACK)} />
//             )}
//             {activeStep === STEPS.RACK && (
//               <RackStep onNext={() => setActiveStep(STEPS.ACKIT)} onBack={() => setActiveStep(STEPS.HUB)} />
//             )}
//             {activeStep === STEPS.ACKIT && (
//               <AcKitSteps onNext={() => setActiveStep(STEPS.RACKCLUSTER)} onBack={() => setActiveStep(STEPS.RACK)} />
//             )}
//             {activeStep === STEPS.RACKCLUSTER && (
//               <RackClusterStep
//               onBack={() => setActiveStep(STEPS.ACKIT)}
//               onFinish={handleFinishInstallation}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </InstallationProvider>
//   );
// };


// export default Installation;




// import { useState } from "react";
// import InstallationStepper from "../../components/InstallationStepper";
// import DataCenterStep from "../steps/DataCenterStep";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";
// import { InstallationProvider } from "../../contexts/InstallationContext";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
// };

// const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

//   // ✅ source of truth
//   const [unlockedSteps, setUnlockedSteps] = useState([STEPS.DATACENTER]);

//   // ✅ called when DataCenter is done
//   const handleDataCenterNext = () => {
//     setUnlockedSteps((prev) => [
//       ...new Set([...prev, STEPS.HUB, STEPS.ACKIT]),
//     ]);
//     setActiveStep(STEPS.HUB);
//   };

//   return (
//     <InstallationProvider>
//       <div className="h-[85vh] w-full p-4 flex flex-col">
//         <InstallationStepper
//           steps={labels}
//           activeStep={activeStep}
//           unlockedSteps={unlockedSteps}
//           onStepClick={(idx) => {
//             if (unlockedSteps.includes(idx)) {
//               setActiveStep(idx);
//             }
//           }}
//         />

//         <div className="flex-1 mt-2 min-h-0">
//           {activeStep === STEPS.DATACENTER && (
//             <DataCenterStep onNext={handleDataCenterNext} />
//           )}

//           {activeStep === STEPS.HUB && (
//             <HubStep
//               onBack={() => setActiveStep(STEPS.DATACENTER)}
//               onNext={() => {
//                 setUnlockedSteps((p) =>
//                   p.includes(STEPS.RACK) ? p : [...p, STEPS.RACK]
//                 );
//                 setActiveStep(STEPS.RACK);
//               }}
//             />
//           )}

//           {activeStep === STEPS.RACK && (
//             <RackStep
//               onBack={() => setActiveStep(STEPS.HUB)}
//               onNext={() => {
//                 setUnlockedSteps((p) =>
//                   p.includes(STEPS.RACKCLUSTER)
//                     ? p
//                     : [...p, STEPS.RACKCLUSTER]
//                 );
//                 setActiveStep(STEPS.ACKIT);
//               }}
//             />
//           )}

//           {activeStep === STEPS.ACKIT && (
//             <AcKitSteps
//               // ❌ BACK DISABLED by design
//               onNext={() => setActiveStep(STEPS.RACKCLUSTER)}
//             />
//           )}

//           {activeStep === STEPS.RACKCLUSTER && (
//             <RackClusterStep
//               onBack={() => setActiveStep(STEPS.ACKIT)}
//               onFinish={() => {
//                 // optional final logic
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </InstallationProvider>
//   );
// };

// export default Installation;






// src/pages/management/Installation.jsx
import React, { useState, useCallback } from "react";
import Swal from "sweetalert2";
import InstallationStepper from "../../components/InstallationStepper";
import DataCenterStep from "../steps/DataCenterStep";
import HubStep from "../steps/HubStep";
import RackStep from "../steps/RackStep";
import AcKitSteps from "../steps/AcKitStep";
import RackClusterStep from "../steps/RackClusterStep";
import { InstallationProvider, useInstallation } from "../../contexts/InstallationContext";

const STEPS = {
  DATACENTER: 0,
  HUB: 1,
  RACK: 2,
  ACKIT: 3,
  RACKCLUSTER: 4,
};

const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

function InstallationInner() {
  const { resetInstallation } = useInstallation();

  const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);
  const [unlockedSteps, setUnlockedSteps] = useState([STEPS.DATACENTER]);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [history, setHistory] = useState([STEPS.DATACENTER]); // navigation history stack

  // helper to navigate and maintain history
  const goToStep = useCallback((step, { push = true } = {}) => {
    setActiveStep(step);
    if (push) setHistory((h) => {
      // avoid duplicate immediate push if same
      const last = h[h.length - 1];
      if (last === step) return h;
      return [...h, step];
    });
  }, []);

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length <= 1) return h; // nothing to pop
      const next = [...h];
      next.pop(); // remove current
      const prev = next[next.length - 1];
      setActiveStep(prev);
      return next;
    });
  }, []);

  // Step unlocking convenience
  const unlockSteps = useCallback((stepsArray) => {
    setUnlockedSteps((p) => [...new Set([...p, ...stepsArray])]);
  }, []);

  // ---------- Standard "next" handlers used by child forms ----------
  const handleDataCenterNext = async () => {
    // after data center selected or created -> allow Hub and AC Kit per your rules
    unlockSteps([STEPS.HUB, STEPS.ACKIT]);
    setCompletedSteps((s) => new Set(s).add(STEPS.DATACENTER));
    goToStep(STEPS.HUB);
  };

  const handleHubNext = () => {
    unlockSteps([STEPS.RACK]);
    setCompletedSteps((s) => new Set(s).add(STEPS.HUB));
    goToStep(STEPS.RACK);
  };

  const handleRackNext = () => {
    // completing rack unlocks RackCluster and Ackit flow will go to ACKIT by original flow
    unlockSteps([STEPS.RACKCLUSTER]);
    setCompletedSteps((s) => new Set(s).add(STEPS.RACK));
    // your original flow moved to ACKIT next — keep that
    goToStep(STEPS.ACKIT);
  };

  // ACKIT next (user goes to RackCluster)
  const handleAckitNext = () => {
    setCompletedSteps((s) => new Set(s).add(STEPS.ACKIT));
    goToStep(STEPS.RACKCLUSTER);
  };

  // ON FINISH of RackCluster (step 4): show the modal to start over vs stay
  const handleFinish = async () => {
    setCompletedSteps((s) => new Set(s).add(STEPS.RACKCLUSTER));
    const res = await Swal.fire({
      title: "Installation complete",
      text: "What would you like to do next?",
      icon: "success",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Start over (clear selections)",
      denyButtonText: "Stay here (keep selections)",
      cancelButtonText: "Close",
    });

    if (res.isConfirmed) {
      // start over: reset context and wizard state
      resetInstallation();
      setUnlockedSteps([STEPS.DATACENTER]);
      setCompletedSteps(new Set());
      setHistory([STEPS.DATACENTER]);
      setActiveStep(STEPS.DATACENTER);
      Swal.fire({ icon: "info", title: "Reset", text: "Installation restarted." });
      return;
    }

    if (res.isDenied) {
      // keep user on last step but mark completed
      setUnlockedSteps((p) => [...new Set([...p, STEPS.RACKCLUSTER])]);
      setActiveStep(STEPS.RACKCLUSTER);
      // we already set completed steps
      return;
    }

    // if cancelled (res.isDismissed) do nothing — stay where user is
  };

  // clicking stepper dots: only navigate to unlocked steps
  const handleStepClick = (idx) => {
    if (!unlockedSteps.includes(idx)) return;
    // push to history
    goToStep(idx);
  };

  // utility to get previous unlocked step (used if you want to compute fallback back)
  const prevUnlocked = () => {
    const idx = history.length - 2;
    return idx >= 0 ? history[idx] : STEPS.DATACENTER;
  };

  return (
    <div className="h-[85vh] w-full p-4 px-10 flex flex-col">
      <InstallationStepper
        steps={labels}
        activeStep={activeStep}
        unlockedSteps={unlockedSteps}
        completedSteps={Array.from(completedSteps)}
        onStepClick={handleStepClick}
      />

      <div className="flex-1 mt-2 min-h-0">
        {activeStep === STEPS.DATACENTER && (
          <DataCenterStep
            onNext={handleDataCenterNext}
            onBack={() => { /* nothing; start of flow */ }}
          />
        )}

        {activeStep === STEPS.HUB && (
          <HubStep
            onBack={() => goBack()}
            onNext={handleHubNext}
          />
        )}

        {activeStep === STEPS.RACK && (
          <RackStep
            onBack={() => goBack()}
            onNext={handleRackNext}
          />
        )}

        {activeStep === STEPS.ACKIT && (
          <AcKitSteps
            onBack={() => goBack()}
            onNext={handleAckitNext}
          />
        )}

        {activeStep === STEPS.RACKCLUSTER && (
          <RackClusterStep
            onBack={() => goBack()}
            onNext={() => {/* if you have intermediate next */}}
            onFinish={handleFinish}
          />
        )}
      </div>
    </div>
  );
}

export default function Installation() {
  return (
    <InstallationProvider>
      <InstallationInner />
    </InstallationProvider>
  );
}






// // src/pages/Installation/Installation.jsx
// import { useState } from "react";
// import InstallationStepper from "../../components/InstallationStepper";
// import DataCenterStep from "../steps/DataCenterStep";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";
// import { InstallationProvider } from "../../contexts/InstallationContext";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
// };

// const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);
//   // highest index marked completed (-1 = none)
//   const [completedIndex, setCompletedIndex] = useState(-1);

//   // finish handler: mark rack-cluster completed and optionally jump to a step
//   const handleFinishInstallation = (opts = {}) => {
//     // mark final step completed (idempotent)
//     setCompletedIndex((prev) => Math.max(prev, STEPS.RACKCLUSTER));

//     // if caller asks to go to a specific step (e.g. gotoStep: 0), respect it
//     if (opts && typeof opts.gotoStep === "number") {
//       const safeIndex = Math.max(0, Math.min(opts.gotoStep, labels.length - 1));
//       setActiveStep(safeIndex);
//       return;
//     }

//     // otherwise stay on the same activeStep (don't change activeStep)
//   };

//   // handle clicks on steps: allow clicking back to any step that's <= max(active, completed)
//   const handleStepClick = (idx) => {
//     const canClick = idx <= Math.max(activeStep, completedIndex);
//     if (canClick) setActiveStep(idx);
//   };

//   return (
//     <InstallationProvider>
//       <div className="h-[85vh] w-full p-4 flex flex-col h-full">
//         <InstallationStepper
//           steps={labels}
//           activeStep={activeStep}
//           completedIndex={completedIndex}
//           onStepClick={handleStepClick}
//         />

//         <div className="flex-1 flex flex-col mt-2 min-h-0">
//           <div className="h-full">
//             {activeStep === STEPS.DATACENTER && (
//               <DataCenterStep onNext={() => setActiveStep(STEPS.HUB)} onBack={() => setActiveStep(STEPS.DATACENTER)} />
//             )}
//             {activeStep === STEPS.HUB && (
//               <HubStep onBack={() => setActiveStep(STEPS.DATACENTER)} onNext={() => setActiveStep(STEPS.RACK)} />
//             )}
//             {activeStep === STEPS.RACK && (
//               <RackStep onNext={() => setActiveStep(STEPS.ACKIT)} onBack={() => setActiveStep(STEPS.HUB)} />
//             )}
//             {activeStep === STEPS.ACKIT && (
//               <AcKitSteps onNext={() => setActiveStep(STEPS.RACKCLUSTER)} onBack={() => setActiveStep(STEPS.RACK)} />
//             )}
//             {activeStep === STEPS.RACKCLUSTER && (
//               <RackClusterStep onBack={() => setActiveStep(STEPS.ACKIT)} onFinish={handleFinishInstallation} />
//             )}
//           </div>
//         </div>
//       </div>
//     </InstallationProvider>
//   );
// };

// export default Installation;
