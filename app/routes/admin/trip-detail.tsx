import { getTripById } from "appwrite/trips";
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/trip-detail";
import { parseTripData } from "lib/utils";
import { Header, InfoPill } from "components";

//Dynamic id :id -> params.id -> 123
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;
  if (!tripId) throw new Error("Trip ID is required");

  return await getTripById(tripId);
};

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
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
        <h1 className="p-40-semibold  text-dark-100">{name}</h1>
        <InfoPill text={`${duration} day plan`}
         image="/assets/icons/calendar.svg"
        />
        <InfoPill text={itinerary?.slice(0, 2)?.map((item) => item.location).join(', ') || ''}
         image="/assets/icons/location-mark.svg"
        />
      </section>
    </main>
  );
};

export default TripDetail;
