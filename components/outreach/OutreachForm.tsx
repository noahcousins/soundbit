'use client';

import TemplateForm from '@/components/forms/TemplateForm';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';

export default function OutreachForm({
  politiciansData,
  session,
  templates
}: {
  politiciansData: any;
  session: any;
  templates: any;
}) {
  const [openItem, setOpenItem] = useState(null);

  // Function to handle opening/closing accordion items
  const handleAccordionClick = (itemId: any) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <>
      {politiciansData.data!.map((politician: any) => {
        const formattedName = formatName(
          politician.position!,
          politician.name!
        );

        return (
          <Accordion
            className="mx-auto w-full"
            type="single"
            collapsible
            key={politician.id}
          >
            <AccordionItem
              className="items-start text-left"
              value={`item-${politician.id}`}
            >
              <AccordionTrigger
                onClick={() => handleAccordionClick(`item-${politician.id}`)}
              >
                <div className="flex items-center gap-4">
                  <Image
                    width={100}
                    height={100}
                    src={politician?.pictureUrl!}
                    alt={`Photo of ${politician?.name}`}
                    className={
                      'aspect-square h-12 w-12 rounded-full object-cover'
                    }
                  />
                  <div className="flex flex-col">
                    <p className="">{formattedName}</p>
                    <p className="text-left text-xs uppercase">
                      {politician.state}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-2">
                  <Link
                    href={`tel:${politician.phone_number}`}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <div className="flex flex-col items-center">
                      <p className="">Call now</p>
                      <p className="text-xs uppercase">
                        {politician.phone_number}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={politician.officialWebsite!}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <div className="flex flex-col items-center">
                      <p className="">Email</p>
                    </div>
                  </Link>
                  <p className="">or</p>
                  <Link
                    href={politician.officialWebsite!}
                    className={buttonVariants({ variant: 'default' })}
                  >
                    <div className="flex flex-col items-center">
                      <p className="">One-click send with UAPoli</p>
                    </div>
                  </Link>
                </div>
                <TemplateForm
                  politician={politician}
                  session={session}
                  templates={templates}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
}

function formatName(position: string, name: string) {
  if (position === 'Senator') {
    return 'Sen. ' + name;
  } else if (position === 'Representative') {
    return 'Rep. ' + name;
  } else {
    return position + ' ' + name;
  }
}
