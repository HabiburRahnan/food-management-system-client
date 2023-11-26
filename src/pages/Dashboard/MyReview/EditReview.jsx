import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const EditReview = () => {
  const review = useLoaderData();
  console.log(review);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const reviewsData = {
      user: user?.email,
      data,
    };
    const res = await axiosPublic.post("/reviews", reviewsData);
    if (res.data.acknowledged) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Review was successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center gap-2">
      {/* meal Reviews */}
      <div className="form-control w-full my-6">
        <label className="label">
          <span className="label-text">Reviews*</span>
        </label>
        <textarea
          required
          {...register("reviews")}
          //   defaultValue={revi}
          placeholder="reviews"
          className="textarea textarea-bordered textarea-lg w-full "></textarea>
      </div>
      <button
        type="submit"
        className=" btn  bg-gradient-to-r from-green-600 to-orange-500 text-white font-bold mb-5 md:mb-0 ">
        Edit Reviews
      </button>
    </form>
  );
};

export default EditReview;
