import React from "react";

const TransactionFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <select name="type" value={filters.type} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="text"
        name="category"
        placeholder="Search Category"
        value={filters.category}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default TransactionFilters;
