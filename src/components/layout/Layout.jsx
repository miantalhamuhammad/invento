import { SidebarNavigationSection } from "./Sidebar";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
    return (
        <div className="flex w-full h-screen bg-white">
            {/* Sidebar Navigation - fixed width */}
            <div className="flex-shrink-0">
                <SidebarNavigationSection />
            </div>

            {/* Main content - takes remaining space */}
            <div className="flex-1 overflow-auto">
                <div className="w-full h-full p-8 bg-gray-25">
                    {children}
                </div>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};