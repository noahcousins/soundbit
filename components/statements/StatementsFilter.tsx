import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function StatementsFilter({
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
      {/* <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <span>Filter by Disclosure Score:</span>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex gap-2">
              {disclosureScores.map((score) => (
                <button
                  key={score}
                  onClick={() => setSelectedDisclosureScore(score)}
                >
                  {score}
                </button>
              ))}
              <button onClick={() => setSelectedDisclosureScore(null)}>
                Show All
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div> */}
    </div>
  );
}
