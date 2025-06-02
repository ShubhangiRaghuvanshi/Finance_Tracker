import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet, 
  Plus, 
  TrendingUp, 
  Filter,
  BarChart3,
  PieChart,
  LogOut
} from "lucide-react";

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    date: ''
  });

  const navigate = useNavigate();
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6F91', '#FF9671'];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [token]);


  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesType = filters.type ? tx.type === filters.type : true;
      const matchesCategory = filters.category
        ? tx.category.toLowerCase().includes(filters.category.toLowerCase())
        : true;
      const matchesDate = filters.date ? tx.date === filters.date : true;
      return matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, filters]);


  const { income, expense, balance } = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense, balance: income - expense };
  }, [filteredTransactions]);

  // Pie chart data based on filtered transactions
  const pieData = useMemo(() => {
    const map = {};
    filteredTransactions.forEach(({ category, amount }) => {
      if (!category) return;
      map[category] = (map[category] || 0) + amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredTransactions]);

  // Bar chart data based on filtered transactions
  const barData = useMemo(() => {
    const map = {};
    filteredTransactions.forEach(({ date, amount }) => {
      if (!date) return;
      const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
      map[month] = (map[month] || 0) + amount;
    });
    return Object.entries(map)
      .map(([month, value]) => ({ month, value }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));
  }, [filteredTransactions]);

  // Currency formatting helper
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  // Date formatting helper
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  // UI components (StatsCard, TransactionItem) remain the same

  // ... (StatsCard and TransactionItem components here, unchanged)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background & header omitted for brevity */}

      {/* Filters UI */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Filter className="w-6 h-6 text-indigo-400" />
            <span>Transaction Filters</span>
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="text"
              placeholder="Category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white"
            />

            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white"
            />
          </div>
        )}
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard 
          title="Total Income" 
          amount={formatCurrency(income)} 
          color="bg-gradient-to-br from-green-500/20 to-emerald-600/20" 
          icon={ArrowUpCircle}
          trend="+12.5%"
        />
        <StatsCard 
          title="Total Expenses" 
          amount={formatCurrency(expense)} 
          color="bg-gradient-to-br from-red-500/20 to-pink-600/20" 
          icon={ArrowDownCircle}
          trend="-3.2%"
        />
        <StatsCard 
          title="Net Balance" 
          amount={formatCurrency(balance)} 
          color="bg-gradient-to-br from-blue-500/20 to-indigo-600/20" 
          icon={Wallet}
          trend="+8.1%"
        />
      </div>

      {/* Charts using filtered data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          {/* Bar chart */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              <span>Spending Overview</span>
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="white" />
                <YAxis stroke="white" />
                <ReTooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#3b82f6" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          {/* Pie chart */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <PieChart className="w-6 h-6 text-pink-400" />
              <span>Category Breakdown</span>
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip formatter={(value) => formatCurrency(value)} />
                <ReLegend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <button
  onClick={() => navigate("/add-transaction")}
  className="flex items-center space-x-2 p-3 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
>
  <Plus className="w-5 h-5" />
  <span>Add Transaction</span>
</button>


      {/* Transaction list using filtered transactions */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-800">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions</h3>
        {filteredTransactions.length === 0 ? (
          <p className="text-white/60">No transactions match your filter criteria.</p>
        ) : (
          filteredTransactions.map((tx) => (
            <TransactionItem key={tx._id} transaction={tx} />
          ))
        )}
      </div>
    </div>
  );
};



const StatsCard = ({ title, amount, color, icon: Icon, trend }) => (
  <div
    className={`${color} rounded-2xl p-6 border border-white/20 flex flex-col justify-between h-full`}
  >
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-white font-semibold text-lg">{title}</h4>
      <Icon className="w-8 h-8 text-white/70" />
    </div>
    <p className="text-3xl font-bold text-white">{amount}</p>
    {trend && (
      <p className="text-green-400 mt-2 text-sm font-semibold flex items-center space-x-1">
        <TrendingUp className="w-4 h-4" />
        <span>{trend}</span>
      </p>
    )}
  </div>
);

// TransactionItem component
const TransactionItem = ({ transaction }) => {
  const { _id, description, amount, category, date, type } = transaction;

  return (
    <div className="flex justify-between items-center mb-3 last:mb-0 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
      <div className="flex flex-col text-white">
        <span className="font-semibold">{description}</span>
        <span className="text-sm text-white/70">{category}</span>
        <span className="text-xs text-white/50">{new Date(date).toLocaleDateString()}</span>
      </div>
      <div
        className={`font-bold text-lg ${
          type === "income" ? "text-green-400" : "text-red-400"
        }`}
      >
        {type === "income" ? "+" : "-"}
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount)}
      </div>
    </div>
  );
};

export default Dashboard;
