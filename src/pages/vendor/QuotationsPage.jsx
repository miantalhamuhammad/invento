"use client"

import { useState } from "react"
import { Eye, CheckCircle, XCircle, Clock, DollarSign, Calendar, X, Loader2, Filter } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useGetSupplierQuotationsQuery } from "../../redux/services/supplier"

export function QuotationsPage() {
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  // API queries
  const {
    data: quotationsData,
    isLoading,
    error,
    refetch
  } = useGetSupplierQuotationsQuery({
    status: statusFilter || undefined,
    page: currentPage,
    limit: pageSize
  })

  const quotations = quotationsData?.data || []
  const pagination = quotationsData?.pagination || {}

  const getStatusBadge = (status) => {
    const statusConfig = {
      "DRAFT": {
        icon: Clock,
        className: "bg-gray-100 text-gray-800",
        iconColor: "text-gray-600",
      },
      "SUBMITTED": {
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800",
        iconColor: "text-yellow-600",
      },
      "UNDER_REVIEW": {
        icon: Clock,
        className: "bg-blue-100 text-blue-800",
        iconColor: "text-blue-600",
      },
      "APPROVED": {
        icon: CheckCircle,
        className: "bg-green-100 text-green-800",
        iconColor: "text-green-600",
      },
      "REJECTED": {
        icon: XCircle,
        className: "bg-red-100 text-red-800",
        iconColor: "text-red-600",
      },
      "EXPIRED": {
        icon: XCircle,
        className: "bg-red-100 text-red-800",
        iconColor: "text-red-600",
      },
    }

    const config = statusConfig[status] || statusConfig["DRAFT"]
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        <Icon className={`h-3 w-3 mr-1 ${config.iconColor}`} />
        {status}
      </span>
    )
  }

  const handleViewDetails = (quotation) => {
    setSelectedQuotation(quotation)
  }

  const handleStatusFilter = (status) => {
    setStatusFilter(status)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '$0.00'
    return `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading quotations...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600 mb-4">Error loading quotations: {error?.data?.message || error.message}</p>
        <Button onClick={refetch} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  // Calculate statistics using real API field names
  const stats = {
    pending: quotations.filter((q) => q.status === "SUBMITTED").length,
    approved: quotations.filter((q) => q.status === "APPROVED").length,
    rejected: quotations.filter((q) => q.status === "REJECTED").length,
    totalValue: quotations.reduce((sum, q) => sum + parseFloat(q.total_amount || 0), 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Quotations</h1>
          <p className="text-gray-600">Track your submitted quotations and their status</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Status</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Quotations</h2>
        </div>

        {quotations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No quotations found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quotation ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quotation Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotations.map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quotation.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{quotation.quotation_number || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(quotation.submitted_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(quotation.total_amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{quotation.lead_time_days ? `${quotation.lead_time_days} days` : 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(quotation.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(quotation)}
                        className="inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 px-3 text-sm text-gray-700">
            Page {currentPage} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
            disabled={currentPage === pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Quotation Details Modal */}
      {selectedQuotation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Quotation Details - {selectedQuotation.quotation_number}
                </h3>
                <button onClick={() => setSelectedQuotation(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Quotation Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Quotation Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quotation ID:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedQuotation.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quotation Number:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedQuotation.quotation_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date Submitted:</span>
                      <span className="text-sm font-medium text-gray-900">{formatDate(selectedQuotation.submitted_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Valid Until:</span>
                      <span className="text-sm font-medium text-gray-900">{formatDate(selectedQuotation.valid_until)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Lead Time:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedQuotation.lead_time_days} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      {getStatusBadge(selectedQuotation.status)}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Financial Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedQuotation.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax Amount:</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedQuotation.tax_amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Discount:</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedQuotation.discount_amount)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-semibold text-gray-900">Total Amount:</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(selectedQuotation.total_amount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              {selectedQuotation.items && selectedQuotation.items.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Quotation Items</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedQuotation.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium text-gray-900">
                                {item.product?.product_name || `Product ${item.product_id}`}
                              </div>
                              {item.specifications && (
                                <div className="text-xs text-gray-500">{item.specifications}</div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(item.unit_price)}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(item.total_price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              {selectedQuotation.terms_and_conditions && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Terms and Conditions</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedQuotation.terms_and_conditions}</p>
                  </div>
                </div>
              )}

              {/* Remarks */}
              {selectedQuotation.remarks && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Remarks</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedQuotation.remarks}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedQuotation(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
