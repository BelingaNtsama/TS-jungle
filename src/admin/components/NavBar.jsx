import { Bell, User } from 'lucide-react';

const Navbar = ({ onNotificationsClick }) => {
  return (
    <div className="bg-white border-b px-8 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="ml-2 text-3xl font-semibold bg-linear-90
                  to-green-700 from-gray-700 text-transparent bg-clip-text cursor-pointer">Admin</h1>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button 
            onClick={onNotificationsClick}
            className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@plantverse.com</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-plant-100 flex items-center justify-center">
                <User className="h-6 w-6 text-plant-600" />
              </div>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
              <div className="py-1">
                <div className="border-t border-gray-100"></div>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar