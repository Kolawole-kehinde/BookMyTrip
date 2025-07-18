import { StatsCard, TripCard } from "components";
import Header from "components/Header";
import type { Route } from "./+types/dashboard";
import { getAllUsers, getUser } from "appwrite/auth";
import {
  getTripsByTravelStyle,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from "appwrite/dashboard";
import { gettAllTrips } from "appwrite/trips";
import { parseTripData } from "lib/utils";
import {
  Category,
  ChartComponent,
  ColumnDirective,
  ColumnsDirective,
  ColumnSeries,
  DataLabel,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { tripXAxis, tripyAxis, userXAxis, useryAxis } from "~/constants";
import { GridComponent } from "@syncfusion/ej2-react-grids";

// loader function
export const clientLoader = async () => {
  const [
    currentUser,
    dashboardStatsFromAPI,
    trips,
    userGrowth,
    tripsByTravelStyle,
    allUsers,
  ] = await Promise.all([
    getUser(),
    getUsersAndTripsStats(),
    gettAllTrips(4, 0),
    getUserGrowthPerDay(),
    getTripsByTravelStyle(),
    getAllUsers(4, 0),
  ]);

  // Fallback if API fails
  const fallbackStats = {
    totalUsers: 15000,
    userJoined: { currentMonth: 218, lastMonthCount: 176 },
    totalTrips: 3210,
    tripCreated: { currentMonth: 150, lastMonthCount: 250 },
    userRole: { total: 62, currentMonth: 25, lastMonthCount: 15 },
  };

  const dashboardStats = dashboardStatsFromAPI ?? fallbackStats;

  const allTrips = trips.allTrips?.map(({ $id, tripDetails, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetails),
    imageUrls: imageUrls ?? [],
  }));

  const mappedUsers: UsersItineraryCount[] = allUsers.users?.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itinerary,
  }));

  return {
    user: currentUser,
    dashboardStats,
    allTrips,
    userGrowth,
    tripsByTravelStyle,
    allUsers: mappedUsers,
  };
};

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData.user as User | null;

  const { dashboardStats, allTrips, userGrowth, tripsByTravelStyle, allUsers } =
    loaderData;

       const trips = allTrips.map((trip) => ({
        imageUrl: trip.imageUrls[0],
        name: trip.name,
        interest: trip.interests,
    }))

    const usersAndTrips = [
        {
            title: 'Latest user signups',
            dataSource: allUsers,
            field: 'count',
            headerText: 'Trips created'
        },
        {
            title: 'Trips based on interests',
            dataSource: trips,
            field: 'interest',
            headerText: 'Interests'
        }
    ]


  // Safe destructuring with defaults
  const {
    totalUsers = 0,
    userJoined = { currentMonth: 0, lastMonthCount: 0 },
    totalTrips = 0,
    tripCreated = { currentMonth: 0, lastMonthCount: 0 },
    userRole = { total: 0, currentMonth: 0, lastMonthCount: 0 },
  } = dashboardStats ?? {};

  const welcomeTitle = `Welcome back, ${user?.name ?? "Guest"} 👋`;

  return (
    <main className="wrapper">
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
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonthCount}
          />
        </div>
      </section>

      {/* Created Trips Section */}
      <section className="mt-5">
        <h1 className="text-xl font-semibold mb-4 font-figtree">Trips</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {allTrips.map((trip) => (
            <TripCard
              id={trip.id}
              key={trip.id}
              name={trip.name!}
              location={trip.itinerary?.[0].location ?? ""}
              imageUrls={trip.imageUrls[0]}
              tags={[trip.interests!, trip.travelStyle!]}
              price={trip.estimatedPrice!}
            />
          ))}
        </div>
      </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ChartComponent
                    id="chart-1"
                    primaryXAxis={userXAxis}
                    primaryYAxis={useryAxis}
                    title="User Growth"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="Column"
                            name="Column"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />

                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="SplineArea"
                            name="Wave"
                            fill="rgba(71, 132, 238, 0.3)"
                            border={{ width: 2, color: '#4784EE'}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>

                <ChartComponent
                    id="chart-2"
                    primaryXAxis={tripXAxis}
                    primaryYAxis={tripyAxis}
                    title="Trip Trends"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={tripsByTravelStyle}
                            xName="travelStyle"
                            yName="count"
                            type="Column"
                            name="day"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </section>

             <section className="user-trip wrapper">
                {usersAndTrips.map(({ title, dataSource, field, headerText}, i) => (
                    <div key={i} className="flex flex-col gap-5">
                        <h3 className="p-20-semibold text-dark-100">{title}</h3>

                        <GridComponent dataSource={dataSource} gridLines="None">
                            <ColumnsDirective>
                                <ColumnDirective
                                    field="name"
                                    headerText="Name"
                                    width="200"
                                    textAlign="Left"
                                    template={(props: UserData) => (
                                        <div className="flex items-center gap-1.5 px-4">
                                            <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" referrerPolicy="no-referrer" />
                                            <span>{props.name}</span>
                                        </div>
                                    )}
                                />

                                <ColumnDirective
                                field={field}
                                headerText={headerText}
                                width="150"
                                textAlign="Left"
                                />
                                </ColumnsDirective>
                        </GridComponent>
                    </div>
                ))}
            </section>


    </main>
  );
};

export default Dashboard;
