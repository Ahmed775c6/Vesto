import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info,
  Shield,
  User,
  Database,
  Server,
  Zap
} from "lucide-solid"
import { For } from "solid-js"

// Define the activity type
interface Activity {
  id: number
  title: string
  description: string
  time: string
  type: 'success' | 'warning' | 'error' | 'info'
}

// Sample data
const sampleActivities: Activity[] = [
  {
    id: 1,
    title: "System Backup Completed",
    description: "Daily system backup has been successfully completed",
    time: "2 minutes ago",
    type: "success"
  },
  {
    id: 2,
    title: "New User Registered",
    description: "john.doe@example.com has created a new account",
    time: "15 minutes ago",
    type: "info"
  },
  {
    id: 3,
    title: "Database Maintenance",
    description: "Scheduled database optimization completed",
    time: "1 hour ago",
    type: "success"
  },
  {
    id: 4,
    title: "Security Alert",
    description: "Multiple failed login attempts detected from unknown IP",
    time: "2 hours ago",
    type: "warning"
  },
  {
    id: 5,
    title: "Server Update",
    description: "Application server updated to version 2.1.0",
    time: "3 hours ago",
    type: "info"
  },
  {
    id: 6,
    title: "API Rate Limit Exceeded",
    description: "API rate limit exceeded for user ID 45872",
    time: "5 hours ago",
    type: "error"
  }
]

// Helper function to get background color based on activity type
const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    case 'warning':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
    case 'error':
      return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    case 'info':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    default:
      return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
  }
}

// Helper function to get activity icon
const getActivityIcon = (activity: Activity) => {
  switch (activity.type) {
    case 'success':
      // Use specific icons based on activity content for success type
      if (activity.title.toLowerCase().includes('backup')) {
        return <Shield class="w-4 h-4" />
      } else if (activity.title.toLowerCase().includes('database')) {
        return <Database class="w-4 h-4" />
      }
      return <CheckCircle class="w-4 h-4" />
      
    case 'warning':
      return <AlertCircle class="w-4 h-4" />
      
    case 'error':
      return <XCircle class="w-4 h-4" />
      
    case 'info':
      // Use specific icons based on activity content for info type
      if (activity.title.toLowerCase().includes('user')) {
        return <User class="w-4 h-4" />
      } else if (activity.title.toLowerCase().includes('server')) {
        return <Server class="w-4 h-4" />
      }
      return <Info class="w-4 h-4" />
      
    default:
      return <Info class="w-4 h-4" />
  }
}

const ActivityFeeds = () => {
  return (
    <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700">
      <div class="p-6 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-700/50">
        <div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-white">Activity Feed</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">Recent System Activities</p>
        </div>
        <button class="text-sky-700 dark:text-sky-400 bg-transparent hover:text-blue-800 dark:hover:text-sky-300 text-sm font-medium transition-colors">
          View All
        </button>
      </div>
      
      <div class="p-6">
        <div class="space-y-4">
          <For each={sampleActivities}>
            {(activity) => (
              <div class="flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div class={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity)}
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-semibold text-slate-800 dark:text-white">
                    {activity.title}
                  </h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400 truncate">
                    {activity.description}
                  </p>
                  <div class="flex items-center space-x-1 mt-1">
                    <Clock class="w-3 h-3 text-slate-400" />
                    <span class="text-xs text-slate-500 dark:text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}

export default ActivityFeeds