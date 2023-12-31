import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hostingAPI = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMeal = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(img_hostingAPI, imageFile, {
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
      //  now
      const mealRes = await axiosSecure.post("/meals", mealItem);
      // console.log(mealRes.data);
      if (mealRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.mealName} added to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  const addUpcoming = async (data) => {
    // console.log("upcoming", data);
    // console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(img_hostingAPI, imageFile, {
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
        ingredients: data.ingredients,
        adminEmail: data.adminEmail,
        adminName: data.adminName,
        image: res.data?.data?.display_url,
      };
      //  now
      const mealRes = await axiosSecure.post("/upcoming", mealItem);
      // console.log(mealRes.data);
      if (mealRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.mealName} added to the upcoming`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Meal | Meal Management</title>
      </Helmet>
      <SectionTitle heading="ADD meals" subHeading="Whats New"></SectionTitle>
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
              defaultValue="default"
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
              placeholder="Ingredients"
              className="input input-bordered w-full "
            />
          </div>
          {/* Rating*/}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Rating*</span>
            </label>
            <input
              {...register("Rating")}
              type="number"
              required
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
              readOnly
              defaultValue={user.displayName}
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
              readOnly
              defaultValue={user.email}
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
              {...register("description")}
              placeholder="Meal Description"
              className="textarea textarea-bordered textarea-lg w-full "></textarea>
          </div>
        </div>

        <div className=" md:flex  justify-around items-center gap-5 w-full ">
          <button
            type="submit"
            className=" btn  bg-gradient-to-r from-green-600 to-orange-500 text-white font-bold mb-5 md:mb-0 ">
            add a Meal
          </button>
        </div>
      </form>
      <button
        type="submit"
        onClick={handleSubmit(addUpcoming)}
        className=" btn  bg-gradient-to-r from-blue-500 text-white font-bold to-green-700 ">
        Add Upcoming
      </button>
    </div>
  );
};

export default AddMeal;
