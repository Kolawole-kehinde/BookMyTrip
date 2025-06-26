import { useLocation } from "react-router";
import { loginWithGoogle } from "appwrite/auth";
import { Link } from "react-router";

const SignIn = () => {
  const location = useLocation();

  const handleLogin = async () => {
    try {
      await loginWithGoogle(); // will redirect to Google, then to /dashboard
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <main className="bg-auth w-full h-screen flex bg-cover bg-no-repeat">
      <div className="size-full glassmorphism flex-center">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
            </Link>
            <h1 className="p-28-bold text-dark-100">BookMyTrip</h1>
          </header>
          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">Admin Dashboard Login</h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user activity with ease.
            </p>
          </article>
          <button
            className="bg-primary-100 text-white py-2 w-full rounded-2xl flex items-center justify-center gap-2"
            onClick={handleLogin}
          >
            <img src="/assets/icons/google.svg" alt="google-icon" />
            Sign in with Google
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
