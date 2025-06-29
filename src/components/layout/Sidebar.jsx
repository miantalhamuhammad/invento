// import {
//     ActivityIcon,
//     BarChart2Icon,
//     CheckSquareIcon,
//     ChevronDownIcon,
//     CreditCardIcon,
//     FlagIcon,
//     LayersIcon,
//     LifeBuoyIcon,
//     LogOutIcon,
//     SearchIcon,
//     SettingsIcon,
// } from "lucide-react";
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "../../components/ui/avatar";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { ScrollArea } from "../../components/ui/scroll-area";
// import { Separator } from "../../components/ui/separator";
// import { UnderDevelopmentPage } from "../../pages/under-development";
// import {useState} from "react";
//
//
// export const SidebarNavigationSection = () => {
//     const [showUnderDevelopment, setShowUnderDevelopment] = useState(false);
//
//     // Modify your navigationItems to include onClick handlers
//     const navigationItems = [
//         {
//             icon: <ActivityIcon className="w-6 h-6" />,
//             label: "Overview",
//             isActive: false,
//             onClick: () => setShowUnderDevelopment(true)
//
//         },
//         {
//             icon: <BarChart2Icon className="w-6 h-6" />,
//             label: "Products",
//             isActive: true,
//         },
//         {
//             icon: <LayersIcon className="w-6 h-6" />,
//             label: "Supplier",
//             hasDropdown: true,
//             onClick: () => setShowUnderDevelopment(true)
//         },
//         {
//             icon: <CheckSquareIcon className="w-6 h-6" />,
//             label: "Category",
//             hasDropdown: true,
//             onClick: () => setShowUnderDevelopment(true)
//         },
//         {
//             icon: <FlagIcon className="w-6 h-6" />,
//             label: "Warehouse",
//             hasDropdown: true,
//             onClick: () => setShowUnderDevelopment(true)
//         },
//         {
//             icon: <CreditCardIcon className="w-6 h-6" />,
//             label: "Payment",
//             hasDropdown: true,
//             onClick: () => setShowUnderDevelopment(true)
//         },
//         {
//             icon: <SettingsIcon className="w-6 h-6" />,
//             label: "Roles",
//             hasDropdown: true,
//             onClick: () => setShowUnderDevelopment(true)
//         },
//         {
//             icon: <LifeBuoyIcon className="w-6 h-6" />,
//             label: "Support",
//             hasDropdown: true,
//             onClick: () => setShowUnderDevelopment(true)
//         },
//         {
//             icon: <SettingsIcon className="w-6 h-6" />,
//             label: "Settings",
//             hasDropdown: true,
//             onClick: () => setShowUnderDevelopment(true)
//         },
//     ];
//
//     if (showUnderDevelopment) {
//         return <UnderDevelopmentPage />;
//     }
//     return (
//         <aside className="fixed left-0 top-0 w-[280px] h-screen rounded-r-[20px] shadow-[0px_4px_4px_#00000040] bg-basewhite overflow-hidden">
//             <div className="flex flex-col h-full justify-between">
//                 {/* Top section with logo, search and navigation */}
//                 <div className="flex flex-col gap-6 pt-8">
//                     {/* Logo - Simplified */}
//                     <div className="px-6">
//                         <div className="flex items-center h-[69px]">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
//                                     <span className="text-white font-bold text-lg">L</span>
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <span className="font-bold text-gray-900 text-lg">Logo</span>
//                                     <span className="text-xs text-gray-500">Dashboard</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Search input */}
//                     <div className="px-6">
//                         <div className="relative w-full">
//                             <div className="flex items-center border border-solid border-[#cfd4dc] rounded-lg shadow-shadow-xs">
//                                 <SearchIcon className="w-5 h-5 ml-3.5 text-gray-500" />
//                                 <Input
//                                     className="border-0 shadow-none h-11 pl-2 text-gray-500 font-text-md-normal"
//                                     placeholder="Search"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Navigation menu */}
//                     <ScrollArea className="flex-1 px-4">
//                         <nav className="flex flex-col gap-1">
//                             {navigationItems.map((item, index) => (
//                                 <Button
//                                     key={index}
//                                     variant="ghost"
//                                     className={`flex justify-between items-center w-full px-3 py-2 rounded-md ${
//                                         item.isActive
//                                             ? "bg-[#f9f5ff] text-[#6840c6]"
//                                             : "bg-basewhite text-gray-700"
//                                     }`}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         {item.icon}
//                                         <span className="font-text-md-medium text-[length:var(--text-md-medium-font-size)] leading-[var(--text-md-medium-line-height)]">
//                       {item.label}
//                     </span>
//                                     </div>
//                                     {item.hasDropdown && <ChevronDownIcon className="w-5 h-5" />}
//                                 </Button>
//                             ))}
//                         </nav>
//                     </ScrollArea>
//                 </div>
//
//                 {/* Footer with user profile */}
//                 <footer className="flex flex-col gap-6 pb-8 px-4">
//                     <Separator className="w-full h-px" />
//                     <div className="flex items-start justify-between px-2">
//                         <div className="flex items-center gap-3">
//                             <Avatar className="w-10 h-10">
//                                 <AvatarImage src="/avatar.png" alt="User avatar" />
//                                 <AvatarFallback>OR</AvatarFallback>
//                             </Avatar>
//                             <div className="flex flex-col items-start">
//                 <span className="font-medium text-gray-900 text-sm leading-5 font-['Inter',Helvetica]">
//                   Olivia Rhye
//                 </span>
//                                 <span className="font-text-sm-normal text-gray-500 text-[length:var(--text-sm-normal-font-size)] leading-[var(--text-sm-normal-line-height)]">
//                   Admin
//                 </span>
//                             </div>
//                         </div>
//                         <Button variant="ghost" size="icon" className="w-5 h-5 p-0">
//                             <LogOutIcon className="w-5 h-5" />
//                         </Button>
//                     </div>
//                 </footer>
//             </div>
//         </aside>
//     );
// };
import {
    Activity,
    BarChart2,
    CheckSquare,
    ChevronDown,
    CreditCard,
    Flag,
    Layers,
    LifeBuoy,
    LogOut,
    Search,
    Settings,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/path";

export const SidebarNavigationSection = () => {
    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    const navigationItems = [
        {
            icon: <Activity className="w-6 h-6" />,
            label: "Overview",
            isActive: currentPath === PATHS.dashboard,
            onClick: () => navigate("/under-development")
        },
        {
            icon: <BarChart2 className="w-6 h-6" />,
            label: "Products",
            isActive: currentPath === PATHS.dashboard,
            onClick: () => navigate(PATHS.dashboard)
        },
        {
            icon: <Layers className="w-6 h-6" />,
            label: "Supplier",
            hasDropdown: true,
            onClick: () => navigate("/under-development")
        },
        {
            icon: <CheckSquare className="w-6 h-6" />,
            label: "Category",
            hasDropdown: true,
            onClick: () => navigate(PATHS.catagory)
        },
        {
            icon: <Flag className="w-6 h-6" />,
            label: "Warehouse",
            hasDropdown: true,
            onClick: () => navigate("/under-development")
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            label: "Payment",
            hasDropdown: true,
            onClick: () => navigate("/under-development")
        },
        {
            icon: <Settings className="w-6 h-6" />,
            label: "Roles",
            hasDropdown: true,
            onClick: () => navigate("/under-development")
        },
        {
            icon: <LifeBuoy className="w-6 h-6" />,
            label: "Support",
            hasDropdown: true,
            onClick: () => navigate("/under-development")
        },
        {
            icon: <Settings className="w-6 h-6" />,
            label: "Settings",
            hasDropdown: true,
            onClick: () => navigate("/under-development")
        },
    ];

    return (
        <aside className="fixed left-0 top-0 w-[280px] h-screen rounded-r-[20px] shadow-[0px_4px_4px_#00000040] bg-basewhite overflow-hidden">
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-6 pt-8">
                    <div className="px-6">
                        <div className="flex items-center h-[69px]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">I</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900 text-lg">Invento</span>
                                    <span className="text-xs text-gray-500">Dashboard</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6">
                        <div className="relative w-full">
                            <div className="flex items-center border border-solid border-[#cfd4dc] rounded-lg shadow-shadow-xs">
                                <Search className="w-5 h-5 ml-3.5 text-gray-500" />
                                <Input
                                    className="border-0 shadow-none h-11 pl-2 text-gray-500 font-text-md-normal"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 px-4">
                        <nav className="flex flex-col gap-1">
                            {navigationItems.map((item, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    className={`flex justify-between items-center w-full px-3 py-2 rounded-md ${
                                        item.isActive
                                            ? "bg-[#f9f5ff] text-[#6840c6]"
                                            : "bg-basewhite text-gray-700"
                                    }`}
                                    onClick={item.onClick}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span className="font-text-md-medium text-[length:var(--text-md-medium-font-size)] leading-[var(--text-md-medium-line-height)]">
                                            {item.label}
                                        </span>
                                    </div>
                                    {item.hasDropdown && <ChevronDown className="w-5 h-5" />}
                                </Button>
                            ))}
                        </nav>
                    </ScrollArea>
                </div>

                <footer className="flex flex-col gap-6 pb-8 px-4">
                    <Separator className="w-full h-px" />
                    <div className="flex items-start justify-between px-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src="/avatar.png" alt="User avatar" />
                                <AvatarFallback>OR</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                                <span className="font-medium text-gray-900 text-sm leading-5 font-['Inter',Helvetica]">
                                    Olivia Rhye
                                </span>
                                <span className="font-text-sm-normal text-gray-500 text-[length:var(--text-sm-normal-font-size)] leading-[var(--text-sm-normal-line-height)]">
                                    Admin
                                </span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="w-5 h-5 p-0">
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </div>
                </footer>
            </div>
        </aside>
    );
};