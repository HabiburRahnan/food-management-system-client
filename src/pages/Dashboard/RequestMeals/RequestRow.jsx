import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const RequestRow = ({ item, reviews, handleDeleteRequest }) => {
  // console.log(item);
  return (
    <>
      <tbody>
        <tr className="bg-base-200">
          <th>
            <button
              onClick={() => handleDeleteRequest(item?._id)}
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
          <td>{item?.mealName}</td>
          <td>{item?.like}</td>
          {reviews?.map((review) =>
            item.mealName === review.mealName ? (
              <td key={review?._id}>{reviews?.length + 1}</td>
            ) : (
              ""
            )
          )}
          <td>{item?.status}</td>
          <td>
            <Link
              to={`/viewsDetails/${item?.mealsId}`}
              className="btn btn-outline font-bold ">
              View Details
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default RequestRow;
