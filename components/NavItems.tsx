import { Link } from "react-router";


const NavItems = () => {
  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="Logo" className="size-[30px]" />
        <h1>BookMyTrip</h1>
      </Link>
    </section>
  );
};

export default NavItems;
