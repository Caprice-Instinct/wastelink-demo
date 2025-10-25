import { Search } from 'lucide-react';

export default function SearchFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterValue,
  onFilterChange,
  filterOptions = []
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
      <div className="flex-1 w-full">
        <div className="flex items-center space-x-2 bg-gray-50 px-3 sm:px-4 py-2 rounded-lg border">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-none outline-none text-xs sm:text-sm flex-1 bg-transparent min-w-0"
          />
        </div>
      </div>
      {filterOptions.length > 0 && (
        <select
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-white px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm w-full sm:w-auto"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
