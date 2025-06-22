import { StatsCard, TripCard } from "components";
import Header from "components/Header";

const Dashboard = () => {
    const user = {
        name: "Khennycool"
    }

    const dashboardStats ={
        totalUsers: 1500,
        userJoined: {currentMonth: 150, previousMonth: 100},
        totalTrips: 2000,
        tripCreated: {currentMonth: 50, previousMonth: 30},
        userRole: {total: 70, currentMonth: 30, previousMonth: 25},
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
             previousMonthCount={userJoined.previousMonth}
            />
            <StatsCard 
             headerTitle="Total Trips"
             total={totalTrips}
             currentMonthCount={tripCreated.currentMonth}
             previousMonthCount={tripCreated.previousMonth}
            />
            <StatsCard 
             headerTitle="Users"
             total={totalUsers}
             currentMonthCount={userRole.currentMonth}
             previousMonthCount={userRole.previousMonth}
            />
           
         </div>
      </section>

      <TripCard/>
    </main>
  )
}

export default Dashboard;
