import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUsers } from "react-icons/Fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Helmet } from "react-helmet";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);

    console.log(searchText);
  };
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user.name} is an admin now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleDeleteUser = (_id) => {
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
        axiosSecure.delete(`/users/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your user has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>All Users | Meal Management</title>
      </Helmet>
      <form
        onSubmit={handleSearch}
        className=" md:flex justify-center items-center ">
        <input
          type="text"
          name="search"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <input type="submit" value="Search" className="btn btn-warning " />
      </form>

      <div className="flex justify-evenly my-4">
        <h1 className="text-3xl">all users </h1>
        <h1 className="text-3xl">Total Users: {users.length} </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-orange-300">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-circle btn-outline bg-orange-500 text-white text-2xl">
                      <FaUsers></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user?._id)}
                    className="btn btn-circle btn-outline bg-red-600 text-white">
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
