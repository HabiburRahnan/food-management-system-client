import SectionTitle from "../../../Components/SectionTitle";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSend = (e) => {
    e.preventDefault();
    console.log("object");
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: `Send successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <div className="my-10">
        <SectionTitle heading="Contact Us" subHeading="-----"></SectionTitle>
      </div>

      <form onSubmit={handleSend}>
        <div className="flex w-full   gap-2">
          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered border-orange-500 w-full"
              required
            />
          </div>

          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered border-orange-500 w-full"
              required
            />
          </div>
        </div>

        <div className="flex w-full   gap-2">
          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="description"
              type="text"
              placeholder="Email"
              className="input input-bordered border-orange-500 w-full "
              required
            />
          </div>

          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              name="description"
              type="text"
              placeholder="Phone"
              className="input input-bordered border-orange-500 w-full "
              required
            />
          </div>
        </div>

        <textarea
          placeholder="Write Your Text.................."
          className="border-2 border-orange-500 w-full mt-6"
          cols="30"
          rows="10"></textarea>

        <input
          className="btn w-full mt-5 bg-gradient-to-r from-green-600 to-orange-500 text-white"
          type="submit"
          value="send"
        />
      </form>
    </>
  );
};

export default Contact;
