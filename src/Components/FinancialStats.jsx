export default function FinancialStats() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Financial & Sales Statistic</h2>

      <div className="flex justify-between text-sm mb-2">
        <span>Total Earning</span>
        <span className="font-semibold">£8593.65</span>
      </div>
      <div className="flex justify-between text-sm mb-4">
        <span>Total Expenses</span>
        <span className="font-semibold">£3570.50</span>
      </div>

      <div className="border-t border-gray-200 my-4" />

      <div>
        <h3 className="text-sm text-gray-600 mb-1">Total Sales</h3>
        <div className="text-2xl font-bold">£456,780</div>
        <p className="text-green-500 text-sm">↑ 8.5% this month</p>
      </div>
    </div>
  );
}
