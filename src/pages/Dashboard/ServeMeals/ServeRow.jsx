/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ServeRow = ({ item, handleServe }) => {
  return (
    <>
      <tbody>
        <tr className="bg-base-200">
          <th>{item?.mealName}</th>
          <td>{item?.mealName}</td>
          <td>{item?.email}</td>
          <td>{item?.status}</td>
          <td>
            <Link
              onClick={() => handleServe(item._id)}
              className="btn btn-outline font-bold ">
              Serve
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ServeRow;
