"use client";

import React, { useState } from "react";

import SmallPoliticianCard from "@/components/politicians/SmallPoliticianCard";
import PoliticianFilters from "@/components/politicians/PoliticianFilters";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function PoliticiansGrid({
  politiciansWithCounts,
}: {
  politiciansWithCounts: any;
}) {
  const [selectedParty, setSelectedParty] = useState("");
  const [selectedStates, setSelectedStates] = useState([""]);
  const [selectedPosition, setSelectedPosition] = useState("");

  const handlePartyFilter = (party: string) => {
    setSelectedParty(party);
  };

  const handleStateFilter = (states: any) => {
    setSelectedStates(states);
  };

  const handlePositionFilter = (position: string) => {
    setSelectedPosition(position);
  };

  const filteredPoliticians = selectedParty
    ? politiciansWithCounts.filter(
        (politician: any) => politician.party === selectedParty
      )
    : politiciansWithCounts;

  const filteredByStatePoliticians = filteredPoliticians.filter(
    (politician: any) =>
      selectedStates.length === 0 || selectedStates.includes(politician.state)
  );

  const filteredByPositionPoliticians = filteredByStatePoliticians.filter(
    (politician: any) =>
      !selectedPosition || politician.position === selectedPosition
  );

  return (
    <div className="flex flex-col gap-4">
      <PoliticianFilters
        selectedParty={selectedParty}
        handlePartyFilter={handlePartyFilter}
        //@ts-ignore
        selectedStates={selectedStates}
        handleStateFilter={handleStateFilter}
        politiciansWithCounts={politiciansWithCounts}
        selectedPosition={selectedPosition}
        handlePositionFilter={handlePositionFilter}
      />
      <div className="grid w-full grid-cols-1 justify-between gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredByPositionPoliticians.map((politician: any) => (
          <SmallPoliticianCard
            key={politician.id}
            politician={politician}
            legislationCount={politician.legislationCount}
            statementCount={politician.statementCount}
          />
        ))}
      </div>
    </div>
  );
}
