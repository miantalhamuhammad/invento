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
    AlertCircle,
    Loader2,
} from "lucide-react"
import { Layout } from "../../components/layout/Layout.jsx"
import { useState } from "react"
import {
    useGetDashboardStatsQuery,
    useGetRecentOrdersQuery,
    useGetLowStockAlertsQuery,
    useGetRevenueChartQuery,
    useGetTopProductsQuery,
} from "../../redux/dashboardApi.js"

export const Overview = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("1m")
    const [chartDays, setChartDays] = useState(30)

    const timeRanges = [
        { key: "1d", label: "1d", days: 1 },
        { key: "7d", label: "7d", days: 7 },
        { key: "1m", label: "1m", days: 30 },
        { key: "3m", label: "3m", days: 90 },
        { key: "6m", label: "6m", days: 180 },
        { key: "1y", label: "1y", days: 365 },
        { key: "3y", label: "3y", days: 1095 },
        { key: "5y", label: "5y", days: 1825 }
    ]

    // API Queries
    const { data: dashboardStats, isLoading: statsLoading, error: statsError } = useGetDashboardStatsQuery()
    const { data: recentOrders, isLoading: ordersLoading, error: ordersError } = useGetRecentOrdersQuery(5)
    const { data: lowStockAlerts, isLoading: stockLoading, error: stockError } = useGetLowStockAlertsQuery()
    const { data: revenueChart, isLoading: revenueLoading, error: revenueError } = useGetRevenueChartQuery(chartDays)
    const { data: topProducts, isLoading: topProductsLoading, error: topProductsError } = useGetTopProductsQuery(8)

    // Handle time range change
    const handleTimeRangeChange = (range) => {
        setSelectedTimeRange(range.key)
        setChartDays(range.days)
    }

    // Calculate metrics from API data
    const getMetricsData = () => {
        if (!dashboardStats?.data) return []

        const stats = dashboardStats.data
        const revenue = revenueChart?.data || []

        // Calculate trends (simple mock calculation)
        const calculateTrend = (current, comparison = current * 0.9) => {
            const change = ((current - comparison) / comparison * 100).toFixed(1)
            return {
                change: `${Math.abs(change)}%`,
                trend: change >= 0 ? "up" : "down"
            }
        }

        const avgOrderVolume = revenue.length > 0
            ? (revenue.reduce((sum, item) => sum + item.revenue, 0) / revenue.length).toFixed(0)
            : "0"

        const avgOrderTrend = calculateTrend(parseInt(avgOrderVolume))

        return [
            {
                title: "Total Products",
                value: stats.totalProducts?.toString() || "0",
                ...calculateTrend(stats.totalProducts || 0),
                period: "vs last month",
            },
            {
                title: "Total Orders",
                value: stats.totalOrders?.toString() || "0",
                ...calculateTrend(stats.totalOrders || 0),
                period: "vs last month",
            },
            {
                title: "Total Revenue",
                value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
                ...calculateTrend(stats.totalRevenue || 0),
                period: "vs last month",
            },
            {
                title: "Low Stock Items",
                value: stats.lowStockCount?.toString() || "0",
                ...calculateTrend(stats.lowStockCount || 0, (stats.lowStockCount || 0) * 1.2),
                period: "vs last month",
            },
            {
                title: "Total Customers",
                value: stats.totalCustomers?.toString() || "0",
                ...calculateTrend(stats.totalCustomers || 0),
                period: "vs last month",
            },
            {
                title: "Total Suppliers",
                value: stats.totalSuppliers?.toString() || "0",
                ...calculateTrend(stats.totalSuppliers || 0),
                period: "vs last month",
            },
        ]
    }

    const metricsData = getMetricsData()

    // Loading component
    const LoadingCard = ({ className = "" }) => (
        <div className={`bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] flex items-center justify-center ${className}`}>
            <Loader2 className="h-6 w-6 animate-spin text-[#6941c6]" />
        </div>
    )

    // Error component
    const ErrorCard = ({ message, className = "" }) => (
        <div className={`bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] flex items-center justify-center ${className}`}>
            <div className="text-center">
                <AlertCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-red-600">{message}</p>
            </div>
        </div>
    )

    // Prepare chart data for monthly sales
    const getChartData = () => {
        if (!revenueChart?.data) return []

        const data = revenueChart.data
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        // Group data by month for the chart
        const monthlyData = monthNames.map((month, idx) => {
            const monthData = data.filter(item => {
                const date = new Date(item.date)
                return date.getMonth() === idx
            })

            const totalRevenue = monthData.reduce((sum, item) => sum + (item.revenue || 0), 0)
            return {
                month,
                revenue: totalRevenue,
                height: Math.max(40, Math.min(160, (totalRevenue / 1000) * 20)) // Scale for visualization
            }
        })

        return monthlyData
    }

    const chartData = getChartData()

    // Format recent orders for display
    const getFormattedOrders = () => {
        if (!recentOrders?.data || !Array.isArray(recentOrders.data)) return []

        try {
            return recentOrders.data.slice(0, 5).map(order => ({
                id: order.id,
                orderNumber: order.order_number,
                customer: order.customer_name,
                amount: `$${order.total_amount}`,
                status: order.status,
                date: new Date(order.created_at).toLocaleDateString()
            }))
        } catch (error) {
            console.error('Error formatting orders:', error)
            return []
        }
    }

    const formattedOrders = getFormattedOrders()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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
                                    key={range.key}
                                    onClick={() => handleTimeRangeChange(range)}
                                    className={`h-9 px-4 text-sm font-medium rounded-lg border transition-colors ${
                                        range.key === selectedTimeRange
                                            ? "bg-[#6941c6] text-white border-[#6941c6]"
                                            : "bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb]"
                                    }`}
                                >
                                    {range.label}
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
                            {topProductsLoading ? (
                                <div className="flex items-center justify-center h-48">
                                    <Loader2 className="h-6 w-6 animate-spin text-[#6941c6]" />
                                </div>
                            ) : topProductsError ? (
                                <ErrorCard message="Failed to load top products" />
                            ) : (
                                <div className="space-y-4">
                                    {topProducts?.data?.map((product, idx) => {
                                        const maxRevenue = Math.max(...(topProducts.data.map(p => p.total_revenue) || [1]))
                                        const percentage = maxRevenue > 0 ? Math.round((product.total_revenue / maxRevenue) * 100) : 0

                                        return (
                                            <div key={idx} className="flex items-center justify-between">
                                                <span className="text-sm text-[#101828] truncate pr-4">
                                                    {product.product?.product_name || 'Unknown Product'}
                                                </span>
                                                <div className="flex items-center gap-3 flex-shrink-0">
                                                    <div className="w-24 bg-[#f3f4f6] rounded-full h-2">
                                                        <div
                                                            className="bg-[#6941c6] h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-sm font-medium text-[#101828]">{product.total_sold || 0}</span>
                                                        <span className="text-xs text-[#667085]">sold</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) || []}
                                    {(!topProducts?.data || topProducts.data.length === 0) && (
                                        <div className="text-center py-8 text-[#667085]">
                                            No product data available
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Orders Section */}
                    {recentOrders?.data && recentOrders.data.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] mt-8 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-[#101828]">Recent Orders</h3>
                                <span className="text-sm text-[#667085]">Last {recentOrders.data.length} orders</span>
                            </div>
                            {ordersLoading ? (
                                <LoadingCard />
                            ) : ordersError ? (
                                <ErrorCard message="Failed to load recent orders" />
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 font-medium text-[#667085] text-sm">Order #</th>
                                                <th className="text-left py-3 px-4 font-medium text-[#667085] text-sm">Customer</th>
                                                <th className="text-left py-3 px-4 font-medium text-[#667085] text-sm">Amount</th>
                                                <th className="text-left py-3 px-4 font-medium text-[#667085] text-sm">Status</th>
                                                <th className="text-left py-3 px-4 font-medium text-[#667085] text-sm">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formattedOrders.map((order) => (
                                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4 text-sm text-[#101828]">{order.orderNumber}</td>
                                                    <td className="py-3 px-4 text-sm text-[#101828]">{order.customer}</td>
                                                    <td className="py-3 px-4 text-sm text-[#101828] font-medium">{order.amount}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                            order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-sm text-[#667085]">{order.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Low Stock Alerts */}
                    {lowStockAlerts?.data && lowStockAlerts.data.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-[#eaecf0] mt-8 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-[#101828]">Low Stock Alerts</h3>
                                <span className="text-sm text-red-600 font-medium">{lowStockAlerts.data.length} items need attention</span>
                            </div>
                            {stockLoading ? (
                                <LoadingCard />
                            ) : stockError ? (
                                <ErrorCard message="Failed to load stock alerts" />
                            ) : (
                                <div className="space-y-3">
                                    {lowStockAlerts.data.slice(0, 5).map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                                            <div className="flex items-center gap-3">
                                                <AlertCircle className="h-5 w-5 text-red-500" />
                                                <div>
                                                    <p className="text-sm font-medium text-[#101828]">{item.product_name}</p>
                                                    <p className="text-xs text-[#667085]">SKU: {item.sku_code}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-red-600">{item.current_stock} left</p>
                                                <p className="text-xs text-[#667085]">Min: {item.minimum_stock}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}
