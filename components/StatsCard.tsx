import { calculateTrendPercentage } from "lib/utils";


interface StatsCard {
  headerTitle: string;
  total: number;
  lastMonthCount: number;
  currentMonthCount: number;
}

const StatsCard = ({ 
    headerTitle,
    total,
    currentMonthCount,
    previousMonthCount }: StatsCard) => {
        const { trend, percentage } =calculateTrendPercentage(currentMonthCount, previousMonthCount);
        const isDecrement = trend === "decrement";
  return (
   <article className="start-card">
    <h3 className="text-base font-medium">
        {headerTitle}
    </h3>
      
   </article>
  )
}

export default StatsCard
