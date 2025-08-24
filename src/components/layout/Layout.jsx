import { SidebarNavigationSection } from "./Sidebar";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Sidebar Navigation - fixed positioned, hidden on mobile */}
            <SidebarNavigationSection />

            {/* Main content - responsive margins for sidebar */}
            <div className="md:ml-[280px] min-h-screen">
                <div className="w-full min-h-screen p-4 md:p-6 lg:p-8 bg-gray-25">
                    {children}
                </div>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};