import { useState } from "react";
import Chart from "react-apexcharts";
import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import EmployeeManagement from "../Components/EmployeeManagement";
import FinancialStats from "../Components/FinancialStats";
import AlertsList from "../Components/AlertsList";


const chartOptions = {
  chart: { id: "dashboard-chart", toolbar: { show: false } },
  xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
  stroke: { curve: "smooth" },
  colors: ["#7C3AED"],
  dataLabels: { enabled: false },
  grid: { borderColor: "#eee" },
  tooltip: { theme: "light" },
};

const chartMetrics = {
  "Job Openings": [40, 60, 70, 80, 65, 75, 85],
  "New Hires": [20, 25, 28, 35, 30, 40, 38],
  "Applications Received": [300, 350, 400, 420, 410, 450, 470],
  "Interview Stage": [10, 12, 15, 14, 18, 20, 22],
  "Attendance Rate": [88, 90, 92, 91, 93, 95, 94],
  "Absenteeism Rate": [6, 5, 4, 5, 3, 4, 2],
  "Cash Flow Status": [15000, 18000, 20000, 22000, 19000, 24000, 26000],
  "Current Balance": [8000, 8500, 9000, 9500, 9700, 10000, 10500],
};

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState("Job Openings");
  const metricOptions = Object.keys(chartMetrics);

  const chartData = {
    options: chartOptions,
    series: [
      {
        name: selectedMetric,
        data: chartMetrics[selectedMetric],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 space-y-6 font-sans">
      {/* Header */}
       {/* Employee Management */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <EmployeeManagement />
      </div>

      {/* Chart + Stats section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
          {/* Chart Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Recruitment & Employee Engagement
            </h2>

            {/* Custom Dropdown */}
            <Listbox value={selectedMetric} onChange={setSelectedMetric}>
              <div className="relative w-56">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <span className="block truncate">{selectedMetric}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <FiChevronDown className="h-4 w-4 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {metricOptions.map((option) => (
                    <Listbox.Option
                      key={option}
                      value={option}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-purple-100 text-purple-700" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                              <FaCheck className="h-4 w-4" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* Chart */}
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={280}
          />
        </div>

        {/* Financial Stats */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <FinancialStats />
        </div>
      </div>

     

      {/* Alerts */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <AlertsList />
      </div>
    </div>
  );
};

export default Dashboard;
