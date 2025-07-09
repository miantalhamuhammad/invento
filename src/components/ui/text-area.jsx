import PropTypes from "prop-types";

function Textarea({ className = "", rows = 4, ...props }) {
    const baseClasses =
        "flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

    return (
        <textarea
            rows={rows}
            className={`${baseClasses} ${className}`}
            {...props}
        />
    );
}

Textarea.propTypes = {
    className: PropTypes.string,
    rows: PropTypes.number,
};

export { Textarea };
