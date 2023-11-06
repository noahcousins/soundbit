// PoliticianFilters.js

import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedTabs from "@/components/politicians/AnimatedTabs";
import AnimatedPositionTabs from "@/components/politicians/AnimatedPositionTabs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export default function PoliticianFilters({
  selectedParty,
  handlePartyFilter,
  selectedYearRange,
  handleYearRangeChange,
  politiciansWithCounts,
  handleStateFilter,
  selectedPosition,
  handlePositionFilter,
}: {
  selectedParty: any;
  handlePartyFilter: any;
  selectedYearRange: any;
  handleYearRangeChange: any;
  politiciansWithCounts: any;
  handleStateFilter: any;
  selectedPosition: any;
  handlePositionFilter: any;
}) {
  const [selectedStates, setSelectedStates] = useState([""]);

  const handleStateSelection = (state: string) => {
    let updatedStates;

    if (selectedStates.includes(state)) {
      updatedStates = selectedStates.filter((s) => s !== state);
    } else {
      updatedStates = [...selectedStates, state];
    }

    setSelectedStates(updatedStates);
    handleStateFilter(updatedStates);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Select party</Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="my-auto flex h-fit">
              <AnimatedTabs
                activeTab={selectedParty}
                onTabClick={handlePartyFilter}
              />
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">
              {selectedStates.length > 0
                ? `Selected States: ${selectedStates.join(", ")}`
                : "Select state"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[99] w-fit">
            <div className="my-auto flex h-fit w-fit">
              {/* Existing code for state filter */}
              <ScrollArea className="h-60 w-fit">
                <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                    States
                  </h4>
                  {Array.from(
                    new Set(
                      politiciansWithCounts.map(
                        (politician: any) => politician.state
                      )
                    )
                  )
                    .sort()
                    .map((state: any, index) => (
                      <React.Fragment key={index}>
                        <div
                          className={`cursor-pointer rounded-sm bg-white bg-opacity-0 p-1 text-sm transition-all duration-100 ease-in-out hover:bg-opacity-10 ${
                            selectedStates.includes(state)
                              ? "bg-opacity-10"
                              : ""
                          }`}
                          onClick={() => handleStateSelection(state)}
                        >
                          {state}
                        </div>
                        <Separator className="my-2" />
                      </React.Fragment>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">
              {selectedPosition ? selectedPosition : "Select position"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="my-auto flex h-fit">
              <AnimatedPositionTabs
                activePosition={selectedPosition}
                onPositionTabClick={handlePositionFilter}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-row gap-4">
        {selectedParty && (
          <div className="mt-2 flex flex-wrap gap-2">
            <div className="my-auto flex cursor-pointer items-center rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              {selectedParty}
            </div>
          </div>
        )}

        <div className="mt-2 flex flex-wrap gap-2">
          {selectedStates.map((state) => (
            <div
              key={state}
              className="my-auto flex cursor-pointer items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary transition-all duration-100 ease-in-out hover:bg-primary/20"
              onClick={() => handleStateSelection(state)}
            >
              <X className="h-3 w-3" />
              {state}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
