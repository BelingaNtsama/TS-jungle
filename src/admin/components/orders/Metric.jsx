import {motion} from 'framer-motion'


const Metric = ({title, stat, Icon, color}) => {
    return <div className="bg-white p-4 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className={`w-5 h-5 text-blue-600`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{title}</p>
                  <p className="text-xl font-bold text-gray-900">{stat}</p>
                </div>
              </div>
            </div>
}

export default Metric;