/* eslint-disable react/prop-types */
 const StatsCard = ({ title, value, trend, trendValue, icon: Icon })=> {
  const isTrendUp = trend === 'up';
  
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className={`stat-desc flex items-center ${isTrendUp ? 'text-success' : 'text-error'}`}>
          <Icon className="h-4 w-4 mr-1" />
          {trendValue}
        </div>
      </div>
    </div>
  );
}
export default StatsCard;