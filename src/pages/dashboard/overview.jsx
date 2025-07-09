// import {
//     Filter,
//     Plus,
//     Calendar,
//     TrendingUp,
//     TrendingDown,
//     MoreHorizontal,
//     ChevronLeft,
//     ChevronRight,
//     ChevronUp,
//     ChevronDown,
// } from "lucide-react"
// import { Layout } from "../../components/layout/Layout.jsx"
//
// export const Overview = () => {
//     const timeRanges = ["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"]
//
//     const metricsData = [
//         {
//             title: "Average Order Volume",
//             value: "$208",
//             change: "12%",
//             trend: "up",
//             period: "vs last month",
//         },
//         {
//             title: "Transaction Count (Orders)",
//             value: "100",
//             change: "2%",
//             trend: "down",
//             period: "vs last month",
//         },
//         {
//             title: "Products Sold",
//             value: "270",
//             change: "2%",
//             trend: "up",
//             period: "vs last month",
//         },
//         {
//             title: "Gross Profit Margin",
//             value: "69.10%",
//             change: "12%",
//             trend: "up",
//             period: "vs last month",
//         },
//         {
//             title: "Gross Profit",
//             value: "$26.4k",
//             change: "2%",
//             trend: "down",
//             period: "vs last month",
//         },
//         {
//             title: "Total Net Revenue",
//             value: "$1.8m",
//             change: "2%",
//             trend: "up",
//             period: "vs last month",
//         },
//     ]
//
//     const inventoryFlow = [
//         { name: "365 Smoke and Vape (Austin)", percentage: "59.7%" },
//         { name: "365 Smoke and Vape (Crosby)", percentage: "13%" },
//         { name: "365 Smoke and Vape (Malibu)", percentage: "12.7%" },
//         { name: "365 Smoke and Vape (Muscat)", percentage: "7.3%" },
//         { name: "365 Smoke and Vape (Cranbury)", percentage: "5.2%" },
//     ]
//
//     const inventoryDestination = [
//         { name: "365 Smoke and Vape (Baytown)", percentage: "13.9%" },
//         { name: "365 Smoke and Vape (Kilby)", percentage: "2.6%" },
//         { name: "365 Smoke and Vape (Kilby)", percentage: "1.8%" },
//         { name: "365 Smoke and Vape (Irving)", percentage: "1.3%" },
//         { name: "365 Smoke and Vape (Houston)", percentage: "4%" },
//     ]
//
//     const mostSoldProducts = [
//         { name: "Stinzy Vapes", percentage: 37 },
//         { name: "Aston E-Cig", percentage: 14 },
//         { name: "Retro- T Joints", percentage: 50 },
//         { name: "Mikey Handles", percentage: 50 },
//         { name: "Blue Ribbon", percentage: 50 },
//         { name: "Fourloko", percentage: 50 },
//         { name: "Blastboyz", percentage: 50 },
//         { name: "Cultivator", percentage: 50 },
//     ]
//
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//
//     return (
//         <div className="flex min-h-screen bg-[#eaecf0]">
//             <Layout>
//                 {/* Header Section */}
//                 <div className="px-8 pt-6 pb-4">
//                     {/* Welcome Message */}
//                     <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">Welcome back, Olivia</h1>
//
//                     {/* Time Range and Action Buttons */}
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                         <div className="flex flex-wrap gap-2">
//                             {timeRanges.map((range) => (
//                                 <button
//                                     key={range}
//                                     className={`h-9 px-4 text-sm font-medium rounded-lg border ${
//                                         range === "1m"
//                                             ? "bg-[#6941c6] text-white border-[#6941c6]"
//                                             : "bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb]"
//                                     }`}
//                                 >
//                                     {range}
//                                 </button>
//                             ))}
//                         </div>
//                         <div className="flex gap-2">
//                             <button className="h-9 px-4 text-sm font-medium rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">
//                                 <Plus className="h-4 w-4 mr-2" />
//                                 Add Metrics
//                             </button>
//                             <button className="h-9 px-4 text-sm font-medium rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">
//                                 <Calendar className="h-4 w-4 mr-2" />
//                                 Select dates
//                             </button>
//                             <button className="h-9 px-4 text-sm font-medium rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">
//                                 <Filter className="h-4 w-4 mr-2" />
//                                 Filters
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Main Content */}
//                 <div className="flex flex-col flex-1 pl-[250px] min-h-screen">
//                     <div className="flex-1 px-4 md:px-8 pb-8 bg-gray-50">
//                         <div className="relative overflow-hidden h-full">
//                             <div className="overflow-x-auto h-[calc(100%-60px)]">
//                                 <main className="flex-1 p-8 overflow-auto">
//                                     {/* Metrics Cards */}
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                                         {metricsData.map((metric, idx) => (
//                                             <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0]">
//                                                 <div className="flex justify-between items-start mb-4">
//                                                     <h3 className="text-sm font-medium text-[#667085]">{metric.title}</h3>
//                                                     <MoreHorizontal className="h-4 w-4 text-[#98a2b3]" />
//                                                 </div>
//                                                 <div className="mb-4">
//                                                     <div className="text-3xl font-bold text-[#101828] mb-2">{metric.value}</div>
//                                                     <div className="flex items-center gap-1">
//                                                         {metric.trend === "up" ? (
//                                                             <TrendingUp className="h-4 w-4 text-[#12b76a]" />
//                                                         ) : (
//                                                             <TrendingDown className="h-4 w-4 text-[#f04438]" />
//                                                         )}
//                                                         <span
//                                                             className={`text-sm font-medium ${
//                                                                 metric.trend === "up" ? "text-[#12b76a]" : "text-[#f04438]"
//                                                             }`}
//                                                         >
//                               {metric.change} {metric.period}
//                             </span>
//                                                     </div>
//                                                 </div>
//                                                 {/* Mini chart placeholder */}
//                                                 <div className="h-12 flex items-end justify-end">
//                                                     <svg width="80" height="32" className="text-[#12b76a]">
//                                                         <path
//                                                             d="M0,20 Q20,15 40,18 T80,12"
//                                                             stroke={metric.trend === "up" ? "#12b76a" : "#f04438"}
//                                                             strokeWidth="2"
//                                                             fill="none"
//                                                         />
//                                                     </svg>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//
//                                     {/* Monthly Sales Vs Inventory Analysis */}
//                                     <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] mb-8">
//                                         <div className="flex justify-between items-center mb-6">
//                                             <h3 className="text-lg font-semibold text-[#101828]">Monthly Sales Vs Inventory Analysis</h3>
//                                             <ChevronUp className="h-5 w-5 text-[#667085]" />
//                                         </div>
//                                         <div className="flex justify-center mb-4">
//                                             <div className="flex gap-6">
//                                                 <div className="flex items-center gap-2">
//                                                     <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
//                                                     <span className="text-sm text-[#667085]">Gross Sales Revenue</span>
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                     <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
//                                                     <span className="text-sm text-[#667085]">Inventory Moved</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-end justify-between h-64 px-4">
//                                             <ChevronLeft className="h-5 w-5 text-[#667085] cursor-pointer" />
//                                             <div className="flex items-end gap-4 flex-1 justify-center">
//                                                 {months.map((month, idx) => (
//                                                     <div key={idx} className="flex flex-col items-center">
//                                                         <div className="relative">
//                                                             <div
//                                                                 className="w-8 bg-[#3b82f6] rounded-t"
//                                                                 style={{ height: `${Math.random() * 120 + 40}px` }}
//                                                             ></div>
//                                                             <div
//                                                                 className="w-8 bg-[#f59e0b] rounded-t"
//                                                                 style={{ height: `${Math.random() * 60 + 20}px` }}
//                                                             ></div>
//                                                             {idx === 4 && (
//                                                                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#101828] text-white text-xs px-2 py-1 rounded">
//                                                                     Inventory Moved
//                                                                     <br />
//                                                                     250 units
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                         <span className="text-xs text-[#667085] mt-2">{month}</span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                             <ChevronRight className="h-5 w-5 text-[#667085] cursor-pointer" />
//                                         </div>
//                                         <div className="flex justify-center gap-8 mt-4">
//                                             <span className="text-sm text-[#667085]">2023</span>
//                                             <span className="text-sm text-[#667085]">2024</span>
//                                         </div>
//                                     </div>
//
//                                     {/* Inventory Movement Landscape */}
//                                     <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] mb-8">
//                                         <div className="flex justify-between items-center mb-6">
//                                             <h3 className="text-lg font-semibold text-[#101828]">Inventory Movement Landscape</h3>
//                                             <ChevronUp className="h-5 w-5 text-[#667085]" />
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             {/* Source */}
//                                             <div className="w-1/3">
//                                                 {inventoryFlow.map((item, idx) => (
//                                                     <div key={idx} className="flex items-center justify-between py-2">
//                                                         <span className="text-sm text-[#101828]">{item.name}</span>
//                                                         <div className="flex items-center gap-2">
//                                                             <span className="text-sm font-medium text-[#101828]">{item.percentage}</span>
//                                                             <div className="w-4 h-4 bg-[#6941c6] rounded"></div>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//
//                                             {/* Flow Visualization */}
//                                             <div className="w-1/3 flex justify-center">
//                                                 <div className="bg-[#6941c6] text-white px-4 py-8 rounded text-center">
//                                                     <div className="text-sm font-medium">WAREHOUSE</div>
//                                                 </div>
//                                             </div>
//
//                                             {/* Destination */}
//                                             <div className="w-1/3">
//                                                 {inventoryDestination.map((item, idx) => (
//                                                     <div key={idx} className="flex items-center justify-between py-2">
//                                                         <div className="flex items-center gap-2">
//                                                             <div className="w-4 h-4 bg-[#6941c6] rounded"></div>
//                                                             <span className="text-sm font-medium text-[#101828]">{item.percentage}</span>
//                                                         </div>
//                                                         <span className="text-sm text-[#101828]">{item.name}</span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     {/* Bottom Section */}
//                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                                         {/* Top Moving Category */}
//                                         <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0]">
//                                             <div className="flex justify-between items-center mb-6">
//                                                 <h3 className="text-lg font-semibold text-[#101828]">Top Moving Category</h3>
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-sm text-[#667085]">By Volume</span>
//                                                     <ChevronDown className="h-4 w-4 text-[#667085]" />
//                                                 </div>
//                                             </div>
//                                             <div className="flex justify-center">
//                                                 <div className="relative w-48 h-48">
//                                                     <svg className="w-full h-full transform -rotate-90">
//                                                         <circle
//                                                             cx="96"
//                                                             cy="96"
//                                                             r="80"
//                                                             stroke="#3b82f6"
//                                                             strokeWidth="16"
//                                                             fill="none"
//                                                             strokeDasharray="180 360"
//                                                         />
//                                                         <circle
//                                                             cx="96"
//                                                             cy="96"
//                                                             r="80"
//                                                             stroke="#ef4444"
//                                                             strokeWidth="16"
//                                                             fill="none"
//                                                             strokeDasharray="90 360"
//                                                             strokeDashoffset="-180"
//                                                         />
//                                                         <circle
//                                                             cx="96"
//                                                             cy="96"
//                                                             r="80"
//                                                             stroke="#10b981"
//                                                             strokeWidth="16"
//                                                             fill="none"
//                                                             strokeDasharray="60 360"
//                                                             strokeDashoffset="-270"
//                                                         />
//                                                         <circle
//                                                             cx="96"
//                                                             cy="96"
//                                                             r="80"
//                                                             stroke="#f59e0b"
//                                                             strokeWidth="16"
//                                                             fill="none"
//                                                             strokeDasharray="30 360"
//                                                             strokeDashoffset="-330"
//                                                         />
//                                                     </svg>
//                                                     <div className="absolute inset-0 flex items-center justify-center">
//                                                         <div className="text-center">
//                                                             <div className="text-sm text-[#667085]">E-Vapes</div>
//                                                             <div className="text-lg font-semibold text-[#101828]">36%</div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         {/* Most Sold Products */}
//                                         <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0]">
//                                             <div className="flex justify-between items-center mb-6">
//                                                 <h3 className="text-lg font-semibold text-[#101828]">Most Sold Products</h3>
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-sm text-[#667085]">By Volume</span>
//                                                     <ChevronDown className="h-4 w-4 text-[#667085]" />
//                                                 </div>
//                                             </div>
//                                             <div className="space-y-4">
//                                                 {mostSoldProducts.map((product, idx) => (
//                                                     <div key={idx} className="flex items-center justify-between">
//                                                         <span className="text-sm text-[#101828]">{product.name}</span>
//                                                         <div className="flex items-center gap-3">
//                                                             <div className="w-24 bg-[#f3f4f6] rounded-full h-2">
//                                                                 <div
//                                                                     className="bg-[#6941c6] h-2 rounded-full"
//                                                                     style={{ width: `${product.percentage}%` }}
//                                                                 ></div>
//                                                             </div>
//                                                             <span className="text-sm font-medium text-[#101828] w-8">{product.percentage}%</span>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </main>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Layout>
//         </div>
//     )
// }
import {
    Filter,
    Plus,
    Calendar,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronDown,
} from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"

export const Overview = () => {
    const timeRanges = ["1d", "7d", "1m", "3m", "6m", "1y", "3y", "5y"]

    const metricsData = [
        {
            title: "Average Order Volume",
            value: "$208",
            change: "12%",
            trend: "up",
            period: "vs last month",
        },
        {
            title: "Transaction Count (Orders)",
            value: "100",
            change: "2%",
            trend: "down",
            period: "vs last month",
        },
        {
            title: "Products Sold",
            value: "270",
            change: "2%",
            trend: "up",
            period: "vs last month",
        },
        {
            title: "Gross Profit Margin",
            value: "69.10%",
            change: "12%",
            trend: "up",
            period: "vs last month",
        },
        {
            title: "Gross Profit",
            value: "$26.4k",
            change: "2%",
            trend: "down",
            period: "vs last month",
        },
        {
            title: "Total Net Revenue",
            value: "$1.8m",
            change: "2%",
            trend: "up",
            period: "vs last month",
        },
    ]

    const inventoryFlow = [
        { name: "365 Smoke and Vape (Austin)", percentage: "59.7%" },
        { name: "365 Smoke and Vape (Crosby)", percentage: "13%" },
        { name: "365 Smoke and Vape (Malibu)", percentage: "12.7%" },
        { name: "365 Smoke and Vape (Muscat)", percentage: "7.3%" },
        { name: "365 Smoke and Vape (Cranbury)", percentage: "5.2%" },
    ]

    const inventoryDestination = [
        { name: "365 Smoke and Vape (Baytown)", percentage: "13.9%" },
        { name: "365 Smoke and Vape (Kilby)", percentage: "2.6%" },
        { name: "365 Smoke and Vape (Kilby)", percentage: "1.8%" },
        { name: "365 Smoke and Vape (Irving)", percentage: "1.3%" },
        { name: "365 Smoke and Vape (Houston)", percentage: "4%" },
    ]

    const mostSoldProducts = [
        { name: "Stinzy Vapes", percentage: 37 },
        { name: "Aston E-Cig", percentage: 14 },
        { name: "Retro- T Joints", percentage: 50 },
        { name: "Mikey Handles", percentage: 50 },
        { name: "Blue Ribbon", percentage: 50 },
        { name: "Fourloko", percentage: 50 },
        { name: "Blastboyz", percentage: 50 },
        { name: "Cultivator", percentage: 50 },
    ]

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (
        <Layout>
            <div className="flex flex-col min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200 px-6 py-6">
                    {/* Welcome Message */}
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Welcome back, Olivia</h1>

                    {/* Time Range and Action Buttons */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                            {timeRanges.map((range) => (
                                <button
                                    key={range}
                                    className={`h-9 px-4 text-sm font-medium rounded-lg border transition-colors ${
                                        range === "1m"
                                            ? "bg-[#6941c6] text-white border-[#6941c6]"
                                            : "bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb]"
                                    }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button className="h-9 px-4 text-sm font-medium rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center transition-colors">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Metrics
                            </button>
                            <button className="h-9 px-4 text-sm font-medium rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center transition-colors">
                                <Calendar className="h-4 w-4 mr-2" />
                                Select dates
                            </button>
                            <button className="h-9 px-4 text-sm font-medium rounded-lg border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center transition-colors">
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto">
                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                        {metricsData.map((metric, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-sm font-medium text-[#667085]">{metric.title}</h3>
                                    <MoreHorizontal className="h-4 w-4 text-[#98a2b3] cursor-pointer hover:text-[#667085]" />
                                </div>
                                <div className="mb-4">
                                    <div className="text-3xl font-bold text-[#101828] mb-2">{metric.value}</div>
                                    <div className="flex items-center gap-1">
                                        {metric.trend === "up" ? (
                                            <TrendingUp className="h-4 w-4 text-[#12b76a]" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4 text-[#f04438]" />
                                        )}
                                        <span
                                            className={`text-sm font-medium ${
                                                metric.trend === "up" ? "text-[#12b76a]" : "text-[#f04438]"
                                            }`}
                                        >
                                            {metric.change} {metric.period}
                                        </span>
                                    </div>
                                </div>
                                {/* Mini chart placeholder */}
                                <div className="h-12 flex items-end justify-end">
                                    <svg width="80" height="32" className="text-[#12b76a]">
                                        <path
                                            d="M0,20 Q20,15 40,18 T80,12"
                                            stroke={metric.trend === "up" ? "#12b76a" : "#f04438"}
                                            strokeWidth="2"
                                            fill="none"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Monthly Sales Vs Inventory Analysis */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] mb-8 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-[#101828]">Monthly Sales Vs Inventory Analysis</h3>
                            <ChevronUp className="h-5 w-5 text-[#667085] cursor-pointer hover:text-[#344054]" />
                        </div>
                        <div className="flex justify-center mb-4">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                                    <span className="text-sm text-[#667085]">Gross Sales Revenue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                                    <span className="text-sm text-[#667085]">Inventory Moved</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-64 px-4">
                            <ChevronLeft className="h-5 w-5 text-[#667085] cursor-pointer hover:text-[#344054]" />
                            <div className="flex items-end gap-4 flex-1 justify-center">
                                {months.map((month, idx) => (
                                    <div key={idx} className="flex flex-col items-center">
                                        <div className="relative">
                                            <div
                                                className="w-8 bg-[#3b82f6] rounded-t"
                                                style={{ height: `${Math.random() * 120 + 40}px` }}
                                            ></div>
                                            <div
                                                className="w-8 bg-[#f59e0b] rounded-t"
                                                style={{ height: `${Math.random() * 60 + 20}px` }}
                                            ></div>
                                            {idx === 4 && (
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#101828] text-white text-xs px-2 py-1 rounded">
                                                    Inventory Moved
                                                    <br />
                                                    250 units
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs text-[#667085] mt-2">{month}</span>
                                    </div>
                                ))}
                            </div>
                            <ChevronRight className="h-5 w-5 text-[#667085] cursor-pointer hover:text-[#344054]" />
                        </div>
                        <div className="flex justify-center gap-8 mt-4">
                            <span className="text-sm text-[#667085]">2023</span>
                            <span className="text-sm text-[#667085]">2024</span>
                        </div>
                    </div>

                    {/* Inventory Movement Landscape */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] mb-8 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-[#101828]">Inventory Movement Landscape</h3>
                            <ChevronUp className="h-5 w-5 text-[#667085] cursor-pointer hover:text-[#344054]" />
                        </div>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            {/* Source */}
                            <div className="w-full lg:w-1/3">
                                <h4 className="text-sm font-medium text-[#344054] mb-4 text-center lg:text-left">Source Locations</h4>
                                {inventoryFlow.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                        <span className="text-sm text-[#101828] truncate pr-2">{item.name}</span>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="text-sm font-medium text-[#101828]">{item.percentage}</span>
                                            <div className="w-4 h-4 bg-[#6941c6] rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Flow Visualization */}
                            <div className="w-full lg:w-1/3 flex justify-center">
                                <div className="bg-[#6941c6] text-white px-6 py-8 rounded-lg text-center shadow-lg">
                                    <div className="text-sm font-medium">WAREHOUSE</div>
                                    <div className="text-xs mt-1 opacity-90">Central Hub</div>
                                </div>
                            </div>

                            {/* Destination */}
                            <div className="w-full lg:w-1/3">
                                <h4 className="text-sm font-medium text-[#344054] mb-4 text-center lg:text-right">Destination Locations</h4>
                                {inventoryDestination.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <div className="w-4 h-4 bg-[#6941c6] rounded"></div>
                                            <span className="text-sm font-medium text-[#101828]">{item.percentage}</span>
                                        </div>
                                        <span className="text-sm text-[#101828] truncate pl-2">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* Top Moving Category */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-[#101828]">Top Moving Category</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-[#667085]">By Volume</span>
                                    <ChevronDown className="h-4 w-4 text-[#667085] cursor-pointer hover:text-[#344054]" />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="relative w-48 h-48">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="80"
                                            stroke="#3b82f6"
                                            strokeWidth="16"
                                            fill="none"
                                            strokeDasharray="180 360"
                                        />
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="80"
                                            stroke="#ef4444"
                                            strokeWidth="16"
                                            fill="none"
                                            strokeDasharray="90 360"
                                            strokeDashoffset="-180"
                                        />
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="80"
                                            stroke="#10b981"
                                            strokeWidth="16"
                                            fill="none"
                                            strokeDasharray="60 360"
                                            strokeDashoffset="-270"
                                        />
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="80"
                                            stroke="#f59e0b"
                                            strokeWidth="16"
                                            fill="none"
                                            strokeDasharray="30 360"
                                            strokeDashoffset="-330"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-sm text-[#667085]">E-Vapes</div>
                                            <div className="text-lg font-semibold text-[#101828]">36%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                                    <span className="text-xs text-[#667085]">E-Vapes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                                    <span className="text-xs text-[#667085]">Traditional</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                                    <span className="text-xs text-[#667085]">Edibles</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                                    <span className="text-xs text-[#667085]">Others</span>
                                </div>
                            </div>
                        </div>

                        {/* Most Sold Products */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-[#101828]">Most Sold Products</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-[#667085]">By Volume</span>
                                    <ChevronDown className="h-4 w-4 text-[#667085] cursor-pointer hover:text-[#344054]" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                {mostSoldProducts.map((product, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-[#101828] truncate pr-4">{product.name}</span>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <div className="w-24 bg-[#f3f4f6] rounded-full h-2">
                                                <div
                                                    className="bg-[#6941c6] h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${product.percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium text-[#101828] w-8 text-right">{product.percentage}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}