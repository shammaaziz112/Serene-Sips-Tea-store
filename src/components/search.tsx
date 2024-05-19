export function Search() {
    return (
        <div>
        <form className="flex-1 relative ml-12 mb-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            className="pl-9 h-9 w-full text-lg rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-50"
            placeholder="Search"
            type="search"
          />
        </form>
      </div>
    )
}

function SearchIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }