import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  FileText,
  UserCog,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const EmployeeManagement = () => {
  const stats = [
    {
      title: "Current Employees",
      value: 6941,
      change: "+2.1%",
      trend: "Improved from last month",
      color: "text-green-500",
      lineColor: "#22C55E",
      icon: <Users className="text-green-500" size={22} />,
    },
    {
      title: "New Employees",
      value: 640,
      change: "-2.5%",
      trend: "Decreased from last month",
      color: "text-pink-500",
      lineColor: "#EC4899",
      icon: <UserPlus className="text-pink-500" size={22} />,
    },
    {
      title: "Present Today",
      value: 580,
      change: "+5.0%",
      trend: "Increased from last month",
      color: "text-orange-500",
      lineColor: "#F97316",
      icon: <UserCheck className="text-orange-500" size={22} />,
    },
    {
      title: "Absent Today",
      value: -78,
      change: "-0.6%",
      trend: "Decreased from last month",
      color: "text-red-500",
      lineColor: "#EF4444",
      icon: <UserX className="text-red-500" size={22} />,
    },
    {
      title: "New CVs",
      value: 6941,
      change: "+2.5%",
      trend: "Improved from last month",
      color: "text-green-500",
      lineColor: "#22C55E",
      icon: <FileText className="text-green-500" size={22} />,
    },
    {
      title: "Intern Requests",
      value: 106,
      change: "-2.8%",
      trend: "Decreased from last month",
      color: "text-gray-500",
      lineColor: "#9CA3AF",
      icon: <UserCog className="text-gray-500" size={22} />,
    },
    {
      title: "Running Interns",
      value: 580,
      change: "+1.0%",
      trend: "Increased from last month",
      color: "text-orange-400",
      lineColor: "#FB923C",
      icon: <Briefcase className="text-orange-400" size={22} />,
    },
    {
      title: "Intern to Employee",
      value: 640,
      change: "+2.3%",
      trend: "Improved from last month",
      color: "text-purple-500",
      lineColor: "#A855F7",
      icon: <ArrowRight className="text-purple-500" size={22} />,
    },
  ];

  const chartData = [
    { value: 45 },
    { value: 60 },
    { value: 55 },
    { value: 75 },
    { value: 70 },
    { value: 90 },
  ];

  return (
    <div className="bg-base-100 p-6 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Employee Management
        </h2>
        <div className="flex items-center gap-2">
          <select className="select select-bordered select-sm">
            <option>Monthly</option>
            <option>Weekly</option>
          </select>
          <button className="btn btn-sm btn-primary normal-case">View Details</button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-base-200 rounded-xl p-5 border border-base-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  {stat.title}
                </h4>
                <p className={`text-xs font-medium ${stat.color}`}>
                  {stat.change}
                </p>
              </div>
              {stat.icon}
            </div>

            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.trend}</p>
            </div>

            <div className="h-10 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={stat.lineColor}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
