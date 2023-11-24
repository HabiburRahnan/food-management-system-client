import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/UseAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isLoadingAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      // console.log(user);
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isLoadingAdmin];
};

export default useAdmin;
