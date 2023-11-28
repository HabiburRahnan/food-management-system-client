import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import SectionTitle from "../../../Components/SectionTitle";
import Swal from "sweetalert2";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: meals = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upcoming`);

      return res.data;
    },
  });
  const meal = meals[0];
  // console.log(meal);
  const mealItem = {
    mealName: meal?.mealName,
    type: meal?.type,
    Rating: meal?.Rating,
    date: meal?.date,
    price: parseFloat(meal?.Price),
    description: meal?.description,
    reviews: meal?.reviews,
    ingredients: meal?.ingredients,
    adminEmail: meal?.adminEmail,
    adminName: meal?.adminName,
    image: meal?.image,
  };
  console.log(mealItem);
  const handlePublish = async () => {
    const mealRes = await axiosSecure.post("/meals", mealItem);
    // console.log(mealRes.data);
    refetch();
    if (mealRes?.data?.insertedId) {
      const res = await axiosSecure.delete(`/upcoming/${meals[0]._id}`);
      console.log(res);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Meal published `,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
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
                  <th>Like</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {meals?.map((item) => (
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
                    <td>{item.like}</td>
                    <td>
                      <button
                        onClick={handlePublish}
                        className="btn bg-orange-400 text-white hover:bg-orange-600">
                        Publish
                      </button>
                    </td>
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
