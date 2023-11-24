import { BsGoogle } from "react-icons/Bs";

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Google = () => {
  const { GoogleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    GoogleLogin().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        navigate(from, { replace: true });
        console.log(res.data);
      });
    });
  };
  return (
    <div>
      <div className="divider ">Or, Continue With</div>
      <div className=" flex justify-center ">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn btn-outline  flex justify-between items-center cursor-pointer w-2/3 hover:bg-[#fab351]">
          Google
          <BsGoogle className="w-8 h-6"></BsGoogle>
        </button>
      </div>
    </div>
  );
};

export default Google;
