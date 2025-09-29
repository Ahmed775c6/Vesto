import { TrendingUp, TrendingDown, Minus } from "lucide-solid";
import { For } from "solid-js";

// Type definitions
interface Product {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  change: number;
  status: "increasing" | "decreasing" | "stable";
}

// Sample data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    sales: 1242,
    revenue: 24840,
    change: 12.5,
    status: "increasing"
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    category: "Fashion",
    sales: 856,
    revenue: 17120,
    change: -3.2,
    status: "decreasing"
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    sales: 2103,
    revenue: 42060,
    change: 8.7,
    status: "increasing"
  },
  {
    id: "4",
    name: "Gaming Mechanical Keyboard",
    category: "Electronics",
    sales: 542,
    revenue: 37940,
    change: 0.0,
    status: "stable"
  },
  {
    id: "5",
    name: "Yoga Mat Premium",
    category: "Fitness",
    sales: 923,
    revenue: 27690,
    change: 15.3,
    status: "increasing"
  },
  {
    id: "6",
    name: "Ceramic Coffee Mug Set",
    category: "Home & Kitchen",
    sales: 1678,
    revenue: 25170,
    change: -5.1,
    status: "decreasing"
  }
];

const TopProductsTable = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format sales number
  const formatSales = (sales: number) => {
    return sales.toLocaleString();
  };

  // Get trend icon based on status
  const getTrendIcon = (status: Product["status"]) => {
    switch (status) {
      case "increasing":
        return <TrendingUp class="w-3 h-3 text-emerald-500" />;
      case "decreasing":
        return <TrendingDown class="w-3 h-3 text-rose-500" />;
      case "stable":
        return <Minus class="w-3 h-3 text-slate-400" />;
    }
  };

  // Get change text color based on status
  const getChangeColor = (status: Product["status"]) => {
    switch (status) {
      case "increasing":
        return "text-emerald-600 dark:text-emerald-400";
      case "decreasing":
        return "text-rose-600 dark:text-rose-400";
      case "stable":
        return "text-slate-500 dark:text-slate-400";
    }
  };

  return (
    <div class="space-y-6 p-4 sm:p-6">
      <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div class="p-4 sm:p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div class="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
            <div class="text-center sm:text-left">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">Top Products</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">Best performing products</p>
            </div>
            <button class="text-sky-700 dark:text-sky-400 bg-transparent hover:text-sky-600 dark:hover:text-sky-300 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
        </div>
        
        {/** Table */}
        <div class="p-6 space-y-4">
          <For each={sampleProducts}>
            {(product) => (
              <div class="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div class="flex-1">
                  <h4 class="text-sm font-semibold text-slate-800 dark:text-white">
                    {product.name}
                  </h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    {formatSales(product.sales)} sales • {product.category}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-slate-800 dark:text-white">
                    {formatCurrency(product.revenue)}
                  </p>
                  <div class="flex items-center justify-end space-x-1">
                    {getTrendIcon(product.status)}
                    <span class={`text-xs font-medium ${getChangeColor(product.status)}`}>
                      {product.change > 0 ? '+' : ''}{product.change}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default TopProductsTable;