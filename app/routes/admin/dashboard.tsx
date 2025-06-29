import { StatsCard, TripCard } from "components";
import Header from "components/Header";
import { allTrips, dashboardStats, user } from "~/constants/trips";

const { totalUsers, userJoined, tripCreated, userRole, totalTrips } = dashboardStats;

export async function loader() {
  throw new Error("some error thrown in a loader");
}

const Dashboard = () => {
  // const data = useLoaderData() ?? {};
  // const user = data.user ?? null;

  const welcomeTitle = `Welcome back, ${user?.name ?? "Guest"} 👋`;

  return (
    <div className="wrapper">
      <Header
        title={welcomeTitle}
        description="Track activity, trends, and popular destinations in real time"
      />

      {/* Stats Section */}
      <section className="flex flex-col gap-6 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={userJoined.currentMonth}
            lastMonthCount={userJoined.lastMonthCount}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripCreated.currentMonth}
            lastMonthCount={tripCreated.lastMonthCount}
          />
          <StatsCard
            headerTitle="Active Users Today"
            total={totalUsers}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonthCount}
          />
        </div>
      </section>

      {/* Created Trips Section */}
      <section className="mt-5">
        <h1 className="text-xl font-semibold mb-4 font-figtree">Trips</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {allTrips.slice(0, 4).map(
            ({ id, name, imageUrls, itinerary, tags, travelStyle, estimatedPrice }) => (
              <TripCard
                key={id}
                id={id.toString()}
                name={name}
                imageUrls={imageUrls?.[0] ?? "/assets/placeholder.png"}
                location={itinerary?.[0]?.location ?? "Unknown"}
                tags={tags}
                travelStyle={travelStyle}
                price={estimatedPrice}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
