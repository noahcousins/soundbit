import LikeButton from '@/components/interaction/LikeButton';
import PoliticianBlip from '@/components/politicians/PoliticianBlip';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import Gauge from '@/components/statements/Gauge';
import SmallStatementCard from '@/components/statements/SmallStatementCard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Breadcrumbs from '@/components/util/Breadcrumbs';
import ValueColoredBlob from '@/components/util/ValueColoredBlob';
// Import functions from your API file
import { getBackgroundColor } from '@/utils/formatUtils';
import { checkLiked } from '@/utils/supabase/api/legacy/api';

import {
  fetchStatement,
  fetchStatementPolitician,
  fetchOtherStatements
} from '@/utils/supabase/api/legacy/api';
// Adjust the path accordingly

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cookies } from 'next/headers';

export async function generateMetadata({ params }: { params: any }) {
  const { handle } = params;
  const statement = await fetchStatement(handle);
  return {
    title: `"${statement?.quote}" - UAPoli`
  };
}

export default async function Statement({ params }: { params: any }) {
  const { handle } = params;

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    }
  );

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const statement = await fetchStatement(handle);

  const liked = await checkLiked({ session, statementId: statement!.id });

  const politician = await fetchStatementPolitician(statement!.politicianId!);
  const otherStatements = await fetchOtherStatements(statement!.politicianId);

  const mappedDisclosureValue = ((statement!.disclosureScore! + 10) / 20) * 100;
  const mappedBipartisanValue = ((statement!.bipartisanScore! + 10) / 20) * 100;

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-16 lg:gap-24">
      <div className="flex w-full justify-between">
        <Breadcrumbs
          items={[
            { name: 'Statements', link: '/statements' },
            { name: statement!.subject }
          ]}
        />
      </div>

      <div className="flex w-full gap-8 px-4 md:px-0 lg:px-12">
        <div className="absolute left-12 flex md:left-44 lg:left-64">
          <ValueColoredBlob value={statement!.bipartisanScore} />
        </div>

        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col justify-center gap-24">
            <div className="relative flex w-full flex-col gap-6">
              <div className="absolute -left-11 -top-12 select-none">
                <span className="text-scale-600 text-[160px] leading-none text-primary/25">
                  &ldquo;
                </span>
              </div>
              <blockquote className="z-10 text-xl lg:text-3xl">
                {statement?.quote}
              </blockquote>
              <div className="flex w-full justify-between">
                <PoliticianBlip politician={politician} isSmall={true} />{' '}
                <LikeButton
                  initialLiked={liked}
                  session={session}
                  statementId={statement!.id}
                />
              </div>
            </div>

            <div className="flex w-full flex-col">
              <p className="text-sm font-bold uppercase">
                {new Date(statement!.date!).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-left font-light text-primary">
                {statement!.text}
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex h-full w-full flex-col items-center gap-1">
                      {/* @ts-ignore */}
                      <Gauge
                        value={mappedBipartisanValue}
                        label={undefined}
                        units={undefined}
                        min={0}
                        max={100}
                      />
                      <p className="text-center text-xs font-light uppercase">
                        Bipartisan index
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="normal-case">
                      See which side of the aisle the statement falls on.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <HorizontalGallery
        heading="Other Statements"
        description={`Check out statements similar this one by ${
          politician!.name
        }.`}
        link="/legislations"
      >
        {otherStatements.map((otherStatement) => (
          <div className="w-fit snap-start" key={statement!.id}>
            <SmallStatementCard
              statement={otherStatement}
              index={undefined}
              loading={undefined}
              session={undefined}
            />
          </div>
        ))}
      </HorizontalGallery>
    </main>
  );
}
