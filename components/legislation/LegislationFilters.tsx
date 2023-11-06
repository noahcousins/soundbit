// LegislationFilters.js
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function LegislationFilters({
  subjectSortOrder,
  handleSubjectSort,
  dateSortOrder,
  handleDateSort,
}: {
  subjectSortOrder: any;
  handleSubjectSort: any;
  dateSortOrder: any;
  handleDateSort: any;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 text-primary">
        <Button
          onClick={handleSubjectSort}
          className={buttonVariants({ variant: "secondary" })}
        >
          {subjectSortOrder}
        </Button>
        <Button
          onClick={handleDateSort}
          className={buttonVariants({ variant: "secondary" })}
        >
          {dateSortOrder}
        </Button>
      </div>
    </div>
  );
}

export default LegislationFilters;
