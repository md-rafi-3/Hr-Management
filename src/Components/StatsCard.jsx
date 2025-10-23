const StatsCard = ({ title, value, percent }) => {
  return (
    <div className="card bg-base-100 shadow-md p-4 border border-base-300 rounded-2xl">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <span
        className={`text-sm ${
          percent.startsWith("-") ? "text-error" : "text-success"
        }`}
      >
        {percent}
      </span>
    </div>
  );
};

export default StatsCard;
