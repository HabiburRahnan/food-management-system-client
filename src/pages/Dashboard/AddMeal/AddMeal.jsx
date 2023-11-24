import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";

const AddMeal = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <SectionTitle heading="ADD meals" subHeading="Whats New"></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* meal title */}
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Meal Title*</span>
          </label>
          <input
            {...register("name")}
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
          {/* admin Name */}
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
              {...register("admin name")}
              type="text"
              required
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
              {...register("admin email")}
              type="Email"
              required
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

        <div className=" md:flex  justify-around items-center gap-5 w-full ">
          <button
            type="submit"
            className=" btn  bg-gradient-to-r from-green-600 to-orange-500 text-white font-bold mb-5 md:mb-0 ">
            add a Meal
          </button>
          <button
            type="submit"
            className=" btn  bg-gradient-to-r from-blue-500 text-white font-bold to-green-700 ">
            Add Upcoming
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;
