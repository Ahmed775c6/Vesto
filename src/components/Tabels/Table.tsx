import { MoreHorizontal } from "lucide-solid"
import { For } from "solid-js"

// Sample data interface
interface Order {
  id: string
  product: string
  customer: string
  amount: number
  status: "confirmed" | "declined" | "pending"
  date: string
}

// Sample data
const orders: Order[] = [
  {
    id: "#01",
    product: "Wireless Headphones",
    customer: "Chouuikh Ahmed",
    amount: 25.99,
    status: "confirmed",
    date: "24/05/2025 at 11:59"
  },
  {
    id: "#02",
    product: "Smart Watch",
    customer: "Sarah Johnson",
    amount: 199.99,
    status: "pending",
    date: "23/05/2025 at 14:30"
  },
  {
    id: "#03",
    product: "Laptop Stand",
    customer: "Mike Chen",
    amount: 45.50,
    status: "declined",
    date: "23/05/2025 at 09:15"
  },
  {
    id: "#04",
    product: "Mechanical Keyboard",
    customer: "Emma Davis",
    amount: 89.99,
    status: "confirmed",
    date: "22/05/2025 at 16:45"
  },
  {
    id: "#05",
    product: "USB-C Hub",
    customer: "Alex Rodriguez",
    amount: 35.75,
    status: "pending",
    date: "21/05/2025 at 10:20"
  }
]

// Status background styles
const statusStyles = {
  confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  declined: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
}

const Table = () => {
  return (
    <div class="space-y-6 p-4 sm:p-6">
      <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div class="p-4 sm:p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div class="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
            <div class="text-center sm:text-left">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">Recent Orders</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">Latest Customer orders</p>
            </div>
            <button class="text-sky-700 bg-transparent hover:text-sky-600 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
        </div>
        
        {/** Table */}
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-800/50">
                <th class="text-left p-3 sm:p-4 text-sm font-semibold text-slate-600 dark:text-slate-300"> ID</th>
                <th class="text-left p-3 sm:p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Product</th>
                <th class="text-left p-3 sm:p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Customer</th>
                <th class="text-left p-3 sm:p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                <th class="text-left p-3 sm:p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th class="text-left p-3 sm:p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                <th class="text-left p-3 sm:p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              <For each={orders}>
                {(order) => (
                  <tr class="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td class="p-3 sm:p-4">
                      <span class="text-sm sm:text-md font-bold text-sky-700 dark:text-sky-400">
                        {order.id}
                      </span>
                    </td>
                    <td class="p-3 sm:p-4">
                      <span class="text-sm text-slate-800 dark:text-white">
                        {order.product}
                      </span>
                    </td>
                    <td class="p-3 sm:p-4">
                      <span class="text-sm text-slate-800 dark:text-white">
                        {order.customer}
                      </span>
                    </td>
                    <td class="p-3 sm:p-4">
                      <span class="text-sm text-slate-800 dark:text-white">
                        ${order.amount.toFixed(2)}
                      </span>
                    </td>
                    <td class="p-3 sm:p-4">
                      <span class={`font-medium text-xs px-2 py-1 rounded-full capitalize ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td class="p-3 sm:p-4">
                      <span class="text-sm text-slate-800 dark:text-white">
                        {order.date}
                      </span>
                    </td>
                    <td class="p-3 sm:p-4">
                      <MoreHorizontal class="w-4 h-4 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors" />
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table