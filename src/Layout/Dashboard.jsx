// import { BsHouse, BsLifePreserver } from "react-icons/Bs";
import { MdMenu, MdReviews } from "react-icons/Md";
// import { FaUtensils, FaList, FaUsers, FaUpload } from "react-icons/Fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaCodePullRequest } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  // console.log(isAdmin);
  return (
    <div className="grid grid-cols-12 h-full ">
      {/* dashboard side bar */}

      {/* my creation */}
      <div className="col-span-5 md:col-span-3 min-h-screen bg-orange-400 font-bold">
        <ul className="menu md:p-4 dashboardItem">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/addMeal">
                  {/* <FaUtensils></FaUtensils> Add Meal */}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allMeal">
                  {/* <FaList></FaList> All Meal */}
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/allUsers">
                  {/* <FaUsers></FaUsers>All Users */}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upcomingMeals">
                  {/* <FaUpload></FaUpload> Upcoming Meals */}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/serveMeals">
                  {/* <BsLifePreserver /> */}
                  Serve Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allReview">
                  <MdReviews />
                  All Review
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/requestMeals">
                  {/* <FaCodePullRequest /> Request Meals */}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myReview">
                  <MdReviews /> My Review
                </NavLink>
              </li>
            </>
          )}
          {/* shard links  */}
          <div className="divider"></div>
          <li>
            <Link to="/">
              {/* <BsHouse></BsHouse>Home */}
            </Link>
          </li>
          <li>
            <NavLink to="/meals">
              {/* <MdMenu></MdMenu> Our Meals */}
            </NavLink>
          </li>
        </ul>
      </div>
      {/*dashboard content  */}
      <div className="col-span-7 md:col-span-9 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
