import { ArrowRight, DollarSign, TrendingUp, TrendingDown, Users, ShoppingCart, Activity } from "lucide-solid"

const Data = [
  {
    title: "Total Revenue",
    value: "124.536",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    progress: 75
  },
  {
    title: "Total Customers",
    value: "1,248",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
    progress: 60
  },
  {
    title: "Total Orders",
    value: "356",
    change: "-3.4%",
    trend: "down",
    icon: ShoppingCart,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
    progress: 45
  },
  {
    title: "Active Now",
    value: "89",
    change: "+2.1%",
    trend: "up",
    icon: Activity,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
    progress: 30
  }
]

const Cardstates = () => {
  return (
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Data.map((item) => (
          <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 group">
            
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  {item.title}
                </p>
                <p class="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                  {item.value}
                </p>
                <div class="flex items-center space-x-2">
                  {item.trend === "up" ? (
                    <TrendingUp class="w-4 h-4 text-emerald-500" />
                  ) : (
                    <TrendingDown class="w-4 h-4 text-red-500" />
                  )}
                  <span class={`text-sm font-medium ${item.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                    {item.change}
                  </span>
                  <span class="text-sm text-slate-500 dark:text-slate-400">
                    vs last month
                  </span>
                </div>
              </div>
              
              <div class={`p-3 rounded-xl ${item.bgColor} group-hover:scale-110 transition-all duration-200`}>
                <item.icon class={`w-6 h-6 ${item.textColor}`} />
              </div>
            </div>
            
            <div class="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                class={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cardstates