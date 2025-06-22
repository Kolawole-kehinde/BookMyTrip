import { calculateTrendPercentage, cn } from "lib/utils";

interface StatsCardProps {
  headerTitle: string;
  total: number;
  currentMonthCount: number;
  lastMonthCount: number;
}

const StatsCard = ({
  headerTitle,
  total,
  currentMonthCount,
  lastMonthCount,
}: StatsCardProps) => {
  const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount);
  const isDecrement = trend === "decrement";

  return (
    <article className="stats-card bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-base font-semibold text-gray-800">{headerTitle}</h3>

      <div className="flex items-center gap-2">
        {/* Right: Stats content */}
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">{total}</h2>
          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img
                src={`/assets/icons/${isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"}`}
                alt={isDecrement ? "Arrow down" : "Arrow up"}
                className="w-5 h-5"
              />
              <figcaption
                className={cn(
                  "text-sm font-medium",
                  isDecrement ? "text-red-500" : "text-green-500"
                )}
              >
                {Math.round(percentage)}%
              </figcaption>
            </figure>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>

          {/* Left: Icon image */}
        <img
          src={`/assets/icons/${isDecrement ? "decrement.svg" : "increment.svg"}`}
          alt={isDecrement ? "Decrease trend icon" : "Increase trend icon"}
          className="size-24"
        />
      </div>
    </article>
  );
};

export default StatsCard;
