interface HeaderProps {
  title: string;
  description: string;
  variant?: "home" | "default";
}

const Header = ({
  title,
  description,
  variant = "default",
}: HeaderProps) => {
  return (
    <header className="header">
      <div>
        <h1
          className={
            variant === "home"
              ? "text-dark-100 text-2xl md:text-4xl font-black"
              : "text-dark-100 text-xl md:text-2xl font-semibold"
          }
        >
          {title}
        </h1>
        <p
          className={
            variant === "home"
              ? "text-gray-100 font-normal text-base md:text-lg"
              : "text-gray-100 font-normal text-sm md:text-lg"
          }
        >
          {description}
        </p>
      </div>
    </header>
  );
};

export default Header;
