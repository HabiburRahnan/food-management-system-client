import { Helmet } from "react-helmet";
// import MealCard from "./MealCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MealTab from "../../Components/MealsByCategory/MealTab";
import SectionTitle from "../../Components/SectionTitle";
// import MealsByCategory from "../../Components/MealsByCategory/MealsByCategory";

const Meals = () => {
  const axiosPublic = useAxiosPublic();

  const [search, setSearch] = useState("");
  const [asc, setAsc] = useState(true);
  const { data: meals = [], refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/meals?sort=${asc ? "asc" : "desc"}&search=${search}`
      );

      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
    // console.log(searchText);
  };

  const breakfasts = meals.filter((item) => item.type === "BreakFast");
  const lunch = meals.filter((item) => item.type === "Lunch");
  const dinner = meals.filter((item) => item.type === "Dinner");
  return (
    <div>
      <Helmet>
        <title>Meals | Meal Management</title>
      </Helmet>
      <SectionTitle heading="All Meals" subHeading="---------"></SectionTitle>

      <div className="flex justify-center md:justify-around items-center gap-2">
        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center  md:mx-0">
          <input
            type="text"
            name="search"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input type="submit" value="Search" className="btn btn-warning " />
        </form>
        <div className="">
          <button
            onClick={() => {
              refetch(), setAsc(!asc);
            }}
            className="btn text-white bg-orange-500 hover:bg-cyan-800">
            {asc ? "Price: High to Low" : "Price: Low To High"}
          </button>
        </div>
      </div>
      {/* <MealsByCategory></MealsByCategory> */}

      <div className="mb-10">
        <Tabs>
          {/* selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} */}
          <TabList className=" grid grid-cols-2 md:grid-cols-4 text-center items-center py-2 md:py-5 gap-5 md:gap-10 tabItem  mx-2">
            <Tab className="border border-blue-600 rounded-xl">All Meals</Tab>
            <Tab className="border border-blue-600 rounded-xl">Breakfast</Tab>
            <Tab className="border border-blue-600 rounded-xl">Lunch</Tab>
            <Tab className="border border-blue-600 rounded-xl">Dinner</Tab>
          </TabList>

          <TabPanel>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-0 md:gap-5 mt-10">
                {meals?.map((item) => (
                  <MealTab key={item._id} item={item}></MealTab>
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-0 md:gap-5 ">
              {breakfasts?.map((item) => (
                <MealTab key={item._id} item={item}></MealTab>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-0 md:gap-5 mt-10">
              {lunch?.map((item) => (
                <MealTab key={item._id} item={item}></MealTab>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-0 md:gap-5 mt-10">
              {dinner?.map((item) => (
                <MealTab key={item._id} item={item}></MealTab>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
        {meals?.map((meal) => (
          <MealCard key={meal._id} meal={meal}></MealCard>
        ))}
      </div> */}
    </div>
  );
};

export default Meals;
