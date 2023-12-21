'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';

export default function Paywall() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return isOpen ? (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Access Restricted</AlertDialogTitle>
          <AlertDialogDescription>
            Please log in to access this content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </AlertDialogCancel> */}
          <AlertDialogAction asChild>
            <Button asChild>
              <Link href="/log-in">Login</Link>
            </Button>
          </AlertDialogAction>
          {/* Additional button for Sign Up can be added here */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : null;
}
