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
import Meals from "../pages/Meals/Meals";
import ViewsDetails from "../pages/ViewsDetails/ViewsDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Profile from "../pages/Profile/Profile";
import RequestMeals from "../pages/Dashboard/RequestMeals/RequestMeals";
import MyReview from "../pages/Dashboard/MyReview/MyReview";
import EditReview from "../pages/Dashboard/MyReview/EditReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/viewsDetails/:id",
        element: <ViewsDetails></ViewsDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/meals/${params.id}`),
      },
      {
        path: "/reviews/:id",
        element: <EditReview></EditReview>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/reviews/${params.id}`),
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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/meals/${params.id}`),
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
      {
        path: "/dashboard/requestMeals",
        element: <RequestMeals></RequestMeals>,
      },
      {
        path: "/dashboard/myReview",
        element: <MyReview></MyReview>,
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
