import { FaEdit, FaTrashAlt } from "react-icons/Fa";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

const AllMeals = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: meal = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals`);

      return res.data;
    },
  });
  console.log(meal);
  if (loading) {
    return <Loading></Loading>;
  }
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/meals/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${item.mealName} Deleted to the menu`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>All Meals | Meal Management</title>
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
                  <th>Update</th>
                  <th>Delete</th>
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

                    <td>
                      <Link to={`/dashboard/updateMeal/${item._id}`}>
                        <button className="btn text-xl btn-circle btn-outline bg-orange-500 text-white">
                          <FaEdit></FaEdit>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn  btn-circle btn-outline bg-red-600 text-white">
                        <FaTrashAlt></FaTrashAlt>
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

export default AllMeals;
