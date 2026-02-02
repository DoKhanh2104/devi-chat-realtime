import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
