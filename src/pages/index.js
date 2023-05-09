import Image from "../../public/images/heroimage.png";
import HeroImage from "@/components/UI/HeroImage";

const Index = () => {

  return (
    <>
      <HeroImage
        image={Image.src}
        title="Find and hire the best freelancers on Freelancer"
        text="With a powerful search engine, Freelancer ensures you can always find the right person for your project in just a few clicks."
      />
    </>
  );
};

export default Index;
