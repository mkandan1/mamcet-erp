import { Icon } from "@iconify/react/dist/iconify.js";

export const Button = ({ text, onClick, loading }) => {
  return (
    <button
      className={`btn btn-primary w-full py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-blue-600"}`}
      onClick={!loading ? onClick : null}
      disabled={loading}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Logging you...
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export const IconButton = ({
  text,
  bgColor = "bg-blue-600",
  textColor = "white",
  icon,
  onClick,
  loading = false,
}) => {
  return (
    <button
      className={`flex items-center gap-2 py-2 px-4 border-${textColor} rounded-md border border-transparent transition-colors duration-300 transform hover:bg-opacity-80 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${bgColor} text-${textColor}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
      ) : (
        <>
          <Icon icon={icon} className="text-lg" />
          <span className="text-sm font-medium">{text}</span>
        </>
      )}
    </button>
  );
};
