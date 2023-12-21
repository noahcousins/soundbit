'use client';

import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

export default function Avatar({
  uid,
  url,
  size,
  onUpload
}: {
  uid: string;
  url: string;
  size: number;
  onUpload: any;
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(`${path}`);

        console.log(data, 'plkekekek');
        if (error) {
          console.log(error, 'eorororororo');
          throw error;
        }

        const url = URL.createObjectURL(data);
        console.log(url, 'url here');
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click?.(); // Optional chaining to prevent null/undefined error
    }
  };

  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar!');
      console.log(error, 'hehwhh wwe e f');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto flex flex-col gap-4">
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={url}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div className="mx-auto flex w-full" style={{ width: size }}>
        <Button
          className="mx-auto"
          variant={'secondary'}
          onClick={openFileInput}
        >
          {uploading ? 'Uploading ...' : 'Upload'}
        </Button>
        <input
          ref={fileInputRef}
          style={{
            display: 'none'
          }}
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
