// // TabularView

// import React, { useMemo } from "react";
// import { Tooltip } from "@mui/material";

// /**
//  * Props:
//  *  - racks: array of rack objects (each must have row like "r1", col like "c1", _id, name, tempA, humiA, tempV, humiV, hub)
//  *  - selectedRackId: string|null
//  *  - onSelect: (rackId|null) => void
//  *  - maxCols (optional): maximum columns to show (fallback computed)
//  */
// export default function TabularView({
//   racks = [],
//   selectedRackId = null,
//   onSelect = () => {},
//   maxCols = null,
// }) {
//   // Normalize rows/cols as integers and build map
//   const { rowList, colList, gridMap } = useMemo(() => {
//     const rows = new Set();
//     const cols = new Set();
//     const map = {}; // map["rX"]["cY"] = rack

//     for (const r of racks) {
//       const rawRow = String(r.row || "").toLowerCase();
//       const rawCol = String(r.col || "").toLowerCase();
//       const rowNum = parseInt(rawRow.replace(/^r/, ""), 10);
//       const colNum = parseInt(rawCol.replace(/^c/, ""), 10);

//       if (!Number.isFinite(rowNum) || !Number.isFinite(colNum)) continue;

//       rows.add(rowNum);
//       cols.add(colNum);

//       map[rowNum] = map[rowNum] || {};
//       map[rowNum][colNum] = r;
//     }

//     // sorted numeric lists
//     const rowListSorted = Array.from(rows).sort((a, b) => a - b);
//     const colListSorted = Array.from(cols).sort((a, b) => a - b);

//     // if user provided maxCols, ensure columns include 1..maxCols
//     if (maxCols && colListSorted.length < maxCols) {
//       for (let i = 1; i <= maxCols; i++) {
//         if (!cols.has(i)) colListSorted.push(i);
//       }
//       colListSorted.sort((a,b)=>a-b);
//     }

//     return {
//       rowList: rowListSorted,
//       colList: colListSorted,
//       gridMap: map,
//     };
//   }, [racks, maxCols]);

//   if (!rowList.length || !colList.length) {
//     return (
//       <div className="tabular-empty text-sm text-gray-500 p-3 h-full flex items-center justify-center">
//         {/* No Devices available */}
//       </div>
//     );
//   }

//   return (
//     <div className=" tabular-container h-full">
//       {/* Rows */}
//       <div className="tabular-body h-full">
//         {/* <><div className="tabular-row" key={`row-${rNum}`}></div></> */}
//         {rowList.map((rNum) => (
//       <div className="tabular-row" key={`row-${rNum}`}>          
//             <div className="tabular-row-label">{`R${rNum}`}</div>

//             {colList.map((cNum) => {
//               const rack = gridMap[rNum] ? gridMap[rNum][cNum] : null;
//               const isSelected = rack && String(rack._id) === String(selectedRackId);
//               const hasAlert = rack && (rack.tempA || rack.humiA);
//               const displayLabel = rack ? (rack.name || `R${rNum}C${cNum}`) : null;

//               const circleClass = rack
//                 ? isSelected
//                   ? "rack-circle selected"
//                   : hasAlert
//                     ? "rack-circle alert"
//                     : "rack-circle normal"
//                 : "rack-circle empty";

//               const tooltipTitle = rack
//                 ? (
//                   <div style={{ fontSize: 13 }}>
//                     <div style={{ fontWeight: 600 }}>{rack.name || `R${rNum}C${cNum}`}</div>
//                     <div style={{ fontSize: 12, color: "#f6f6f6" }}>
//                       Hub: {rack.hub?.name || "—"}<br />
//                       Temp: {rack.tempV != null ? `${rack.tempV}°C` : "N/A"} · Hum: {rack.humiV != null ? `${rack.humiV}%` : "N/A"}<br />
//                       TempAlert: {rack.tempA ? "Yes" : "No"} · HumiAlert: {rack.humiA ? "Yes" : "No"}
//                     </div>
//                   </div>
//                 )
//                 : `Empty ${`R${rNum}C${cNum}`}`;

//               return (
//                 <div key={`cell-${rNum}-${cNum}`} className="tabular-cell">
//                   <Tooltip title={tooltipTitle} arrow placement="top">
//                     <button
//                       type="button"
//                       className={circleClass}
//                       onClick={() => {
//                         if (rack) onSelect(String(rack._id));
//                       }}
//                       aria-label={rack ? `Select ${displayLabel}` : `Empty cell ${rNum}-${cNum}`}
//                     >
//                       <span className="circle-label">
//                         {rack ? (`R${rNum}C${cNum}`) : ""}
//                       </span>
//                     </button>
//                   </Tooltip>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







