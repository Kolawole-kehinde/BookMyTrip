import { gettAllTrips } from "appwrite/trips";
import { Header, TripCard } from "components";
import { parseTripData } from "lib/utils";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/trips";
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";

// Loader to fetch paginated trips
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 4;
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const offset = (page - 1) * limit;

  const { allTrips, total } = await gettAllTrips(limit, offset);

  return {
    trips: allTrips?.map(({ $id, tripDetails, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetails),
      imageUrls: imageUrls ?? [],
    })),
    total,
    page,
  };
};

const Trips = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];
  const [searchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page") || loaderData.page || "1");
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.href = `?page=${page}`;
  };

  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View and Edit AI-generated travel plans"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />

      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4">Manage Created Trips</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {trips?.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              name={trip.name}
              location={trip.itinerary?.[0]?.location ?? "Unknown"}
              imageUrls={trip.imageUrls[0] ?? "/assets/placeholder.png"}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>

        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={4}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>
    </main>
  );
};

export default Trips;
