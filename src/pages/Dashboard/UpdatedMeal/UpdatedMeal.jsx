import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hostingAPI = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatedMeal = () => {
  const {
    _id,
    mealName,
    type,
    Rating,
    date,
    price,
    description,
    ingredients,
    adminEmail,
    adminName,
    reviews,
  } = useLoaderData();

  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // image upload to image bb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosSecure.post(img_hostingAPI, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      //  image bb image url set server site api
      const mealItem = {
        mealName: data.mealName,
        type: data.type,
        Rating: data.Rating,
        date: data.date,
        price: parseFloat(data.Price),
        description: data.description,
        reviews: data.reviews,
        ingredients: data.ingredients,
        adminEmail: data.adminEmail,
        adminName: data.adminName,
        image: res.data?.data?.display_url,
      };
      console.log(mealItem);
      const mealRes = await axiosSecure.patch(`/meals/${_id}`, mealItem);
      console.log(mealRes);
      if (mealRes.data.modifiedCount > 0) {
        // reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.mealName} updated to the Meals`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Update Meal | Meal Management</title>
      </Helmet>
      <SectionTitle
        heading="Updated meals"
        subHeading="Whats New"></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* meal title */}
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Meal Title*</span>
          </label>
          <input
            {...register("mealName")}
            type="text"
            required
            defaultValue={mealName}
            placeholder="Meal Title"
            className="input input-bordered w-full "
          />
        </div>

        <div className="md:flex justify-center items-center gap-6">
          {/* category */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Meal Type*</span>
            </label>
            <select
              defaultValue={type}
              {...register("type", { required: true })}
              className="select select-bordered w-full">
              <option disabled defaultValue={"Select"}>
                Select a Type
              </option>
              <option value="BreakFast">BreakFast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
          {/* price */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Price*</span>
            </label>
            <input
              {...register("Price")}
              type="number"
              required
              defaultValue={price}
              placeholder="Price"
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="md:flex justify-center items-center gap-6">
          {/* ingredients */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Ingredients*</span>
            </label>
            <input
              {...register("ingredients")}
              type="text"
              required
              defaultValue={ingredients}
              placeholder="Ingredients"
              className="input input-bordered w-full "
            />
          </div>
          {/* admin Name */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Rating*</span>
            </label>
            <input
              {...register("Rating")}
              type="number"
              required
              defaultValue={Rating}
              placeholder="Rating"
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="md:flex justify-center items-center gap-6">
          {/* Date time */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Date*</span>
            </label>
            <input
              {...register("date")}
              type="date"
              required
              defaultValue={date}
              className="input input-bordered w-full "
            />
          </div>
          {/* admin Name */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Admin Name</span>
            </label>
            <input
              {...register("adminName")}
              type="text"
              required
              defaultValue={adminName}
              placeholder="Admin Name"
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="md:flex justify-center items-center gap-6">
          {/* admin Email */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Admin Email</span>
            </label>
            <input
              {...register("adminEmail")}
              type="Email"
              required
              defaultValue={adminEmail}
              placeholder="Admin Email"
              className="input input-bordered w-full "
            />
          </div>
          {/* meal Image */}
          <div className="form-control  md:w-full my-6">
            <label className="label">
              <span className="label-text">Meal Image*</span>
            </label>
            <input
              {...register("image")}
              required
              type="file"
              className="file-input md:w-full "
            />
          </div>
        </div>

        <div className="md:flex justify-center items-center gap-6">
          {/* meal description */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Meal Description*</span>
            </label>
            <textarea
              required
              defaultValue={description}
              {...register("description")}
              placeholder="Meal Description"
              className="textarea textarea-bordered textarea-lg w-full "></textarea>
          </div>
          {/* meal Reviews */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Reviews*</span>
            </label>
            <textarea
              required
              defaultValue={reviews}
              {...register("reviews")}
              placeholder="Meal Description"
              className="textarea textarea-bordered textarea-lg w-full "></textarea>
          </div>
        </div>

        <button
          type="submit"
          className=" flex btn w-full  bg-gradient-to-r from-orange-500 to-green-600 text-white font-bold gap-5">
          update Meal
        </button>
      </form>
    </div>
  );
};

export default UpdatedMeal;
