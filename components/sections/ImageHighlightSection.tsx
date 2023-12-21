import Image from 'next/image';

export default function ImageHighlightSection() {
  return (
    <div
      className={
        'mx-auto flex w-full max-w-5xl justify-center py-12 animate-in fade-in ' +
        ' delay-300 duration-1000 slide-in-from-top-16 fill-mode-both'
      }
    >
      <Image
        priority
        className={
          'rounded-2xl shadow-[0_0_1000px_0]' +
          ' shadow-purple-600/40 animate-in fade-in' +
          ' delay-300 duration-1000 ease-out zoom-in-50 fill-mode-both'
        }
        width={2688}
        height={1824}
        src={`/explore-dark.jpg`}
        alt={`App Image`}
      />
    </div>
  );
}
