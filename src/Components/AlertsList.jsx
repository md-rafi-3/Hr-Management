import AlertCard from "./AlertCard";

const alerts = [
  {
    title: "Budget Overrun Alert",
    status: "Critical",
    time: "2 hours ago",
    desc: "Marketing department exceeded monthly budget by 15%",
    color: "red",
  },
  {
    title: "Performance Review Due",
    status: "Warning",
    time: "10 hours ago",
    desc: "5 performance reviews are due this week",
    color: "yellow",
  },
  {
    title: "Campaign Launch",
    status: "Approved",
    time: "1 day ago",
    desc: "Marketing campaign successfully launched",
    color: "green",
  },
  {
    title: "High Absenteeism",
    status: "Alert",
    time: "2 days ago",
    desc: "Attendance rate dropped to 93% this week",
    color: "purple",
  },
];

export default function AlertsList() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-medium">Alerts & Notifications</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
          View Details
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((a, i) => (
          <AlertCard key={i} {...a} />
        ))}
      </div>
    </div>
  );
}
