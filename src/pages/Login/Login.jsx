import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/SectionTitle";
import Google from "../../SocalLogin/SocalLogin";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password).then(() => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You have Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="hero min-h-screen bg-slate-300">
      <Helmet>
        <title>Login | Meal Management</title>
      </Helmet>

      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center  md:w-1/3 lg:text-left text-white ">
          <img
            className="rounded-3xl"
            src="https://i.ibb.co/tPnpTvk/brooke-lark-V4-MBq8kue3-U-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="text-3xl text-center  pt-5  text-orange-500 font-bold">
            <SectionTitle heading="Login"></SectionTitle>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                name="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                })}
                name="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">
                  password must be 6 characters
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  password must be 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">
                  password must be less 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  password must be Minimum six characters, at least one letter,
                  one number and one special character
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-[#ebc38b] hover:bg-[#fab351]"
              />
            </div>
          </form>
          <Google></Google>
          <p className="py-5 flex justify-center  items-center">
            New Here Create a account ?
            <Link className="text-blue-600 font-semibold" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
