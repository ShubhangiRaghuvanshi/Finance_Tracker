import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

const LogoutButton=()=>{
    const navigate = useNavigate();

     const {logout} = useAuth();
     const handleLogout=()=>{
        logout();
        navigate("/login");
     

    }
    
return (
    <button
      onClick={handleLogout}
      className="text-sm px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
}
export default LogoutButton;