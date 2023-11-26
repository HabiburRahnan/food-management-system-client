import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import RequestRow from "./RequestRow";
import Swal from "sweetalert2";

const RequestMeals = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data = [], refetch } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/request/${user?.email}`);

      return res.data;
    },
  });
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews`);

      return res.data;
    },
  });
  //   request delete
  const handleDeleteRequest = (_id) => {
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
        axiosPublic.delete(`/request/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Request has been deleted.",
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
            <th>Status</th>
            <th>View Meal</th>
          </tr>
        </thead>
        {data?.map((item) => (
          <RequestRow
            key={item?._id}
            item={item}
            reviews={reviews}
            handleDeleteRequest={handleDeleteRequest}></RequestRow>
        ))}
      </table>
    </div>
  );
};

export default RequestMeals;