// TabularView.jsx – Simple Circle Grid with Enhanced Alert Colors
import React, { useMemo } from "react";
import { Tooltip } from "@mui/material";

/**
 * Props:
 *  - racks: array of rack objects
 *  - selectedRackId: string | null
 *  - onSelect: (rackId) => void
 *  - maxCols?: number (optional hard limit)
 */
export default function TabularView({
  racks = [],
  selectedRackId = null,
  onSelect = () => {},
  maxCols = null,
}) {
  // Normalize rows/cols as integers and build map
  const { rowList, colList, gridMap } = useMemo(() => {
    const rows = new Set();
    const cols = new Set();
    const map = {}; // map["rX"]["cY"] = rack

    for (const r of racks) {
      const rawRow = String(r.row || "").toLowerCase();
      const rawCol = String(r.col || "").toLowerCase();
      const rowNum = parseInt(rawRow.replace(/^r/, ""), 10);
      const colNum = parseInt(rawCol.replace(/^c/, ""), 10);

      if (!Number.isFinite(rowNum) || !Number.isFinite(colNum)) continue;

      rows.add(rowNum);
      cols.add(colNum);

      map[rowNum] = map[rowNum] || {};
      map[rowNum][colNum] = r;
    }

    // sorted numeric lists
    const rowListSorted = Array.from(rows).sort((a, b) => a - b);
    const colListSorted = Array.from(cols).sort((a, b) => a - b);

    // if user provided maxCols, ensure columns include 1..maxCols
    if (maxCols && colListSorted.length < maxCols) {
      for (let i = 1; i <= maxCols; i++) {
        if (!cols.has(i)) colListSorted.push(i);
      }
      colListSorted.sort((a, b) => a - b);
    }

    return {
      rowList: rowListSorted,
      colList: colListSorted,
      gridMap: map,
    };
  }, [racks, maxCols]);

  if (!rowList.length || !colList.length) {
    return (
      <div className="tabular-empty text-sm text-gray-500 p-3 h-full flex items-center justify-center">
        No racks available
      </div>
    );
  }

  return (
    <div className="tabular-container h-full">
      <div className="tabular-body h-full">
        {rowList.map((rNum) => (
          <div className="tabular-row" key={`row-${rNum}`}>
            <div className="tabular-row-label">{`R${rNum}`}</div>

            {colList.map((cNum) => {
              const rack = gridMap[rNum] ? gridMap[rNum][cNum] : null;
              const isSelected = rack && String(rack._id) === String(selectedRackId);
              const hasTempAlert = rack && Boolean(rack.tempA);
              const hasHumiAlert = rack && Boolean(rack.humiA);
              const hasAnyAlert = hasTempAlert || hasHumiAlert;
              const displayLabel = rack ? (rack.name || `R${rNum}C${cNum}`) : null;

              // Determine alert class - different colors for tempA and humiA
              let circleClass = "rack-circle";
              if (rack) {
                if (isSelected) {
                  circleClass = "rack-circle selected";
                } else if (hasTempAlert && hasHumiAlert) {
                  circleClass = "rack-circle alert alert-both";
                } else if (hasTempAlert) {
                  circleClass = "rack-circle alert alert-temp";
                } else if (hasHumiAlert) {
                  circleClass = "rack-circle alert alert-humi";
                } else {
                  circleClass = "rack-circle normal";
                }
              } else {
                circleClass = "rack-circle empty";
              }

              const tooltipTitle = rack
                ? (
                  <div style={{ fontSize: 13 }}>
                    <div style={{ fontWeight: 600 }}>{rack.name || `R${rNum}C${cNum}`}</div>
                    <div style={{ fontSize: 12, color: "#f6f6f6" }}>
                      Hub: {rack.hub?.name || "—"}<br />
                      Temp: {rack.tempV != null ? `${rack.tempV}°C` : "N/A"} · Hum: {rack.humiV != null ? `${rack.humiV}%` : "N/A"}<br />
                      TempAlert: {rack.tempA ? "Yes" : "No"} · HumiAlert: {rack.humiA ? "Yes" : "No"}
                    </div>
                  </div>
                )
                : `Empty R${rNum}C${cNum}`;

              return (
                <div key={`cell-${rNum}-${cNum}`} className="tabular-cell">
                  <Tooltip title={tooltipTitle} arrow placement="top">
                    <button
                      type="button"
                      className={circleClass}
                      onClick={() => {
                        if (rack) onSelect(String(rack._id));
                      }}
                      aria-label={rack ? `Select ${displayLabel}` : `Empty cell ${rNum}-${cNum}`}
                    >
                      <span className="circle-label">
                        {rack ? `R${rNum}C${cNum}` : ""}
                      </span>
                    </button>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}