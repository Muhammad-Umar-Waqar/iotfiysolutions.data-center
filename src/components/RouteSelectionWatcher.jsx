// src/components/RouteSelectionWatcher.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedRackId, setSelectedRackClusterId } from "../slices/uiSlice";

export default function RouteSelectionWatcher() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // When path changes, clear rack/cluster selection; keep selectedDataCenter
    // If you want to only clear when navigating outside /management or certain pages,
    // adjust the condition below.
    dispatch(setSelectedRackId(null));
    dispatch(setSelectedRackClusterId(null));
  }, [location.pathname, dispatch]);

  return null;
}
