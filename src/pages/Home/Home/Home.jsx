import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import MealByCategory from "../MealByCategory/MealByCategory";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Meal Management</title>
      </Helmet>
      <Banner></Banner>
      <MealByCategory></MealByCategory>
    </div>
  );
};

export default Home;
