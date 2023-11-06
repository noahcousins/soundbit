"use client";

import React, { useState } from "react";
import LegislationFilters from "@/components/legislation/LegislationFilters";
import SmallLegislationCard from "@/components/legislation/SmallLegislationCard";

type Legislation = {
  date: string;
  title: string;
  // Other properties here
};

export default function LegislationGrid({
  legislationsWithUpdatedPoliticians,
}: {
  legislationsWithUpdatedPoliticians: any;
}) {
  const [subjectSortOrder, setSubjectSortOrder] = useState("A-Z");
  const [dateSortOrder, setDateSortOrder] = useState("Newest");
  const [filteredLegislations, setFilteredLegislations] = useState<
    Legislation[]
  >(legislationsWithUpdatedPoliticians);

  const handleSubjectSort = () => {
    setSubjectSortOrder(subjectSortOrder === "A-Z" ? "Z-A" : "A-Z");
    sortAndSetFilteredLegislations();
  };

  const handleDateSort = () => {
    setDateSortOrder(dateSortOrder === "Newest" ? "Oldest" : "Newest");
    sortAndSetFilteredLegislations();
  };

  const sortAndSetFilteredLegislations = () => {
    const sortedLegislations = [...filteredLegislations];

    if (subjectSortOrder === "Z-A") {
      sortedLegislations.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      sortedLegislations.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (dateSortOrder === "Oldest") {
      sortedLegislations.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      sortedLegislations.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    setFilteredLegislations(sortedLegislations);
  };

  // ... other filtering logic ...

  return (
    <div className="flex flex-col gap-4">
      <LegislationFilters
        subjectSortOrder={subjectSortOrder}
        handleSubjectSort={handleSubjectSort}
        dateSortOrder={dateSortOrder}
        handleDateSort={handleDateSort}
      />
      <div className="mx-auto grid w-fit grid-cols-1 gap-4 md:mx-0 md:grid-cols-2 lg:grid-cols-4">
        {filteredLegislations.map((legislation: any, index: any) => (
          <SmallLegislationCard
            key={index}
            legislation={legislation}
            //@ts-ignore
            politicians={legislation.politicians}
          />
        ))}
      </div>
    </div>
  );
}
