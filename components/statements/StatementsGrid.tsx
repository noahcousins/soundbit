"use client";

import React, { useState } from "react";
import StatementsFilter from "@/components/statements/StatementsFilter";

import SmallStatementCard from "@/components/statements/SmallStatementCard";

export default function StatementsGrid({
  statementsData,
}: {
  statementsData: any;
}) {
  const [subjectSortOrder, setSubjectSortOrder] = useState("A-Z");
  const [dateSortOrder, setDateSortOrder] = useState("Newest");
  const [selectedDisclosureScore, setSelectedDisclosureScore] = useState(null);

  const handleSubjectSort = () => {
    setSubjectSortOrder(subjectSortOrder === "A-Z" ? "Z-A" : "A-Z");
  };

  const handleDateSort = () => {
    setDateSortOrder(dateSortOrder === "Newest" ? "Oldest" : "Newest");
  };

  const sortedStatements = [...statementsData];

  if (subjectSortOrder === "Z-A") {
    sortedStatements.sort((a, b) => b.subject.localeCompare(a.subject));
  } else {
    sortedStatements.sort((a, b) => a.subject.localeCompare(b.subject));
  }

  if (dateSortOrder === "Oldest") {
    sortedStatements.sort((a, b) => +new Date(a.date) - +new Date(b.date));
  } else {
    sortedStatements.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }

  const disclosureScores = Array.from(
    new Set(statementsData.map((statement: any) => statement.disclosureScore))
  ).sort((a, b) => Number(a) - Number(b));

  const filteredStatements = selectedDisclosureScore
    ? sortedStatements.filter(
        (statement) => statement.disclosureScore === selectedDisclosureScore
      )
    : sortedStatements;

  return (
    <div className="flex flex-col gap-4">
      <StatementsFilter
        subjectSortOrder={subjectSortOrder}
        handleSubjectSort={handleSubjectSort}
        dateSortOrder={dateSortOrder}
        handleDateSort={handleDateSort}
        //@ts-ignore
        disclosureScores={disclosureScores}
        selectedDisclosureScore={selectedDisclosureScore}
        setSelectedDisclosureScore={setSelectedDisclosureScore}
      />
      <div className="mx-auto grid w-fit grid-cols-1 gap-4 md:mx-0 md:grid-cols-2 2xl:grid-cols-3">
        {filteredStatements.map((statement) => (
          <SmallStatementCard
            statement={statement}
            index={statement.id}
            loading={undefined}
            session={undefined}
          />
        ))}
      </div>
    </div>
  );
}
