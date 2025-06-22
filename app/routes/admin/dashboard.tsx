import { StatsCard, TripCard } from "components";
import Header from "components/Header";

const Dashboard = () => {
    const user = {
        name: "Khennycool"
    }

    const dashboardStats ={
        totalUsers: 15000,
        userJoined: {currentMonth: 218, lastMonthCount: 176},
        totalTrips: 3210,
        tripCreated: {currentMonth: 150, lastMonthCount: 250},
        userRole: {total: 62, currentMonth: 25, lastMonthCount: 15},
    }

    const { totalUsers, userJoined, tripCreated, userRole, totalTrips } = dashboardStats;


  return (
    <main className="dashboard wrapper">
      <Header
      title={`Welcome back, ${user?.name ?? "Guest"}👋 `}
      description="Track activity, trends, and popular destinations in real time"
      />
      <section className="flex flex-col gap-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <TripCard/>
    </main>
  )
}

export default Dashboard;
