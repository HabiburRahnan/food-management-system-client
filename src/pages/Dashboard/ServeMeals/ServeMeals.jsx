import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ServeRow from "./ServeRow";
import Loading from "../../../Components/Loading";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/request`);

      return res.data;
    },
  });
  if (isPending) {
    <Loading></Loading>;
  }

  
  const handleServe = async (_id) => {
    const mealRes = await axiosSecure.patch(`/meals/${_id}`);
    console.log(mealRes);
  };
  
  return (
    <div>
      <Helmet>
        <title>Serve | Meal Management</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-orange-400 text-white ">
            <tr>
              <th>Name</th>
              <th>Like</th>
              <th>User Name</th>
              <th>Status</th>
              <th>serve</th>
            </tr>
          </thead>
          {data?.map((item) => (
            <ServeRow
              key={item?._id}
              item={item}
              handleServe={handleServe}></ServeRow>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ServeMeals;
