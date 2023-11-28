import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle";
const ViewsDetails = () => {
  const meals = useLoaderData();
  const [like, setLike] = useState(false);
  const [reAction, setReAction] = useState(1);
  const [disable, setDisable] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email;
  const { register, handleSubmit } = useForm();
  const {
    _id,
    mealName,
    type,
    Rating: rating,
    date,
    price,
    description,
    ingredients,
    adminName,
    adminEmail,
    image,
  } = meals;

  const { data = [], refetch } = useQuery({
    queryKey: ["likes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/likeCount/${mealName}`);

      return res.data;
    },
  });
  console.log(data);
  useEffect(() => {
    const specificLike = data.filter((item) => item.userEmail !== userEmail);
    setReAction(specificLike.length);
  }, [data, userEmail]);

  const handleLike = () => {
    setLike(!like);
    const likeInfo = {
      reAction: reAction + 1,
      mealName: mealName,
      userEmail,
    };
    axiosSecure.post(`/likeCount`, likeInfo).then((res) => {
      if (res.data.insertedId) {
        setDisable(true);
        refetch();
      }
    });
  };
  // like related code end
  // reviews code start

  const onSubmit = async (data) => {
    const reviewsData = {
      user: user?.email,
      mealName,
      mealsId: _id,
      data,
      like: reAction,
    };
    const res = await axiosSecure.post("/reviews", reviewsData);
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

  // request related code
  const handleRequestMeal = async () => {
    const request = {
      mealName,
      mealsId: _id,
      email: user?.email,
      like: like?.length,
      status: "pending",
    };
    const res = await axiosSecure.post(`/request`, request);
    if (res.data.acknowledged) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your request was successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <title>ViewsDetails | Meal Management</title>
      </Helmet>
      <SectionTitle
        heading="Views Meals"
        subHeading="view details"></SectionTitle>
      <div className="card  bg-base-100 shadow-xl">
        <img
          className="lg:h-[500px] w-full px-2 rounded-xl "
          src={image}
          alt="Shoes"
        />

        <div className="card-body shadow-xl">
          <div className=" md:flex justify-between items-center text-sm md:text-xl font-semibold ">
            <h2 className="card-title   text-xl md:text-4xl font-extrabold ">
              <span>Meal Name:</span> {mealName}
            </h2>
            <h2 className="card-title text-2xl md:text-3xl ">
              <span>Admin Name:</span> {adminName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 justify-between items-center text-sm md:text-xl font-bold md:py-10">
            <p>
              <span>Date:</span> {date}
            </p>
            <p className="flex gap-2 items-center">
              <span>Rating:</span>
              <Rating style={{ maxWidth: 180 }} value={rating} readOnly />
            </p>
            <p className="md:ml-5">
              <span>Price:</span> ${price}
            </p>

            <p>
              <span>ingredients:</span> {ingredients}
            </p>
            <p>
              <span>Type:</span> {type}
            </p>
          </div>
          <p className="text-xl font-semibold">
            <span className=" text-2xl">Details: </span>
            {description}
          </p>

          <div className="card-actions grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  items-center">
            <div className="md:text-xl lg:text-2xl font-semibold  md:flex justify-between md:gap-10">
              <p>
                <span>Admin Email:</span> {adminEmail}
              </p>
            </div>

            <div className="flex justify-center items-center gap-10 ">
              <div
                onClick={handleLike}
                className=" justify-center items-center gap-5 text-xl">
                <button disabled={disable || !user?.email} className="text-2xl">
                  {like ? <AiFillLike /> : <AiOutlineLike />}
                </button>
                <span>{reAction}</span>
              </div>

              <button
                onClick={() => handleRequestMeal(_id)}
                className="btn  text-white bg-orange-400 hover:bg-orange-500">
                Request Meal
              </button>
            </div>
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
                  placeholder="reviews"
                  className="textarea textarea-bordered textarea-lg w-full "></textarea>
              </div>
              <button
                type="submit"
                className=" btn  bg-gradient-to-r from-green-600 to-orange-500 text-white font-bold mb-5 md:mb-0 ">
                add Reviews
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewsDetails;
