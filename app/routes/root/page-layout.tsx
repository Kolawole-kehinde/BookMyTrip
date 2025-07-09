import { logoutUser } from "appwrite/auth";
import { useNavigate } from "react-router";

const PageLayout = () => {
      const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  return (
    <div>
       <button onClick={handleLogout} aria-label="Logout" className="p-1">
          <img
            src="/assets/icons/logout.svg"
            alt="Logout"
            className="size-6 cursor-pointer"
          />
        </button>

        <button className="cursor-pointer" onClick={() => {navigate('/dashboard')}}>
             Dashboard
        </button>
    </div>
  )
}

export default PageLayout
