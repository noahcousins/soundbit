import Link from 'next/link';
import ModeToggle from '../ui/ModeToggle';
import DarkModeSvg from '../icons/DarkModeSvg';

const footerLinks = [
  { name: 'My Site', href: '/' },
  { name: 'Customize', href: '/customize' },
  // { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
  // { name: 'Terms & Privacy', href: '/terms-privacy' },
  { name: 'Contact', href: '/contact' }
];

export default function Footer({ siteData }: { siteData: any }) {
  let mySiteLink = { name: 'My Site', href: '/welcome' };

  if (siteData && siteData.handle) {
    mySiteLink.href = `/${siteData.handle}`;
  } else if (siteData) {
    mySiteLink.href = '/handle';
  }

  const modifiedFooterLinks = [
    mySiteLink,
    ...footerLinks.slice(1) // Exclude the original "My Site" link from the array
  ];
  return (
    <footer className="flex w-full flex-col justify-center gap-2 border-t border-t-foreground/10 p-8 text-center text-xs">
      <div className="flex w-full flex-col items-center justify-between gap-8 sm:flex-row sm:gap-0">
        <div className="order-2 flex w-full flex-col items-center gap-2 text-left sm:order-1 sm:flex-row">
          <p className="mx-auto flex items-center gap-1 sm:mx-0">
            <span className="font-grtsk-giga font-bold">soundbit.</span> © 2024
          </p>
          <DarkModeSvg />
        </div>
        <div className="order-1 flex h-full w-64 select-none flex-col justify-between gap-8 sm:order-2 sm:flex-row">
          <ul className="flex h-full w-full flex-col justify-between text-center text-xl sm:text-left sm:text-sm">
            {modifiedFooterLinks.slice(0, 3).map((item: any, i: number) => (
              <Link
                href={item.href}
                className="w-full opacity-100 hover:opacity-60 active:opacity-80 sm:w-fit"
              >
                <li key={i} className="">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <ul className="flex h-full w-full flex-col justify-between text-center text-xl sm:w-fit sm:text-left sm:text-sm">
            {modifiedFooterLinks.slice(3, 6).map((item: any, i: number) => (
              <Link
                href={item.href}
                className="w-full opacity-100 hover:opacity-60 active:opacity-80"
              >
                <li key={i} className="">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
