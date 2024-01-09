'use client';

import { useSearchParams } from 'next/navigation';

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');
  return (
    <>
      {error && (
        <p className="mt-4 rounded-3xl bg-foreground/10 p-4 text-center text-foreground">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 rounded-3xl bg-foreground/10 p-4 text-center text-foreground">
          {message}
        </p>
      )}
    </>
  );
}
