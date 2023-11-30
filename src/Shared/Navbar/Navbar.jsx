import { Link, NavLink } from "react-router-dom";
import { GiUpCard } from "react-icons/gi";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BsCart4 } from "react-icons/Bs";
import Loading from "../../Components/Loading";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const { data: meal = [], isLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upcoming`);

      return res.data;
    },
  });
  const { data = [], isPending } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/request/${user?.email}`);

      return res.data;
    },
  });
  if (isPending || isLoading) {
    <Loading></Loading>;
  }
  const NavLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/meals">Meals</Link>
      </li>

      <li>
        <Link to="/upcomingMeals">
          <button className="btn btn-sm bg-[#ABBC37]">
            <div className="badge ">Upcoming{meal?.length}</div>
            <GiUpCard className="mr-2"></GiUpCard>
          </button>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/requestMeals">
          <button className="btn btn-sm ">
            <BsCart4 className="mr-2  "></BsCart4>
            <div className="badge badge-secondary">+{data?.length}</div>
          </button>
        </Link>
      </li>
    </>
  );
  return (
    <div className={`navbar bg-base-100  max-w-[1280px] mx-auto `}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <Link to="/">
              <img
                className="w-20"
                src="https://i.ibb.co/hM8prcq/logo-2.png"
                alt=""
              />
            </Link>
            {NavLinks}
          </ul>
        </div>
        <Link
          to="/"
          className=" btn  items-center normal-case text-xl font-extrabold">
          <img
            className="w-36"
            src="https://i.ibb.co/hM8prcq/logo-2.png"
            alt=""
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavLinks}</ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <div className={`dropdown dropdown-end`}>
            <label tabIndex={0} className="cursor-pointer ">
              <div
                className="avatar tooltip  tooltip-left "
                data-tip={`${user?.displayName}`}>
                <div className={`w-10 rounded-full `}>
                  <img
                    className={`rounded-full w-12 `}
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
              </div>
            </label>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <NavLink
                data-tip={`${user?.displayName}`}
                to="/profile"
                className="px-4 py-2 hover:bg-base-300 rounded-lg tooltip  tooltip-top">
                My Profile
              </NavLink>
              <NavLink
                to="/dashboard"
                className="px-4 py-2 hover:bg-base-300 rounded-lg text-center">
                Dashboard
              </NavLink>

              <button onClick={handleLogOut} className="btn">
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "btn  btn-sm "
                : "btn btn-ghost  bg-orange-400 hover:bg-orange-400"
            }>
            Join US
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
