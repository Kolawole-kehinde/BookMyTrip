import { Link, useLocation } from "react-router";
import pkg from "@syncfusion/ej2-react-buttons";

const { ChipListComponent, ChipsDirective, ChipDirective } = pkg;

// Utility function to get the first word of a string
function getFirstWord(input: string = ""): string {
  return input.trim().split(/\s+/)[0] || "";
}

interface TripCardProps {
  id: string;
  name: string;
  imageUrls: string;
  location: string;
  tags: string[];
  travelStyle: string;
  price: number;
}

const TripCard = ({ id, name, imageUrls, location, tags }: TripCardProps) => {
  const path = useLocation();
  const basePath =
    path.pathname === "/" || path.pathname.startsWith("/travel")
      ? `/travel/${id}`
      : `/trips/${id}`;

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={basePath} className="block w-full h-full">
        {/* Trip Image */}
        <img
          src={imageUrls}
          alt={name}
          className="w-full h-48 object-cover"
        />

        {/* Trip Content */}
        <article className="p-2">
          <h2 className="text-lg leading-[20px] font-semibold">{name}</h2>
          <figure className="flex items-center gap-2 mt-2 text-sm text-gray-600 ">
            <img src="/assets/icons/location-mark.svg" alt="location" className="w-4 h-4" />
            <figcaption className="text-sm leading-[18px] text-gray-100">{location}</figcaption>
          </figure>
        </article>

        {/* Tags */}
        <div className="mt-4 pl-[18px] pr-3.5 pb-5">
          <ChipListComponent id="travel-chip">
            <ChipsDirective>
              {tags.map((tag, index) => (
                <ChipDirective
                  key={index}
                  text={getFirstWord(tag)}
                  cssClass={
                    index === 1
                      ? "!bg-pink-50 !text-pink-500"
                      : "!bg-green-50 !text-green-700"
                  }
                />
              ))}
            </ChipsDirective>
          </ChipListComponent>
        </div>
      </Link>
    </div>
  );
};

export default TripCard;
