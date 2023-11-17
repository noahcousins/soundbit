'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast'; // Import useToast hook

import { addSend } from '@/utils/supabase/api'; // Replace "your-file" with the actual path to the file containing addSend

export default function TemplateForm({
  templates,
  session,
  politician
}: {
  templates: any;
  session: any;
  politician: any;
}) {
  const [showCallScript, setShowCallScript] = useState(false);
  const { toast } = useToast();

  const toggleContent = showCallScript
    ? templates.templatesData[0].call_script
    : templates.templatesData[0].letter;

  const formattedContent = toggleContent.replace(/\n/g, '<br />');

  const handleSubmit = async () => {
    try {
      const result = await addSend(
        templates.templatesData[0].id,
        session,
        politician,
        toast
      );

      if (result) {
        // Send added successfully, you can handle the success case here
        console.log('Send added successfully.');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        duration: 5000 // Optional: Specify the duration for the toast
      });
      // Handle the error case and display the error message in a toast
      if (error.message) {
        const errorMessage = error.message;
      } else {
        // If specific details aren't available, display a generic error message
        toast({
          title: 'Error',
          description: 'Failed to add send. Please try again later.',
          duration: 5000 // Optional: Specify the duration for the toast
        });
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 pt-8">
      <div className="mx-auto flex flex-col items-center gap-2">
        <Label htmlFor="call-script">
          {showCallScript ? (
            <p className="font-normal">
              Email or <span className="font-bold">Call</span>
            </p>
          ) : (
            <p className="font-normal">
              <span className="font-bold">Email</span> or Call
            </p>
          )}
        </Label>
        <Switch
          defaultChecked={showCallScript}
          checked={showCallScript}
          onCheckedChange={(newChecked) => setShowCallScript(newChecked)}
        />
      </div>
      {toggleContent && (
        <div className="flex flex-col gap-4 text-lg">
          <div className="flex w-full items-center justify-between">
            {' '}
            <h2>{showCallScript ? 'Call Script' : 'Letter Template'}</h2>
            <Button onClick={handleSubmit} variant="outline">
              One-click send with UAPoli
            </Button>
          </div>
          <div
            className="flex max-w-2xl rounded-2xl border-[1px] border-primary/25 bg-primary/10 p-4"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>
      )}
    </div>
  );
}
