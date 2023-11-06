import dynamic from "next/dynamic";

export default function BipartisanGauge({
  bipartisanScore,
}: {
  bipartisanScore: number;
}) {
  const GaugeComponent = dynamic(() => import("react-gauge-component"), {
    ssr: false,
  });

  // Map the bipartisanScore from the range -10 to 10 to 0 to 100
  const mappedValue = ((bipartisanScore + 10) / 20) * 100;

  return (
    <div className="flex w-full ">
      <GaugeComponent
        type="semicircle"
        arc={{
          colorArray: ["#cf3e3e", "#3EACCF"],
          padding: 0.05,
          subArcs: [
            {
              limit: 10,
              color: "#F5CD19",
            },
            {
              limit: 20,
              color: "#5BE12C",
            },
            {
              limit: 30,
              color: "#F5CD19",
            },
            {
              limit: 40,
              color: "#5BE12C",
            },
            {
              limit: 50,
              color: "#F5CD19",
            },
            {
              limit: 60,
              color: "#EA4228",
            },
            {
              limit: 70,
              color: "#5BE12C",
            },
            {
              limit: 80,
              color: "#F5CD19",
            },
            {
              limit: 90,
              color: "#EA4228",
            },
            {
              color: "#5BE12C",
            },
          ],
        }}
        pointer={{ type: "blob", animationDelay: 0 }}
        value={mappedValue} // Use the mapped value here
      />
    </div>
  );
}
