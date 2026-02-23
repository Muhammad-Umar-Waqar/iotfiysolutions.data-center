// src/components/ACControl.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchRackClusterMean, setAcAuto, setAcManual,  } from "../../slices/rackClusterSlice";
export default function ACControl({ clusterId }) {
  const dispatch = useDispatch();
  const meanDetail = useSelector((s) => s.rackCluster?.meanDetail);
  const acLoading = useSelector((s) => s.rackCluster?.loading?.acControl);

  const [autoEnabled, setAutoEnabled] = useState(false);
  const [manualOn, setManualOn] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // refresh meanDetail when cluster changes
    if (clusterId) dispatch(fetchRackClusterMean(clusterId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clusterId]);

  useEffect(() => {
    // Debug: Log meanDetail to see what we're receiving
    console.log("ACControl - meanDetail received:", meanDetail);
    console.log("ACControl - acControl data:", meanDetail?.acControl);
    
    // Check for acControl.enabled - handle both object and null cases
    const enabled = meanDetail?.acControl?.enabled ?? meanDetail?.autoEnabled ?? false;
    setAutoEnabled(Boolean(enabled));
    
    // prefer explicit manualStatus, fallback to ackitStatus ON/OFF
    const manualStatus = meanDetail?.acControl?.manualStatus ??
      (meanDetail?.ackitStatus ? meanDetail.ackitStatus === "ON" : false);
    setManualOn(Boolean(manualStatus));
    
    console.log("ACControl - Setting autoEnabled to:", Boolean(enabled), "manualOn to:", Boolean(manualStatus));
  }, [meanDetail]);

  const toggleAuto = async (next) => {
    if (!clusterId) return Swal.fire("Error", "No cluster selected", "error");
    setBusy(true);
    try {
      await dispatch(setAcAuto({ clusterId, enabled: next })).unwrap();
      setAutoEnabled(next);
      if (next) setManualOn(false);
      // refresh mean
      dispatch(fetchRackClusterMean(clusterId));
      Swal.fire({ icon: "success", title: next ? "Auto enabled" : "Auto disabled", timer: 900, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: String(err) || "Unable to update" });
    } finally {
      setBusy(false);
    }
  };

  const doManual = async (status) => {
    if (!clusterId) return Swal.fire("Error", "No cluster selected", "error");
    if (autoEnabled) return; // blocked while auto enabled
    setBusy(true);
    try {
      await dispatch(setAcManual({ clusterId, status })).unwrap();
      setManualOn(status);
      // refresh mean
      dispatch(fetchRackClusterMean(clusterId));
      Swal.fire({ icon: "success", title: `AC turned ${status ? "ON" : "OFF"}`, timer: 900, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: String(err) || "Unable to send manual command" });
    } finally {
      setBusy(false);
    }
  };

  if (!clusterId) return null;

  return (
    <div className="mb-4 p-3 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">AC Control</div>
          <div className="text-xs text-gray-500">Automatic/manual control for selected cluster</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoEnabled}
              disabled={busy || acLoading}
              onChange={(e) => toggleAuto(e.target.checked)}
            />
            AUTO
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={() => doManual(true)}
              disabled={autoEnabled || busy || acLoading}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${manualOn ? "bg-red-600 text-white" : "bg-white border"}`}
            >
              ON
            </button>
            <button
              onClick={() => doManual(false)}
              disabled={autoEnabled || busy || acLoading}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${!manualOn ? "bg-gray-400 text-white" : "bg-white border"}`}
            >
              OFF
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-600">
        {autoEnabled ? "Cluster is in AUTO mode — manual control disabled." : `Manual control: ${manualOn ? "ON" : "OFF"}`}
      </div>
    </div>
  );
}
