import { heroDetails } from "@/lib/data";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <>
      <section
        id="hero"
        className="w-full flex items-center justify-center px-5 min-h-[35rem] py-20 md:py-30"
      >
        <div className="absolute left-0 top-0 bottom-0 z-10 w-full">
          <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        </div>

        <div className="absolute h-full w-full bg-slate-950 top-0 right-0">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
        </div>

        <div className="text-center z-20">
          <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto text-white">
            {heroDetails.heading}
          </h1>
          <p className="mt-4 text-foreground max-w-lg mx-auto text-white">
            {heroDetails.subheading}
          </p>
          <button className="mt-5 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
              Get started
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
