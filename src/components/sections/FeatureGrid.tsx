import { Disc3, Music } from 'lucide-react';
import ShareCell from '@/components/features/ShareCell';

const people = [
  { name: '1', src: '/avatars/1.svg', active: false },
  { name: '2', src: '/avatars/2.svg', active: true },
  { name: '3', src: '/avatars/3.svg', active: false },
  { name: '4', src: '/avatars/4.svg', active: false },
  { name: '5', src: '/avatars/5.svg', active: false },
  { name: '6', src: '/avatars/6.svg', active: false },
  { name: '7', src: '/avatars/7.svg', active: true },
  { name: '8', src: '/avatars/8.svg', active: false },
  { name: '9', src: '/avatars/9.svg', active: false },
  { name: '10', src: '/avatars/10.svg', active: true },
  { name: '11', src: '/avatars/11.svg', active: false },
  { name: '12', src: '/avatars/12.svg', active: false }
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 pb-16 lg:grid-cols-3 lg:gap-16 xl:px-0">
      <article className="group flex h-80 w-full flex-col overflow-hidden rounded-2xl border-[1px] border-white/40 bg-background lg:w-96">
        <div className="relative flex h-1/2 items-center justify-center overflow-hidden border-b-[1px] border-white/40 bg-gradient-radial from-white/5 to-[#181818] transition-all duration-200 ease-in-out">
          <div className="absolute flex h-[100px] w-[100px] items-center justify-center rounded-full border-[1px] border-[#FF2E01] bg-[#631301] transition-all duration-200 ease-in-out group-hover:h-[140px] group-hover:w-[140px]">
            <Disc3
              className="rotate-0 duration-200 ease-in-out group-hover:rotate-180"
              stroke="#FF2E01"
              size={48}
              style={{ height: '50%', width: '50%' }}
            />
          </div>

          <div className="absolute h-[150px] w-[150px] rounded-full border-[1px] border-[#FF2E01] transition-all duration-200 ease-in-out group-hover:h-[175px] group-hover:w-[175px]"></div>
          <div className="absolute h-[200px] w-[200px] rounded-full border-[1px] border-[#FF2E01] transition-all duration-200 ease-in-out group-hover:h-[225px] group-hover:w-[225px]"></div>
          <div className="absolute h-[250px] w-[250px] rounded-full border-[1px] border-[#FF2E01] transition-all duration-200 ease-in-out group-hover:h-[275px] group-hover:w-[275px]"></div>
          <div className="absolute h-[300px] w-[300px] rounded-full border-[1px] border-[#FF2E01] transition-all duration-200 ease-in-out group-hover:h-[325px] group-hover:w-[325px]"></div>
        </div>
        <div className="flex h-1/2 flex-col bg-white/[3%] px-4 py-6">
          <h3 className="mb-3 text-xl font-medium">
            All your music, in one place
          </h3>
          <p className="font-light text-white/50">
            Get started by choosing your Spotify profile. We'll make sure it's
            always up to date.
          </p>
        </div>
      </article>
      <article className="group flex h-80 w-full flex-col overflow-hidden rounded-2xl border-[1px] border-white/40 bg-background lg:w-96">
        <div className="relative h-1/2 overflow-hidden border-b-[1px] border-white/40 bg-gradient-radial from-white/5 to-[#181818] px-4 pt-4 transition-all duration-200 ease-in-out group-hover:px-6 group-hover:pt-6">
          <div className="grid h-full w-full grid-cols-5 items-center justify-center gap-2 rounded-t-lg bg-[#FF2E01] p-4">
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="flex h-full w-full flex-col gap-1">
                <div
                  className={`aspect-square h-auto w-full bg-black/25 transition-opacity ${
                    index % 2 === 0
                      ? 'group-hover:opacity-50'
                      : 'group-hover:opacity-75'
                  }`}
                ></div>
                <div className="flex flex-col gap-1">
                  <div className="h-1 w-full bg-black/25"></div>
                  <div className="h-1 w-3/4 bg-black/25"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-1/2 flex-col bg-white/[3%] px-4 py-6">
          <h3 className="mb-3 text-xl font-medium">Customize your way</h3>
          <p className="font-light text-white/50">
            Display your full catalog, top tracks, or both. Choose the music you
            don't want to show.
          </p>
        </div>
      </article>
      <article className="group flex h-80 w-full flex-col overflow-hidden rounded-2xl border-[1px] border-white/40 bg-background lg:w-96">
        <div className="relative flex h-1/2 flex-col items-center justify-center gap-2 overflow-hidden border-b-[1px] border-white/40 bg-gradient-radial from-white/5 to-[#181818] transition-all duration-200 ease-in-out">
          <div className="flex -translate-x-14 flex-row gap-2 transition-transform duration-200 group-hover:-translate-x-4">
            {people.slice(0, 4).map((person: any, index: number) => (
              <ShareCell key={index} person={person} />
            ))}
          </div>
          <div className="flex translate-x-2 flex-row gap-2 transition-transform duration-200 group-hover:-translate-x-14">
            {people.slice(4, 8).map((person: any, index: number) => (
              <ShareCell key={index} person={person} />
            ))}
          </div>
          <div className="flex -translate-x-4 flex-row gap-2 transition-transform duration-200 group-hover:translate-x-2">
            {people.slice(8, 12).map((person: any, index: number) => (
              <ShareCell key={index} person={person} />
            ))}
          </div>
        </div>
        <div className="flex h-1/2 flex-col bg-white/[3%] px-4 py-6">
          <h3 className="mb-3 text-xl font-medium">Share with the world</h3>
          <p className="font-light text-white/50">
            Share your new site with the world. Create a short, memorable link
            to send to anybody.
          </p>
        </div>
      </article>
    </section>
  );
}
