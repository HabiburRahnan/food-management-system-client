import React from "react";
import Modal from "react-modal";
import useAuth from "../../../hooks/useAuth";
import { AwesomeButton } from "react-awesome-button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AboutMe = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = e.target;
    const address = from.address.value;
    const phone = from.phone.value;
    const skill = from.skill.value;
    const profession = from.profession.value;
    const userInfo = {
      address,
      phone,
      skill,
      profession,
      email: user.email,
    };
    const mealRes = await axiosSecure.post("/About", userInfo);
    // console.log(mealRes.data);
    if (mealRes.data.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `${user?.displayName} added to Your About`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <button className="btn btn-ghost bg-orange-500" onClick={openModal}>
        Add About
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="text-xl text-center ">Hello, {user?.displayName}</div>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="input input-bordered input-primary w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="Number"
              placeholder="Phone Number"
              name="phone"
              className="input input-bordered input-primary w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Skill</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Skill"
              name="skill"
              className="input input-bordered input-primary w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profession</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Profession"
              name="profession"
              className="input input-bordered input-primary w-full max-w-xs"
              required
            />
          </div>
          <div type="submit" className="form-control mt-6">
            <AwesomeButton type="secondary">Secondary</AwesomeButton>
          </div>
        </form>
        <button type="secondary" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default AboutMe;
