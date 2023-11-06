export default function SectionHeader({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div className="grid">
      {heading && <div className="text-4xl font-semibold">{heading}</div>}
      {description && (
        <div className="text-contrast-light text-sm lg:text-base">
          {description}
        </div>
      )}
    </div>
  );
}
