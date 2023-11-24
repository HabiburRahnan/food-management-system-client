import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AddMeal from "../pages/Dashboard/AddMeal/AddMeal";
import AllMeals from "../pages/Dashboard/AllMeals/AllMeals";
import UpdatedMeal from "../pages/Dashboard/UpdatedMeal/UpdatedMeal";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import UpcomingMeals from "../pages/Dashboard/UpcomingMeals/UpcomingMeals";
import ServeMeals from "../pages/Dashboard/ServeMeals/ServeMeals";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "/dashboard/addMeal",
        element: <AddMeal></AddMeal>,
      },
      {
        path: "/dashboard/allMeal",
        element: <AllMeals></AllMeals>,
      },
      {
        path: "/dashboard/updateMeal/:id",
        element: <UpdatedMeal></UpdatedMeal>,
      },
      {
        path: "/dashboard/allUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/upcomingMeals",
        element: <UpcomingMeals></UpcomingMeals>,
      },
      {
        path: "/dashboard/serveMeals",
        element: <ServeMeals></ServeMeals>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
export default router;
