const shimmer = `
  relative overflow-hidden
  before:absolute before:inset-0 before:-translate-x-full
  before:animate-[shimmer_2s_infinite]
  before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent
`;

const shimmerInline = `
  relative overflow-hidden
  before:absolute before:inset-y-0 before:left-0
  before:w-full before:-translate-x-full
  before:animate-[shimmer_2s_infinite]
  before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent
`;

export function TableSkeleton() {
  return (
    <div className="px-4 pt-28 md:pt-16">
      <div className="text-center px-2 mb:px-4">
        <span
          className={`inline-block h-6 w-56 rounded bg-gray-200 dark:bg-gray-700 ${shimmerInline}`}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-6 pt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-sm"
          >
            <div
              className={`aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded mb-2 ${shimmer}`}
            />
            <div
              className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-1 ${shimmer}`}
            />
            <div
              className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 ${shimmer}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
