"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Feather, Home, Scale, Flag } from "lucide-react"; // Import icons

function Step({
  step,
  legislationStage,
}: {
  step: number;
  legislationStage: number;
}) {
  const status =
    legislationStage === step
      ? "active"
      : legislationStage > step
      ? "complete"
      : "inactive";

  let icon;
  let labelText;

  switch (step) {
    case 1:
      icon = <Feather />;
      labelText = "Bill Proposed";
      break;
    case 2:
      icon = <Home />;
      labelText = "Passed the House";
      break;
    case 3:
      icon = <Scale />;
      labelText = "Passed the Senate";
      break;
    case 4:
      icon = <Flag />;
      labelText = "Signed by President";
      break;
    default:
      icon = null;
      labelText = "";
  }

  return (
    <motion.div animate={status} className="relative">
      <motion.div
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.2,
            },
          },
          complete: {
            scale: 1.25,
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "tween",
          ease: "circOut",
        }}
        className="absolute inset-0 rounded-full bg-[#ebbffe]"
      />

      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: "#fff", // neutral
            borderColor: "#ebbffe", // neutral-200
            color: "#a3a3a3", // neutral-400
          },
          active: {
            backgroundColor: "#fff",
            borderColor: "#a972ff", // blue-500
            color: "#bf3bf6", // blue-500
          },
          complete: {
            backgroundColor: "#895dff", // blue-500
            borderColor: "#a972ff", // blue-500
            color: "#bf3bf6", // blue-500
          },
        }}
        transition={{ duration: 0.2 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold"
      >
        <div className="flex items-center justify-center">
          {status === "complete" ? (
            <CheckIcon className="h-6 w-6 text-white" />
          ) : (
            icon // Use the appropriate icon for each step
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function LegislationWizard({
  legislation,
}: {
  legislation: any;
}) {
  const currentStage = legislation.stage;

  const stages = [
    { value: 1, label: `${legislation.bill} has been proposed.` },
    {
      value: 2,
      label: `${legislation.bill} has been proposed.`,
    },
    {
      value: 3,
      label: `${legislation.bill} has passed the House. It is now being reviewed by the Senate.`,
    },
    {
      value: 4,
      label: `${legislation.bill} has passed the Senate. It is now being reviewed by the President.`,
    },
  ];

  const currentStep = stages.find((stage) => stage.value === currentStage);

  return (
    <div className="flex w-full flex-col">
      <p className="mb-4 text-center text-sm">{currentStep!.label}</p>
      <div className="mx-auto flex w-fit justify-between gap-8 rounded p-2">
        {stages.map((stage) => (
          <Step
            key={stage.value}
            step={stage.value}
            //@ts-ignore
            currentStage={currentStage}
            legislationStage={currentStage}
          />
        ))}
      </div>
    </div>
  );
}
