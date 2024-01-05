'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/src/components/ui/accordion';

const faqData = [
  {
    question: 'What is soundbit.?',
    answer:
      'soundbit. is a platform that allows musicians and artists to create a beautiful website from their Spotify artist profile.'
  },
  {
    question: 'How does it work?',
    answer:
      'You sign up, choose your Spotify artist profile, claim a unique link and hit create. soundbit. will build out your website based on your profile information. Then, you can change the design and personalize it a bit more!'
  },
  {
    question: 'Why is it different?',
    answer:
      'Popular site builders like Squarespace are bloated, complex and a pain to use and maintain. No matter what you do, the final result will not satisfy you. Simple options like Linktree are just, you know, too simple. soundbit. lands in the middle, as it allows you to have a beautiful website without all the complexity around designing, building and maintaining it!'
  },
  {
    question: 'Is it free to use?',
    answer:
      "Yes. You can create a site on soundbit. for free and keep it as much as you want. That said, we'll launch a Pro version that costs a small fee to access more themes and features (e.g. connecting to a custom domain) but the free version will always remain free."
  },
  {
    question: 'How can I contact you?',
    answer:
      'If you encountered a problem, have feedback or just wanna reach out, just send us an email to heysoundbit@gmail.com'
  },
  {
    question: 'Who made this?',
    answer: 'soundbit. is built by Noah Cousins.'
  }
];

export default function FAQ() {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8">
      <h2 className="text-center font-grtsk-giga text-4xl font-bold">FAQ</h2>
      <p className="mx-auto max-w-xl text-center">
        <span className="font-grtsk-giga font-bold">soundbit. </span> is a free,
        simple musician *website builder* that helps you create a unique website
        in seconds just from your Spotify profile.
      </p>
      <Accordion
        className="mx-auto w-full max-w-xl pb-24 lg:pb-48"
        type="single"
        collapsible
      >
        {faqData.map((faq: any, i: number) => {
          return (
            <AccordionItem key={i} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
