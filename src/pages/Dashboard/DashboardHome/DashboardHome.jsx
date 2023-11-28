import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../hooks/useAuth";

const DashboardHome = () => {
  const user = useAuth();
  console.log(user);
  return (
    <div>
      <SectionTitle
        heading={`Hi, ${user?.user.displayName} Welcome Your Dashboard`}
        subHeading="---------"></SectionTitle>
    </div>
  );
};

export default DashboardHome;
