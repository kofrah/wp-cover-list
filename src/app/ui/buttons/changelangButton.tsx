export default function ChangelangButton() {
  return (
    <div className="flex items-center justify-end px-4">
      {/* 日本語 */}
      <label className="relative flex items-center cursor-pointer">
        <input
          type="radio"
          name="lang"
          value="ja"
          defaultChecked
          className="peer hidden"
        />
        <span
          className="w-24 px-4 py-2 text-sm font-medium text-center rounded-l-lg border border-gray-300
                        bg-white text-gray-700
                        peer-checked:bg-blue-500 peer-checked:text-white 
                        hover:bg-blue-100"
        >
          日本語
        </span>
      </label>
      {/* English */}
      <label className="relative flex items-center cursor-pointer">
        <input type="radio" name="lang" value="en" className="peer hidden" />
        <span
          className="w-24 px-4 py-2 text-sm font-medium text-center rounded-r-lg border border-gray-300
                        bg-white text-gray-700
                        peer-checked:bg-blue-500 peer-checked:text-white 
                        hover:bg-blue-100"
        >
          English
        </span>
      </label>
    </div>
  );
}
