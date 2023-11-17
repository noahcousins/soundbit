import Link from "next/link";

const jokes = [
  "Seems like this page was abducted by aliens...",
  "We've lost contact with this page...",
  "This page is out of our radar range...",
  "This page has achieved light-speed and left the observable universe...",
  "This page seems to have encountered an unidentified flying error...",
  "This page has gone into stealth mode...",
  "This page has been classified as top secret...",
  "This page seems to have joined Area 51...",
  "This page is now invisible to our technology...",
  "It appears this page has been teleported to another dimension...",
];

const getRandomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
};

export default function Custom404() {
  return (
    <div className="flex flex-col space-y-8 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{getRandomJoke()}</h1>
      <div className="flex flex-col items-center">
        <p className="text-2xl">Sorry, this page is not found.</p>
        <p className="text-base">
          If you think this is by mistake, please report the error here.
        </p>
      </div>
      <Link className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" href="/">
        Back to Home
      </Link>
    </div>
  );
}
