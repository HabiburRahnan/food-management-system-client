import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { FaSquareFacebook, FaYoutube } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import AboutMe from "./AboutMe";
import SectionTitle from "../../../Components/SectionTitle";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],

    isPending,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);

      return res.data;
    },
  });
  const { data: about = [] } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/about/${user?.email}`);

      return res.data;
    },
  });
  // console.log(users);
  if (isPending) <Loading></Loading>;
  return (
    <div className=" md:flex justify-around items-center mb-10 ">
      <div>
        {users?.map((item) => (
          <div
            key={item._id}
            className="relative flex flex-col text-gray-700 bg-white shadow-md md:w-96 rounded-xl bg-clip-border pb-5">
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg  rounded-xl bg-clip-border">
              <img
                src="https://docs.material-tailwind.com/img/team-3.jpg"
                alt="profile-picture"
              />
            </div>
            <div className=" text-center mt-5 mx-2 ">
              <h4 className="text-2xl font-bold text-black ">
                Name: {user.displayName}
              </h4>
              <h4 className="text-[16px] font-bold text-black ">
                Email: {user.email}
              </h4>
              <div className="flex justify-around items-center text-xl">
                <p>Badge: {item.badge}</p>
                <p>Role: {item.role}</p>
              </div>
            </div>
            <div className="flex justify-center  pt-2 gap-5 ">
              <button className="btn btn-circle btn-outline bg-orange-500 text-white text-2xl">
                <FaSquareFacebook />
              </button>
              <button className="btn btn-circle btn-outline bg-orange-500 text-white text-2xl">
                <FaYoutube />
              </button>
              <button className="btn btn-circle btn-outline bg-orange-500 text-white text-2xl">
                <FaWhatsappSquare />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-10 mx-5">
        <div>
          {about.length > 0 ? (
            <SectionTitle
              heading="about Me"
              subHeading="about me"></SectionTitle>
          ) : (
            <AboutMe></AboutMe>
          )}
          {about?.map((item) => (
            <div className="font-semibold" key={item._id}>
              <h1>Address: {item.address}</h1>
              <h1>Phone: {item.phone}</h1>
              <h1>Profession : {item.profession}</h1>
              <h1>Skill: {item.skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
