import { SlideBlobOne } from "@/components/util/SvgImport";

const colorMap = [
  "#ff2424",
  "#ff235b",
  "#ff2293",
  "#ff21cc",
  "#f920ff",
  "#c01fff",
  "#861eff",
  "#4b1dff",
  "#1c28ff",
  "#1b61ff",
];

export default function ValueColoredBlob({ value }: { value: any }) {
  const colorIndex = Math.min(
    Math.max(Math.round(((value + 10) / 20) * (colorMap.length - 1)), 0),
    colorMap.length - 1
  );

  const fillColor = colorMap[colorIndex];

  return (
    <div className="bg-glow-4 absolute z-0 ">
      <SlideBlobOne fillColor={fillColor} />
    </div>
  );
}
