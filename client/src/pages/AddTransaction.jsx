import React, { use, useState } from "react";
import { 
  ArrowLeft, 
  DollarSign, 
  FileText, 
  Calendar, 
  Tag, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Save,
  X,
  Sparkles,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient"; 
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";


const AddTransaction = () => {

 
  const {token} = useAuth();
  const navigate =useNavigate();
  
  const [transactionData, setTransactionData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
    type: "expense",
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if(!transactionData.amount || !transactionData.description || !transactionData.date || !transactionData.category) {
        console.log("Error: Please fill in all fields.");
        toast.error("Please fill in all fields.");
        return;
      }
      
      setLoading(true);
      
      const response=await axiosClient.post("/transactions", 
        transactionData,{
      headers:{
        Authorization: `Bearer ${token}`
      },
    });
      console.log("Transaction saved successfully!");
      toast.success("Transaction saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving transaction:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = {
    expense: ["Food & Dining", "Transportation", "Shopping", "Entertainment", "Bills & Utilities", "Healthcare", "Education", "Travel", "Others"],
    income: ["Salary", "Freelance", "Business", "Investment", "Gift", "Bonus", "Others"]
  };

  const inputFields = [
    {
      name: "amount",
      label: "Amount",
      type: "number",
      icon: DollarSign,
      placeholder: "Enter amount",
      prefix: "₹"
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      icon: FileText,
      placeholder: "What was this transaction for?"
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      icon: Calendar,
      placeholder: ""
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          
          <div className="text-center mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center space-x-2 text-white/60 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Add Transaction</h1>
            <p className="text-white/60">Record your income or expense</p>
          </div>

    
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          
            <div className="mb-8">
              <label className="block text-white/80 text-sm font-medium mb-4">Transaction Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTransactionData({...transactionData, type: "expense"})}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    transactionData.type === "expense"
                      ? "border-red-400 bg-red-500/20"
                      : "border-white/20 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className={`p-2 rounded-xl ${
                      transactionData.type === "expense" ? "bg-red-500/30" : "bg-white/10"
                    }`}>
                      <TrendingDown className={`w-6 h-6 ${
                        transactionData.type === "expense" ? "text-red-300" : "text-white/60"
                      }`} />
                    </div>
                    <span className={`font-medium ${
                      transactionData.type === "expense" ? "text-red-300" : "text-white/60"
                    }`}>
                      Expense
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTransactionData({...transactionData, type: "income"})}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    transactionData.type === "income"
                      ? "border-green-400 bg-green-500/20"
                      : "border-white/20 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className={`p-2 rounded-xl ${
                      transactionData.type === "income" ? "bg-green-500/30" : "bg-white/10"
                    }`}>
                      <TrendingUp className={`w-6 h-6 ${
                        transactionData.type === "income" ? "text-green-300" : "text-white/60"
                      }`} />
                    </div>
                    <span className={`font-medium ${
                      transactionData.type === "income" ? "text-green-300" : "text-white/60"
                    }`}>
                      Income
                    </span>
                  </div>
                </button>
              </div>
            </div>

         
            <div className="space-y-6">
              {inputFields.map((field) => {
                const Icon = field.icon;
                const isFocused = focusedField === field.name;
                const hasValue = transactionData[field.name]?.length > 0;
                
                return (
                  <div key={field.name} className="relative group">
                    <div className={`relative transition-all duration-300 ${
                      isFocused ? 'transform scale-105' : ''
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center p-4">
                          <Icon className={`w-5 h-5 mr-3 transition-all duration-300 ${
                            isFocused || hasValue 
                              ? 'text-blue-300' 
                              : 'text-gray-400'
                          }`} />
                          <div className="flex-1 relative">
                            <label 
                              htmlFor={field.name}
                              className={`absolute transition-all duration-300 pointer-events-none ${
                                isFocused || hasValue
                                  ? '-translate-y-6 text-xs text-blue-300'
                                  : 'text-sm text-gray-300'
                              }`}
                            >
                              {field.label}
                            </label>
                            <div className="flex items-center">
                              {field.prefix && (
                                <span className="text-white/60 mr-2 pt-4">{field.prefix}</span>
                              )}
                              <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                value={transactionData[field.name]}
                                onChange={handleChange}
                                onFocus={() => setFocusedField(field.name)}
                                onBlur={() => setFocusedField(null)}
                                placeholder={isFocused ? field.placeholder : ""}
                                required
                                className="w-full bg-transparent text-white placeholder-blue-300/50 outline-none pt-4"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

          
              <div className="relative group">
                <div className={`relative transition-all duration-300 ${
                  focusedField === "category" ? 'transform scale-105' : ''
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center p-4">
                      <Tag className={`w-5 h-5 mr-3 transition-all duration-300 ${
                        focusedField === "category" || transactionData.category 
                          ? 'text-blue-300' 
                          : 'text-gray-400'
                      }`} />
                      <div className="flex-1 relative">
                        <label 
                          htmlFor="category"
                          className={`absolute transition-all duration-300 pointer-events-none ${
                            focusedField === "category" || transactionData.category
                              ? '-translate-y-6 text-xs text-blue-300'
                              : 'text-sm text-gray-300'
                          }`}
                        >
                          Category
                        </label>
                        <select
                          name="category"
                          id="category"
                          value={transactionData.category}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("category")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full bg-transparent text-white outline-none pt-4 appearance-none"
                        >
                          <option value="" className="bg-slate-800">Select a category</option>
                          {categories[transactionData.type].map((cat) => (
                            <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

         
            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleSave}
                disabled={loading}
                className="group flex-1 relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Transaction</span>
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </div>
              </button>
            </div>

          
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm mb-3">Quick amounts:</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 500, 1000, 5000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setTransactionData({...transactionData, amount: amount.toString()})}
                    className="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/70 hover:text-white text-sm transition-all duration-300"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
            </div>
          </div>

       
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500/20 rounded-full blur animate-bounce delay-300"></div>
          <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-indigo-500/20 rounded-full blur animate-bounce delay-700"></div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;