import React from "react";
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend,
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#3366AA'];

const Charts = ({ transactions }) => {

  const categoryData = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, tx) => {
      const index = acc.findIndex(item => item.name === tx.category);
      if (index === -1) acc.push({ name: tx.category, value: tx.amount });
      else acc[index].value += tx.amount;
      return acc;
    }, []);

 
  const monthData = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    const monthYear = date.toLocaleString("default", { month: "short", year: "numeric" });
    const index = acc.findIndex(item => item.month === monthYear);
    if (index === -1) {
      acc.push({ month: monthYear, income: 0, expense: 0 });
      acc[acc.length - 1][tx.type] = tx.amount;
    } else {
      acc[index][tx.type] += tx.amount;
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <PieTooltip />
          <PieLegend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Income & Expense</h3>
        <BarChart width={500} height={300} data={monthData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <BarTooltip />
          <BarLegend />
          <Bar dataKey="income" fill="#00C49F" />
          <Bar dataKey="expense" fill="#FF8042" />
        </BarChart>
      </div>
    </div>
  );
};

export default Charts;
