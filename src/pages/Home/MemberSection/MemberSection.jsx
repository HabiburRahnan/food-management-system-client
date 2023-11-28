import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MemberSection = () => {
  const [member, setMember] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("memberShip.json")
      .then((res) => res.json())
      .then((data) => setMember(data));
  }, []);
  const handleLogin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "please Login",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Login",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {member?.map((item) => (
        <div
          key={item.name}
          className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-gradient-to-tr from-[#AABC3A] to-[#AABC3A] bg-clip-border p-8 text-white shadow-md shadow-pink-500/40">
          <div className="relative pb-8 m-0 mb-8 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none border-white/10 bg-clip-border">
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
              {item.plan}
            </p>
            <h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
              <span className="mt-2 text-4xl">$</span>
              {item.price}
              <span className="self-end text-4xl">/mo</span>
            </h1>
          </div>
          <div className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="p-1 border rounded-full border-white/20 bg-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-3 h-3">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </span>
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                  {item.request} team members
                </p>
              </li>
              <li className="flex items-center gap-4">
                <span className="p-1 border rounded-full border-white/20 bg-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-3 h-3">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </span>
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                  200+ components
                </p>
              </li>
              <li className="flex items-center gap-4">
                <span className="p-1 border rounded-full border-white/20 bg-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-3 h-3">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </span>
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                  40+ built-in pages
                </p>
              </li>
              <li className="flex items-center gap-4">
                <span className="p-1 border rounded-full border-white/20 bg-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-3 h-3">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </span>
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                  {item.time} free updates
                </p>
              </li>
              <li className="flex items-center gap-4">
                <span className="p-1 border rounded-full border-white/20 bg-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-3 h-3">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </span>
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                  Life time technical support
                </p>
              </li>
            </ul>
          </div>
          <div className="p-0 mt-12">
            {user ? (
              <Link
                to="/payment"
                className="block w-full select-none rounded-lg bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-pink-500 shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-dark="true">
                Buy Now
              </Link>
            ) : (
              <Link
                onClick={handleLogin}
                className="block w-full select-none rounded-lg bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-pink-500 shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-dark="true">
                Buy Now
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberSection;
