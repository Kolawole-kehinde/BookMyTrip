import { Link } from "react-router";
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'

interface HeaderProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string
  variant?: "home" | "default";
}

const Header = ({
  title,
  description,
  ctaText,
  ctaUrl,
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
         {
          ctaUrl && ctaText &&(
            <Link to={ctaUrl}>
              <ButtonComponent type="button" className="button-class !h-11 !w-full md:w-[240px]">
                <img src="/assets/icons/plus.svg" alt="plus"  className="size-5"/>
                 <span className="p-16-semibold text-white">{ctaText}</span>
              </ButtonComponent>
            </Link>
          )
         }
      
    </header>
  );
};

export default Header;
