import { Link, useLocation } from "react-router";
import { TfiLocationPin } from "react-icons/tfi";

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
  travelStyle?: string;
  price?: number;
}

const TripCard = ({ id, name, imageUrls, location, tags, price }: TripCardProps) => {
  const path = useLocation();
  const basePath =
    path.pathname === "/" || path.pathname.startsWith("/travel")
      ? `/travel/${id}`
      : `/trips/${id}`;

      console.log('tags:', tags);

  return (
    <div className="shadow-300 bg-white rounded-[20px] flex-col w-full relative mb-6">
      <Link to={basePath} aria-label={`View details for trip: ${name}`} className="block w-full h-full">
        {/* Trip Image */}
        <img
          src={imageUrls}
          alt={name}
          className="w-full h-[160px] rounded-t-xl object-cover aspect-video "
        />

        {/* Trip Content */}
        <article className="p-2">
          <h2 className="text-base leading-[20px] font-semibold">{name}</h2>
          <figure className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <TfiLocationPin />
            <figcaption className="text-sm leading-[18px] text-gray-700">{location}</figcaption>
          </figure>
        </article>

            {/* Tags styled with Tailwind */}
        <div className="mt-4 px-4 pb-5 flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                index === 1
                  ? "bg-pink-50 text-pink-500"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {getFirstWord(tag)}
            </span>
          ))}
        </div>
        <article className="bg-white py-0.5 px-2.5 w-fit rounded-2xl absolute top-2.5 right-4 text-dark-100 text-xs font-medium">{price}</article>
      </Link>
    </div>
  );
};

export default TripCard;
