"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const tabs = [
  { id: "Democrat", label: "Democrat" },
  { id: null, label: "All" },
  { id: "Republican", label: "Republican" },
];

export default function AnimatedTabs({
  activeTab,
  onTabClick,
}: {
  activeTab: any;
  onTabClick: any;
}) {
  const [selectedParty, setSelectedParty] = useState("");

  const handlePartyFilter = (party: string) => {
    setSelectedParty(party);
    onTabClick(party);
  };

  return (
    <div className="flex space-x-1 p-4">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => handlePartyFilter(tab.id!)}
          className={`${
            activeTab === tab.id ? "" : "hover:text-primary/60"
          } relative rounded-full px-3 py-1.5 text-sm font-medium text-primary outline-sky-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          {activeTab === tab.id && (
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
