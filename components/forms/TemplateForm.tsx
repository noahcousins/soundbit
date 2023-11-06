"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { addSend } from "@/utils/supabase/api"; // Replace "your-file" with the actual path to the file containing addSend

export default function TemplateForm({
  templates,
  session,
  politician,
}: {
  templates: any;
  session: any;
  politician: any;
}) {
  const [showCallScript, setShowCallScript] = useState(false);

  const toggleContent = showCallScript
    ? templates.templatesData[0].call_script
    : templates.templatesData[0].letter;

  const formattedContent = toggleContent.replace(/\n/g, "<br />");

  const handleAddSend = async () => {
    if (session) {
      const result = await addSend(
        templates.templatesData[0].id,
        session,
        politician
      );
      if (result) {
        // Send added successfully, you can handle the success case here
        console.log("Send added successfully.");
      } else {
        // Handle the error case
        // console.error("Error adding send.");
      }
    } else {
      // User not authenticated, handle this case as needed
      console.error("User not authenticated.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 pt-8">
      <div className="flex mx-auto flex-col items-center gap-2">
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
        <div className="text-lg flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            {" "}
            <h2>{showCallScript ? "Call Script" : "Letter Template"}</h2>
            <Button onClick={handleAddSend} variant="outline">
              One-click send with UAPoli
            </Button>
          </div>
          <div
            className="flex p-4 rounded-2xl border-[1px] border-primary/25 bg-primary/10"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>
      )}
    </div>
  );
}
