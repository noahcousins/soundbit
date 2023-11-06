import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AiOutlineTwitter, AiOutlineLink } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { formatState, formatParty } from "@/utils/formatUtils"; // Adjust the import path accordingly.

export default function PoliticianDetails({ politician }: { politician: any }) {
  const getBackgroundColor = (party: string) => {
    if (party === "Republican") {
      return "radial-gradient(100% 100% at 0% 0%, #cf3e3e18, transparent)";
    } else if (party === "Democrat") {
      return "radial-gradient(100% 100% at 0% 0%, #3EACCF18, transparent)";
    } else {
      return "";
    }
  };

  const truncateBio = (bio: string, maxWords: number) => {
    const words = bio.split(" ");
    if (words.length <= maxWords) {
      return bio;
    }
    const truncatedWords = words.slice(0, maxWords);
    return truncatedWords.join(" ") + "...";
  };

  const truncatedBio = truncateBio(politician.biography, 45);

  const termDates = JSON.parse(politician.termDates);

  return (
    <div className="border-scale-500 hover:border-scale-700 dark:bg-scale-300 hover:border-primary/ group relative flex w-full gap-8 overflow-hidden rounded-2xl border-[1px] border-primary/10 p-8 text-left transition-all duration-100">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary to-transparent opacity-5"></div>

      <div className="absolute inset-0 z-0 bg-gradient-to-bl from-primary to-transparent opacity-5"></div>
      <div
        style={{
          background: getBackgroundColor(politician.party),
        }}
        className="absolute left-0 top-0 z-0 h-[150px] w-[250px] scale-100 transform opacity-50 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100"
      ></div>
      <div className="z-10 flex-col gap-8">
        <div className="my-auto flex h-fit flex-col items-center space-x-0 space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
          <div className="rounded-full sm:flex-shrink-0">
            <Image
              layout="fit"
              width={450}
              height={450}
              alt={`Image of ${politician.name}`}
              className="h-72 w-72 rounded-full object-cover md:h-64 md:w-64"
              src={politician.pictureUrl}
            />
          </div>
          <div className="flex h-full w-full flex-col content-between justify-between gap-2">
            <div className="flex h-fit flex-col text-center lg:text-left">
              <h3 className="text-base font-extralight uppercase text-primary opacity-60">
                {politician.position}
              </h3>
              <div className="flex h-fit flex-col items-center gap-2 lg:flex-row">
                <h2 className="text-2xl font-bold text-primary">
                  {politician.name}
                </h2>
                <p className="text-primary">
                  {formatParty(politician.party)}
                  <span className="">-{formatState(politician.state)}</span>
                </p>
              </div>
            </div>

            {/*        <p className="mt-2 text-primary text-opacity-50">
              Email:{" "}
              <a href={`mailto:${politician.email}`} className="text-primary">
                {politician.email}
              </a>
            </p> */}

            <Dialog>
              <DialogTrigger className="text-left">
                <div className="max-w-3xl text-center font-light text-primary/90 transition-all duration-200 hover:text-primary/100 lg:text-left">
                  {truncatedBio}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <div className="my-auto flex h-fit flex-col items-center space-x-0 space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
                    <div className="rounded-full sm:flex-shrink-0">
                      <Image
                        layout="fit"
                        width={450}
                        height={450}
                        alt={`Image of ${politician.name}`}
                        className="h-72 w-72 rounded-full object-cover md:h-64 md:w-64"
                        src={politician.pictureUrl}
                      />
                    </div>
                    <div className="flex h-full w-full flex-col content-between justify-between gap-2">
                      <div className="flex h-fit flex-col">
                        <h3 className="text-left text-base font-extralight uppercase text-primary opacity-60">
                          {politician.position}
                        </h3>
                        <div className="flex h-fit items-center gap-2">
                          <h2 className="text-2xl font-bold text-primary">
                            {politician.name}
                          </h2>
                          <p className="text-primary">
                            {formatParty(politician.party)}
                            <span className="">
                              -{formatState(politician.state)}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/*        <p className="mt-2 text-primary text-opacity-50">
              Email:{" "}
              <a href={`mailto:${politician.email}`} className="text-primary">
                {politician.email}
              </a>
            </p> */}
                      <div className="max-w-3xl text-left font-light text-primary">
                        {politician.biography}
                      </div>
                      <div className="my-auto flex flex-row items-center justify-between lg:flex-col lg:items-start lg:justify-start">
                        <div className="mt-2 flex flex-col text-primary">
                          <p className="text-xs font-extralight uppercase text-primary text-opacity-50">
                            IN OFFICE
                          </p>
                          <p className=" ">
                            {politician.yearIn} -{" "}
                            {politician.yearOut === "Present"
                              ? "Present"
                              : politician.yearOut}
                          </p>
                        </div>

                        <div className="flex items-center text-primary text-opacity-50">
                          <a href={politician.twitter} className="text-primary">
                            <AiOutlineTwitter size={28} />
                          </a>
                          <a
                            href={politician.facebook}
                            className="text-primary"
                          >
                            <BiLogoFacebook size={28} />
                          </a>
                          <a
                            href={politician.officialWebsite}
                            className="text-primary"
                          >
                            <AiOutlineLink size={28} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <div className="my-auto flex flex-row items-center justify-between lg:flex-col lg:items-start lg:justify-start">
              <div className="mt-2 flex flex-col text-primary">
                <p className="text-xs font-extralight uppercase text-primary text-opacity-50">
                  IN OFFICE
                </p>
                <p className=" ">
                  {politician.yearIn} -{" "}
                  {politician.yearOut === "Present"
                    ? "Present"
                    : politician.yearOut}
                </p>
              </div>
              <div className="flex items-center text-primary text-opacity-50">
                <a href={politician.twitter} className="text-primary">
                  <AiOutlineTwitter size={28} />
                </a>
                <a href={politician.facebook} className="text-primary">
                  <BiLogoFacebook size={28} />
                </a>
                <a href={politician.officialWebsite} className="text-primary">
                  <AiOutlineLink size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
