
import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return <div className="pt-20">{user && <div>user {user.email}</div>}</div>;
};

export default UserHome;
