import SingleCard from '@/components/tracks/SingleCard';

export default function CardGrid({
  title,
  children
}: {
  title: any;
  children: any;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* <p className="text-center text-base font-light uppercase">{title}</p> */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {children}
      </div>
    </div>
  );
}
