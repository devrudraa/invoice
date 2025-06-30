"use client";
import { benefit } from "@/types/type";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface Props {
  benefit: benefit;
  imageAtRight?: boolean;
}

const containerVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const childVariants: Variants = {
  offscreen: {
    opacity: 0,
    x: -50,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

const BenefitCard: React.FC<Props> = ({ benefit, imageAtRight }: Props) => {
  const { title, description, imageSrc, bullets, imageH, imageW } = benefit;

  return (
    <section className="benefit-section">
      <motion.div
        className="flex flex-wrap flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        <div className={clsx("mt-5 lg:mt-0", { "lg:order-2": imageAtRight })}>
          <div
            className={clsx("w-fit flex", {
              "justify-start": imageAtRight,
              "justify-end": !imageAtRight,
            })}
          >
            <Image
              src={imageSrc}
              alt="title"
              width={imageW || 384}
              height={imageH || 762}
              className="lg:ml-0 max-w-40 md:max-w-full"
            />
          </div>
        </div>
        <div
          className={clsx("flex flex-wrap  items-center w-full max-w-lg", {
            "justify-start": imageAtRight,
            "lg:order-1 justify-end": !imageAtRight,
          })}
        >
          <div className="w-full  text-center lg:text-left ">
            <motion.div
              className="flex flex-col w-full"
              variants={childVariants}
            >
              <h3 className="lg:max-w-2xl text-3xl lg:text-4xl lg:leading-tight font-bold">
                {title}
              </h3>

              <p className="mt-1.5 mx-auto lg:ml-0 leading-normal text-foreground-accent">
                {description}
              </p>
            </motion.div>

            <div className="mx-auto lg:ml-0 w-full">
              {bullets.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center mt-8 gap-3 lg:gap-5 lg:flex-row lg:items-start"
                  variants={childVariants}
                >
                  <div className="flex justify-center mx-auto lg:mx-0 flex-shrink-0 mt-3 w-fit">
                    <item.icon size={26} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-base text-foreground-accent">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BenefitCard;
