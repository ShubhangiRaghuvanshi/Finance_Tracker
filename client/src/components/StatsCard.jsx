import { ArrowUpCircle,ArrowDownCircle,Wallet } from "lucide-react";

const StatsCard = ({ title, amount, color, icon: Icon }) => {
  return (
    <div className={`rounded-xl p-4 shadow-sm hover:shadow-md transition ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm text-gray-600">{title}</h2>
          <p className="text-2xl font-bold text-gray-900">{amount}</p>
        </div>
        {Icon && <Icon className="h-6 w-6 text-gray-500" />}
      </div>
    </div>
  );
};
export default StatsCard;

