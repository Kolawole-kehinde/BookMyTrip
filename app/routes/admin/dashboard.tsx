import Header from "components/Header";

const Dashboard = () => {
    const user = {
        name: "Khennycool"
    }
  return (
    <main className="dashboard wrapper">
      <Header
      title={`Welcome back, ${user?.name ?? "Guest"}👋 `}
      description="Track activity, trends, and popular destinations in real time"
      />
      Dashboard page content goes here.
    </main>
  )
}

export default Dashboard;
