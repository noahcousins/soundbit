import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

export default function PoliticianAvatarUpload({
  onUpload,
  size
}: {
  onUpload: (url: string) => void;
  size: number;
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadAvatar(event.target.files[0]);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('politician_avatars') // Use the specified storage bucket name for politicians
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading politician avatar!');
      console.log(error, 'hehwhh wwe e f');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div>
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      </div>
      <div style={{ width: size }}>
        <Button
          variant={'secondary'}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? 'Uploading ...' : 'Upload'}
        </Button>
        <input
          ref={fileInputRef}
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
