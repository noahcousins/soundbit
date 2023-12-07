'use client';

import DropdownLogOutButton from '@/components/layout/DropdownLogOutButton';
import SignOutButton from '@/components/layout/SignOutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { createBrowserClient } from '@supabase/ssr';
import {
  Cloud,
  CreditCard,
  Shield,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function MainAccountTab({
  sessionUser,
  profile,
  userRole
}: {
  sessionUser: any;
  profile: any;
  userRole: any;
}) {
  const fallbackInitials =
    sessionUser && sessionUser.email.slice(0, 2).toUpperCase();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to the home page after signing out
  };
  interface UserData {
    username: string;
    avatar_url: string;
    // Add other properties here as needed
  }

  interface UserRole {
    role: string;
    // Add other properties here as needed
  }

  const [avatarUrl, setAvatarUrl] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        // console.log('Error downloading image: ', error);
      }
    }

    if (profile?.avatar_url) downloadImage(profile?.avatar_url);
  }, [profile?.avatar_url, supabase]);

  return (
    <div className="flex w-fit items-center space-x-4">
      <div className="flex items-center space-x-4">
        <p className="hidden whitespace-nowrap text-sm text-primary/90 md:flex">
          {/* @ts-ignore */}
          Hello, {profile?.username || sessionUser?.email}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="order-1 flex cursor-pointer rounded-full border-2 border-white/30 transition-all duration-200 ease-in-out hover:border-white">
              {/* Wrap the components in a parent div */}
              <Avatar>
                <AvatarImage src={avatarUrl} alt="@shadcn" />
                <AvatarFallback>{fallbackInitials}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[1000] w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={'/profile'}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </Link>
              {/* <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem> */}
              <Link href={'/settings'}>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </Link>

              {/* <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            {/* @ts-ignore */}
            {!loading && userRole && userRole.role === 'admin' && (
              <>
                <DropdownMenuSeparator />
                <Link href={'/admin'}>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownLogOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
