export default function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full">{children}</div>
    </div>
  );
}
