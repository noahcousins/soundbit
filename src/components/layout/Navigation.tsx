import AuthButtons from './AuthButtons';
import MainAccountTab from './MainAccountTab';
import Link from 'next/link';

export default async function Navigation({
  userRoleData,
  profileData,
  siteData,
  user
}: {
  userRoleData: any;
  profileData: any;
  siteData: any;
  user: any;
}) {
  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-b-background/10 bg-background/95 px-3 text-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Link className="flex cursor-pointer" href="/">
        <span className="text font-grtsk-giga text-xl font-bold">
          soundbit.
        </span>
      </Link>
      <div className="flex">
        {user ? (
          <MainAccountTab
            userRole={userRoleData}
            profile={profileData}
            siteData={siteData}
            sessionUser={user}
          />
        ) : (
          <AuthButtons />
        )}
      </div>
    </nav>
  );
}
