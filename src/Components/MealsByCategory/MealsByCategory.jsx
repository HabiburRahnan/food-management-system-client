import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MealTab from "./MealTab";
import Loading from "../Loading";

const MealsByCategory = () => {
  const axiosPublic = useAxiosPublic();

  const { data: meals = [], isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals`);

      return res.data;
    },
  });
  if (isPending) <Loading></Loading>;
  //   console.log(meals);
  const breakfasts = meals.filter((item) => item.type === "BreakFast");
  const lunch = meals.filter((item) => item.type === "Lunch");
  const dinner = meals.filter((item) => item.type === "Dinner");
  // console.log(breakfasts, dinner, lunch);
  return (
    <div className="mb-10" >
      <Tabs >
        {/* selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} */}
        <TabList className=" grid grid-cols-2 md:grid-cols-4 text-center items-center py-2 md:py-5 gap-5 md:gap-10 tabItem  mx-2">
          <Tab className="border border-blue-600 rounded-xl">All Meals</Tab>
          <Tab className="border border-blue-600 rounded-xl">Breakfast</Tab>
          <Tab className="border border-blue-600 rounded-xl">Lunch</Tab>
          <Tab className="border border-blue-600 rounded-xl">Dinner</Tab>
        </TabList>

        <TabPanel>
          <div >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-0 md:gap-5 mt-10">
              {meals?.map((item) => (
                <MealTab key={item._id} item={item}></MealTab>
              ))}
            </div>
          </div>
        </TabPanel>
        <TabPanel >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-0 md:gap-5 ">
            {breakfasts?.map((item) => (
              <MealTab key={item._id} item={item}></MealTab>
            ))}
          </div>
        </TabPanel>
        <TabPanel >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-0 md:gap-5 mt-10">
            {lunch?.map((item) => (
              <MealTab key={item._id} item={item}></MealTab>
            ))}
          </div>
        </TabPanel>
        <TabPanel >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-0 md:gap-5 mt-10">
            {dinner?.map((item) => (
              <MealTab key={item._id} item={item}></MealTab>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MealsByCategory;
