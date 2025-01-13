"use client";
function SortButton() {
  return (
    <div className="flex items-center justify-end px-4">
      {/* 新しい順 */}
      <label className="relative flex items-center cursor-pointer">
        <input
          type="radio"
          name="sortOrder"
          value="newest"
          defaultChecked
          className="peer hidden"
        />
        <span
          className="w-24 px-4 py-2 text-sm font-medium text-center rounded-l-lg border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                     peer-checked:bg-blue-500 peer-checked:text-white 
                     hover:bg-blue-100 dark:hover:bg-blue-600"
        >
          新しい順
        </span>
      </label>
      {/* 古い順 */}
      <label className="relative flex items-center cursor-pointer">
        <input
          type="radio"
          name="sortOrder"
          value="oldest"
          className="peer hidden"
        />
        <span
          className="w-24 px-4 py-2 text-sm font-medium text-center rounded-r-lg border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                     peer-checked:bg-blue-500 peer-checked:text-white 
                     hover:bg-blue-100 dark:hover:bg-blue-600"
        >
          古い順
        </span>
      </label>
    </div>
  );
}

export default SortButton;
