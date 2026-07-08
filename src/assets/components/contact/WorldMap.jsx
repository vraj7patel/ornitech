import React, { useMemo } from "react";
import DottedMap from "dotted-map";

export function WorldMap({
  dots = [],
  lineColor = "#38bdf8",
  mapColor = "rgba(255, 255, 255, 0.12)",
  mapBgColor = "transparent",
}) {
  const svgMap = useMemo(() => {
    const DottedMapCtor = DottedMap.default ?? DottedMap;
    const map = new DottedMapCtor({ height: 60, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: mapColor,
      shape: "circle",
      backgroundColor: mapBgColor,
    });
  }, [mapColor, mapBgColor]);

  function projectPoint(lat, lng) {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }

  function createCurvedPath(dot) {
    const start = projectPoint(dot.start.lat, dot.start.lng);
    const end = projectPoint(dot.end.lat, dot.end.lng);
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 40;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }

  return (
    <div className="relative aspect-2/1 w-full rounded-lg bg-transparent font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none w-full h-full select-none opacity-80"
        alt="world map"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)",
          display: "block",
        }}
      />
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 w-full h-full select-none"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="10%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="90%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        <g>
          {dots.map((dot, i) => (
            <path
              key={`path-${i}`}
              d={createCurvedPath(dot)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1.0"
              className="animated-map-path"
            />
          ))}
        </g>

        {dots.map((dot, i) => {
          const startPt = projectPoint(dot.start.lat, dot.start.lng);
          const endPt = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-${i}`}>
              {/* Start point */}
              <g>
                <circle cx={startPt.x} cy={startPt.y} r="2" fill={lineColor} />
                <circle cx={startPt.x} cy={startPt.y} r="2" fill={lineColor} opacity="0.5">
                  <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </circle>
              </g>
              {/* End point */}
              <g>
                <circle cx={endPt.x} cy={endPt.y} r="3" fill={lineColor} />
                <circle cx={endPt.x} cy={endPt.y} r="3" fill={lineColor} opacity="0.5">
                  <animate attributeName="r" from="3" to="10" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
