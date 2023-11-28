import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard";
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
import PrivetRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";
import Upcoming from "../pages/Upcoming/Upcoming";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Payment from "../pages/Home/MemberSection/Payment";

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
        element: (
          <PrivetRoute>
            <Profile></Profile>
          </PrivetRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivetRoute>
            <Payment></Payment>
          </PrivetRoute>
        ),
      },
      {
        path: "/upcomingMeals",
        element: (
          <PrivetRoute>
            <Upcoming></Upcoming>
          </PrivetRoute>
        ),
      },
      {
        path: "/viewsDetails/:id",
        element: <ViewsDetails></ViewsDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/meals/${params.id}`),
      },
      {
        path: "/reviews/:id",
        element: (
          <PrivetRoute>
            <EditReview></EditReview>
          </PrivetRoute>
        ),
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
        path: "/dashboard",
        element: (
          <AdminRoute>
            <DashboardHome></DashboardHome>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addMeal",
        element: (
          <AdminRoute>
            <AddMeal></AddMeal>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allMeal",
        element: (
          <AdminRoute>
            <AllMeals></AllMeals>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateMeal/:id",
        element: (
          <AdminRoute>
            <UpdatedMeal></UpdatedMeal>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/meals/${params.id}`),
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/upcomingMeals",
        element: (
          <AdminRoute>
            <UpcomingMeals></UpcomingMeals>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/serveMeals",
        element: (
          <AdminRoute>
            <ServeMeals></ServeMeals>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/requestMeals",
        element: (
          <PrivetRoute>
            <RequestMeals></RequestMeals>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/myReview",
        element: (
          <PrivetRoute>
            <MyReview></MyReview>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/allReview",
        element: (
          <PrivetRoute>
            <AllReviews></AllReviews>
          </PrivetRoute>
        ),
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
