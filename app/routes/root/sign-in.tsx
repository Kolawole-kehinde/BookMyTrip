import { useLocation } from "react-router";
import { loginWithGoogle } from "appwrite/auth";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc"; 

const SignIn = () => {
  const location = useLocation();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <main className="bg-auth w-full h-screen flex bg-cover bg-no-repeat">
      <div className="size-full glassmorphism flex-center">
        <div className="flex justify-center items-center bg-white flex-col border border-light-100 md:max-w-[495px] rounded-[20px] py-10 px-6 w-full">
          <header className="flex items-center gap-1.5 justify-center">
            <Link to="/">
              <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
            </Link>
            <h1 className="p-28-bold text-dark-100">BookMyTrip</h1>
          </header>
          <article className="mt-9 mb-[30px] flex flex-col gap-3">
            <h2 className="p-28-semibold text-dark-100 text-center">Admin Dashboard Login</h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user activity with ease.
            </p>
          </article>
          <button
            className="bg-primary-100 text-white py-1 w-[300px] rounded-xl flex items-center justify-center gap-2"
            onClick={handleLogin}
          >
            <FcGoogle fontSize={30} />
            Sign in with Google
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
