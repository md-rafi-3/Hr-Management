import EmployeeManagement from "../Components/EmployeeManagement";
import StatsCard from "../components/StatsCard";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const chartData = {
    options: {
      chart: { id: "basic-bar", toolbar: { show: false } },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
      colors: ["#4f46e5"],
      dataLabels: { enabled: false },
    },
    series: [
      {
        name: "Engagement",
        data: [300, 400, 350, 500, 490, 600, 700],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="space-y-6">
       <EmployeeManagement></EmployeeManagement>
      </div>

      <div className="bg-base-100 rounded-2xl shadow p-6">
        <h2 className="font-semibold mb-4">Employee Engagement</h2>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={280}
        />
      </div>
    </div>
  );
};

export default Dashboard;
