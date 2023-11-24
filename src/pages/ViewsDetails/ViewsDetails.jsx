import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";

const ViewsDetails = () => {
  const meals = useLoaderData();
  const {
    mealName,
    type,
    Rating,
    date,
    price,
    description,
    reviews,
    ingredients,
    adminName,
    adminEmail,
    image,
  } = meals;
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <title>ViewsDetails | Job Search</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="card  bg-base-100 shadow-xl">
        <img className="lg:h-[500px] w-full" src={image} alt="Shoes" />

        <div className="card-body">
          <div className=" md:flex justify-between items-center text-sm md:text-xl font-semibold ">
            <h2 className="card-title   text-xl md:text-4xl font-extrabold text-blue-600">
              JOb Name: {mealName}
            </h2>
            <h2 className="card-title text-2xl md:text-3xl text-blue-600">
              Name: {adminName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center text-sm md:text-2xl font-bold md:py-10">
            <p>Post Date: {date}</p>
            <p>Last Deadline: sdfg</p>

            <p>Price: {price}</p>
          </div>
          <p className="text-xl font-semibold">
            <span className="text-blue-600 text-2xl">Details: </span>{" "}
            {description}
          </p>

          <div className="card-actions flex justify-between">
            <div className="text-2xl font-semibold text-blue-600 md:flex justify-between md:gap-10">
              <p>Type: {type}</p>
              <p>Admin Email:{adminEmail}</p>
            </div>

            <button className="btn  text-white bg-blue-500 hover:bg-blue-500 my-10">
              Apply This Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewsDetails;
