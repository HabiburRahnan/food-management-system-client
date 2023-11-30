import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="py-10">
      <div className="  bg-gradient-to-r from-[#F6841F] via-[#ABBC37] to-[#93DAF9] rounded-2xl ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://i.ibb.co/cc87XTH/jimmy-dean-Yn0l7uw-Brpw-unsplash.jpg"
            className=" rounded-lg shadow-xl shadow-orange-400 md:h-96 md:w-full "
          />
          <div className="text-white py-10 ">
            <div className="items-center justify-center text-center">
              <h1 className="text-xl md:text-3xl font-bold">
                <TypeAnimation
                  sequence={[
                    "FOOD MANAGEMENT SERVICES",
                    1000,
                    "Food",
                    2000,
                    "FOOD MANAGEMENT SERVICES",
                    () => {
                      // console.log("Sequence completed");
                    },
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  style={{
                    fontSize: "2em",
                    display: "inline-block",
                  }}
                />
              </h1>
              <p className="py-6 pt-10 px-6 text-start">
                Food Management Systems is a suite of software that can
                transform the way you run and operate your food business. It is
                easy to use, easy to implement and surprisingly cost-effective.
                Each module is designed to provide specific solutions, and each
                may be used in isolation or bolted together, building into a
                completely integrated single system solution.
              </p>
            </div>
            <div className="flex justify-center items-center py-10">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full max-w-xs"
              />
              <button className="px-5 btn btn-outline text-white bg-[#ABBC37] hover:bg-orange-500">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
