"use client"

import { useState } from "react"
import { Eye, Send, Calendar, MapPin, FileText, DollarSign, X, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useGetSupplierPORequestsQuery, useSubmitQuotationMutation } from "../../redux/services/supplier"

export function PORequestsPage({ onShowToast }) {
  const [selectedPO, setSelectedPO] = useState(null)
  const [showQuotationModal, setShowQuotationModal] = useState(false)
  const [quotationData, setQuotationData] = useState({
    items: [],
    leadTime: "",
    remarks: "",
    validUntil: "",
    termsAndConditions: "",
  })

  // API queries
  const { data: poRequestsData, isLoading, error, refetch } = useGetSupplierPORequestsQuery()
  const [submitQuotation, { isLoading: isSubmittingQuotation }] = useSubmitQuotationMutation()

  const poRequests = poRequestsData?.data || []

  const handleViewDetails = (po) => {
    setSelectedPO(po)
  }

  const handleSubmitQuotation = (po) => {
    console.log('PO data for quotation:', po); // Debug log

    // Initialize quotation data with PO items
    const initialItems = po.items?.map((item) => ({
      product_id: item.product?.id || item.product_id,
      name: item.product?.product_name || `Product ${item.product_id}`,
      quantity: item.quantity,
      unit: item.product?.unit || 'pcs',
      specifications: item.specifications || "",
      unitPrice: "",
      totalPrice: 0,
      brand: "",
      model: "",
      warrantyPeriod: "",
      deliveryTimeline: "",
    })) || []

    console.log('Initial items for quotation:', initialItems); // Debug log

    // If no items from PO, create a default item for testing
    if (initialItems.length === 0 && po.items?.length === 0) {
      console.warn('No items found in PO, this might indicate a data issue');
    }

    setQuotationData({
      purchase_order_id: po.id,
      items: initialItems,
      leadTime: "",
      remarks: "",
      validUntil: "",
      termsAndConditions: "",
      paymentTerms: "",
      taxAmount: "",
      discountAmount: "",
    })
    setShowQuotationModal(true)
  }

  const handleQuotationItemChange = (index, field, value) => {
    const updatedItems = [...quotationData.items]
    updatedItems[index][field] = value

    // Auto-calculate total price
    if (field === "unitPrice") {
      const unitPrice = Number.parseFloat(value) || 0
      const quantity = updatedItems[index].quantity
      updatedItems[index].totalPrice = unitPrice * quantity
    }

    setQuotationData({ ...quotationData, items: updatedItems })
  }

  const handleSubmitQuotationForm = async () => {
    // Validate quotation data
    const hasEmptyPrices = quotationData.items.some((item) => !item.unitPrice)
    if (hasEmptyPrices || !quotationData.leadTime || !quotationData.validUntil) {
      onShowToast("Please fill in all required fields (Unit Prices, Lead Time, and Valid Until Date)", "error")
      return
    }

    // Validate valid until date is in the future
    const validUntilDate = new Date(quotationData.validUntil)
    const today = new Date()
    if (validUntilDate <= today) {
      onShowToast("Valid Until date must be in the future", "error")
      return
    }

    try {
      // Calculate totals
      const subtotal = quotationData.items.reduce((sum, item) => sum + parseFloat(item.totalPrice || 0), 0)
      const taxAmount = quotationData.taxAmount || 0
      const discountAmount = quotationData.discountAmount || 0
      const totalAmount = subtotal + parseFloat(taxAmount) - parseFloat(discountAmount)

      const quotationPayload = {
        purchase_order_id: quotationData.purchase_order_id,
        valid_until: quotationData.validUntil,
        lead_time_days: parseInt(quotationData.leadTime),
        terms_and_conditions: quotationData.termsAndConditions || quotationData.paymentTerms,
        remarks: quotationData.remarks,
        subtotal: subtotal.toFixed(2),
        tax_amount: parseFloat(taxAmount).toFixed(2),
        discount_amount: parseFloat(discountAmount).toFixed(2),
        total_amount: totalAmount.toFixed(2),
        items: quotationData.items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: parseFloat(item.unitPrice),
          total_price: parseFloat(item.totalPrice),
          specifications: item.specifications || "",
          brand: item.brand || "",
          model: item.model || "",
          warranty_period: item.warrantyPeriod || "",
          delivery_timeline: item.deliveryTimeline || "",
          remarks: item.remarks || "",
        }))
      }

      console.log('Submitting quotation payload:', quotationPayload)

      const result = await submitQuotation(quotationPayload).unwrap()

      console.log('Quotation submitted successfully:', result)
      onShowToast("Quotation submitted successfully!", "success")
      setShowQuotationModal(false)
      setQuotationData({
        items: [],
        leadTime: "",
        remarks: "",
        validUntil: "",
        termsAndConditions: "",
        paymentTerms: "",
        taxAmount: 0,
        discountAmount: 0
      })
      refetch() // Refresh the PO requests list
    } catch (error) {
      console.error("Error submitting quotation:", error)
      const errorMessage = error?.data?.message || error?.message || "Failed to submit quotation"
      onShowToast(errorMessage, "error")
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading PO requests...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600 mb-4">Error loading PO requests: {error?.data?.message || error.message}</p>
        <Button onClick={refetch} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      PENDING: "bg-yellow-100 text-yellow-800",
      QUOTATION_REQUESTED: "bg-blue-100 text-blue-800",
      QUOTATION_RECEIVED: "bg-blue-100 text-blue-800",
      CONFIRMED: "bg-green-100 text-green-800",
      SHIPPED: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    }

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>{status}</span>
  }

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      HIGH: "bg-red-100 text-red-800",
      URGENT: "bg-red-100 text-red-800",
      MEDIUM: "bg-yellow-100 text-yellow-800",
      LOW: "bg-green-100 text-green-800",
    }

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityStyles[priority] || "bg-gray-100 text-gray-800"}`}>{priority || 'MEDIUM'}</span>
  }

  const calculateGrandTotal = () => {
    return quotationData.items.reduce((total, item) => total + (item.totalPrice || 0), 0)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase Order Requests</h1>
          <p className="text-gray-600">Review and respond to purchase order requests</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Send className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Quotations Sent</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">$45,200</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* PO Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Purchase Order Requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PO Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
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
              {poRequests.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{po.po_number || po.id}</div>
                    <div className="text-sm text-gray-500">Requested: {formatDate(po.order_date)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{po.items?.length || 0} items</div>
                    <div className="text-sm text-gray-500">
                      {po.items?.slice(0, 2)
                        .map((item) => item.product?.product_name || `Product ${item.product_id}`)
                        .join(", ")}
                      {po.items?.length > 2 && "..."}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(po.expected_delivery_date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getPriorityBadge(po.priority)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(po.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(po)}
                      className="inline-flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {(po.status === "PENDING" || po.status === "QUOTATION_REQUESTED") && (
                      <Button
                        size="sm"
                        onClick={() => handleSubmitQuotation(po)}
                        className="inline-flex items-center bg-purple-600 hover:bg-purple-700"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Quote
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PO Details Modal */}
      {selectedPO && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Purchase Order Details - {selectedPO.id}</h3>
                <button onClick={() => setSelectedPO(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* PO Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Order Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">PO Number:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPO.po_number || selectedPO.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Order Date:</span>
                      <span className="text-sm font-medium text-gray-900">{formatDate(selectedPO.order_date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expected Delivery:</span>
                      <span className="text-sm font-medium text-gray-900">{formatDate(selectedPO.expected_delivery_date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Priority:</span>
                      {getPriorityBadge(selectedPO.priority)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      {getStatusBadge(selectedPO.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Amount:</span>
                      <span className="text-sm font-medium text-gray-900">${selectedPO.total_amount || '0.00'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Supplier & Warehouse Info</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Warehouse:</span>
                      <p className="text-sm font-medium text-gray-900">{selectedPO.warehouse?.warehouse_name}</p>
                      <p className="text-xs text-gray-500">{selectedPO.warehouse?.location}</p>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm text-gray-600">Payment Terms:</span>
                      <p className="text-sm font-medium text-gray-900">{selectedPO.payment_terms || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Requested Items</h4>
                {selectedPO.items && selectedPO.items.length > 0 ? (
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
                        {selectedPO.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium text-gray-900">
                                {item.product?.product_name || `Product ${item.product_id}`}
                              </div>
                              <div className="text-xs text-gray-500">
                                SKU: {item.product?.sku_code || 'N/A'}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${item.unit_price || '0.00'}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              ${item.total_price || (item.quantity * (item.unit_price || 0)).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="border rounded-lg p-8 text-center">
                    <p className="text-gray-500">No items found for this purchase order.</p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedPO.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Additional Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedPO.notes}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setSelectedPO(null)}>
                Close
              </Button>
              {(selectedPO.status === "PENDING" || selectedPO.status === "QUOTATION_REQUESTED") && (
                <Button
                  onClick={() => {
                    setSelectedPO(null)
                    handleSubmitQuotation(selectedPO)
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Quotation
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quotation Modal */}
      {showQuotationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Submit Quotation</h3>
                <button onClick={() => setShowQuotationModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Items Pricing */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Item Pricing</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Unit Price ($)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total Price ($)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {quotationData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.specifications}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              step="0.01"
                              className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              value={item.unitPrice}
                              onChange={(e) => handleQuotationItemChange(index, "unitPrice", e.target.value)}
                              placeholder="0.00"
                            />
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">${item.totalPrice.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          Grand Total:
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                          ${calculateGrandTotal().toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lead Time (Days) *</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={quotationData.leadTime}
                    onChange={(e) => setQuotationData({ ...quotationData, leadTime: e.target.value })}
                    placeholder="Enter lead time in days"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={quotationData.validUntil}
                    onChange={(e) => setQuotationData({ ...quotationData, validUntil: e.target.value })}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Tomorrow's date
                    required
                  />
                </div>
              </div>

              {/* Payment Terms and Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={quotationData.paymentTerms || ""}
                    onChange={(e) => setQuotationData({ ...quotationData, paymentTerms: e.target.value })}
                  >
                    <option value="">Select payment terms</option>
                    <option value="Net 30 days">Net 30 days</option>
                    <option value="Net 15 days">Net 15 days</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="50% Advance">50% Advance</option>
                    <option value="Payment on receipt">Payment on receipt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={quotationData.taxAmount || ""}
                    onChange={(e) => setQuotationData({ ...quotationData, taxAmount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Terms and Conditions</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={quotationData.termsAndConditions}
                  onChange={(e) => setQuotationData({ ...quotationData, termsAndConditions: e.target.value })}
                  placeholder="Enter terms and conditions for this quotation..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Remarks</label>
                <textarea
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={quotationData.remarks}
                  onChange={(e) => setQuotationData({ ...quotationData, remarks: e.target.value })}
                  placeholder="Any additional information, terms, or conditions..."
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowQuotationModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitQuotationForm} className="bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Quotation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
