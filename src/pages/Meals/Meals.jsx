import { Helmet } from "react-helmet";
import MealCard from "./MealCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
// import MealsByCategory from "../../Components/MealsByCategory/MealsByCategory";

const Meals = () => {
  const axiosPublic = useAxiosPublic();

  const [search, setSearch] = useState("");
  const [asc, setAsc] = useState(true);
  const { data: meals = [], refetch } = useQuery({
    queryKey: ["users"],
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
  return (
    <div className="pt-20">
      <Helmet>
        <title>Meals | Meal Management</title>
      </Helmet>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
        {meals?.map((meal) => (
          <MealCard key={meal._id} meal={meal}></MealCard>
        ))}
      </div>
    </div>
  );
};

export default Meals;
