import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import MealByCategory from "../MealByCategory/MealByCategory";
import HeroSection from "../HeroSection/HeroSection";
import MemberSection from "../MemberSection/MemberSection";
import SectionTitle from "../../../Components/SectionTitle";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Meal Management</title>
      </Helmet>
      <Banner></Banner>
      <SectionTitle
        heading="Meal Category"
        subHeading="Meal Category"></SectionTitle>
      <MealByCategory></MealByCategory>
      <SectionTitle
        heading="Member Ship"
        subHeading="memberShip"></SectionTitle>
      <MemberSection></MemberSection>
      <Contact></Contact>
      <HeroSection></HeroSection>
    </div>
  );
};

export default Home;
