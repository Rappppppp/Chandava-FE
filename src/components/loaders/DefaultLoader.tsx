import { Loader2 } from "lucide-react"
import '../../config/css/default-loader.css'

const DefaultLoader = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="animate-spin w-10 h-10 text-gray-600" />

      <div className="flex items-center text-lg font-medium text-gray-700">
        Loading
        <span className="flex ml-1">
          <span className="dot-animation">.</span>
          <span className="dot-animation delay-200">.</span>
          <span className="dot-animation delay-400">.</span>
        </span>
      </div>
    </div>
  )
}

export default DefaultLoader
