import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";

const MyReview = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: reviews = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${user?.email}`);

      return res.data;
    },
  });
  //   console.log(reviews);

  if (isPending) {
    <Loading></Loading>;
  }
  const handleDeleteReview = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/reviews/${_id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Review has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="bg-orange-400 text-white ">
          <tr>
            <th>Cancel</th>
            <th>Name</th>
            <th>Like</th>
            <th>Reviews</th>
            <th>Edit</th>
            <th>View Meal</th>
          </tr>
        </thead>
        {reviews?.map((review) => (
          <tbody key={review._id}>
            <tr className="bg-base-200">
              <th>
                <button
                  onClick={() => handleDeleteReview(review?._id)}
                  className="btn btn-circle btn-outline btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </th>
              <td>{review?.mealName}</td>
              <td>{review?.like?.length}</td>
              <td>{review?.data?.reviews}</td>

              <td>
                <Link
                  to={`/reviews/${review?._id}`}
                  className="btn btn-outline font-bold ">
                  Edit
                </Link>
              </td>
              <td>
                <Link
                  to={`/viewsDetails/${review?.mealsId}`}
                  className="btn btn-outline font-bold ">
                  View Details
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default MyReview;
