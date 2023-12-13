import { useRef } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";

const Contact = () => {
  
const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_bshi3bq', 'template_9nt4vsv', form.current, 'M6mMDNMMx-nAvAZJX')
    .then((result) => {
      Swal.fire({
             position: "top-center",
              icon: "success",
              title: `Send successfully`,
             showConfirmButton: false,
             timer: 1500,
            });
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
};

  return (
    <>
      <div className="my-10">
        <SectionTitle heading="Contact me" subHeading="---contact--"></SectionTitle>
      </div>

      <form ref={form} onSubmit={sendEmail} data-aos="fade-up"
      data-aos-anchor-placement="bottom-bottom"  data-aos-duration="3000">
        <div className="flex w-full   gap-2">
          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              name="user_name"
              placeholder="First Name"
              className="input input-bordered border-pink-500 w-full"
              required
            />
          </div>

          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="user_name"
              placeholder="Last Name"
              className="input input-bordered border-pink-500 w-full"
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
            name="user_email"
              type="text"
              placeholder="Email"
              className="input input-bordered border-pink-500 w-full "
              required
            />
          </div>

          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
            name="user_phone"
              type="text"
              placeholder="Phone"
              className="input input-bordered border-pink-500 w-full "
              required
            />
          </div>
        </div>

        <textarea
          placeholder="Write Your Text.................."
          name="message"
          className="border-2 border-pink-500 w-full mt-6 rounded"
          cols="30"
          rows="10"></textarea>
        <button className="btn w-full mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white">
          send
        </button>
       
      </form>
    </>
  );
};
export default Contact;
