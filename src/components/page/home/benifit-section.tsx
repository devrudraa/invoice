"use client";
import { benefits } from "@/lib/data";
import BenefitCard from "./benifit-card";

const BenefitsSection: React.FC = () => {
  return (
    <div id="features">
      <h2 className="sr-only">Features</h2>
      {benefits.map((item, index) => {
        return (
          <BenefitCard
            key={index}
            benefit={item}
            imageAtRight={index % 2 !== 0}
          />
        );
      })}
    </div>
  );
};

export default BenefitsSection;
