import PropTypes from "prop-types";

function Label({ className = "", children, ...props }) {
    const baseClasses = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <label className={`${baseClasses} ${className}`} {...props}>
            {children}
        </label>
    );
}

Label.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export { Label };
