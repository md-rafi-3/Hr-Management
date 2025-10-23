export default function AlertCard({ title, status, desc, time, color }) {
  const colorMap = {
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="flex justify-between items-center border border-gray-200 p-3 rounded-lg hover:bg-gray-50">
      <div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[color]}`}>
            {status}
          </span>
          <span className="font-semibold">{title}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
