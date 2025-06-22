import { cn } from "lib/utils";
import { useLocation } from "react-router";

interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({title, description}: HeaderProps) => {
    const location = useLocation();
  return ( 
    <header className="header">
      <article>
         <h1 className={cn(" text-dark-100 ", location.pathname === "/" ? 'text-2xl md:text-4xl font-black': 'text-xl md:text-2xl font-semibold' )}>{title}</h1>
         <p>{description}</p>
      </article>
    </header>
  )
}

export default Header
