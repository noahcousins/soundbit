export default function LogInLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full">{children}</div>
    </div>
  );
}
