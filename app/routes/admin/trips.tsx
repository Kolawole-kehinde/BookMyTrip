import { gettAllTrips} from "appwrite/trips";
import { Header, TripCard } from "components"
import { parseTripData } from "lib/utils";
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/trips";

export const loader = async ({ request}: LoaderFunctionArgs) => {
     const limit = 8;
     const url = new URL(request.url);
     const page = parseInt(url.searchParams.get('page') || "1", 10);
     const offset = (page -1) * limit;

  const {allTrips, total} = await gettAllTrips(limit, offset);
  

  return {
      trips:allTrips?.map(({ $id, tripDetails, imageUrls}) => ({
         id: $id,
         ...parseTripData(tripDetails),
         imageUrls: imageUrls ?? []
     })),
     total
  }



};

const Trips = ({ loaderData }: Route.ComponentProps) => {

  const trips = loaderData.trips as Trip[] | [];


  return (
    <main className="all-users wrapper">
          <Header
            title="Trips"
            description="View and Edit AI-genrated travel plans"
            ctaText="Create a trip"
            ctaUrl="/trips/create"
          />

          <section>
              <h1 className="p-24-semibold text-dark-100 mb-4">Manage Create Trips</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                    {
                      trips?.map((trip) => (
                         <TripCard
                           id={trip.id}
                           key={trip.id}
                           name={trip.name}
                           location={trip.itinerary?.[0].location ?? ''}
                           imageUrls={trip.imageUrls[0]}
                           tags={[trip.interests, trip.travelStyle]}
                           price={trip.estimatedPrice}
                         />
                      ))
                    }
               </div>
          </section>
          </main>
  )
}

export default Trips