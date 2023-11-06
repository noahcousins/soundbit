"use client";

import React from "react";
import { motion } from "framer-motion";

const positionTabs = [
  { id: "", label: "All Positions" },
  { id: "Senator", label: "Senator" },
  { id: "Representative", label: "Representative" },
];

export default function AnimatedPositionTabs({
  activePosition,
  onPositionTabClick,
}: {
  activePosition: any;
  onPositionTabClick: any;
}) {
  return (
    <div className="flex space-x-1 p-4">
      {positionTabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onPositionTabClick(tab.id)}
          className={`${
            activePosition === tab.id ? "" : "hover:text-primary/60"
          } relative rounded-full px-3 py-1.5 text-sm font-medium text-primary outline-sky-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          {activePosition === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-primary mix-blend-difference"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}
