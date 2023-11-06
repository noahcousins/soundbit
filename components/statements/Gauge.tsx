"use client";

import React, { useState, useEffect } from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { format } from "d3-format";

export default function Gauge({
  value = 50,
  min = 0,
  max = 100,
  label,
  units,
}: {
  value: number;
  min: number;
  max: number;
  label: any;
  units: any;
}) {
  const getCoordsOnArc = (angle: number, offset = 10) => [
    Math.cos(angle - Math.PI / 2) * offset,
    Math.sin(angle - Math.PI / 2) * offset,
  ];

  const stepCount = 10;
  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true);

  const stepColors = [
    "#1c28ff",
    "#4b1dff",
    "#861eff",
    "#c01fff",
    "#f920ff",
    "#ff21cc",
    "#ff2293",
    "#ff235b",
    "#ff2424",
  ].slice(0, stepCount);

  const stepAngles = Array.from({ length: stepCount }, (_, i) => {
    const stepPercent = i / (stepCount - 1);
    return angleScale(stepPercent);
  });

  const [animatedValue, setAnimatedValue] = useState(min);

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

  useEffect(() => {
    let startTimestamp: any;
    const duration = 1000;

    const updateValue = (timestamp: any) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const animatedProgress = easeInOutCubic(Math.min(progress, 1));
        const animatedVal = min + animatedProgress * (value - min);
        setAnimatedValue(animatedVal);
        requestAnimationFrame(updateValue);
      } else {
        setAnimatedValue(value);
      }
    };

    requestAnimationFrame(updateValue);
  }, [value, min]); // Include value and min in the dependency array

  return (
    <div style={{ textAlign: "center" }}>
      <svg
        style={{ overflow: "visible" }}
        width="9em"
        viewBox={[-1, -1, 2, 1].join(" ")}
      >
        <defs>
          <linearGradient
            id="Gauge__gradient"
            gradientUnits="userSpaceOnUse"
            x1="-1"
            x2="1"
            y2="0"
          >
            {stepColors.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (stepColors.length - 1)}`}
              />
            ))}
          </linearGradient>
        </defs>

        {stepAngles.map((angle, index) => (
          <path
            key={index}
            d={arc()
              .innerRadius(0.75)
              .outerRadius(1)
              .startAngle(angle)
              .endAngle(stepAngles[index + 1] || angleScale(1))
              //@ts-ignore
              .cornerRadius(1)({
              startAngle: angle,
              endAngle: stepAngles[index + 1] || angleScale(1),
            })}
            fill={stepColors[index]}
          />
        ))}

        <circle
          cx={
            getCoordsOnArc(
              angleScale(percentScale(animatedValue)),
              1 - (1 - 0.75) / 2
            )[0]
          }
          cy={
            getCoordsOnArc(
              angleScale(percentScale(animatedValue)),
              1 - (1 - 0.75) / 2
            )[1]
          }
          r="0.2"
          stroke="#2c3e50"
          strokeWidth="0.01"
          fill={
            stepColors[
              Math.floor((stepColors.length - 1) * percentScale(animatedValue))
            ]
          }
        />

        <path
          d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
          transform={`rotate(${
            angleScale(percentScale(animatedValue)) * (180 / Math.PI)
          }) translate(-0.2, -0.33)`}
          fill="#ffffff25"
        />
      </svg>
      <div
        style={{
          marginTop: "0.4em",
          fontSize: "3em",
          lineHeight: "1em",
          fontWeight: "900",
          fontFeatureSettings: "'zero', 'tnum' 1",
        }}
      >
        {format(",")(Math.round(animatedValue))}
      </div>
      {!!label && (
        <div
          style={{
            color: "#8b8ba7",
            marginTop: "0.6em",
            fontSize: "1.3em",
            lineHeight: "1.3em",
            fontWeight: "700",
          }}
        >
          {label}
        </div>
      )}
      {!!units && (
        <div
          style={{
            color: "#8b8ba7",
            lineHeight: "1.3em",
            fontWeight: "300",
          }}
        >
          {units}
        </div>
      )}
    </div>
  );
}
