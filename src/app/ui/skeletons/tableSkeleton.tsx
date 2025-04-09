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
    <div className="w-full px-4 pt-28 md:pt-16">
      <div className="text-center px-2 mb:px-4">
        <span
          className={`inline-block h-6 w-56 rounded bg-gray-200 dark:bg-gray-700 ${shimmerInline}`}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-6 pt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="
              p-1 rounded-sm bg-white dark:bg-gray-800 shadow-sm
              flex flex-col"
          >
            <div className="flex justify-center items-center border-black">
              <div
                className={`w-full aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded ${shimmer}`}
              />
            </div>

            <div className="text-black dark:text-white mt-1 flex justify-between items-center">
              <div className="flex flex-col gap-1 w-full">
                <div
                  className={`h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 ${shimmer}`}
                />
                <div
                  className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 ${shimmer}`}
                />
              </div>
              <div
                className={`h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full ml-2 ${shimmer}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
