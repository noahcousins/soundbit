'use client';

import StatementPreviewRow from '@/components/statements/StatementPreviewRow';
import { SlideBlobOne } from '@/components/util/SvgImport';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function StatementPreviewGrid({
  statementsWithUpdatedPoliticians
}: {
  statementsWithUpdatedPoliticians: any;
}) {
  // Sorting by Recent
  const sortedRecentStatements = statementsWithUpdatedPoliticians
    .slice()
    .sort((a: any, b: any) => {
      return +new Date(b.date) - +new Date(a.date);
    });

  const itemsPerPage = 5;
  const [currentRecentPage, setCurrentRecentPage] = useState(1);

  const totalRecentItems = sortedRecentStatements.length;
  const totalRecentPages = Math.ceil(totalRecentItems / itemsPerPage);

  const handleRecentPageChange = (pageNumber: number) => {
    setCurrentRecentPage(pageNumber);
  };

  const startIndex = (currentRecentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const statementsToDisplay = sortedRecentStatements.slice(
    startIndex,
    endIndex
  );

  // Sorting by Trending
  const trendingStatements = statementsWithUpdatedPoliticians.filter(
    (statement: any) => statement.isTrending
  );

  const sortedTrendingStatements = trendingStatements
    .slice()
    .sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const [currentTrendingPage, setCurrentTrendingPage] = useState(1);

  const totalTrendingItems = sortedTrendingStatements.length;
  const totalTrendingPages = Math.ceil(totalTrendingItems / itemsPerPage);

  const handleTrendingPageChange = (pageNumber: number) => {
    setCurrentTrendingPage(pageNumber);
  };

  const trendingStartIndex = (currentTrendingPage - 1) * itemsPerPage;
  const trendingEndIndex = trendingStartIndex + itemsPerPage;
  const trendingStatementsToDisplay = sortedTrendingStatements.slice(
    trendingStartIndex,
    trendingEndIndex
  );

  //Sorting by Party
  const democratStatements = statementsWithUpdatedPoliticians.filter(
    (statement: any) =>
      statement.politicians[0]?.party.toLowerCase() === 'democrat'
  );

  const republicanStatements = statementsWithUpdatedPoliticians.filter(
    (statement: any) =>
      statement.politicians[0]?.party.toLowerCase() === 'republican'
  );

  // Democrat Statements Pagination
  const [currentDemocratPage, setCurrentDemocratPage] = useState(1);
  const totalDemocratItems = democratStatements.length;
  const totalDemocratPages = Math.ceil(totalDemocratItems / itemsPerPage);
  const democratStartIndex = (currentDemocratPage - 1) * itemsPerPage;
  const democratEndIndex = democratStartIndex + itemsPerPage;
  const sortedDemocratStatements = democratStatements.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const democratStatementsToDisplay = sortedDemocratStatements.slice(
    democratStartIndex,
    democratEndIndex
  );
  // Republican Statements Pagination
  const [currentRepublicanPage, setCurrentRepublicanPage] = useState(1);
  const totalRepublicanItems = republicanStatements.length;
  const totalRepublicanPages = Math.ceil(totalRepublicanItems / itemsPerPage);
  const republicanStartIndex = (currentRepublicanPage - 1) * itemsPerPage;
  const republicanEndIndex = republicanStartIndex + itemsPerPage;
  const sortedRepublicanStatements = republicanStatements.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const republicanStatementsToDisplay = sortedRepublicanStatements.slice(
    republicanStartIndex,
    republicanEndIndex
  );
  return (
    // remove overflow-hidden below to fix the gradient
    <div className="flex w-full flex-col overflow-hidden">
      <div className="flex h-full w-full flex-col gap-8 border-b-[1px] border-foreground/10 pb-8 lg:flex-row lg:gap-0 lg:pb-16">
        <div className="flex h-full w-full flex-col gap-8 border-b-[1px] border-r-[0px] border-foreground/10 py-8 lg:w-1/2 lg:border-b-[0px] lg:border-r-[1px] lg:py-0 lg:pr-16">
          <h3 className="text-[28px] font-semibold">Recent</h3>
          <div className="flex flex-col gap-4">
            {statementsToDisplay.map((statement: any, index: any) => (
              <StatementPreviewRow statement={statement} index={index} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="disabled:opacity-50"
              onClick={() =>
                handleRecentPageChange(
                  currentRecentPage - 1 > 0 ? currentRecentPage - 1 : 1
                )
              }
            >
              <ChevronLeft
                className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                size={24}
              />
            </button>
            <p className="text-xs">
              {currentRecentPage} of {totalRecentPages}
            </p>
            <button
              className="disabled:opacity-50"
              onClick={() =>
                handleRecentPageChange(
                  currentRecentPage + 1 <= totalRecentPages
                    ? currentRecentPage + 1
                    : totalRecentPages
                )
              }
            >
              <ChevronRight
                className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                size={24}
              />
            </button>
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-8 lg:w-1/2 lg:pl-16">
          <h3 className="text-[28px] font-semibold">Trending</h3>
          <div className="flex flex-col gap-4">
            {trendingStatementsToDisplay.map((statement: any, index: any) => (
              <StatementPreviewRow statement={statement} index={index} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="disabled:opacity-50"
              onClick={() =>
                handleTrendingPageChange(
                  currentTrendingPage - 1 > 0 ? currentTrendingPage - 1 : 1
                )
              }
            >
              <ChevronLeft
                className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                size={24}
              />
            </button>
            <p className="text-xs">
              {currentTrendingPage} of {totalTrendingPages}
            </p>
            <button
              className="disabled:opacity-50"
              onClick={() =>
                handleTrendingPageChange(
                  currentTrendingPage + 1 <= totalTrendingPages
                    ? currentTrendingPage + 1
                    : totalTrendingPages
                )
              }
            >
              <ChevronRight
                className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                size={24}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-8 border-b-[1px] border-foreground/10 py-8 lg:flex-row lg:gap-0 lg:py-16">
        <div className="relative flex h-full w-full flex-col gap-8 border-b-[1px] border-r-[0px] border-foreground/10 pb-8 lg:w-1/2 lg:border-b-[0px] lg:border-r-[1px] lg:py-0 lg:pr-16">
          <div className="bg-glow-4 absolute z-[20]">
            <SlideBlobOne fillColor="blue" />
          </div>
          <h3 className="z-30 text-[28px] font-semibold">Democrats</h3>
          <div className="z-30 flex flex-col gap-4">
            {democratStatementsToDisplay.map((statement: any, index: any) => (
              <StatementPreviewRow statement={statement} index={index} />
            ))}
          </div>
          <div className="z-30 flex items-center gap-2">
            <button
              className="disabled:opacity-50"
              onClick={() =>
                setCurrentDemocratPage(
                  currentDemocratPage - 1 > 0 ? currentDemocratPage - 1 : 1
                )
              }
            >
              <ChevronLeft
                className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                size={24}
              />
            </button>
            <p className="text-xs">
              {currentDemocratPage} of {totalDemocratPages}
            </p>
            <button
              className="disabled:opacity-50"
              onClick={() =>
                setCurrentDemocratPage(
                  currentDemocratPage + 1 <= totalDemocratPages
                    ? currentDemocratPage + 1
                    : totalDemocratPages
                )
              }
            >
              <ChevronRight
                className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                size={24}
              />
            </button>
          </div>
        </div>
        <div className="relative flex h-full w-full flex-col gap-8 lg:w-1/2 lg:pl-16">
          <div className="bg-glow-4 absolute z-[20]">
            <SlideBlobOne fillColor="red" />
          </div>
          <h3 className="z-30 text-[28px] font-semibold">Republicans</h3>
          <div className="z-30 flex flex-col gap-4">
            {republicanStatementsToDisplay.map((statement: any, index: any) => (
              <StatementPreviewRow statement={statement} index={index} />
            ))}
          </div>
          <div className="z-30 flex items-center gap-2">
            <button
              className="disabled:opacity-50"
              onClick={() =>
                setCurrentRepublicanPage(
                  currentRepublicanPage - 1 > 0 ? currentRepublicanPage - 1 : 1
                )
              }
            >
              <ChevronLeft
                className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                size={24}
              />
            </button>
            <p className="text-xs">
              {currentRepublicanPage} of {totalRepublicanPages}
            </p>
            <button
              className="disabled:opacity-50"
              onClick={() =>
                setCurrentRepublicanPage(
                  currentRepublicanPage + 1 <= totalRepublicanPages
                    ? currentRepublicanPage + 1
                    : totalRepublicanPages
                )
              }
            >
              <ChevronRight
                className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                size={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
