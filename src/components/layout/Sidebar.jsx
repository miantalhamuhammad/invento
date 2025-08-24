"use client"

import {
    Activity,
    BarChart2,
    CheckSquare,
    ChevronDown,
    CreditCard,
    Layers,
    LifeBuoy,
    LogOut,
    Search,
    Settings,
    Package,
    ShoppingCart,
    Users,
    Truck,
    FileText,
    Building,
    UserCheck,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx"
import { Button } from "../ui/button.jsx"
import { Input } from "../ui/input.jsx"
import { ScrollArea } from "../ui/scroll-area.jsx"
import { Separator } from "../ui/separator.jsx"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/slices/authSlice.js"
import { PATHS } from "../../routes/path"
import { useState } from "react"

export const SidebarNavigationSection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentPath = window.location.pathname
    const [openGroups, setOpenGroups] = useState({})

    const handleLogout = () => {
        // Clear Redux state and localStorage
        dispatch(logout())

        // Redirect to login page
        navigate("/login")
    }

    const toggleGroup = (groupLabel) => {
        setOpenGroups((prev) => ({
            ...prev,
            [groupLabel]: !prev[groupLabel],
        }))
    }

    // Check if any child in a group is active
    const isGroupActive = (children) => {
        return children?.some((child) => child.isActive) || false
    }

    const navigationItems = [
        {
            icon: <Activity className="w-5 h-5" />,
            label: "Overview",
            isActive: currentPath === PATHS.dashboard,
            onClick: () => navigate(PATHS.dashboard),
        },
        {
            label: "Products",
            icon: <BarChart2 className="w-5 h-5" />,
            children: [
                {
                    icon: <Package className="w-4 h-4" />,
                    label: "Product",
                    isActive: currentPath === PATHS.product,
                    onClick: () => navigate(PATHS.product),
                },
                {
                    icon: <CheckSquare className="w-4 h-4" />,
                    label: "Category",
                    isActive: currentPath === PATHS.catagory,
                    onClick: () => navigate(PATHS.catagory),
                },
            ],
        },
        {
            label: "Inventory",
            icon: <Package className="w-5 h-5" />,
            children: [
                {
                    icon: <Building className="w-4 h-4" />,
                    label: "Warehouse",
                    isActive: currentPath === PATHS.warehouse,
                    onClick: () => navigate(PATHS.warehouse),
                },
                {
                    icon: <Package className="w-4 h-4" />,
                    label: "Stock",
                    isActive: currentPath === PATHS.stock,
                    onClick: () => navigate(PATHS.stock),
                },
            ],
        },
        {
            label: "Orders",
            icon: <ShoppingCart className="w-5 h-5" />,
            children: [
                {
                    icon: <FileText className="w-4 h-4" />,
                    label: "Purchase Order",
                    isActive: currentPath === PATHS.purchase_order,
                    onClick: () => navigate(PATHS.purchase_order),
                },
                {
                    icon: <ShoppingCart className="w-4 h-4" />,
                    label: "Sale Order",
                    isActive: currentPath === PATHS.sale_order,
                    onClick: () => navigate(PATHS.sale_order),
                },
                {
                    icon: <Truck className="w-4 h-4" />,
                    label: "Shipment",
                    isActive: currentPath === PATHS.shipment,
                    onClick: () => navigate(PATHS.shipment),
                },
            ],
        },
        {
            icon: <Layers className="w-5 h-5" />,
            label: "Supplier",
            isActive: currentPath === PATHS.supplier,
            onClick: () => navigate(PATHS.supplier),
        },
        {
            icon: <Users className="w-5 h-5" />,
            label: "Customer",
            isActive: currentPath === PATHS.customer,
            onClick: () => navigate(PATHS.customer),
        },
        {
            label: "Employee",
            icon: <UserCheck className="w-5 h-5" />,
            children: [
                {
                    icon: <Users className="w-4 h-4" />,
                    label: "Employee",
                    isActive: currentPath === PATHS.employee,
                    onClick: () => navigate(PATHS.employee),
                },
                {
                    icon: <Building className="w-4 h-4" />,
                    label: "Department",
                    isActive: currentPath === PATHS.department,
                    onClick: () => navigate(PATHS.department),
                },
            ],
        },
        {
            label: "Billing",
            icon: <CreditCard className="w-5 h-5" />,
            children: [
                {
                    icon: <CreditCard className="w-4 h-4" />,
                    label: "Payment",
                    isActive: currentPath === PATHS.payment,
                    onClick: () => navigate(PATHS.payment),
                },
                {
                    icon: <FileText className="w-4 h-4" />,
                    label: "Invoice",
                    isActive: currentPath === PATHS.invoice,
                    onClick: () => navigate(PATHS.invoice),
                },
            ],
        },
        {
            icon: <Settings className="w-5 h-5" />,
            label: "Roles",
            isActive: currentPath === PATHS.roles,
            onClick: () => navigate(PATHS.roles),
        },
        {
            icon: <LifeBuoy className="w-5 h-5" />,
            label: "Support",
            isActive: false,
            onClick: () => navigate("/under-development"),
        },
        {
            icon: <Settings className="w-5 h-5" />,
            label: "Settings",
            isActive: false,
            onClick: () => navigate("/under-development"),
        },
    ]

    return (
        <aside className="fixed left-0 top-0 w-[280px] h-screen rounded-r-[20px] shadow-[0px_4px_4px_#00000040] bg-basewhite overflow-hidden z-50 hidden md:block">
            <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="flex flex-col gap-6 pt-8 pb-4">
                    {/* Logo Section */}
                    <div className="px-6">
                        <div className="flex items-center h-[60px]">
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

                    {/* Search Section */}
                    <div className="px-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                className="pl-10 pr-4 py-2.5 h-10 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-purple-300 focus:ring-1 focus:ring-purple-300"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full px-3">
                        <nav className="space-y-1 pb-4">
                            {navigationItems.map((item, index) => (
                                <div key={index} className="space-y-1">
                                    {item.children ? (
                                        <>
                                            {/* Parent Group Button */}
                                            <button
                                                onClick={() => toggleGroup(item.label)}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                                                    isGroupActive(item.children)
                                                        ? "bg-purple-50 text-purple-700"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 flex items-center justify-center">
                                                        {item.icon}
                                                    </div>
                                                    <span className="font-medium">{item.label}</span>
                                                </div>
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform duration-200 ${
                                                        openGroups[item.label] ? "rotate-180" : "rotate-0"
                                                    }`}
                                                />
                                            </button>

                                            {/* Sub-menu Items */}
                                            {openGroups[item.label] && (
                                                <div className="ml-6 space-y-1">
                                                    {item.children.map((subItem, subIndex) => (
                                                        <button
                                                            key={`${index}-${subIndex}`}
                                                            onClick={subItem.onClick}
                                                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                                                subItem.isActive
                                                                    ? "bg-purple-50 text-purple-700 font-medium border-l-2 border-purple-600"
                                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                            }`}
                                                        >
                                                            <div className="w-4 h-4 flex items-center justify-center">
                                                                {subItem.icon}
                                                            </div>
                                                            <span>{subItem.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        /* Single Menu Item */
                                        <button
                                            onClick={item.onClick}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                item.isActive
                                                    ? "bg-purple-50 text-purple-700 border-l-2 border-purple-600"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                        >
                                            <div className="w-5 h-5 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <span>{item.label}</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </ScrollArea>
                </div>

                {/* Footer Section */}
                <div className="border-t border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src="/avatar.png" alt="User avatar" />
                                <AvatarFallback className="bg-purple-100 text-purple-700 font-medium">
                                    OR
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-900 text-sm">
                                    Olivia Rhye
                                </span>
                                <span className="text-xs text-gray-500">
                                    Admin
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    )
}
// import {
//     Activity,
//     BarChart2,
//     CheckSquare,
//     ChevronDown,
//     CreditCard,
//     Flag,
//     Layers,
//     LifeBuoy,
//     LogOut,
//     Search,
//     Settings,
// } from "lucide-react";
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "../ui/avatar.jsx";
// import { Button } from "../ui/button.jsx";
// import { Input } from "../ui/input.jsx";
// import { ScrollArea } from "../ui/scroll-area.jsx";
// import { Separator } from "../ui/separator.jsx";
// import { useNavigate } from "react-router-dom";
// import { PATHS } from "../../routes/path";
// import { useState } from "react";
//
//
// export const SidebarNavigationSection = () => {
//     const navigate = useNavigate();
//     const currentPath = window.location.pathname;
//     const [openGroups, setOpenGroups] = useState({});
//     const toggleGroup = (groupLabel) => {
//         setOpenGroups((prev) => ({
//             ...prev,
//             [groupLabel]: !prev[groupLabel],
//         }));
//     };
//     // const navigationItems = [
//     //     {
//     //         icon: <Activity className="w-6 h-6" />,
//     //         label: "Overview",
//     //         isActive: currentPath === PATHS.dashboard,
//     //         onClick: () => navigate(PATHS.dashboard),
//     //     },
//     //     {
//     //         icon: <BarChart2 className="w-6 h-6" />,
//     //         label: "Products",
//     //         isActive: currentPath === PATHS.product,
//     //         onClick: () => navigate(PATHS.product)
//     //     },
//     //     {
//     //         icon: <Layers className="w-6 h-6" />,
//     //         label: "Supplier",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.supplier)
//     //     },
//     //     {
//     //         icon: <CheckSquare className="w-6 h-6" />,
//     //         label: "Category",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.catagory)
//     //     },
//     //     {
//     //         icon: <Flag className="w-6 h-6" />,
//     //         label: "Warehouse",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.warehouse)
//     //     },
//     //     {
//     //         icon: <Flag className="w-6 h-6" />,
//     //         label: "Stock",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.stock)
//     //     },
//     //     {
//     //         icon: <Flag className="w-6 h-6" />,
//     //         label: "Purchase Order",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.purchase_order)
//     //     },
//     //     {
//     //         icon: <Flag className="w-6 h-6" />,
//     //         label: "Sale Order",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.sale_order)
//     //     },
//     //     {
//     //         icon: <Flag className="w-6 h-6" />,
//     //         label: "Shipment",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.shipment)
//     //     },
//     //     {
//     //         icon: <Flag className="w-6 h-6" />,
//     //         label: "Customer",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.customer)
//     //     },
//     //     {
//     //         icon: <Flag className="w-6 h-6" />,
//     //         label: "Employee",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.employee)
//     //     },
//     //     {
//     //         icon: <Flag className="w-6 h-6" />,
//     //         label: "Department",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.department)
//     //     },
//     //     {
//     //         icon: <CreditCard className="w-6 h-6" />,
//     //         label: "Payment",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.payment)
//     //     },
//     //     {
//     //         icon: <CreditCard className="w-6 h-6" />,
//     //         label: "Invoice",
//     //         hasDropdown: true,
//     //         onClick: () => navigate(PATHS.invoice)
//     //     },
//     //     {
//     //         icon: <Settings className="w-6 h-6" />,
//     //         label: "Roles",
//     //         hasDropdown: true,
//     //         onClick: () => navigate("/under-development")
//     //     },
//     //     {
//     //         icon: <LifeBuoy className="w-6 h-6" />,
//     //         label: "Support",
//     //         hasDropdown: true,
//     //         onClick: () => navigate("/under-development")
//     //     },
//     //     {
//     //         icon: <Settings className="w-6 h-6" />,
//     //         label: "Settings",
//     //         hasDropdown: true,
//     //         onClick: () => navigate("/under-development")
//     //     },
//     // ];
//     const navigationItems = [
//         {
//             label: "Products",
//             children: [
//                 {
//                     icon: <BarChart2 className="w-6 h-6" />,
//                     label: "Product",
//                     isActive: currentPath === PATHS.product,
//                     onClick: () => navigate(PATHS.product),
//                 },
//                 {
//                     icon: <CheckSquare className="w-6 h-6" />,
//                     label: "Category",
//                     isActive: currentPath === PATHS.catagory,
//                     onClick: () => navigate(PATHS.catagory),
//                 }
//             ]
//         },
//         {
//             label: "Inventory",
//             children: [
//                 {
//                     icon: <Flag className="w-6 h-6" />,
//                     label: "Warehouse",
//                     isActive: currentPath === PATHS.warehouse,
//                     onClick: () => navigate(PATHS.warehouse),
//                 },
//                 {
//                     icon: <Flag className="w-6 h-6" />,
//                     label: "Stock",
//                     isActive: currentPath === PATHS.stock,
//                     onClick: () => navigate(PATHS.stock),
//                 }
//             ]
//         },
//         {
//             label: "Orders",
//             children: [
//                 {
//                     icon: <Flag className="w-6 h-6" />,
//                     label: "Purchase Order",
//                     isActive: currentPath === PATHS.purchase_order,
//                     onClick: () => navigate(PATHS.purchase_order),
//                 },
//                 {
//                     icon: <Flag className="w-6 h-6" />,
//                     label: "Sale Order",
//                     isActive: currentPath === PATHS.sale_order,
//                     onClick: () => navigate(PATHS.sale_order),
//                 },
//                 {
//                     icon: <Flag className="w-6 h-6" />,
//                     label: "Shipment",
//                     isActive: currentPath === PATHS.shipment,
//                     onClick: () => navigate(PATHS.shipment),
//                 }
//             ]
//         },
//         {
//             icon: <Layers className="w-6 h-6" />,
//             label: "Supplier",
//             isActive: currentPath === PATHS.supplier,
//             onClick: () => navigate(PATHS.supplier),
//         },
//         {
//             icon: <Flag className="w-6 h-6" />,
//             label: "Customer",
//             isActive: currentPath === PATHS.customer,
//             onClick: () => navigate(PATHS.customer),
//         },
//         {
//             label: "Employee",
//             children: [
//                 {
//                     icon: <Flag className="w-6 h-6" />,
//                     label: "Employee",
//                     isActive: currentPath === PATHS.employee,
//                     onClick: () => navigate(PATHS.employee),
//                 },
//                 {
//                     icon: <Flag className="w-6 h-6" />,
//                     label: "Department",
//                     isActive: currentPath === PATHS.department,
//                     onClick: () => navigate(PATHS.department),
//                 }
//             ]
//         },
//         {
//             label: "Billing",
//             children: [
//                 {
//                     icon: <CreditCard className="w-6 h-6" />,
//                     label: "Payment",
//                     isActive: currentPath === PATHS.payment,
//                     onClick: () => navigate(PATHS.payment),
//                 },
//                 {
//                     icon: <CreditCard className="w-6 h-6" />,
//                     label: "Invoice",
//                     isActive: currentPath === PATHS.invoice,
//                     onClick: () => navigate(PATHS.invoice),
//                 }
//             ]
//         },
//         {
//             icon: <Settings className="w-6 h-6" />,
//             label: "Roles",
//             isActive: false,
//             onClick: () => navigate("/under-development"),
//         },
//         {
//             icon: <LifeBuoy className="w-6 h-6" />,
//             label: "Support",
//             isActive: false,
//             onClick: () => navigate("/under-development"),
//         },
//         {
//             icon: <Settings className="w-6 h-6" />,
//             label: "Settings",
//             isActive: false,
//             onClick: () => navigate("/under-development"),
//         }
//     ];
//
//     return (
//         <aside className="fixed left-0 top-0 w-[280px] h-screen rounded-r-[20px] shadow-[0px_4px_4px_#00000040] bg-basewhite overflow-hidden">
//             <div className="flex flex-col h-full justify-between">
//                 <div className="flex flex-col gap-6 pt-8">
//                     <div className="px-6">
//                         <div className="flex items-center h-[69px]">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
//                                     <span className="text-white font-bold text-lg">I</span>
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <span className="font-bold text-gray-900 text-lg">Invento</span>
//                                     <span className="text-xs text-gray-500">Dashboard</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="px-6">
//                         <div className="relative w-full">
//                             <div className="flex items-center border border-solid border-[#cfd4dc] rounded-lg shadow-shadow-xs">
//                                 <Search className="w-5 h-5 ml-3.5 text-gray-500" />
//                                 <Input
//                                     className="border-0 shadow-none h-11 pl-2 text-gray-500 font-text-md-normal"
//                                     placeholder="Search"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//
//                     <ScrollArea className="flex-1 px-4">
//                         <nav className="flex flex-col gap-1">
//                             {/*{navigationItems.map((item, index) => (*/}
//                             {/*    <Button*/}
//                             {/*        key={index}*/}
//                             {/*        variant="ghost"*/}
//                             {/*        className={`flex justify-between items-center w-full px-3 py-2 rounded-md ${*/}
//                             {/*            item.isActive*/}
//                             {/*                ? "bg-[#f9f5ff] text-[#6840c6]"*/}
//                             {/*                : "bg-basewhite text-gray-700"*/}
//                             {/*        }`}*/}
//                             {/*        onClick={item.onClick}*/}
//                             {/*    >*/}
//                             {/*        <div className="flex items-center gap-3">*/}
//                             {/*            {item.icon}*/}
//                             {/*            <span className="font-text-md-medium text-[length:var(--text-md-medium-font-size)] leading-[var(--text-md-medium-line-height)]">*/}
//                             {/*                {item.label}*/}
//                             {/*            </span>*/}
//                             {/*        </div>*/}
//                             {/*        {item.hasDropdown && <ChevronDown className="w-5 h-5" />}*/}
//                             {/*    </Button>*/}
//                             {/*))}*/}
//                             {navigationItems.map((item, index) => (
//                                 <div key={index} className="mb-1">
//                                     {item.children ? (
//                                         <>
//                                             <button
//                                                 onClick={() => toggleGroup(item.label)}
//                                                 className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 rounded hover:bg-gray-100 transition"
//                                             >
//                                                 <div className="flex items-center gap-2">
//                                                     <ChevronDown
//                                                         className={`w-4 h-4 transition-transform duration-200 ${
//                                                             openGroups[item.label] ? "rotate-180" : "rotate-0"
//                                                         }`}
//                                                     />
//                                                     <span>{item.label}</span>
//                                                 </div>
//                                             </button>
//                                             {openGroups[item.label] && (
//                                                 <div className="pl-8 mt-1 flex flex-col gap-1">
//                                                     {item.children.map((subItem, subIndex) => (
//                                                         <Button
//                                                             key={`${index}-${subIndex}`}
//                                                             variant="ghost"
//                                                             className={`flex items-center gap-2 justify-start w-full px-3 py-2 text-sm rounded-md transition ${
//                                                                 subItem.isActive
//                                                                     ? "bg-[#f9f5ff] text-[#6840c6]"
//                                                                     : "text-gray-700 hover:bg-gray-100"
//                                                             }`}
//                                                             onClick={subItem.onClick}
//                                                         >
//                                                             {subItem.icon}
//                                                             <span>{subItem.label}</span>
//                                                         </Button>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </>
//                                     ) : (
//                                         <Button
//                                             variant="ghost"
//                                             className={`flex items-center gap-2 justify-start w-full px-4 py-2 text-sm rounded-md transition ${
//                                                 item.isActive
//                                                     ? "bg-[#f9f5ff] text-[#6840c6]"
//                                                     : "text-gray-700 hover:bg-gray-100"
//                                             }`}
//                                             onClick={item.onClick}
//                                         >
//                                             {item.icon}
//                                             <span>{item.label}</span>
//                                         </Button>
//                                     )}
//                                 </div>
//                             ))}
//
//                         </nav>
//                     </ScrollArea>
//                 </div>
//
//                 <footer className="flex flex-col gap-6 pb-8 px-4">
//                     <Separator className="w-full h-px" />
//                     <div className="flex items-start justify-between px-2">
//                         <div className="flex items-center gap-3">
//                             <Avatar className="w-10 h-10">
//                                 <AvatarImage src="/avatar.png" alt="User avatar" />
//                                 <AvatarFallback>OR</AvatarFallback>
//                             </Avatar>
//                             <div className="flex flex-col items-start">
//                                 <span className="font-medium text-gray-900 text-sm leading-5 font-['Inter',Helvetica]">
//                                     Olivia Rhye
//                                 </span>
//                                 <span className="font-text-sm-normal text-gray-500 text-[length:var(--text-sm-normal-font-size)] leading-[var(--text-sm-normal-line-height)]">
//                                     Admin
//                                 </span>
//                             </div>
//                         </div>
//                         <Button variant="ghost" size="icon" className="w-5 h-5 p-0">
//                             <LogOut className="w-5 h-5" />
//                         </Button>
//                     </div>
//                 </footer>
//             </div>
//         </aside>
//     );
// };