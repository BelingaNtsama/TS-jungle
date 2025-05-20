/* eslint-disable no-unused-vars */

function Feature({ Icon, title, description }) {
    return (
      <div className="flex items-center space-x-4">
        <div className="bg-green-700 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-gray-700 font-semibold">{title}</h3>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    );
  }
  
  export default Feature;