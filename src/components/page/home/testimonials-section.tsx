import { testimonials } from "@/lib/data";
import { User2 } from "lucide-react";
import React from "react";

export const TestimonialSection: React.FC = () => {
  return (
    <div className="grid gap-14 max-w-lg w-full mx-auto lg:gap-8 lg:grid-cols-3 lg:max-w-full">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="">
          <div className="flex items-center mb-4 w-full justify-center lg:justify-start">
            <div className="p-2 bg-gray-200 rounded-full">
              <User2 />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-primary">
                {testimonial.name}
              </h3>
              <p className="text-sm text-foreground-accent">
                {testimonial.role}
              </p>
            </div>
          </div>
          <p className="text-foreground-accent text-center lg:text-left">
            &quot;{testimonial.message}&quot;
          </p>
        </div>
      ))}
    </div>
  );
};
