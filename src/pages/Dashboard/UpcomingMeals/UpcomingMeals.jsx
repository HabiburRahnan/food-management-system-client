import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import SectionTitle from "../../../Components/SectionTitle";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: meal = [],

    isPending: loading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upcoming`);

      return res.data;
    },
  });
  // console.log(meal);
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Helmet>
        <title>Upcoming Meal | Meal Management</title>
      </Helmet>

      <SectionTitle
        heading="Manage Meals"
        subHeading="this Meals"></SectionTitle>
      <div className="w-96 md:w-full">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Views Details</th>
                  <th>Image</th>
                  <th>Meals Name</th>
                  <th>Admin Name</th>
                  <th>Admin Email</th>
                  <th>Reviews</th>
                  <th>Like</th>
                </tr>
              </thead>
              <tbody>
                {meal?.map((item) => (
                  <tr key={item._id}>
                    <th>
                      <Link to={`/meals/${item?._id}`}>Views</Link>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.mealName}</td>
                    <td>{item.adminName}</td>
                    <td>{item.adminEmail}</td>
                    <td>{item.reviews}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeals;
