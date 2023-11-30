import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Components/SectionTitle";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const Upcoming = () => {
  const axiosSecure = useAxiosSecure();
  const [like, setLike] = useState(1);

  const {
    data: meal = [],

    isPending: loading,
  } = useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upcoming`);

      return res.data;
    },
  });
  const handleLike = () => {
    let totalLike = like + 1;
    setLike(totalLike);
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
                  <th>Image</th>
                  <th>Meals Name</th>
                  <th>Admin Name</th>
                  <th>Admin Email</th>
                  <th>Like</th>
                </tr>
              </thead>
              <tbody>
                {meal?.map((item) => (
                  <tr key={item._id}>
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
                    <td>
                      <div
                        onClick={handleLike}
                        className=" justify-center items-center gap-5 text-xl">
                        <button className="text-2xl">
                          {like ? <AiFillLike /> : <AiOutlineLike />}
                        </button>
                        <span>{like}</span>
                      </div>
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

export default Upcoming;
