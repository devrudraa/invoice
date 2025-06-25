import Image from "next/image";

const LogosSection: React.FC = () => {
  return (
    <section id="logos" className="py-10 px-5 bg-background">
      <p className="text-lg font-medium text-center">
        Trusted by <span className="text-blue-600">200k+</span> customers.
      </p>
      <div className="mt-5 w-full flex flex-wrap flex-row items-start justify-evenly gap-5 sm:gap-10 opacity-45 logos-container">
        <Image
          width={150}
          height={50}
          src={"/images/logos/shopify.png"}
          alt="shopify.png"
        />
        <Image
          width={150}
          height={50}
          src={"/images/logos/slack.png"}
          alt="slack.png"
        />
        <Image
          width={150}
          height={50}
          src={"/images/logos/spotify.png"}
          alt="spotify.png"
        />
        <Image
          width={50}
          height={50}
          src={"/images/logos/github.png"}
          alt="github.png"
        />
      </div>
    </section>
  );
};

export default LogosSection;
