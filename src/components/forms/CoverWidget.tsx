'use client';

import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

export default function Cover({
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

  // useEffect(() => {
  //   async function downloadImage(path: string) {
  //     try {
  //       const { data, error } = await supabase.storage
  //         .from('avatars')
  //         .download(`${path}`);

  //       if (error) {
  //         console.log(error);
  //         throw error;
  //       }

  //       const url = URL.createObjectURL(data);
  //       setAvatarUrl(url);
  //     } catch (error) {
  //       console.log('Error downloading image: ', error);
  //     }
  //   }

  //   if (url) downloadImage(url);
  // }, [url, supabase]);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click?.(); // Optional chaining to prevent null/undefined error
    }
  };

  const uploadCover = async (event: any) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      const timestamp = new Date().toISOString();

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${timestamp}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('covers')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading cover!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex w-2/3 flex-col gap-4 text-center md:w-full">
      {url ? (
        <div className="relative aspect-video h-auto w-full">
          <Image
            onClick={openFileInput}
            fill
            objectFit="cover"
            src={`https://wiigbntntwayaoxtkrjv.supabase.co/storage/v1/object/public/covers/${url}`}
            alt="Cover"
            className="avatar image mx-auto w-64 cursor-pointer"
          />
        </div>
      ) : (
        <div
          onClick={openFileInput}
          className="avatar no-image mx-auto rounded-full bg-white/5"
          style={{ height: size, width: size }}
        />
      )}
      <div className="mx-auto flex w-full" style={{ width: size }}>
        {/* <p className="">{uploading ? 'Uploading ...' : ''}</p> */}
        <input
          ref={fileInputRef}
          style={{
            display: 'none'
          }}
          type="file"
          accept="image/*"
          onChange={uploadCover}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
