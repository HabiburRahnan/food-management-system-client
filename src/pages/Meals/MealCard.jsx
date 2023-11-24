import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const MealCard = ({ meal }) => {
  console.log(meal);
  const { _id, image, mealName, price } = meal;
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
        <img src={image} alt="profile-picture" />
      </div>
      <div className="p-6 text-center flex justify-between items-center">
        <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {mealName}
        </h4>
        <p className="block mb-2 font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
          Price: ${price}
        </p>
      </div>
      <div className="flex justify-end px-10 pb-5">
        <Link to={`/viewsDetails/${_id}`} className="btn btn-outline font-bold ">
          Views Details
        </Link>
      </div>
    </div>
  );
};

export default MealCard;
