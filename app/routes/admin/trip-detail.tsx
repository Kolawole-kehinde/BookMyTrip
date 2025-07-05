import { getTripById } from "appwrite/trips";
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/trip-detail";
import { cn, parseTripData } from "lib/utils";
import { Header, InfoPill } from "components";

//Dynamic id :id -> params.id -> 123
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;
  if (!tripId) throw new Error("Trip ID is required");

  return await getTripById(tripId);
};

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    const imageUrls = loaderData?.imageUrls || [];
  const tripData = parseTripData(loaderData?.tripDetail);
  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripData || {};
  return (
    <main className="trip-detail wrapper">
      <Header
        title="Trip Details"
        description="View and Edit AI-genarated travel plan"
      />

      <section className="container wrapper-md">
        <header className="space-y-4 mb-10">
        <h1 className="p-40-semibold  text-dark-100">{name}</h1>
        <div className="flex items-center gap-5">
               <InfoPill text={`${duration} day plan`}
         image="/assets/icons/calendar.svg"
        />
        <InfoPill text={itinerary?.slice(0, 2)?.map((item) => item.location).join(', ') || ''}
         image="/assets/icons/location-mark.svg"
        />
        </div>
        </header>
      
          <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-7 mt-1">
              {imageUrls?.map((url: string, i: number) => (
               <img
               src={url}
               key={i}
               className={cn('w-full rounded-xl object-cover', i ===0 ? 'md:col-span-2 md:row-span-2 h-[330px]' : 'md:row-span-1 h-[150px]')}
               />
              ))}
          </section>
      </section>
    </main>
  );
};

export default TripDetail;
