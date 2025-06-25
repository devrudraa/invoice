"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-10 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-10 justify-between ">
        <div className="w-full">
          <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>
          <h2 className="my-3 text-3xl lg:text-5xl lg:leading-tight font-bold !leading-snug lg:max-w-sm text-center lg:text-left">
            Frequently Asked Questions!
          </h2>
          <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
            Have a question in mind?
          </p>
          <a
            href="mailto:"
            className="mt-3 block text-xl lg:text-4xl text-gray-400 font-semibold hover:underline text-center lg:text-left"
          >
            contact@rudracode.com
          </a>
        </div>

        <div className="w-full min-w-lg lg:max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-7">
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
