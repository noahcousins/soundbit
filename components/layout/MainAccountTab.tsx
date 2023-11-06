"use client";

import React, { useState, useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DropdownLogOutButton from "@/components/layout/DropdownLogOutButton";
import SignOutButton from "@/components/layout/SignOutButton";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function MainAccountTab({ sessionUser }: { sessionUser: any }) {
  const fallbackInitials =
    sessionUser && sessionUser.email.slice(0, 2).toUpperCase();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to the home page after signing out
  };

  // console.log(sessionUser, "dodo2dodo");

  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [loading, setLoading] = useState(true);

  // Fetch user profile function
  const fetchUserProfile = async () => {
    if (sessionUser) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", sessionUser.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
      } else {
        setUserData(data);
        setLoading(false);
      }
    }
  };

  // Fetch user profile function
  const fetchUserRole = async () => {
    if (sessionUser) {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sessionUser.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
      } else {
        //@ts-ignore
        setUserRole(data);
        setLoading(false);
      }
    }
  };

  // useEffect to fetch user profile
  useEffect(() => {
    fetchUserProfile();
    fetchUserRole();
  }, [sessionUser]);

  // console.log(userData, "dodoweee");

  return (
    <div className="flex w-fit items-center space-x-4">
      <div className="flex items-center space-x-4">
        <p className="hidden whitespace-nowrap text-sm text-primary/90 md:flex">
          {/* @ts-ignore */}
          Hello, {userData?.username || sessionUser?.email}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="order-1 flex cursor-pointer rounded-full border-2 border-white/30 transition-all duration-200 ease-in-out hover:border-white">
              {/* Wrap the components in a parent div */}
              <Avatar>
                {/* <AvatarImage src={sessionUser.image_url} alt="@shadcn" /> */}
                <AvatarFallback>{fallbackInitials}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[1000] w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/account/profile"}>
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </DropdownMenuItem>
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
            {!loading && userData && userData.role === "admin" && (
              <>
                <DropdownMenuSeparator />
                <Link href={"/admin"}>
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
