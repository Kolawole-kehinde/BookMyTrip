import { gettAllTrips, getTripById } from "appwrite/trips";
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/trip-detail";
import { cn, parseTripData } from "lib/utils";
import { Header, InfoPill, TripCard } from "components";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import { allTrips } from "~/constants/trips";

// Utility function to get the first word of a string
function getFirstWord(input: string = ""): string {
  return input.trim().split(/\s+/)[0] || "";
}

//Dynamic id :id -> params.id -> 123
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;
  if (!tripId) throw new Error("Trip ID is required");

  const [trip, trips] = await Promise.all([
    getTripById(tripId),
    gettAllTrips(4, 0),
  ]);

  return {
    trip,
    allTrips: trips.allTrips?.map(({ $id, tripDetails, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetails),
      imageUrls: imageUrls ?? [],
    })),
  };
};

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.trip?.imageUrls || [];
  const tripData = parseTripData(loaderData?.trip?.tripDetails);
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

  const allTrips = loaderData.allTrips as Trip[] | [];

  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];

  const vistTimeAndWeatherInfo = [
    { title: "Best Iime to Visit", items: bestTimeToVisit },
    { title: "Weather", items: weatherInfo },
  ];

  return (
    <main className="trip-detail wrapper">
      <Header
        title="Trip Details"
        description="View and Edit AI-genarated travel plan"
      />

      <section className="container mt-8 px-12">
        <header className="space-y-4 mb-10">
          <h1 className="text-2xl md:text-4xl font-semibold  text-dark-100">
            {name}
          </h1>
          <div className="flex items-center gap-5">
            <InfoPill
              text={`${duration} day plan`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={
                itinerary
                  ?.slice(0, 2)
                  ?.map((item) => item.location)
                  .join(", ") || ""
              }
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>
        {/* IMAGES */}
        <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-7 mt-1">
          {imageUrls?.map((url: string, i: number) => (
            <img
              src={url}
              key={i}
              className={cn(
                "w-full rounded-xl object-cover",
                i === 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              )}
            />
          ))}
        </section>

        {/* TRIPS DEATAILS */}
        <section className="flex items-center gap-3 md:gap-5 flex-wrap">
          <ChipListComponent id="travel-chip">
            <ChipsDirective>
              {pillItems?.map((pill, i) => (
                <ChipDirective
                  key={i}
                  text={getFirstWord(pill.text)}
                  // text={pill.text}
                  cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                />
              ))}
            </ChipsDirective>
          </ChipListComponent>
          <ul className=" flex items-center gap-3">
            {Array(5)
              .fill("null")
              ?.map((_, index) => (
                <li key={index}>
                  <img
                    src="/assets/icons/star.svg"
                    alt="star"
                    className="size-[18ox]"
                  />
                </li>
              ))}
            <li className="ml-1">
              <ChipListComponent>
                <ChipsDirective>
                  <ChipDirective
                    text="4.9/5"
                    cssClass="!bg-yellow-50 !text-yellow-700"
                  />
                </ChipsDirective>
              </ChipListComponent>
            </li>
          </ul>
        </section>

        <section className="flex items-center justify-between">
          <article>
            <h3 className="pt-4 font-semibold">
              {duration}-Day {country} {travelStyle}
            </h3>
            <p>
              {budget}, {groupType} {interests}
            </p>
          </article>
          <h2>{estimatedPrice}</h2>
        </section>

        <p className="text-sm md:text-lg text-dark-400 pt-6">{description}</p>

        <ul className="itinerary space-y-4 pt-8">
          {itinerary?.map((dayPlan: DayPlan, index: number) => (
            <li key={index}>
              <h3 className="font-bold mb-2">
                {dayPlan.day}: {dayPlan.location}
              </h3>
              <ul className="space-y-4">
                {dayPlan.activities?.map((activity, index: number) => (
                  <li key={index}>
                    <span className="flex-shring-0 p-18-semibold">
                      {activity.time}
                    </span>
                    <p className="flex-grow">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {vistTimeAndWeatherInfo?.map((section) => (
          <section key={section.title} className="visit mt-6">
            <div className="">
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="space-y-4">
                {section.items?.map((item) => (
                  <li key={item} className="">
                    <p className="flex-grow ">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>

      <section className="flex flex-col gap-6 mt-6">
        <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTrips?.map((trip) => (
              <TripCard
                id={trip.id}
                key={trip.id}
                name={trip.name}
                location={trip.itinerary?.[0].location ?? ""}
                imageUrls={trip.imageUrls[0]}
                tags={[trip.interests, trip.travelStyle]}
                price={trip.estimatedPrice}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default TripDetail;
